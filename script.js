const GOOGLE_SCRIPT_URL="PASTE_YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";
const COUPON_CODE="PSO2026";
const WHATSAPP_NUMBER="966559610942";

function campaign(){const p=new URLSearchParams(location.search);return{utm_source:p.get("utm_source")||"",utm_medium:p.get("utm_medium")||"",utm_campaign:p.get("utm_campaign")||"",utm_content:p.get("utm_content")||"",gclid:p.get("gclid")||""}}
async function sendLead(data){if(!GOOGLE_SCRIPT_URL||GOOGLE_SCRIPT_URL.includes("PASTE_YOUR"))return;try{await fetch(GOOGLE_SCRIPT_URL,{method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify(data)})}catch(e){console.error(e)}}

const form=document.getElementById("leadForm"),btn=document.getElementById("submitBtn"),msg=document.getElementById("formMessage");
form.addEventListener("submit",async e=>{e.preventDefault();msg.textContent="";
const name=document.getElementById("name").value.trim(),phone=document.getElementById("phone").value.trim(),service=document.getElementById("service").value;
if(!name){msg.textContent="فضلاً اكتب الاسم.";return} if(!/^05\d{8}$/.test(phone.replace(/\s/g,""))){msg.textContent="فضلاً أدخل رقم جوال سعودي صحيح مثل 05xxxxxxxx.";return} if(!service){msg.textContent="فضلاً اختر الخدمة.";return}
btn.disabled=true;btn.textContent="جاري التسجيل...";
const lead={name,phone,service,coupon:COUPON_CODE,created_at:new Date().toISOString(),...campaign()};
await sendLead(lead);localStorage.setItem("pureSkinLead",JSON.stringify(lead));
document.getElementById("formSection").classList.add("hidden");document.getElementById("successSection").classList.remove("hidden");
document.getElementById("successWhatsApp").href="https://wa.me/"+WHATSAPP_NUMBER+"?text="+encodeURIComponent("السلام عليكم، سجلت في العرض وحصلت على كود الخصم PSO2026 وأرغب في الحجز.")});
document.getElementById("copyBtn").addEventListener("click",async()=>{try{await navigator.clipboard.writeText(COUPON_CODE);document.getElementById("copyBtn").textContent="تم نسخ الكود ✓";setTimeout(()=>document.getElementById("copyBtn").textContent="نسخ الكود",2000)}catch{alert(COUPON_CODE)}});