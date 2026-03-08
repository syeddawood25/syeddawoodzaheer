import { NextResponse } from "next/server";
import { getResumeData } from "@/lib/data";

export async function GET() {
    const resume = getResumeData();

    return NextResponse.json(resume, {
        status: 200,
        headers: {
            "Content-Type": "application/json",
            // Include CORS headers if we want allowing external consumption
            "Access-Control-Allow-Origin": "*",
        },
    });
}
