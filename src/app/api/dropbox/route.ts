import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { role, name, emailAddress, templateId } = body;

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/sign`,
      {
        role,
        name,
        emailAddress,
        templateId,
      }
    );

    return NextResponse.json({
      success: true,
      response: response.data,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/embedded-url`
    );

    const embeddedUrl = response?.data?.embeddedUrl;
    if (!embeddedUrl) {
      throw new Error("Embedded URL not found in the backend response.");
    }

    return NextResponse.json({
      success: true,
      response: embeddedUrl,
    });
  } catch (error: any) {
    console.log("error", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
