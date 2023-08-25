import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const records = ["A", "AAAA", "CNAME"];
export const config = {
  matcher: "/api/dns",
};

export async function middleware(request: NextRequest) {
  if (request.method === "POST") {
    const data = await request.json();

    let { record } = data;
    if (record) {
      record = record.toUpperCase();
      if (!records.includes(record)) {
        return NextResponse.json({
          errors: [
            { message: "Record field must be ( A, AAAA, CNAME ).", code: 500 },
          ],
          result: {},
        });
      }
    }
  }

  return NextResponse.next();
}
