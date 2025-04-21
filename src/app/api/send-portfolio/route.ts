import { google } from "googleapis";
import { NextResponse } from "next/server";
import sendEmail from "../../../../libs/sendEmail";

const SHEET_ID = "15oP99dtWY9BNlo22Pt3ZQmu1Q91PNgH0Zb_4FR-I3pI";
const SHEET_RANGE = "Portfolio Submissions!A:I";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, portfolio, message } = body;

    if (!firstName || !lastName || !email || !portfolio || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const currentDate = new Date().toLocaleString("en-US", { timeZone: "UTC" });

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "Unknown";
    const userAgent = req.headers.get("user-agent") || "Unknown";

    const subject = "New Portfolio Submission";
    const emailContent = `
      <p><strong>From:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Portfolio:</strong> ${portfolio}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `;

    const emails = [
      { to: "r@izsit.com", name: "Rasmus", isInternal: true },
      { to: "g@izsit.com", name: "Giacomo", isInternal: true },
    ];

    for (const recipient of emails) {
      await sendEmail({
        to: recipient.to,
        name: recipient.name,
        subject,
        message: emailContent,
        isInternal: recipient.isInternal,
      });
    }

    await sendEmail({
      to: email,
      name: `${firstName} ${lastName}`,
      subject: "Thank you for your submission!",
      message:
        "Thank you for submitting your portfolio. We'll review it soon and get back to you!",
      isInternal: false,
    });

    console.log("Preparing to connect to Google Sheets with service account");

    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    console.log("Auth created successfully");

    const sheets = google.sheets({ version: "v4", auth });

    console.log("Sheets client created, preparing data to append");
    console.log("Appending to sheet:", SHEET_ID);
    console.log("Range:", SHEET_RANGE);

    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: SHEET_RANGE,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            firstName,
            lastName,
            email,
            portfolio,
            message,
            currentDate,
            ip,
            userAgent,
            "Pending Review",
          ],
        ],
      },
    });

    return NextResponse.json({
      message: "Portfolio submitted successfully!",
    });
  } catch (error) {
    console.error("API Error Details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : "No stack trace",
      error: JSON.stringify(error, null, 2)
    });

    // Return the actual error message to help with debugging
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Something went wrong.",
        details: error instanceof Error ? error.stack : JSON.stringify(error)
      },
      { status: 500 }
    );
  }
}