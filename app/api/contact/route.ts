// import { NextResponse } from "next/server";
// import { EmailService, type EmailData } from "@/lib/emailService";
// // import { GoogleSheetsService, type SheetsData } from "@/lib/googleSheetsService"; // COMMENTED OUT - Uncomment when needed

// // ✅ Force Node.js runtime
// export const runtime = "nodejs";

// // Type definition for form data
// interface ContactFormData {
//   name: string;
//   email: string;
//   company?: string;
//   message: string;
// }

// export async function POST(request: Request) {
//   try {
//     const formData: ContactFormData = await request.json();
//     console.log("Received form data:", formData);

//     // ✅ Extract and format data according to frontend
//     const fullName = formData.name?.trim() || "";
//     const email = formData.email?.trim() || "";
//     const company = formData.company?.trim() || "";
//     const message = formData.message?.trim() || "";

//     // ✅ Validate required fields
//     if (!fullName || !email || !message) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Please fill in all required fields (Name, Email, Message)",
//         },
//         { status: 400 },
//       );
//     }

//     // ✅ Validate email format
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Please enter a valid email address",
//         },
//         { status: 400 },
//       );
//     }

//     // Prepare data for services
//     const emailData: EmailData = {
//       fullName,
//       email,
//       company,
//       message,
//     };

//     // ========== 1. Send Email (Will always work if GMAIL_USER and GMAIL_PASSWORD are set) ==========
//     let emailResult = { success: false, error: "Email service not configured" };

//     try {
//       emailResult = await EmailService.send(emailData);
//     } catch (error) {
//       console.error("Email service error:", error);
//       emailResult = {
//         success: false,
//         error: error instanceof Error ? error.message : "Unknown error",
//       };
//     }

//     // ========== 2. Save to Google Sheets (COMMENTED OUT - Uncomment when needed) ==========
//     /*
//     // Uncomment this section when you want to enable Google Sheets integration

//     const sheetsData: SheetsData = {
//       fullName,
//       email,
//       company,
//       message,
//       source: "Portfolio Website",
//     };

//     let sheetsResult = { success: false, error: "Google Sheets service disabled" };

//     // Uncomment the following lines when you want to enable Google Sheets
//     // if (process.env.ENABLE_GOOGLE_SHEETS !== "false") {
//     //   sheetsResult = await GoogleSheetsService.save(sheetsData);
//     // } else {
//     //   console.log("ℹ️ Google Sheets service is disabled (ENABLE_GOOGLE_SHEETS=false)");
//     // }
//     */

//     // For now, we'll just mark sheets as not configured
//     const sheetsResult = {
//       success: false,
//       error:
//         "Google Sheets integration not configured. Uncomment code in route.ts to enable.",
//     };

//     // ========== 3. Final Response ==========
//     const responseData = {
//       success: emailResult.success, // Only email success matters for now
//       message: emailResult.success
//         ? "Thank you for your message! I will get back to you soon."
//         : "Message received but email failed to send. Please try again or contact me directly.",
//       details: {
//         email: emailResult,
//         sheets: sheetsResult,
//         timestamp: new Date().toISOString(),
//       },
//     };

//     // Add debug info in development
//     if (process.env.NODE_ENV === "development") {
//       responseData.debug = {
//         receivedData: formData,
//         environment: {
//           gmailUserSet: !!process.env.GMAIL_USER,
//           gmailPassSet: !!process.env.GMAIL_PASSWORD,
//         },
//       };
//     }

//     return NextResponse.json(responseData, { status: 200 });
//   } catch (error) {
//     console.error("❌ Error processing contact form:", error);

//     const errorMessage =
//       error instanceof Error ? error.message : "Unknown error occurred";

//     const errorResponse = {
//       success: false,
//       message: "There was an error submitting your message. Please try again.",
//       error: process.env.NODE_ENV === "development" ? errorMessage : undefined,
//     };

//     return NextResponse.json(errorResponse, { status: 500 });
//   }
// }

