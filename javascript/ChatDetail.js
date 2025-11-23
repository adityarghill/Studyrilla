        // DOM Elements
        const chatBody = document.getElementById("chatBody");
        const sendBtn = document.getElementById("sendBtn");
        const msgInput = document.getElementById("msgInput");
        const menuBtn = document.getElementById("menuBtn");
        const menuDropdown = document.getElementById("menuDropdown");
        const backBtn = document.getElementById("backBtn");
        const searchBtn = document.getElementById("searchBtn");
        const typingIndicator = document.getElementById("typingIndicator");
        const clearModal = document.getElementById("clearModal");
        const gifModal = document.getElementById("gifModal");
        const gifBtn = document.getElementById("gifBtn");
        const gifClose = document.getElementById("gifClose");
        const gifGrid = document.getElementById("gifGrid");
        const gifSearchInput = document.getElementById("gifSearchInput");

        // Trending GIFs (sample URLs)
        const trendingGifs = [
            "https://media.giphy.com/media/3oz8xAFtqoOUUrsh7W/giphy.gif",
            "https://media.giphy.com/media/26u4cqiYI30juCOGY/giphy.gif",
            "https://media.giphy.com/media/l0HlPystfePnAI3G8/giphy.gif",
            "https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif",
            "https://media.giphy.com/media/26tPnAAJxXTvpLwJy/giphy.gif",
            "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif",
            "https://media.giphy.com/media/3ohzdIuqJoo8QdKlnW/giphy.gif",
            "https://media.giphy.com/media/26u4lOMA8JKSnL9Uk/giphy.gif",
            "https://media.giphy.com/media/l0HlvtIPzPdt2usKs/giphy.gif",
            "https://media.giphy.com/media/26tPplGWjN0xLybiU/giphy.gif",
            "https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif",
            "https://media.giphy.com/media/26ufcVAp3HJacPC36/giphy.gif"
        ];

        // Load GIFs into grid
        function loadGifs(gifs) {
            gifGrid.innerHTML = '';
            gifs.forEach(gifUrl => {
                const gifItem = document.createElement('div');
                gifItem.className = 'gif-item';
                gifItem.innerHTML = `<img src="${gifUrl}" alt="GIF">`;
                gifItem.addEventListener('click', () => sendGif(gifUrl));
                gifGrid.appendChild(gifItem);
            });
        }

        // Send GIF
        function sendGif(gifUrl) {
            const wrapper = document.createElement("div");
            wrapper.className = "message-wrapper right";
            wrapper.innerHTML = `
        <div class="bubble right">
            <img src="${gifUrl}" alt="GIF">
            <span class="time">${getCurrentTime()}</span>
        </div>
    `;

            chatBody.insertBefore(wrapper, typingIndicator);
            scrollBottom();
            gifModal.classList.remove("active");

            // Simulate reply
            typingIndicator.classList.add("active");
            scrollBottom();

            setTimeout(() => {
                typingIndicator.classList.remove("active");

                const replyWrapper = document.createElement("div");
                replyWrapper.className = "message-wrapper left";
                replyWrapper.innerHTML = `
            <div class="bubble left">
                Haha nice! 😄
                <span class="time">${getCurrentTime()}</span>
            </div>
        `;

                chatBody.insertBefore(replyWrapper, typingIndicator);
                scrollBottom();
            }, 1800);
        }

        // Open GIF Modal
        gifBtn.addEventListener("click", () => {
            gifModal.classList.add("active");
            loadGifs(trendingGifs);
            gifSearchInput.value = '';
        });

        // Close GIF Modal
        gifClose.addEventListener("click", () => {
            gifModal.classList.remove("active");
        });

        // GIF Search (simple filter)
        gifSearchInput.addEventListener("input", (e) => {
            const query = e.target.value.toLowerCase();
            if (query === '') {
                loadGifs(trendingGifs);
            } else {
                // In a real app, this would search Giphy API
                // For now, just show all GIFs
                loadGifs(trendingGifs);
            }
        });

        // Auto Scroll
        function scrollBottom() {
            chatBody.scrollTop = chatBody.scrollHeight;
        }
        scrollBottom();

        // Enable/Disable Send Button
        msgInput.addEventListener("input", () => {
            sendBtn.disabled = !msgInput.value.trim();
        });

        // Send Message
        function sendMessage() {
            const msg = msgInput.value.trim();
            if (!msg) return;

            const wrapper = document.createElement("div");
            wrapper.className = "message-wrapper right";
            wrapper.innerHTML = `
        <div class="bubble right">
            ${escapeHtml(msg)}
            <span class="time">${getCurrentTime()}</span>
        </div>
    `;

            chatBody.insertBefore(wrapper, typingIndicator);
            msgInput.value = "";
            sendBtn.disabled = true;
            scrollBottom();

            // Show typing indicator
            typingIndicator.classList.add("active");
            scrollBottom();

            // Simulate reply
            setTimeout(() => {
                typingIndicator.classList.remove("active");

                const replyWrapper = document.createElement("div");
                replyWrapper.className = "message-wrapper left";
                replyWrapper.innerHTML = `
            <div class="bubble left">
                Got it! 👍
                <span class="time">${getCurrentTime()}</span>
            </div>
        `;

                chatBody.insertBefore(replyWrapper, typingIndicator);
                scrollBottom();
            }, 1500);
        }

        sendBtn.addEventListener("click", sendMessage);

        msgInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter" && !sendBtn.disabled) {
                sendMessage();
            }
        });

        // Menu Toggle
        menuBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            menuDropdown.classList.toggle("active");
        });

        // Close menu when clicking outside
        document.addEventListener("click", (e) => {
            if (!menuDropdown.contains(e.target) && e.target !== menuBtn) {
                menuDropdown.classList.remove("active");
            }
        });

        // Clear Chat
        document.getElementById("clearChat").addEventListener("click", () => {
            menuDropdown.classList.remove("active");
            clearModal.classList.add("active");
        });

        document.getElementById("cancelClear").addEventListener("click", () => {
            clearModal.classList.remove("active");
        });

        document.getElementById("confirmClear").addEventListener("click", () => {
            // Remove all message wrappers
            const messages = chatBody.querySelectorAll(".message-wrapper");
            messages.forEach(msg => msg.remove());

            const divider = chatBody.querySelector(".date-divider");
            if (divider) divider.remove();

            clearModal.classList.remove("active");
        });

        // Change Wallpaper
        document.getElementById("changeWallpaper").addEventListener("click", () => {
            document.getElementById("wallpaperInput").click();
            menuDropdown.classList.remove("active");
        });

        document.getElementById("wallpaperInput").addEventListener("change", function() {
            const file = this.files[0];
            if (!file) return;

            const url = URL.createObjectURL(file);
            chatBody.style.backgroundImage = `url(${url})`;
            chatBody.style.backgroundSize = "cover";
            chatBody.style.backgroundPosition = "center";
        });

        // Photo Attachment
        document.getElementById("photoBtn").addEventListener("click", () => {
            document.getElementById("photoInput").click();
        });

        document.getElementById("photoInput").addEventListener("change", function() {
            const file = this.files[0];
            if (!file) return;

            const url = URL.createObjectURL(file);

            const wrapper = document.createElement("div");
            wrapper.className = "message-wrapper right";
            wrapper.innerHTML = `
        <div class="bubble right">
            <img src="${url}" style="max-width: 100%; border-radius: 8px; display: block;">
            <span class="time">${getCurrentTime()}</span>
        </div>
    `;

            chatBody.insertBefore(wrapper, typingIndicator);
            scrollBottom();
        });

        // Voice Message (Placeholder)
        document.getElementById("voiceBtn").addEventListener("click", () => {
            alert("Voice recording feature coming soon!");
        });

        // Export Chat
        document.getElementById("exportChat").addEventListener("click", () => {
            const messages = chatBody.querySelectorAll(".bubble");
            let chatText = "Chat Export\n==========\n\n";

            messages.forEach(bubble => {
                const text = bubble.textContent.trim();
                const side = bubble.classList.contains("left") ? "Isabelle" : "You";
                chatText += `${side}: ${text}\n\n`;
            });

            const blob = new Blob([chatText], {
                type: "text/plain"
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "chat-export.txt";
            a.click();

            menuDropdown.classList.remove("active");
        });

        backBtn.addEventListener("click", () => {
            document.body.classList.add("slide-out-right");

            setTimeout(() => {
                window.location.href = "../ChatPage/ChatPage.html";
            }, 300);
        });


        // Search Button (Placeholder)
        searchBtn.addEventListener("click", () => {
            alert("Search feature coming soon!");
        });

        // Utility Functions
        function getCurrentTime() {
            const now = new Date();
            let hours = now.getHours();
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12 || 12;
            return `${hours}:${minutes} ${ampm}`;
        }

        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }