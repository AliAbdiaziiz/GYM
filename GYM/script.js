document.addEventListener('DOMContentLoaded', () => {
    // 1. Hel badhanka Hero-ga
const heroStartBtn2 = document.getElementById('hero-start-btn');

// 2. Markii la riixo ha furo Modal-ka Sign In-ka
if (heroStartBtn2) {
    heroStartBtn2.addEventListener('click', (e) => {
        e.preventDefault(); // Inaanu bogga refresh garayn
        
        // Haddii aad rabto inuu geeyo Sign In
        openAuthModal('login'); 
        
        // AMA: Haddii aad rabto inuu si toos ah u geeyo Registration-ka (maadaama aad hore u codsatay)
        // openAuthModal('register'); 
    });
}

    // 1. MOBILE MENU TOGGLE
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu on click
    mobileMenu.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenu.classList.toggle('active'); // Optional: for hamburger animation
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });


    // 2. PRICING TOGGLE (MONTHLY / YEARLY)
    const pricingToggle = document.getElementById('pricing-toggle');
    const priceGroup = document.getElementById('price-group');
    const pricePrivate = document.getElementById('price-private');
    const priceAthlete = document.getElementById('price-athlete');

    // Prices Configuration
    const prices = {
        monthly: {
            group: 39,
            private: 79,
            athlete: 129
        },
        yearly: { // Approx 20% discount calculated monthly
            group: 30,
            private: 60,
            athlete: 100
        }
    };

    pricingToggle.addEventListener('change', (e) => {
        const isYearly = e.target.checked;

        // Add a fade effect class
        document.querySelectorAll('.amount').forEach(el => {
            el.style.opacity = '0';
        });

        setTimeout(() => {
            if (isYearly) {
                priceGroup.textContent = prices.yearly.group;
                pricePrivate.textContent = prices.yearly.private;
                priceAthlete.textContent = prices.yearly.athlete;
            } else {
                priceGroup.textContent = prices.monthly.group;
                pricePrivate.textContent = prices.monthly.private;
                priceAthlete.textContent = prices.monthly.athlete;
            }

            // Remove fade effect
            document.querySelectorAll('.amount').forEach(el => {
                el.style.opacity = '1';
            });
        }, 200); // Wait for fade out
    });


    // 3. STATS ANIMATED COUNTERS
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200; // The lower the slower

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;

                // Lower inc to slow and higher to slow
                const inc = target / speed;

                if (count < target) {
                    // Add inc to count and output in counter
                    counter.innerText = Math.ceil(count + inc);
                    // Call function every ms
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    // Use Intersection Observer to trigger animation when scrolled into view
    const statsSection = document.querySelector('.statistics');
    let animated = false;

    const sectionObserver = new IntersectionObserver((entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !animated) {
            animateCounters();
            animated = true; // Ensure it only runs once
        }
    }, {
        root: null,
        threshold: 0.4
    });


    if (statsSection) {
        sectionObserver.observe(statsSection);
    }


    // 4. AUTH MODAL LOGIC
    const modal = document.getElementById('auth-modal');
    const signinBtn = document.getElementById('signin-btn');
    const mobileSigninBtn = document.getElementById('mobile-signin-btn');
    const heroStartBtn = document.getElementById('hero-start-btn');
    const closeBtn = document.querySelector('.close-modal');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const authForms = document.querySelectorAll('.auth-form');

    // Register Form Elements
    const registerForm = document.querySelector('#register-form form');
    const regName = document.getElementById('reg-name');
    const regEmail = document.getElementById('reg-email');
    const regPassword = document.getElementById('reg-password');

    // Function to open modal and specific tab
    const openAuthModal = (tabName = 'login') => {
        modal.display = 'flex'; // Ensure flex first if handled by CSS class, but here inline style
        modal.style.display = 'flex';

        // Reset tabs
        tabBtns.forEach(b => b.classList.remove('active'));
        authForms.forEach(f => f.classList.remove('active'));

        // Activate requested tab
        document.querySelector(`.tab-btn[data-tab="${tabName}"]`).classList.add('active');
        document.getElementById(`${tabName}-form`).classList.add('active');

        // Close mobile menu if open
        navMenu.classList.remove('active');
        mobileMenu.classList.remove('active');
    };

    // "Start Your Journey" -> Redirects to Sign In (Login tab)
    if (heroStartBtn) {
        heroStartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openAuthModal('login');
        });
    }

    // "Sign In" Button -> Redirects to Registration (Sign Up tab) per user request
    if (signinBtn) {
        signinBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openAuthModal('register');
        });
    }

    if (mobileSigninBtn) {
        mobileSigninBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openAuthModal('register');
        });
    }

    // Close Modal
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    // Close on outside click
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Switch Tabs independently
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            openAuthModal(tabId);
        });
    });

    // Handle Register Form Submission
  // Handle Register Form Submission
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Ka hortag in boggu refresh noqdo

        // 1. Qabashada xogta la geliyay
        const nameValue = regName.value.trim();
        const emailValue = regEmail.value.trim();
        const passValue = regPassword.value;

        // VALIDATION LOGIC

        // A. Magaca: Xarfo keliya iyo boos (A-Z, a-z)
        const nameRegex = /^[A-Za-z\s]+$/;
        if (!nameRegex.test(nameValue)) {
            alert('Fadlan Magaca ku qor xarfo keliya!');
            regName.focus();
            return;
        }

        // B. Email: Waa inuu leeyahay @ iyo .
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailValue)) {
            alert('Fadlan soo geli Email sax ah (tusaale: magac@gmail.com)');
            regEmail.focus();
            return;
        }

        // C. Password: Waa inuu ugu yaraan yahay 8 xaraf
        // Waxaad u isticmaali kartaa xarfo, lambaro, iyo symbols si dabiici ah
        if (passValue.length < 8) {
            alert('Password-ku waa inuu ka koobnaadaa ugu yaraan 8 character!');
            regPassword.focus();
            return;
        }

        // KAYDINTA XOGTA

        const newUser = {
            name: nameValue,
            email: emailValue,
            password: passValue, // Password-kaaga halkan ayuu ku keydsamayaa siduu yahay
            date: new Date().toISOString()
        };

            // Get existing users
            const users = JSON.parse(localStorage.getItem('gym_users')) || [];

            // Simple validation check (optional, e.g., check if email exists)
            const userExists = users.some(u => u.email === newUser.email);
            if (userExists) {
                alert('User with this email already exists!');
                return;
            }

            // Save user
            users.push(newUser);
            localStorage.setItem('gym_users', JSON.stringify(users));

            // Success feedback
            alert('Registration Successful! You can now Sign In.');

            // Clear form
            registerForm.reset();

            // Switch to login tab
            openAuthModal('login');
        });
    }
});




