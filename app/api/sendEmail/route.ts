// app/api/send-email/route.ts
import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { to, subject, message, accessToken } = body;

  const gmail = google.gmail({
    version: 'v1',
    auth: accessToken,
  });

  const encodedMessage = Buffer.from(
    `To: ${to}\r\n` +
    `Subject: ${subject}\r\n\r\n` +
    `${message}`
  ).toString('base64').replace(/\+/g, '-').replace(/\//g, '_');

  try {
    await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Gmail send error:', error);
    return NextResponse.json({ success: false, error });
  }
}
