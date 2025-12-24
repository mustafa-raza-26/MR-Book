let logEmail = document.getElementById('logEmail');
let logPass = document.getElementById('logPass');
let loginBtn = document.getElementById('loginBtn');

if (loginBtn) {
    loginBtn.addEventListener('click', async () => {
        const { data, error } = await client.auth.signInWithPassword({
        email: logEmail.value,
        password: logPass.value,
        })
        if (error) {
            console.log('errorLogin', error.message);
        }else{
            console.log('dataLogin', data);
            alert('You login')
            window.location.href = '/dashboard.html'
        }        
    })
}

if (window.location.pathname == '/dashboard.html') {
    window.onload = async () => {
        const { data, error } = await client.auth.getSession()
        if (!data.session) {
            window.location.href = '/index.html'
        }
    }
}


if (window.location.pathname == '/profile.html') {
    window.onload = async () => {
        const { data, error } = await client.auth.getSession()
        if (!data.session) {
            window.location.href = '/index.html'
        }
        let id = data.session.user.user_metadata.first_name
        display.innerText = `Name: ${id}`
    }
}