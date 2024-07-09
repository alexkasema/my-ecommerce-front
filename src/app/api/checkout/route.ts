import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";
import { NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SK);

const dbConnect = async () => {
  await mongooseConnect();
};

dbConnect();

export async function POST(req: Request) {
  const {
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    cartProducts,
  } = await req.json();

  const productsIds = cartProducts;
  const uniqueIds = [...new Set(productsIds)];
  const productsInfos = await Product.find({ _id: uniqueIds });

  let line_items = [];
  for (const productId of uniqueIds) {
    const productInfo = productsInfos.find(
      (p) => p._id.toString() === productId
    );
    const quantity = productsIds.filter((id) => id === productId)?.length || 0;
    if (quantity > 0 && productInfo) {
      line_items.push({
        quantity,
        price_data: {
          currency: "USD",
          product_data: { name: productInfo.title },
          unit_amount: quantity * productInfo.price * 100,
        },
      });
    }
  }

  const order = await Order.create({
    line_items,
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    paid: false,
  });

  try {
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      customer_email: email,
      success_url: process.env.NEXTAUTH_URL + "/cart?success=1",
      cancel_url: process.env.NEXTAUTH_URL + "/cart?canceled=1",
      metadata: { orderId: order._id.toString(), test: "ok" },
      payment_intent_data: {
        metadata: { orderId: order._id.toString() },
      },
      payment_method_types: ["card"],
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.error();
  }
}
