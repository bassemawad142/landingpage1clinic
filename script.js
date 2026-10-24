
const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbzgm9aPioB6cf9W9vztGziEP_5pm3_zLIVB6R1ubkM2qgVYvHHdWLUxmd3qTdPP3H5R/exec";

document.addEventListener("DOMContentLoaded", function () {
    // عناصر نموذج التسجيل
    const form = document.getElementById("leadForm");
    const formSection = document.getElementById("formSection");
    const successSection = document.getElementById("successSection");

    if (!form || !formSection || !successSection) {
        console.error("لم يتم العثور على عناصر نموذج التسجيل");
        return;
    }

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const service = document.getElementById("service").value;
        const button = form.querySelector('button[type="submit"]');

        // التحقق من البيانات
        if (!name) {
            alert("فضلاً اكتب اسمك");
            return;
        }

        const cleanPhone = phone.replace(/[\s-]/g, "");

        if (!/^05\d{8}$/.test(cleanPhone)) {
            alert("فضلاً أدخل رقم جوال سعودي صحيح مثل 0551234567");
            return;
        }

        if (!service) {
            alert("فضلاً اختر الخدمة");
            return;
        }

        // إظهار حالة التسجيل
        button.disabled = true;
        button.innerText = "جاري تسجيل بياناتك...";

        // تجهيز البيانات بدون كود خصم
        const data = new URLSearchParams();
        data.append("name", name);
        data.append("phone", cleanPhone);
        data.append("service", service);

        try {
            await fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded;charset=UTF-8"
                },
                body: data.toString()
            });

            // إظهار رسالة النجاح
            formSection.classList.add("hidden");
            successSection.classList.remove("hidden");

        } catch (error) {
            console.error("Registration Error:", error);

            alert("تعذر إرسال بياناتك. تحقق من اتصال الإنترنت وحاول مرة أخرى.");

            button.disabled = false;
            button.innerText = "سجّل بياناتك الآن";
        }
    });

    // معرض الصور والأسهم
    const track = document.querySelector(".gallery-track");
    const images = document.querySelectorAll(".gallery-track img");
    const prevButton = document.querySelector(".gallery-prev");
    const nextButton = document.querySelector(".gallery-next");

    if (track && images.length > 0 && prevButton && nextButton) {
        let currentIndex = 0;

        function showImage(index) {
            currentIndex = (index + images.length) % images.length;
            track.style.transform =
                `translateX(-${currentIndex * 100}%)`;
        }

        nextButton.addEventListener("click", function () {
            showImage(currentIndex + 1);
        });

        prevButton.addEventListener("click", function () {
            showImage(currentIndex - 1);
        });
    }
});
