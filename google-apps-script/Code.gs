const SHEET_NAME = "Expenses";

function doGet() {
  return ContentService.createTextOutput("Daily Expense Tracker API is working.");
}

function doPost(e) {
  try {
    const data = e.parameter || {};
    const reason = String(data.reason || "").trim();
    const amount = Number(data.amount);

    if (!reason || !Number.isFinite(amount) || amount <= 0) {
      throw new Error("Please provide a valid date, reason and amount.");
    }

    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      sheet.appendRow(["Submitted At", "Date", "Reason", "Amount (INR)"]);
      sheet.getRange(1, 1, 1, 4).setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    const now = new Date();
    sheet.appendRow([now, now, reason, amount]);
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: "Expense saved"
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: error.message
    })).setMimeType(ContentService.MimeType.JSON);
  }
}