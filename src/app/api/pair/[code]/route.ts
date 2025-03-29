import { NextRequest, NextResponse } from 'next/server'

interface RouteParams {
  params: { [key: string]: string | string[] | undefined }
}

const log = (action: string, details: any) => {
  // Placeholder for logging; replace with actual logging logic
  console.log(`Action: ${action}`, details);
}

export async function GET(_req: NextRequest, { params }: RouteParams) {
  const code = params.code as string;

  try {
    // Attempt to get data from Cloudflare KV
    const data = await kv.get(`pair:${code}`);

    // If data is found, return it; otherwise, return 404 with error message
    return data
      ? NextResponse.json(JSON.parse(data))
      : NextResponse.json({ error: 'Not found' }, { status: 404 });

  } catch (error) {
    // Handle any unexpected errors and log them
    console.error(`Error fetching pair for code ${code}:`, error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  const code = params.code as string;

  try {
    // Delete the pair data from Cloudflare KV
    await kv.delete(`pair:${code}`);

    // Log the deletion action for audit purposes
    await log('pair:delete', { code });

    // Return a successful response
    return NextResponse.json({ ok: true });

  } catch (error) {
    // Handle any unexpected errors and log them
    console.error(`Error deleting pair for code ${code}:`, error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
