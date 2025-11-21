        // Password toggle functionality
        const togglePassword = document.getElementById('togglePassword');
        const passwordInput = document.getElementById('password');
        const eyeOpen = togglePassword.querySelector('.eye-open');
        const eyeClosed = togglePassword.querySelector('.eye-closed');

        togglePassword.addEventListener('click', function() {
            // Toggle password visibility
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);

            // Toggle eye icons
            if (type === 'text') {
                eyeOpen.style.display = 'none';
                eyeClosed.style.display = 'block';
            } else {
                eyeOpen.style.display = 'block';
                eyeClosed.style.display = 'none';
            }
        });

        // Sign in button functionality (placeholder)
        document.getElementById('signinBtn').addEventListener('click', function() {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (!username || !password) {
                alert('Please fill in all fields');
                return;
            }

            // Add your sign-in logic here
            console.log('Sign in attempted with:', username);
        });