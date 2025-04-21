import sgMail from "@sendgrid/mail";

// Set the API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

interface EmailPayload {
  to: string;
  name: string;
  subject: string;
  message: string;
  isInternal?: boolean; // Optional flag for internal notifications
}

interface SendEmailResponse {
  success: boolean;
  error?: unknown;
}

export default async function sendEmail({
  to,
  name,
  subject,
  message,
  isInternal = false,
}: EmailPayload): Promise<SendEmailResponse> {
  // Custom footer for emails
  const internalFooter = `Hey Giacomo and Rasmus - There is a portfolio submission. 🎉 Check the Google Sheet (<a href="https://docs.google.com/spreadsheets/d/15oP99dtWY9BNlo22Pt3ZQmu1Q91PNgH0Zb_4FR-I3pI/edit?gid=981144144#gid=981144144" target="_blank">View Submissions</a>) for all the details.`;
  const externalFooter = `Thanks for reaching out to Izsit. 🙌<br>— Rasmus`;

  // Adjust the message for internal emails
  const textMessage = isInternal
    ? `${internalFooter}\n\n${message}`
    : `Hi ${name},\n\n${message}\n\n${externalFooter}`;

  const htmlMessage = isInternal
    ? `<p>${internalFooter}</p><p>${message}</p>`
    : `<p>Hi ${name},</p><p>${message}</p><p>${externalFooter}</p>`;

  const msg = {
    to, // The recipient's email
    from: {
      email: "r@izsit.com",
      name: "Rasmus from Izsit",
    },
    subject: subject || "Portfolio Submission Received",
    text: textMessage,
    html: htmlMessage,
  };

  try {
    await sgMail.send(msg);
    return { success: true };
  } catch (error) {
    console.error(
      "SendGrid Error:",
      error instanceof Error ? error.message : error
    );
    return { success: false, error };
  }
}
