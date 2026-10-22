const GOOGLE_SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbzgm9aPioB6cf9W9vztGziEP_5pm3_zLIVB6R1ubkM2qgVYvHHdWLUxmd3qTdPP3H5R/exec";

const COUPON_CODE = "SF2026";

const WHATSAPP_NUMBER = "966559610942";

const PHONE_NUMBER = "920017285";

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("leadForm");

    const formSection =
        document.getElementById("formSection");

    const successSection =
        document.getElementById("successSection");

    const copyButton =
        document.getElementById("copyBtn");

    const whatsappButton =
        document.getElementById("successWhatsApp");


    // التأكد من وجود النموذج

    if (!form) {

        console.error(
            "لم يتم العثور على نموذج التسجيل"
        );

        return;
    }


    // =========================================
    // تسجيل العميل
    // =========================================

    form.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            // قراءة البيانات

            const name =
                document
                    .getElementById("name")
                    .value
                    .trim();


            const phone =
                document
                    .getElementById("phone")
                    .value
                    .trim();


            const service =
                document
                    .getElementById("service")
                    .value;


            const button =
                form.querySelector(
                    "button[type='submit']"
                );


            // =====================================
            // التحقق من الاسم
            // =====================================

            if (!name) {

                alert(
                    "فضلاً اكتب اسمك"
                );

                return;
            }


            // =====================================
            // تنظيف رقم الجوال
            // =====================================

            const cleanPhone =
                phone
                    .replace(/\s/g, "")
                    .replace(/-/g, "");


            // =====================================
            // التحقق من رقم الجوال السعودي
            // =====================================

            if (
                !/^05\d{8}$/.test(
                    cleanPhone
                )
            ) {

                alert(
                    "فضلاً أدخل رقم جوال سعودي صحيح مثل 0551234567"
                );

                return;
            }


            // =====================================
            // التحقق من الخدمة
            // =====================================

            if (!service) {

                alert(
                    "فضلاً اختر الخدمة"
                );

                return;
            }


            // =====================================
            // تغيير حالة الزر
            // =====================================

            button.disabled = true;

            button.innerText =
                "جاري التسجيل...";


            // =====================================
            // تجهيز البيانات
            // =====================================

            const data =
                new URLSearchParams();


            data.append(
                "name",
                name
            );


            data.append(
                "phone",
                cleanPhone
            );


            data.append(
                "service",
                service
            );


            data.append(
                "coupon",
                COUPON_CODE
            );


            // =====================================
            // إرسال البيانات إلى Google Apps Script
            // =====================================

            try {

                await fetch(
                    GOOGLE_SCRIPT_URL,
                    {
                        method: "POST",

                        mode: "no-cors",

                        headers: {
                            "Content-Type":
                                "application/x-www-form-urlencoded;charset=UTF-8"
                        },

                        body:
                            data.toString()
                    }
                );


                // =================================
                // إخفاء النموذج
                // =================================

                formSection.classList.add(
                    "hidden"
                );


                // =================================
                // إظهار رسالة النجاح
                // =================================

                successSection.classList.remove(
                    "hidden"
                );


                // =================================
                // عرض الكود
                // =================================

                const coupon =
                    document.querySelector(
                        ".coupon"
                    );


                if (coupon) {

                    coupon.textContent =
                        COUPON_CODE;
                }


                // =================================
                // تجهيز واتساب
                // =================================

                const message =
                    "السلام عليكم، سجلت في عرض Pure Skin وحصلت على كود الخصم " +
                    COUPON_CODE +
                    " وأرغب في الحجز.";


                whatsappButton.href =
                    "https://wa.me/" +
                    WHATSAPP_NUMBER +
                    "?text=" +
                    encodeURIComponent(
                        message
                    );


            } catch (error) {

                console.error(
                    "Registration Error:",
                    error
                );


                alert(
                    "حدث خطأ أثناء التسجيل، حاول مرة أخرى."
                );


                button.disabled =
                    false;


                button.innerText =
                    "احصل على كود الخصم";
            }

        }
    );


    // =========================================
    // نسخ كود الخصم
    // =========================================

    if (copyButton) {

        copyButton.addEventListener(
            "click",
            async function () {

                try {

                    await navigator
                        .clipboard
                        .writeText(
                            COUPON_CODE
                        );


                    copyButton.innerText =
                        "تم نسخ الكود ✓";


                    setTimeout(
                        function () {

                            copyButton.innerText =
                                "نسخ الكود";

                        },
                        2000
                    );


                } catch (error) {

                    alert(
                        "كود الخصم: " +
                        COUPON_CODE
                    );

                }

            }
        );

    }


    // =========================================
    // رابط واتساب
    // =========================================

    if (whatsappButton) {

        const message =
            "السلام عليكم، أرغب في الاستفادة من عرض Pure Skin وكود الخصم " +
            COUPON_CODE;


        whatsappButton.href =
            "https://wa.me/" +
            WHATSAPP_NUMBER +
            "?text=" +
            encodeURIComponent(
                message
            );

    }

    
/* ===== Pure Skin Image Carousel ===== */

.gallery-carousel {
    width: 100%;
    position: relative;
    overflow: hidden;
    background: #f7f2ed;
    direction: ltr;
}

.gallery-track {
    display: flex;
    width: 300%;
    animation: pureSkinCarousel 15s infinite ease-in-out;
}

.gallery-track img {
    display: block;
    flex: 0 0 33.333333%;
    width: 33.333333%;
    height: 480px;
    object-fit: cover;
    object-position: center;
}

/* حركة الانتقال بين الصور */
@keyframes pureSkinCarousel {
    0%, 28% {
        transform: translateX(0);
    }

    33%, 61% {
        transform: translateX(-33.333333%);
    }

    66%, 94% {
        transform: translateX(-66.666667%);
    }

    100% {
        transform: translateX(0);
    }
}

/* تنسيق قسم الحجز أسفل الصور */
.booking-section {
    padding: 55px 20px;
    background: #fff;
}

.booking-section .hero-form {
    width: 100%;
    max-width: 650px;
    margin: 0 auto;
}

/* الشاشات الصغيرة */
@media (max-width: 768px) {
    .gallery-track img {
        height: 260px;
    }

    .booking-section {
        padding: 30px 15px;
    }
}

@media (prefers-reduced-motion: reduce) {
    .gallery-track {
        animation: none;
    }
}


});
