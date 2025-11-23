    // Promo Slider
    let currentSlide = 0;
    const promoTrack = document.getElementById('promoTrack');
    const promoDots = document.querySelectorAll('.promo-dot');
    const totalSlides = 3;

    function showSlide(index) {
        currentSlide = (index + totalSlides) % totalSlides;
        promoTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

        promoDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }

    // Dot click handlers
    promoDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.dataset.index);
            showSlide(index);
        });
    });

    // Auto-advance slider
    let sliderInterval = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 2000);

    // Pause on hover
    document.querySelector('.promo-slider').addEventListener('mouseenter', () => {
        clearInterval(sliderInterval);
    });

    document.querySelector('.promo-slider').addEventListener('mouseleave', () => {
        sliderInterval = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 4000);
    });

    // Module click handler
    function openModule(moduleId) {
        console.log('Opening module:', moduleId);
        alert(`Opening module: ${moduleId}`);
    }

    // Quiz click handler
    function openQuiz(quizId) {
        console.log('Opening quiz:', quizId);
        alert(`Starting quiz: ${quizId}`);
    }

    // Diamond shop
    function openDiamondShop() {
        alert('Opening Diamond Shop...\n\nCurrent balance: 128 diamonds');
    }

    // Notifications
    function openNotifications() {
        alert('Notifications:\n\n• New course available\n• Quiz challenge from friend\n• Your assignment is graded');
    }

    // View All click handlers
    document.querySelectorAll('.view-all').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const section = btn.closest('.section').querySelector('.section-title').textContent;
            alert(`Viewing all ${section}`);
        });
    });


    // =============================
    // LOAD BOTTOM NAV
    // =============================
    fetch("/assets/components/Navbar/BottomNav.html")
        .then(res => res.text())
        .then(data => {
            document.getElementById("nav-placeholder").innerHTML = data;

            const current = location.pathname.split("/").pop();

            document.querySelectorAll(".nav-item").forEach(item => {
                const itemHref = item.getAttribute("href").split("/").pop();
                if (itemHref === current) {
                    item.classList.add("active");
                }
            });
        });