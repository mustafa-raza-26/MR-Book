let logEmail = document.getElementById('logEmail');
let logPass = document.getElementById('logPass');
let loginBtn = document.getElementById('loginBtn');
let logOut = document.getElementById('logout');
let loginStatus = true;

if (loginBtn) {
    loginBtn.addEventListener('click', async () => {
        const { data, error } = await client.auth.signInWithPassword({
            email: logEmail.value,
            password: logPass.value,
        });
        if (error) {
            console.log('errorLogin', error.message);
        } else {
            console.log('dataLogin', data);
            localStorage.setItem('login', true);
            alert('You logged in');
            window.location.href = 'https://mustafa-raza-26.github.io/dashboard.html';
        }
    });
}

if (window.location.pathname == 'https://mustafa-raza-26.github.io/index.html') {
    const loggedIn = JSON.parse(localStorage.getItem('login'));
    if (loggedIn) {
        window.location.href = 'https://mustafa-raza-26.github.io/dashboard.html';
    }
}

if (window.location.pathname == 'https://mustafa-raza-26.github.io/dashboard.html') {
    window.onload = async () => {
        const { data, error } = await client.auth.getSession();
        if (error) {
            console.log('Error fetching session:', error.message);
        } else if (!data.session) {
            window.location.href = 'https://mustafa-raza-26.github.io/index.html';
        }
    };
}

if (window.location.pathname == 'https://mustafa-raza-26.github.io/profile.html') {
    window.onload = async () => {
        const { data, error } = await client.auth.getSession();
        if (error) {
            console.log('Error fetching session:', error.message);
        } else if (!data.session) {
            window.location.href = 'https://mustafa-raza-26.github.io/index.html';
        }
        if (data.session) {
            let id = data.session.user.user_metadata.first_name;
            display.innerText = `Name: ${id}`;
        }
    };
}

if (logOut) {
    logOut.addEventListener('click', async () => {
        localStorage.removeItem('login');
        window.location.href = 'https://mustafa-raza-26.github.io/index.html'; 
    });
}
