import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { NextResponse } from "next/server";

const dbConnect = async () => {
  await mongooseConnect();
};

dbConnect();

export async function GET(req: Request) {
  const featuredProductId = process.env.FEATURED_PRODUCT_ID as string;
  try {
    const featuredProduct = await Product.findById(featuredProductId);
    return NextResponse.json(featuredProduct);
  } catch (err) {
    return NextResponse.error();
  }
}
