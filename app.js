const supabaseUrl = 'https://qqgjdalywbvibvvgwvkf.supabase.co';
const supabaseKey = 'sb_publishable_9RlJxkVD9-n85tF-MOVxwg_gvtMxtRv' ;
const client =  supabase.createClient(supabaseUrl , supabaseKey);
console.log(client);

let fName = document.getElementById('fn');
let lName = document.getElementById('ln');
let email = document.getElementById('em');
let password = document.getElementById('ps');
let age = document.getElementById('age');
let number = document.getElementById('num');
let display = document.getElementById('profile');

let signupBtn = document.getElementById('signup');

if (signupBtn) {
    signupBtn.addEventListener('click', async () => {
        const { data, error } = await client
        .from('mrbook')
        .insert({
            firstName : fName.value,
            lastName : lName.value,
            email : email.value,
            password : password.value,
            age : age.value,
            number : number.value
         })
        .select()    
        if (error) {
            console.log('error td', error.message);
        }else{
            console.log('data td', data);
        }

        const { data:authdata, error:autherror } = await client.auth.signUp({
            email: email.value,
            password: password.value,
            options: {
            data: {
                first_name: fName.value,
            }
            }
        })
        if (autherror) {
            console.log('authError', autherror.message);
        }else{
            console.log('authData', authdata);
            window.location.href == 'https://mr-book-meta.vercel.app/index.html'
            alert('user created')
        }
    })
}