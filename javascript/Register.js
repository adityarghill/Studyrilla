        // Form validation
        const nickname = document.getElementById('nickname');
        const username = document.getElementById('username');
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');
        const registerBtn = document.getElementById('registerBtn');
        const tokenBtn = document.getElementById('tokenBtn');

        // Password toggle functionality
        document.querySelectorAll('.toggle-password').forEach(toggle => {
            toggle.addEventListener('click', function() {
                const targetId = this.getAttribute('data-target');
                const input = document.getElementById(targetId);
                const eyeOpen = this.querySelector('.eye-open');
                const eyeClosed = this.querySelector('.eye-closed');

                if (input.type === 'password') {
                    input.type = 'text';
                    eyeOpen.style.display = 'none';
                    eyeClosed.style.display = 'block';
                } else {
                    input.type = 'password';
                    eyeOpen.style.display = 'block';
                    eyeClosed.style.display = 'none';
                }
            });
        });

        // Real-time validation
        nickname.addEventListener('input', validateNickname);
        username.addEventListener('input', validateUsername);
        email.addEventListener('input', validateEmail);
        password.addEventListener('input', function() {
            validatePassword();
            checkPasswordStrength();
            validateConfirmPassword();
        });
        confirmPassword.addEventListener('input', validateConfirmPassword);

        function validateNickname() {
            const msg = document.getElementById('nicknameMsg');
            if (nickname.value.length < 2) {
                nickname.classList.remove('valid');
                nickname.classList.add('invalid');
                msg.textContent = 'Nickname must be at least 2 characters';
                msg.className = 'validation-msg error';
                return false;
            }
            nickname.classList.remove('invalid');
            nickname.classList.add('valid');
            msg.style.display = 'none';
            return true;
        }

        function validateUsername() {
            const msg = document.getElementById('usernameMsg');
            const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;

            if (!usernameRegex.test(username.value)) {
                username.classList.remove('valid');
                username.classList.add('invalid');
                msg.textContent = 'Username: 3-20 characters, letters, numbers, underscore only';
                msg.className = 'validation-msg error';
                return false;
            }
            username.classList.remove('invalid');
            username.classList.add('valid');
            msg.style.display = 'none';
            return true;
        }

        function validateEmail() {
            const msg = document.getElementById('emailMsg');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(email.value)) {
                email.classList.remove('valid');
                email.classList.add('invalid');
                msg.textContent = 'Please enter a valid email address';
                msg.className = 'validation-msg error';
                return false;
            }
            email.classList.remove('invalid');
            email.classList.add('valid');
            msg.style.display = 'none';
            return true;
        }

        function validatePassword() {
            if (password.value.length < 8) {
                password.classList.remove('valid');
                password.classList.add('invalid');
                return false;
            }
            password.classList.remove('invalid');
            password.classList.add('valid');
            return true;
        }

        function checkPasswordStrength() {
            const strengthContainer = document.getElementById('passwordStrength');
            const strengthFill = document.getElementById('strengthFill');
            const strengthText = document.getElementById('strengthText');
            const pass = password.value;

            if (pass.length === 0) {
                strengthContainer.style.display = 'none';
                return;
            }

            strengthContainer.style.display = 'block';

            let strength = 0;
            if (pass.length >= 8) strength++;
            if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength++;
            if (pass.match(/[0-9]/)) strength++;
            if (pass.match(/[^a-zA-Z0-9]/)) strength++;

            strengthFill.className = 'strength-fill';
            if (strength <= 2) {
                strengthFill.classList.add('weak');
                strengthText.textContent = 'Weak password';
            } else if (strength === 3) {
                strengthFill.classList.add('medium');
                strengthText.textContent = 'Medium password';
            } else {
                strengthFill.classList.add('strong');
                strengthText.textContent = 'Strong password';
            }
        }

        function validateConfirmPassword() {
            const msg = document.getElementById('confirmPasswordMsg');

            if (confirmPassword.value !== password.value) {
                confirmPassword.classList.remove('valid');
                confirmPassword.classList.add('invalid');
                msg.textContent = 'Passwords do not match';
                msg.className = 'validation-msg error';
                return false;
            }

            if (confirmPassword.value.length > 0) {
                confirmPassword.classList.remove('invalid');
                confirmPassword.classList.add('valid');
                msg.style.display = 'none';
            }
            return true;
        }

        // Token button
        tokenBtn.addEventListener('click', function() {
            if (!validateEmail()) {
                alert('Please enter a valid email address first');
                return;
            }

            tokenBtn.textContent = 'Sending...';
            tokenBtn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                tokenBtn.textContent = 'Token Sent! ✓';
                setTimeout(() => {
                    tokenBtn.textContent = 'Request Verification Token';
                    tokenBtn.disabled = false;
                }, 3000);
            }, 1500);
        });

        // Register button
        registerBtn.addEventListener('click', function() {
            const isNicknameValid = validateNickname();
            const isUsernameValid = validateUsername();
            const isEmailValid = validateEmail();
            const isPasswordValid = validatePassword();
            const isConfirmPasswordValid = validateConfirmPassword();

            if (!isNicknameValid || !isUsernameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid) {
                alert('Please fix all errors before registering');
                return;
            }

            registerBtn.classList.add('loading');
            registerBtn.textContent = '';

            // Simulate registration
            setTimeout(() => {
                registerBtn.classList.remove('loading');
                registerBtn.textContent = 'Create Account';

                document.getElementById('successMsg').classList.add('show');

                setTimeout(() => {
                    window.location.href = '../../components/pages/SignIn.html';
                }, 2000);
            }, 2000);
        });

        // Social login functions
        function signUpWithGoogle() {
            console.log('Google sign-up clicked');
            alert('Google sign-up coming soon!');
        }

        function signUpWithDiscord() {
            console.log('Discord sign-up clicked');
            alert('Discord sign-up coming soon!');
        }