import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { NextResponse } from "next/server";

const dbConnect = async () => {
  await mongooseConnect();
};

dbConnect();

export async function POST(req: Request) {
  const { cartProducts } = await req.json();
  try {
    const products = await Product.find({
      _id: cartProducts,
    });
    return NextResponse.json(products);
  } catch (err) {
    return NextResponse.error();
  }
}
