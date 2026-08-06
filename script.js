const GOOGLE_SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbxCwWwyeUXxV504SndLyeMMu18S8Z9CZyz2auFyLiHDnY4hACeXDde4Pq9aBbmnPJJv/exec";

const COUPON_CODE = "SF2026";
const WHATSAPP_NUMBER = "966559610942";


document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("leadForm");
    const formSection = document.getElementById("formSection");
    const successSection = document.getElementById("successSection");
    const copyButton = document.getElementById("copyBtn");
    const whatsappButton = document.getElementById("successWhatsApp");


    if (!form) {
        console.error("لم يتم العثور على leadForm");
        return;
    }


    form.addEventListener("submit", async function (event) {

        event.preventDefault();


        const name =
            document.getElementById("name").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const service =
            document.getElementById("service").value;


        // التحقق من الاسم
        if (!name) {
            alert("فضلاً اكتب اسمك");
            return;
        }


        // تنظيف رقم الجوال
        let cleanPhone = phone
            .replace(/\s/g, "")
            .replace(/-/g, "");


        // التحقق من رقم الجوال السعودي
        if (!/^05\d{8}$/.test(cleanPhone)) {

            alert(
                "فضلاً أدخل رقم جوال سعودي صحيح مثل 0551234567"
            );

            return;
        }


        // التحقق من الخدمة
        if (!service) {

            alert("فضلاً اختر الخدمة");

            return;
        }


        // زر التسجيل
        const button =
            form.querySelector("button[type='submit']");

        button.disabled = true;
        button.innerText = "جاري التسجيل...";


        // بيانات العميل
        const data = new URLSearchParams();

        data.append("name", name);
        data.append("phone", cleanPhone);
        data.append("service", service);
        data.append("coupon", COUPON_CODE);


        // إرسال البيانات إلى Google Apps Script
        try {

            await fetch(
                GOOGLE_SCRIPT_URL,
                {
                    method: "POST",
                    mode: "no-cors",
                    body: data
                }
            );


            // إخفاء التسجيل
            formSection.classList.add("hidden");


            // إظهار النجاح
            successSection.classList.remove("hidden");


            // كود الخصم
            document.querySelector(".coupon").textContent =
                COUPON_CODE;


            // إعداد واتساب
            const message =
                "السلام عليكم، سجلت في عرض Pure Skin وحصلت على كود الخصم " +
                COUPON_CODE +
                " وأرغب في الحجز.";

            whatsappButton.href =
                "https://wa.me/" +
                WHATSAPP_NUMBER +
                "?text=" +
                encodeURIComponent(message);


        } catch (error) {

            console.error(error);

            alert(
                "حدث خطأ أثناء التسجيل. حاول مرة أخرى."
            );

            button.disabled = false;
            button.innerText = "احصل على كود الخصم";

        }

    });


    // نسخ الكود
    if (copyButton) {

        copyButton.addEventListener("click", async function () {

            try {

                await navigator.clipboard.writeText(
                    COUPON_CODE
                );

                copyButton.innerText =
                    "تم نسخ الكود ✓";

                setTimeout(function () {

                    copyButton.innerText =
                        "نسخ الكود";

                }, 2000);

            } catch (error) {

                alert(
                    "كود الخصم: " +
                    COUPON_CODE
                );

            }

        });

    }


});
}          message
        );

}
