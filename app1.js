// let logEmail = document.getElementById('logEmail');
// let logPass = document.getElementById('logPass');
// let loginBtn = document.getElementById('loginBtn');
// let logOut = document.getElementById('logout');
// let loginStatus = true;

// if (loginBtn) {
//     loginBtn.addEventListener('click', async () => {
//         const { data, error } = await client.auth.signInWithPassword({
//             email: logEmail.value,
//             password: logPass.value,
//         });
//         if (error) {
//             console.log('errorLogin', error.message);
//         } else {
//             console.log('dataLogin', data);
//             localStorage.setItem('login', true);
//             alert('You logged in');
//             window.location.href = 'https://mustafa-raza-26.github.io/MR-Book/dashboard.html'
             
//         }
//     });
// }

// if (window.location.pathname == 'https://mustafa-raza-26.github.io/MR-Book/index.html') {
//     const loggedIn = JSON.parse(localStorage.getItem('login'));
//     if (loggedIn) {
//         window.location.href = 'https://mustafa-raza-26.github.io/MR-Book/dashboard.html';
//     }
// }

// if (window.location.pathname == 'https://mustafa-raza-26.github.io/MR-Book/dashboard.html') {
//     window.onload = async () => {
//         const { data, error } = await client.auth.getSession();
//         if (error) {
//             console.log('Error fetching session:', error.message);
//         } else if (!data.session) {
//             window.location.href = 'https://mustafa-raza-26.github.io/MR-Book/index.html';
//         }
//     };
// }

// if (window.location.pathname == 'https://mustafa-raza-26.github.io/MR-Book/profile.html') {
//     window.onload = async () => {
//         const { data, error } = await client.auth.getSession();
//         if (error) {
//             console.log('Error fetching session:', error.message);
//         } else if (!data.session) {
//             window.location.href = 'https://mustafa-raza-26.github.io/MR-Book/index.html';
//         }
//         if (data.session) {
//             let id = data.session.user.user_metadata.first_name;
//             display.innerText = `Name: ${id}`;
//         }
//     };
// }

// if (logOut) {
//     logOut.addEventListener('click', async () => {
//         localStorage.removeItem('login');
//         window.location.href = 'https://mustafa-raza-26.github.io/MR-Book/index.html';
//     });
// }


let logEmail = document.getElementById('logEmail');
let logPass = document.getElementById('logPass');
let loginBtn = document.getElementById('loginBtn');
let logOut = document.getElementById('logout');
let display = document.getElementById('displayElementId'); // Replace with the actual ID of the element where you want to display the name
let loginStatus = true;

if (loginBtn) {
    loginBtn.addEventListener('click', async () => {
        try {
            const { data, error } = await client.auth.signInWithPassword({
                email: logEmail.value,
                password: logPass.value,
            });

            if (error) {
                console.log('errorLogin', error.message);
                alert('Login failed: ' + error.message);
            } else {
                console.log('dataLogin', data);
                localStorage.setItem('login', true);
                alert('You logged in successfully');
                window.location.href = '/MR-Book/dashboard.html'; // Use relative path
            }
        } catch (err) {
            console.log('Login error:', err.message);
            alert('An error occurred during login: ' + err.message);
        }
    });
}

if (window.location.pathname === '/MR-Book/index.html') {
    const loggedIn = JSON.parse(localStorage.getItem('login'));
    if (loggedIn) {
        window.location.href = '/MR-Book/dashboard.html'; // Use relative path
    }
}

if (window.location.pathname === '/MR-Book/dashboard.html') {
    window.onload = async () => {
        try {
            const { data, error } = await client.auth.getSession();
            if (error) {
                console.log('Error fetching session:', error.message);
            } else if (!data.session) {
                window.location.href = '/MR-Book/index.html'; // Use relative path
            }
        } catch (err) {
            console.log('Session fetch error:', err.message);
        }
    };
}

if (window.location.pathname === '/MR-Book/profile.html') {
    window.onload = async () => {
        try {
            const { data, error } = await client.auth.getSession();
            if (error) {
                console.log('Error fetching session:', error.message);
            } else if (!data.session) {
                window.location.href = '/MR-Book/index.html'; // Use relative path
            } else if (data.session) {
                let id = data.session.user.user_metadata.first_name;
                display.innerText = `Name: ${id}`;
            }
        } catch (err) {
            console.log('Session fetch error:', err.message);
        }
    };
}

if (logOut) {
    logOut.addEventListener('click', async () => {
        try {
            localStorage.removeItem('login');
            // Logout from the client as well if needed
            await client.auth.signOut(); // Ensure to sign out from the client
            window.location.href = '/MR-Book/index.html'; // Use relative path
        } catch (err) {
            console.log('Logout error:', err.message);
        }
    });
}
