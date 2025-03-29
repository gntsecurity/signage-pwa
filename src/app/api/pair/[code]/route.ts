import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } }
): Promise<NextResponse> {
  const { code } = params;
  // Your logic here
  return NextResponse.json({ message: `Code is ${code}` });
}