// // ✅ Optional: GET method for testing
// export async function GET() {
//   const emailConfigured = !!(
//     process.env.GMAIL_USER && process.env.GMAIL_PASSWORD
//   );
//   const sheetsConfigured = false; // Currently disabled

//   return NextResponse.json({
//     status: "Contact API is running",
//     timestamp: new Date().toISOString(),
//     note: "Google Sheets integration is currently commented out. Uncomment in route.ts to enable.",
//     services: {
//       email: {
//         configured: emailConfigured,
//         enabled: true, // Always enabled if configured
//         status: emailConfigured
//           ? "Ready"
//           : "Missing GMAIL_USER or GMAIL_PASSWORD in .env.local",
//       },
//       googleSheets: {
//         configured: sheetsConfigured,
//         enabled: false, // Currently disabled
//         status: "Disabled - Commented out in code",
//         instruction:
//           "To enable: 1. Uncomment import 2. Uncomment sheets code 3. Add Google Sheets env vars",
//       },
//     },
//     endpoints: {
//       POST: "/api/contact",
//     },
//     required_fields: ["name", "email", "message"],
//     optional_fields: ["company"],
//     env_required: {
//       email: ["GMAIL_USER", "GMAIL_PASSWORD"],
//       googleSheets: [
//         "GOOGLE_SHEET_ID",
//         "GOOGLE_SERVICE_ACCOUNT_EMAIL",
//         "GOOGLE_PRIVATE_KEY",
//       ],
//     },
//   });
// }

import { NextResponse } from "next/server";
import { EmailService, type EmailData } from "@/lib/emailService";

export const runtime = "nodejs";

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
  phone?: string;
  subscribe?: string;
  callRequest?: string;
  preferredTime?: string;
  purpose?: string;
}

export async function POST(request: Request) {
  try {
    const formData: ContactFormData = await request.json();
    console.log("Received form data:", formData);

    // Extract data
    const fullName = formData.name?.trim() || "";
    const email = formData.email?.trim() || "";
    const company = formData.company?.trim() || "";
    const message = formData.message?.trim() || "";
    const phone = formData.phone?.trim() || "";
    const subscribe = formData.subscribe === "true";
    const isCallRequest = formData.callRequest === "true";
    const preferredTime = formData.preferredTime || "";
    const purpose = formData.purpose || "";

    // Validate required fields
    if (!fullName || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill in all required fields (Name, Email, Message)",
        },
        { status: 400 },
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid email address",
        },
        { status: 400 },
      );
    }

    // Prepare email data
    const emailData: EmailData = {
      fullName,
      email,
      company,
      message: isCallRequest
        ? `📞 CALL REQUEST\n\nName: ${fullName}\nEmail: ${email}\nPhone: ${phone}\nCompany: ${company || "Not provided"}\nPreferred Time: ${preferredTime || "Any time"}\nPurpose: ${purpose || "General discussion"}\n\nMessage: ${message}`
        : `Name: ${fullName}\nEmail: ${email}\nCompany: ${company || "Not provided"}\nPhone: ${phone || "Not provided"}\nNewsletter Subscription: ${subscribe ? "Yes" : "No"}\n\nMessage: ${message}`,
    };

    // Send email
    const emailResult = await EmailService.send(emailData);

    // Response data
    const responseData = {
      success: emailResult.success,
      message: isCallRequest
        ? emailResult.success
          ? "Call request submitted successfully! I'll get back to you soon."
          : "Failed to submit call request. Please try again."
        : emailResult.success
          ? "Thank you for your message! I will get back to you soon."
          : "Message received but email failed to send. Please try again.",
      details: {
        email: emailResult,
        subscribe,
        callRequest: isCallRequest,
        timestamp: new Date().toISOString(),
      },
    };

    // Add debug info in development
    // if (process.env.NODE_ENV === "development") {
    //   responseData.debug = {
    //     receivedData: formData,
    //   };
    // }

    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error("❌ Error processing contact form:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    const errorResponse = {
      success: false,
      message: "There was an error submitting your message. Please try again.",
      error: process.env.NODE_ENV === "development" ? errorMessage : undefined,
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}
