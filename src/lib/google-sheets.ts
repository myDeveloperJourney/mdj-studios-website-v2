import { sheets, type sheets_v4 } from "@googleapis/sheets";
import { GoogleAuth } from "google-auth-library";

/**
 * Returns an authenticated Google Sheets v4 client.
 *
 * We use the per-API split package (`@googleapis/sheets`) plus
 * `google-auth-library` directly instead of the `googleapis` mega-package.
 * The mega-package bundles 700+ Google APIs and ships occasional malformed
 * type declarations that crash Next's TypeScript build (the Beyondcorp
 * surface in particular). The per-API package avoids those files entirely
 * and is dramatically smaller.
 */
export async function getGoogleSheetsClient(): Promise<sheets_v4.Sheets> {
  const auth = new GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return sheets({ version: "v4", auth });
}

export async function appendContactToSheet(data: {
  name: string;
  email: string;
  message: string;
}) {
  const sheetsClient = await getGoogleSheetsClient();
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

  const metadata = await sheetsClient.spreadsheets.get({ spreadsheetId });
  const firstSheetName =
    metadata.data.sheets?.[0]?.properties?.title || "Sheet1";

  const response = await sheetsClient.spreadsheets.values.append({
    spreadsheetId,
    range: `${firstSheetName}!A:D`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values },
  });

  return response.data;
}
