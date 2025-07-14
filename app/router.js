import { login, signUp } from "./controllers/auth";
import { showVisitors } from "./controllers/crudEvents";

const routes = {
    "/dashboard": "/app/views/home.html",
    "/login": "/app/views/login.html",
    "/register": "/app/views/register.html",
    "/noFound": "/app/views/404.html"
}

// this funtion will be used to control the routes, showing in the index.htlm the diferentes avilable views
export async function renderRoute() {
    const user = JSON.parse(localStorage.getItem("user"));
    const path = location.pathname;
    const isAuth = localStorage.getItem("isAuth");
    const app = document.getElementById("app");
    const file = routes[path];

    if (!path) {
        location.pathname = "/noFound";
        return;
    }

    if (!isAuth) {
        if (path !== "/login" && path !== "/register") {
            location.pathname = "/login";
            return;
        }
    }

    if (isAuth) {
        if (path === "/login" || path === "/register") {
            location.pathname = "/dashboard";
            return;
        }
    }

    try {
        const resp = await fetch(file);
        const html = await resp.text();
        app.innerHTML = html;

        if (path === "/login") {
            //User atuentication, if user is not registered is not avilable to login.
            login();

            // event to redirect to register location when the user is not registered.
            document.getElementById("signUpBtn").addEventListener("click", () => {
                location.pathname = "/register"
            });

            // event to clear localstorage items and redirect to login
            try {
                document.getElementById("logoutBtn").addEventListener("click", () => {
                    localStorage.removeItem("user");
                    localStorage.removeItem("isAuth");
                    location.pathname = "/login"
                })
            } catch (error) {
                console.log(error)
            }
        }

        if (path === "/register") {
            // User register
            signUp();

            document.getElementById("cancelBtn").addEventListener("click", (e) => {
                window.onload = e.preventDefault();
                location.pathname = "/login"
            })

        }

        if (path === "/dashboard") {
            document.getElementById("header").hidden = false;
            
            if(user.role === "VISITOR"){
                showVisitors()
            }

        }
    } catch (error) {
        debugger
        console.log(error);
        location.href = "/noFound";
    }
}