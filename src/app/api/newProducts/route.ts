import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { NextResponse } from "next/server";

const dbConnect = async () => {
  await mongooseConnect();
};

dbConnect();
export async function GET() {
  try {
    const newProducts = await Product.find().sort({ createdAt: -1 }).limit(4);
    return NextResponse.json(newProducts);
  } catch (err) {
    return NextResponse.error();
  }
}
