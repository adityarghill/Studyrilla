        /* Initial Data */
        const initialNotifs = [{
            id: 1,
            text: "New message from Arya",
            time: "1 hour ago"
        }, {
            id: 2,
            text: "Diamond purchase available",
            time: "Yesterday"
        }, {
            id: 3,
            text: "New course: Algebra Basics",
            time: "3 days ago"
        }];

        let notifs = [...initialNotifs];
        let diamondCount = 128;
        let currentPromo = 0;

        /* DOM Elements */
        const notifBtn = document.getElementById('notifBtn');
        const notifModal = document.getElementById('notifModal');
        const notifList = document.getElementById('notifList');
        const closeModal = document.getElementById('closeModal');
        const doneModal = document.getElementById('doneModal');
        const deleteAllBtn = document.getElementById('deleteAll');
        const notifBadge = document.getElementById('notifBadge');

        const diamondBtn = document.getElementById('diamondBtn');
        const diamondModal = document.getElementById('diamondModal');
        const closeDiamondModal = document.getElementById('closeDiamondModal');

        const leaderboardModal = document.getElementById('leaderboardModal');
        const modulesModal = document.getElementById('modulesModal');
        const assignmentsModal = document.getElementById('assignmentsModal');
        const contactsModal = document.getElementById('contactsModal');
        const viewAllContactsBtn = document.getElementById('viewAllContactsBtn');

        const promoTrack = document.getElementById('promoTrack');
        const promoDots = document.getElementById('promoDots');

        /* Notification Functions */
        function renderNotifs() {
            notifList.innerHTML = '';

            if (notifs.length === 0) {
                notifList.innerHTML = '<div class="empty">No notifications</div>';
                notifBadge.style.display = 'none';
                return;
            }

            notifBadge.textContent = notifs.length;
            notifBadge.style.display = 'flex';

            notifs.forEach(n => {
                const item = document.createElement('div');
                item.className = 'notif-item';
                item.innerHTML = `
      <div class="content">
        <div class="text">${escapeHtml(n.text)}</div>
        <div class="time">${escapeHtml(n.time)}</div>
      </div>
      <button class="delete" data-id="${n.id}">×</button>
    `;
                notifList.appendChild(item);
            });

            notifList.querySelectorAll('.delete').forEach(btn => {
                btn.addEventListener('click', () => {
                    const id = Number(btn.dataset.id);
                    notifs = notifs.filter(x => x.id !== id);
                    renderNotifs();
                });
            });
        }

        function openModal(modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }

        function closeModalFn(modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }

        /* Promo Slider */
        function initPromoSlider() {
            const cards = promoTrack.querySelectorAll('.promo-card');

            cards.forEach((_, i) => {
                const dot = document.createElement('div');
                dot.className = 'promo-dot';
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => showPromo(i));
                promoDots.appendChild(dot);
            });

            // Auto-advance
            setInterval(() => {
                currentPromo = (currentPromo + 1) % cards.length;
                showPromo(currentPromo);
            }, 4000);
        }

        function showPromo(index) {
            currentPromo = index;
            const cards = promoTrack.querySelectorAll('.promo-card');
            const dots = promoDots.querySelectorAll('.promo-dot');

            const scrollLeft = cards[index].offsetLeft - 20;
            promoTrack.scrollTo({
                left: scrollLeft,
                behavior: 'smooth'
            });

            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }

        /* Event Listeners */
        notifBtn.addEventListener('click', () => {
            openModal(notifModal);
            renderNotifs();
        });

        closeModal.addEventListener('click', () => closeModalFn(notifModal));
        doneModal.addEventListener('click', () => closeModalFn(notifModal));

        deleteAllBtn.addEventListener('click', () => {
            if (confirm('Clear all notifications?')) {
                notifs = [];
                renderNotifs();
            }
        });

        diamondBtn.addEventListener('click', () => openModal(diamondModal));
        closeDiamondModal.addEventListener('click', () => closeModalFn(diamondModal));

        /* View All Contacts */
        viewAllContactsBtn.addEventListener('click', () => openModal(contactsModal));

        /* Diamond Purchase */
        document.querySelectorAll('.diamond-option').forEach(option => {
            option.addEventListener('click', () => {
                const amount = Number(option.dataset.amount);
                const price = option.dataset.price;

                if (confirm(`Purchase ${amount} diamonds for ${price}?`)) {
                    diamondCount += amount;
                    document.getElementById('diamondCount').textContent = diamondCount;

                    notifs.unshift({
                        id: Date.now(),
                        text: `Successfully purchased ${amount} diamonds`,
                        time: 'Just now'
                    });

                    closeModalFn(diamondModal);
                    renderNotifs();
                }
            });
        });

        /* Activity Items */
        document.querySelectorAll('.activity-item').forEach(item => {
            item.addEventListener('click', () => {
                const title = item.querySelector('.title').textContent;
                alert(`Opening: ${title}`);
            });
        });

        /* Contacts */

        /* Contact Detail Message Buttons */
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('action-btn') && e.target.textContent === 'Message') {
                const contactName = e.target.closest('.contact-detail').querySelector('.name').textContent;
                alert(`Starting chat with ${contactName}...`);
            }
        });

        /* Stats - Connect to modals */
        document.querySelectorAll('.stat-card').forEach(card => {
            card.addEventListener('click', () => {
                const label = card.querySelector('.stat-label').textContent.toLowerCase();

                if (label.includes('leaderboard')) {
                    openModal(leaderboardModal);
                } else if (label.includes('modules')) {
                    openModal(modulesModal);
                } else if (label.includes('assignments')) {
                    openModal(assignmentsModal);
                } else {
                    alert(`Opening ${label} details...`);
                }
            });
        });

        /* Close button handlers for all modals */
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', () => {
                const modal = btn.closest('.modal-backdrop');
                if (modal) closeModalFn(modal);
            });
        });

        /* Close modals on backdrop click */
        [notifModal, diamondModal, leaderboardModal, modulesModal, assignmentsModal, contactsModal].forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) closeModalFn(modal);
            });
        });

        /* Close modals on Escape */
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeModalFn(notifModal);
                closeModalFn(diamondModal);
                closeModalFn(leaderboardModal);
                closeModalFn(modulesModal);
                closeModalFn(assignmentsModal);
                closeModalFn(contactsModal);
            }
        });

        /* Utility */
        function escapeHtml(str) {
            const div = document.createElement('div');
            div.textContent = str;
            return div.innerHTML;
        }

        /* Initialize */
        renderNotifs();
        initPromoSlider();

        fetch("../../../../components/Navbar/BottomNav.html")
            .then(res => res.text())
            .then(data => {
                document.getElementById("nav-placeholder").innerHTML = data;

                // Aktifkan tombol sesuai halaman
                const current = location.pathname.split("/").pop();
                document.querySelectorAll(".nav-item").forEach(item => {
                    if (item.getAttribute("href") === current) {
                        item.classList.add("active");
                    }
                });
            });


        const storiesData = [{
                name: "Arya",
                avatar: "https://i.pravatar.cc/150?img=12",
                stories: [{
                        type: "image",
                        url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800",
                        text: "Just finished my exam! 📚"
                    },
                    {
                        type: "image",
                        url: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800",
                        text: "Study group was productive 💪"
                    },
                    {
                        type: "image",
                        url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800",
                        text: "New semester goals!"
                    }
                ]
            },
            {
                name: "Budi",
                avatar: "https://i.pravatar.cc/150?img=5",
                stories: [{
                        type: "image",
                        url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800",
                        text: "Coding all night 💻"
                    },
                    {
                        type: "image",
                        url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
                        text: "Finally solved the bug!"
                    }
                ]
            },
            {
                name: "Cici",
                avatar: "https://i.pravatar.cc/150?img=20",
                stories: [{
                        type: "image",
                        url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800",
                        text: "Library vibes 📖"
                    },
                    {
                        type: "image",
                        url: "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=800",
                        text: "Coffee break ☕"
                    },
                    {
                        type: "image",
                        url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
                        text: "Study motivation!"
                    }
                ]
            },
            {
                name: "Doni",
                avatar: "https://i.pravatar.cc/150?img=15",
                stories: [{
                    type: "image",
                    url: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800",
                    text: "Research paper done! 🎉"
                }]
            },
        ];

        let currentStoryContact = null;
        let currentStoryIndex = 0;
        let storyTimer = null;
        let storyProgressInterval = null;

        // DOM Elements
        const storyModal = document.getElementById('storyModal');
        const storyClose = document.getElementById('storyClose');
        const storyContent = document.getElementById('storyContent');
        const storyProgressBars = document.getElementById('storyProgressBars');
        const storyUserName = document.getElementById('storyUserName');
        const storyUserAvatar = document.getElementById('storyUserAvatar');
        const storyPrev = document.getElementById('storyPrev');
        const storyNext = document.getElementById('storyNext');

        // Open Story
        function openStory(contactId) {
            const contact = storiesData[contactId];
            if (!contact) return;

            currentStoryContact = contactId;
            currentStoryIndex = 0;

            // Set user info
            storyUserName.textContent = contact.name;
            storyUserAvatar.src = contact.avatar;

            // Create progress bars
            storyProgressBars.innerHTML = '';
            contact.stories.forEach((_, i) => {
                const bar = document.createElement('div');
                bar.className = 'story-progress-bar';
                bar.innerHTML = '<div class="story-progress-fill"></div>';
                storyProgressBars.appendChild(bar);
            });

            // Create story slides
            storyContent.innerHTML = '';
            contact.stories.forEach((story, i) => {
                const slide = document.createElement('div');
                slide.className = 'story-slide';
                slide.innerHTML = `
                    <img src="${story.url}" alt="Story" class="story-image">
                    <div class="story-text">${story.text}</div>
                  `;
                storyContent.appendChild(slide);
            });

            // Show modal
            storyModal.classList.add('active');
            document.body.style.overflow = 'hidden';

            // Show first slide
            showStorySlide(0);
        }

        // Show Story Slide
        function showStorySlide(index) {
            const contact = storiesData[currentStoryContact];
            const slides = storyContent.querySelectorAll('.story-slide');

            // Update slides
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });

            // Update progress bars
            const progressBars = storyProgressBars.querySelectorAll('.story-progress-bar');
            progressBars.forEach((bar, i) => {
                const fill = bar.querySelector('.story-progress-fill');

                if (i < index) {
                    // Completed
                    fill.style.width = '100%';
                    fill.style.transition = 'none';
                } else if (i === index) {
                    // Current - animate
                    fill.style.width = '0%';
                    fill.style.transition = 'none';

                    // Force reflow
                    void fill.offsetWidth;

                    fill.style.transition = 'width 5s linear';
                    fill.style.width = '100%';
                } else {
                    // Not yet viewed
                    fill.style.width = '0%';
                    fill.style.transition = 'none';
                }
            });

            // Auto advance after 5 seconds
            if (storyTimer) clearTimeout(storyTimer);
            storyTimer = setTimeout(() => {
                nextStory();
            }, 5000);
        }

        // Next Story
        function nextStory() {
            const contact = storiesData[currentStoryContact];
            if (currentStoryIndex < contact.stories.length - 1) {
                currentStoryIndex++;
                showStorySlide(currentStoryIndex);
            } else {
                closeStory();
            }
        }

        // Previous Story
        function prevStory() {
            if (currentStoryIndex > 0) {
                currentStoryIndex--;
                showStorySlide(currentStoryIndex);
            }
        }

        // Close Story
        function closeStory() {
            if (storyTimer) clearTimeout(storyTimer);
            storyModal.classList.remove('active');
            document.body.style.overflow = '';
        }

        // Event Listeners
        storyClose.addEventListener('click', closeStory);
        storyNext.addEventListener('click', nextStory);
        storyPrev.addEventListener('click', prevStory);

        // Contact clicks
        document.querySelectorAll('.contact').forEach(contact => {
            contact.addEventListener('click', () => {
                const contactId = Number(contact.dataset.contactId);
                openStory(contactId);
            });
        });

        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeStory();
            }
        });