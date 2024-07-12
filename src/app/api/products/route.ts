import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { NextResponse } from "next/server";

const dbConnect = async () => {
  await mongooseConnect();
};

dbConnect();

export async function GET(req: Request) {
  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");

  try {
    if (_id) {
      const product = await Product.findById(_id);
      return NextResponse.json(product);
    }
    const products = await Product.find({}).sort({ createdAt: -1 });
    return NextResponse.json(products);
  } catch (err) {
    return NextResponse.json(err, { status: 400 });
  }
}
