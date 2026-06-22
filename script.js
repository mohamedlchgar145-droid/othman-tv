document.addEventListener("DOMContentLoaded", () => {
    const sendBtn = document.getElementById("send-btn");
    const chatInput = document.getElementById("chat-input");
    const chatMessages = document.getElementById("chat-messages");

    // دالة لإضافة رسالة جديدة إلى الشات
    function sendMessage() {
        const messageText = chatInput.value.trim();
        
        if (messageText !== "") {
            // إنشاء عنصر الرسالة
            const messageDiv = document.createElement("div");
            messageDiv.classList.add("message");
            
            // إضافة النص واسم مستخدم افتراضي
            messageDiv.innerHTML = `<strong>أنا:</strong> ${messageText}`;
            
            // إضافة الرسالة إلى صندوق المحادثة
            chatMessages.appendChild(messageDiv);
            
            // تفريغ حقل الإدخال
            chatInput.value = "";
            
            // النزول التلقائي لأسفل الدردشة لرؤية الرسالة الجديدة
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    // تشغيل الدالة عند الضغط على زر الإرسال
    sendBtn.addEventListener("click", sendMessage);

    // تشغيل الدالة عند الضغط على زر Enter في لوحة المفاتيح
    chatInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    });
});
