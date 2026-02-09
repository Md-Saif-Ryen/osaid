import { google } from "googleapis";

export interface SheetsData {
  fullName: string;
  email: string;
  company?: string;
  message: string;
  source?: string;
}

export interface SheetsConfig {
  sheetId: string;
  serviceAccountEmail: string;
  privateKey: string;
  range?: string;
}

export class GoogleSheetsService {
  private config: SheetsConfig;
  private sheets: any;

  constructor(config?: SheetsConfig) {
    this.config = config || this.getDefaultConfig();
  }

  private getDefaultConfig(): SheetsConfig {
    return {
      sheetId: process.env.GOOGLE_SHEET_ID || "",
      serviceAccountEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || "",
      privateKey: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n") || "",
      range: "Contacts!A:F",
    };
  }

  private async initializeSheets() {
    try {
      const auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: this.config.serviceAccountEmail,
          private_key: this.config.privateKey,
        },
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
      });

      this.sheets = google.sheets({ version: "v4", auth });
      return true;
    } catch (error) {
      console.error("❌ Failed to initialize Google Sheets:", error);
      return false;
    }
  }

  async saveToSheet(
    data: SheetsData,
  ): Promise<{ success: boolean; updatedRange?: string; error?: string }> {
    try {
      // Validate configuration
      if (
        !this.config.sheetId ||
        !this.config.serviceAccountEmail ||
        !this.config.privateKey
      ) {
        return {
          success: false,
          error: "Google Sheets configuration is missing",
        };
      }

      // Initialize if not already done
      if (!this.sheets) {
        const initialized = await this.initializeSheets();
        if (!initialized) {
          throw new Error("Failed to initialize Google Sheets");
        }
      }

      const timestamp = new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        dateStyle: "medium",
        timeStyle: "medium",
      });

      const values = [
        [
          timestamp, // A: Timestamp
          data.fullName, // B: Full Name
          data.email, // C: Email
          data.company || "", // D: Company
          data.message, // E: Message
          data.source || "Portfolio Website", // F: Source
        ],
      ];

      console.log("📊 Appending to Google Sheets...");

      const sheetsResponse = await this.sheets.spreadsheets.values.append({
        spreadsheetId: this.config.sheetId,
        range: this.config.range,
        valueInputOption: "USER_ENTERED",
        requestBody: { values },
      });

      console.log(
        "✅ Google Sheets updated:",
        sheetsResponse.data.updates?.updatedRange || "Success",
      );

      return {
        success: true,
        updatedRange: sheetsResponse.data.updates?.updatedRange,
      };
    } catch (error) {
      console.error("❌ Google Sheets update failed:", error);

      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown sheets error",
      };
    }
  }

  // Method to check if service is configured
  isConfigured(): boolean {
    return !!(
      this.config.sheetId &&
      this.config.serviceAccountEmail &&
      this.config.privateKey
    );
  }

  // Static method for quick usage
  static async save(
    data: SheetsData,
  ): Promise<{ success: boolean; updatedRange?: string; error?: string }> {
    const service = new GoogleSheetsService();

    // Check if service is configured
    if (!service.isConfigured()) {
      console.log("ℹ️ Google Sheets integration not configured");
      return { success: true }; // Return success to continue without sheets
    }

    return service.saveToSheet(data);
  }
}
