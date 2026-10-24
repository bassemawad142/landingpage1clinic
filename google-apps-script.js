
function doPost(e) {
  try {
    const sheet = SpreadsheetApp
      .getActiveSpreadsheet()
      .getSheetByName("Sheet1");

    if (!sheet) {
      throw new Error('لم يتم العثور على Sheet1');
    }

    let d = {};

    if (e.postData && e.postData.contents) {
      const content = e.postData.contents;

      try {
        d = JSON.parse(content);
      } catch (error) {
        const params = new URLSearchParams(content);
        d = Object.fromEntries(params.entries());
      }
    }

    sheet.appendRow([
      new Date(),
      d.name || "",
      d.phone || "",
      d.service || "",
      d.coupon || "PSO2026",
      d.utm_source || "",
      d.utm_medium || "",
      d.utm_campaign || "",
      d.utm_content || "",
      d.gclid || ""
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
