import { google } from "googleapis";

export async function getGoogleSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({ version: "v4", auth });
}

export async function appendContactToSheet(data: {
  name: string;
  email: string;
  message: string;
}) {
  const sheets = await getGoogleSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  const timestamp = new Date().toLocaleString("en-US", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const values = [[timestamp, data.name, data.email, data.message]];

  const metadata = await sheets.spreadsheets.get({ spreadsheetId });
  const firstSheetName =
    metadata.data.sheets?.[0]?.properties?.title || "Sheet1";

  const response = await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${firstSheetName}!A:D`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values },
  });

  return response.data;
}
