let logEmail = document.getElementById('logEmail');
let logPass = document.getElementById('logPass');
let loginBtn = document.getElementById('loginBtn');
let logOut = document.getElementById('logout');

/* ================= LOGIN ================= */
if (loginBtn) {
    loginBtn.addEventListener('click', async () => {
        try {
            const { data, error } = await client.auth.signInWithPassword({
                email: logEmail.value,
                password: logPass.value,
            });

            if (error) {
                console.log('errorLogin', error.message);
                alert(error.message);
            } else {
                localStorage.setItem('login', true);
                alert('You logged in');
                window.location.href = 'https://mustafa-raza-26.github.io/MR-Book/dashboard.html';
            }
        } catch (err) {
            console.log(err.message);
        }
    });
}

/* ================= INDEX PAGE CHECK ================= */
if (window.location.href === 'https://mustafa-raza-26.github.io/MR-Book/index.html') {
    const loggedIn = JSON.parse(localStorage.getItem('login'));
    if (loggedIn) {
        window.location.href = 'https://mustafa-raza-26.github.io/MR-Book/dashboard.html';
    }
}

/* ================= DASHBOARD PROTECTION ================= */
if (window.location.href === 'https://mustafa-raza-26.github.io/MR-Book/dashboard.html') {
    window.onload = async () => {
        const { data, error } = await client.auth.getSession();
        if (error || !data.session) {
            window.location.href = 'https://mustafa-raza-26.github.io/MR-Book/index.html';
        }
    };
}

/* ================= PROFILE PROTECTION + DATA ================= */
if (window.location.href === 'https://mustafa-raza-26.github.io/MR-Book/profile.html') {
    window.onload = async () => {
        const { data, error } = await client.auth.getSession();

        if (error || !data.session) {
            window.location.href = 'https://mustafa-raza-26.github.io/MR-Book/index.html';
        } else {
            let name = data.session.user.user_metadata.first_name;
            display.innerText = `Name: ${name}`;
        }
    };
}

/* ================= LOGOUT ================= */
if (logOut) {
    logOut.addEventListener('click', async () => {
        await client.auth.signOut();
        localStorage.removeItem('login');
        window.location.href = 'https://mustafa-raza-26.github.io/MR-Book/index.html';
    });
}
