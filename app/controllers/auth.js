const usersUrl = "http://localhost:5000/users";

// with this funtion you will authenticate that the user trying to login as registered in db.js
export async function login() {
    document.getElementById("loginForm").addEventListener("submit", async function (e) {
        e.preventDefault();
        const form = new FormData(this);
        const data = Object.fromEntries(form.entries());

        try {
            const resp = await fetch(`${usersUrl}?email=${data.email}&password=${data.password}`)
            const users = await resp.json();


            if (users.length === 0) {
                alert("¡Credenciales invalidas!, vuelva a intentarlo.");
                return;
            }

            const user = users[0];
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("isAuth", true);
            alert(`!Hola, ${user.name}`);
            location.pathname = "/dashboard";
        } catch (error) {
            console.log(error);
            alert("Ocurrió algo inesperado");
        }
    });
}


// with this functions you add new visitor to db.js to be avilable to login.
export async function signUp() {
    document.getElementById("signUpForm").addEventListener("submit", async function (e) {
        e.preventDefault();
        const form = new FormData(this);
        const data = Object.fromEntries(form.entries());
        data.role = "VISITOR";
        try {
            await fetch(usersUrl, {
                method: 'POST',
                headers: {'Contente-Type':'aplication/json'},
                body: JSON.stringify(data)
            });
            this.reset();
            alert("Nuevo usuario creado");
            console.log(data);
            
            location.pathname = "/login"
        } catch (error) {

            console.log(error);
            alert("Ocurrió algo inesperado");
        }
    });
}