// FeedbackHub — JJTech / Apex IT
document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("feedbackInput");
    const btn = document.getElementById("addBtn");
    const list = document.getElementById("feedbackList");
    const themeToggle = document.getElementById("themeToggle");

    let feedbacks = JSON.parse(localStorage.getItem("jjtech_feedbacks")) || [];

    const save = () => localStorage.setItem("jjtech_feedbacks", JSON.stringify(feedbacks));

    const render = () => {
        list.innerHTML = "";
        if (feedbacks.length === 0) {
            const p = document.createElement("div");
            p.style.opacity = "0.9";
            p.style.padding = "10px";
            p.style.borderRadius = "8px";
            p.style.background = "rgba(255,255,255,0.06)";
            p.textContent = "No feedback yet — be the first!";
            list.appendChild(p);
            return;
        }
        feedbacks.slice().reverse().forEach((item, idx) => {
            const div = document.createElement("div");
            div.innerHTML = `
                <div class="msg-text">${escapeHtml(item.text)}</div>
                <button class="like-btn" aria-label="Like">👍 ${item.likes}</button>
            `;
            const arrIndex = feedbacks.length - 1 - idx;
            div.querySelector(".like-btn").onclick = () => {
                feedbacks[arrIndex].likes++;
                save();
                render();
            };
            list.appendChild(div);
        });
    };

    btn.onclick = () => {
        const val = input.value.trim();
        if (val === "") return;
        feedbacks.push({ text: val, likes: 0, created: new Date().toISOString() });
        input.value = "";
        save();
        render();
    };

    themeToggle.onclick = () => {
        document.body.classList.toggle("dark");
        themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
    };

    // Basic XSS escape
    function escapeHtml(unsafe) {
        return unsafe.replace(/[&<"'>]/g, function(m) {
            return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m];
        });
    }

    render();
});
