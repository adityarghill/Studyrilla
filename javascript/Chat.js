// =============================
// ELEMENTS
// =============================
const addBtn = document.getElementById('addBtn');
const addModal = document.getElementById('addModal');
const closeModal = document.getElementById('closeModal');
const createBtn = document.getElementById('createBtn');

const contactUsername = document.getElementById('contactUsername');
const contactEmail = document.getElementById('contactEmail');
const chatType = document.getElementById('chatType');

const toast = document.getElementById('toast');
const searchInput = document.getElementById('searchInput');

// =============================
// MODAL OPEN/CLOSE
// =============================
addBtn.addEventListener('click', () => {
    addModal.classList.add('show');
});

closeModal.addEventListener('click', () => {
    addModal.classList.remove('show');
});

addModal.addEventListener('click', (e) => {
    if (e.target === addModal) {
        addModal.classList.remove('show');
    }
});

// ESC to close modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && addModal.classList.contains('show')) {
        addModal.classList.remove('show');
    }
});

// =============================
// ADD CONTACT
// =============================
createBtn.addEventListener('click', () => {
    const username = contactUsername.value.trim();
    const email = contactEmail.value.trim();
    const type = chatType.value;

    if (!username) {
        showToast('Please enter a username');
        return;
    }
    if (!email) {
        showToast('Please enter an email');
        return;
    }

    const list =
        type === 'private' ?
        document.getElementById('privateList') :
        document.getElementById('groupList');

    const count =
        type === 'private' ?
        document.getElementById('privateCount') :
        document.getElementById('groupCount');

    const item = document.createElement('a');
    item.href = "#"; // JS will override this click
    item.className = 'chat-item';
    item.setAttribute('data-type', type);

    item.innerHTML = `
        <div class="avatar">
            <img src="https://i.pravatar.cc/150?u=${Date.now()}" alt="${escapeHtml(username)}">
            ${type === 'private' ? '<span class="status"></span>' : ''}
        </div>
        <div class="chat-body">
            <div class="chat-row">
                <div class="title">${escapeHtml(username)}</div>
                <div class="time">Now</div>
            </div>
            <div class="chat-preview">${escapeHtml(email)}</div>
        </div>
    `;

    list.prepend(item);
    count.textContent = parseInt(count.textContent) + 1;

    addModal.classList.remove('show');
    contactUsername.value = '';
    contactEmail.value = '';
    showToast(`Contact ${username} added!`);
});

// =============================
// SEARCH CHAT
// =============================
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const allItems = document.querySelectorAll('.chat-item');

    allItems.forEach(item => {
        const title = item.querySelector('.title').textContent.toLowerCase();
        const preview = item.querySelector('.chat-preview').textContent.toLowerCase();

        item.style.display =
            title.includes(query) || preview.includes(query) ?
            'flex' :
            'none';
    });
});

// =============================
// SHOW TOAST
// =============================
function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// =============================
// OPEN CHAT DETAIL ON CLICK
// =============================
document.addEventListener("click", (e) => {
    const item = e.target.closest(".chat-item");
    if (!item) return;

    // Redirect to chat detail page
    window.location.href = "../../Pages/ChatPage/ChatDetail.html";
});

// =============================
// LOAD BOTTOM NAV
// =============================
fetch("../../Navbar/BottomNav.html")
    .then(res => res.text())
    .then(data => {
        document.getElementById("nav-placeholder").innerHTML = data;

        const current = location.pathname.split("/").pop();
        document.querySelectorAll(".nav-item").forEach(item => {
            if (item.getAttribute("href") === current) {
                item.classList.add("active");
            }
        });
    });

document.addEventListener('DOMContentLoaded', () => {
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            const page = document.querySelector('.page');
            if (page) page.classList.add('is-loaded');
        });
    });
});