// 5. SIGN IN (LOGIN) LOGIC WITH SPECIFIC FEEDBACK

const loginForm = document.querySelector('#login-form form');
const loginEmailInput = document.getElementById('login-email');
const loginPassInput = document.getElementById('login-password');

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); 

        const emailValue = loginEmailInput.value.trim();
        const passValue = loginPassInput.value;

        // 1. Soo qaad liiska isticmaalayaasha
        const users = JSON.parse(localStorage.getItem('gym_users')) || [];

        // 2. Marka hore hubi haddii Email-ka uu jiro
        const userFound = users.find(u => u.email === emailValue);

        if (!userFound) {
            // Feedback haddii Email-ka aan la helin
            alert('Cillad: Email-kan ma diiwaangashna. Fadlan marka hore Sign Up sameey.');
            loginEmailInput.focus();
            return; 
        }

        // 3. Haddii Email-ka la helay, hubi haddii Password-ka uu sax yahay
        if (userFound.password !== passValue) {
            // Feedback haddii Password-ka uu khaldan yahay
            alert('Cillad: Password-ka aad gelisay waa khaldan yahay. Iska hubi!');
            loginPassInput.focus();
            return;
        }

        // 4. Haddii labaduba sax yihiin
        // alert(`Ku soo dhowaad mar kale, ${userFound.name}!`);
        
        // Keydi magaca qofka galay si looga isticmaalo Dashboard-ka (Optional)
        localStorage.setItem('currentUser', JSON.stringify(userFound));
        
        window.location.href = 'dashboard.html';
    });
}