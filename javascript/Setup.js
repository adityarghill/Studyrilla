        // State
        let currentPage = 0;
        let profilePic = null;
        let nickname = '';
        const maxPages = 4;
        const maxNicknameLength = 20;

        // Elements
        const pages = document.querySelectorAll('.page');
        const dots = document.querySelectorAll('.dot');
        const backBtn = document.getElementById('backBtn');
        const continueBtn = document.getElementById('continueBtn');
        const profileUpload = document.getElementById('profileUpload');
        const profileCircle = document.getElementById('profileCircle');
        const skipUpload = document.getElementById('skipUpload');
        const nicknameInput = document.getElementById('nicknameInput');
        const charCount = document.getElementById('charCount');
        const saveBtn = document.getElementById('saveBtn');
        const successMsg = document.getElementById('successMsg');

        // Navigation Functions
        function updatePage() {
            // Update pages
            pages.forEach((page, index) => {
                if (index === currentPage) {
                    page.classList.add('active');
                    page.classList.remove('exiting');
                } else if (page.classList.contains('active')) {
                    page.classList.add('exiting');
                    page.classList.remove('active');
                } else {
                    page.classList.remove('active', 'exiting');
                }
            });

            // Update dots
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentPage);
            });

            // Update back button
            backBtn.classList.toggle('show', currentPage > 0);

            // Update continue button
            updateContinueButton();
        }

        function updateContinueButton() {
            const isLastPage = currentPage === maxPages - 1;

            if (isLastPage) {
                continueBtn.textContent = 'Complete';
                continueBtn.disabled = false;
            } else {
                continueBtn.textContent = 'Continue';

                // Only disable on nickname page if nickname is empty
                if (currentPage === 2 && !nickname.trim()) {
                    continueBtn.disabled = true;
                } else {
                    continueBtn.disabled = false;
                }
            }
        }

        function nextPage() {
            if (currentPage < maxPages - 1) {
                currentPage++;
                updatePage();
            } else {
                handleComplete();
            }
        }

        function prevPage() {
            if (currentPage > 0) {
                currentPage--;
                updatePage();
            }
        }

        function goToPage(pageNum) {
            if (pageNum >= 0 && pageNum < maxPages) {
                currentPage = pageNum;
                updatePage();
            }
        }

        function handleComplete() {
            console.log('Onboarding complete!', {
                profilePic,
                nickname
            });
            alert('Onboarding complete! Check console for data.');
        }

        // Profile Picture Upload
        profileUpload.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    profilePic = reader.result;
                    profileCircle.classList.add('has-image');
                    profileCircle.innerHTML = `<img src="${profilePic}" alt="Profile">`;
                    updateContinueButton();
                };
                reader.readAsDataURL(file);
            }
        });

        skipUpload.addEventListener('click', () => {
            nextPage();
        });

        // Nickname Input - enforce max length
        nicknameInput.addEventListener('input', (e) => {
            let value = e.target.value;
            if (value.length > maxNicknameLength) {
                value = value.slice(0, maxNicknameLength);
                e.target.value = value;
            }
            nickname = value;
            charCount.textContent = nickname.length;
            updateContinueButton();
        });

        saveBtn.addEventListener('click', () => {
            if (!nickname.trim()) {
                nicknameInput.classList.add('error');
                setTimeout(() => nicknameInput.classList.remove('error'), 300);
                return;
            }

            successMsg.classList.add('show');
            setTimeout(() => successMsg.classList.remove('show'), 2000);
        });

        // Event Listeners
        continueBtn.addEventListener('click', nextPage);
        backBtn.addEventListener('click', prevPage);

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const page = parseInt(dot.dataset.page);
                goToPage(page);
            });
        });

        // Initialize
        updatePage();