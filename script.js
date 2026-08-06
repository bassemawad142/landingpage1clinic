
const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbxCwWwyeUXxV504SndLyeMMu18S8Z9CZyz2auFyLiHDnY4hACeXDde4Pq9aBbmnPJJv/exec";

// كود الخصم
const COUPON_CODE = "SF2026";

// رقم واتساب
const WHATSAPP_NUMBER = "966559610942";


// ======================================================
// GET CAMPAIGN DATA
// ======================================================

function getCampaignData() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    return {

        utm_source:
            params.get("utm_source") || "",

        utm_medium:
            params.get("utm_medium") || "",

        utm_campaign:
            params.get("utm_campaign") || "",

        utm_content:
            params.get("utm_content") || "",

        gclid:
            params.get("gclid") || ""

    };

}


// ======================================================
// SEND DATA TO GOOGLE SHEETS
// ======================================================

async function sendLead(data) {

    const formData =
        new URLSearchParams();


    formData.append(
        "name",
        data.name
    );


    formData.append(
        "phone",
        data.phone
    );


    formData.append(
        "service",
        data.service
    );


    formData.append(
        "coupon",
        COUPON_CODE
    );


    formData.append(
        "utm_source",
        data.utm_source || ""
    );


    formData.append(
        "utm_medium",
        data.utm_medium || ""
    );


    formData.append(
        "utm_campaign",
        data.utm_campaign || ""
    );


    formData.append(
        "utm_content",
        data.utm_content || ""
    );


    formData.append(
        "gclid",
        data.gclid || ""
    );


    try {

        await fetch(
            GOOGLE_SCRIPT_URL,
            {

                method: "POST",

                mode: "no-cors",

                headers: {

                    "Content-Type":
                        "application/x-www-form-urlencoded"

                },

                body:
                    formData.toString()

            }
        );


        return true;


    } catch (error) {

        console.error(
            "Google Sheets Error:",
            error
        );

        return false;

    }

}


// ======================================================
// GET HTML ELEMENTS
// ======================================================

const form =
    document.getElementById(
        "leadForm"
    );


const formSection =
    document.getElementById(
        "formSection"
    );


const successSection =
    document.getElementById(
        "successSection"
    );


const copyButton =
    document.getElementById(
        "copyBtn"
    );


const whatsappButton =
    document.getElementById(
        "successWhatsApp"
    );


// ======================================================
// CHECK FORM
// ======================================================

if (form) {

    form.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            // ------------------------------------------
            // GET VALUES
            // ------------------------------------------

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


            const submitButton =
                form.querySelector(
                    "button[type='submit'], button"
                );


            // ------------------------------------------
            // VALIDATE NAME
            // ------------------------------------------

            if (!name) {

                alert(
                    "فضلاً اكتب اسمك"
                );

                return;

            }


            // ------------------------------------------
            // CLEAN PHONE
            // ------------------------------------------

            let cleanPhone =
                phone.replace(
                    /[\s-]/g,
                    ""
                );


            // ------------------------------------------
            // SUPPORT SAUDI PHONE
            // 05XXXXXXXX
            // ------------------------------------------

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


            // ------------------------------------------
            // CHECK SERVICE
            // ------------------------------------------

            if (!service) {

                alert(
                    "فضلاً اختر الخدمة"
                );

                return;

            }


            // ------------------------------------------
            // DISABLE BUTTON
            // ------------------------------------------

            if (submitButton) {

                submitButton.disabled =
                    true;

                submitButton.innerText =
                    "جاري التسجيل...";

            }


            // ------------------------------------------
            // GET CAMPAIGN DATA
            // ------------------------------------------

            const campaignData =
                getCampaignData();


            // ------------------------------------------
            // CREATE LEAD
            // ------------------------------------------

            const leadData = {

                name:
                    name,

                phone:
                    cleanPhone,

                service:
                    service,

                coupon:
                    COUPON_CODE,

                utm_source:
                    campaignData.utm_source,

                utm_medium:
                    campaignData.utm_medium,

                utm_campaign:
                    campaignData.utm_campaign,

                utm_content:
                    campaignData.utm_content,

                gclid:
                    campaignData.gclid

            };


            // ------------------------------------------
            // SEND TO GOOGLE SHEETS
            // ------------------------------------------

            await sendLead(
                leadData
            );


            // ------------------------------------------
            // SAVE DATA LOCALLY
            // ------------------------------------------

            try {

                localStorage.setItem(
                    "pureSkinLead",
                    JSON.stringify(
                        leadData
                    )
                );

            } catch (error) {

                console.log(
                    "LocalStorage unavailable"
                );

            }


            // ------------------------------------------
            // HIDE FORM
            // ------------------------------------------

            if (formSection) {

                formSection.classList.add(
                    "hidden"
                );

            }


            // ------------------------------------------
            // SHOW SUCCESS
            // ------------------------------------------

            if (successSection) {

                successSection.classList.remove(
                    "hidden"
                );

            }


            // ------------------------------------------
            // UPDATE COUPON
            // ------------------------------------------

            const couponElement =
                document.querySelector(
                    ".coupon"
                );


            if (couponElement) {

                couponElement.innerText =
                    COUPON_CODE;

            }


            // ------------------------------------------
            // WHATSAPP MESSAGE
            // ------------------------------------------

            if (whatsappButton) {

                const message =
                    `السلام عليكم، سجلت في عرض Pure Skin وحصلت على كود الخصم ${COUPON_CODE} وأرغب في الحجز.`;

                whatsappButton.href =
                    "https://wa.me/" +
                    WHATSAPP_NUMBER +
                    "?text=" +
                    encodeURIComponent(
                        message
                    );

            }

        }
    );

}


// ======================================================
// COPY COUPON
// ======================================================

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


// ======================================================
// SET WHATSAPP BUTTON
// ======================================================

if (whatsappButton) {

    const message =
        `السلام عليكم، أرغب في الاستفادة من عرض Pure Skin وكود الخصم ${COUPON_CODE}.`;

    whatsappButton.href =
        "https://wa.me/" +
        WHATSAPP_NUMBER +
        "?text=" +
        encodeURIComponent(
            message
        );

}
