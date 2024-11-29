import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const slug = (await params).slug;
  const { searchParams } = new URL(req.url);
  const pageRaw = searchParams.get("page");
  const page = pageRaw && !isNaN(+pageRaw) ? +pageRaw : 1;

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_MAIN_URL}/the-loai/${slug}?page=${page}`
    );
    return NextResponse.json(res.data.data);
  } catch (e: any) {
    return new NextResponse(e?.response?.data?.error?.details, {
      status: 400,
    });
  }
}
