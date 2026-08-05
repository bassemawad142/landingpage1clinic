function doPost(e){
try{
const sheet=SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
const d=JSON.parse(e.postData.contents);
sheet.appendRow([new Date(),d.name||"",d.phone||"",d.service||"",d.coupon||"PSO2026",d.utm_source||"",d.utm_medium||"",d.utm_campaign||"",d.utm_content||"",d.gclid||""]);
return ContentService.createTextOutput(JSON.stringify({success:true})).setMimeType(ContentService.MimeType.JSON);
}catch(error){return ContentService.createTextOutput(JSON.stringify({success:false,error:error.toString()})).setMimeType(ContentService.MimeType.JSON)}
}