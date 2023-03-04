import { Password } from "@mui/icons-material";
import { checkingCredentials, login, logout } from "./authSlice";

export const checkingAuthentication = (email, Password) => {
    return async( dispatch ) => {
        dispatch(checkingCredentials());
    }
}

export const startLoginWithEmailPassword = ({email, password}) => {
    return async( dispatch ) => {
        dispatch(checkingCredentials());
        const result = await loginWithEmailAndPasswword({email, password});
        console.log(result);
        if (!result.ok) return dispatch(logout(result))
        const {uid, displayName, photoURL, jwtToken} = result;
        localStorage.setItem('user', JSON.stringify({uid, email, displayName, photoURL, jwtToken}))
        dispatch(login(result));
    }
}


const loginWithEmailAndPasswword = async({email, password}) => {
    const api_url = import.meta.env.VITE_BACKEND_URL;
    const response = await fetch(`${api_url}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( {email, password} )
    });
    if (response.status === 200) {
        const {user, token} = await response.json();
        return {
            ok: true,
            uid: user.uid,
            email: user.email,
            displayName: user.name,
            photoURL: user.img,
            jwtToken: token
        }
    } else {
        return { ok: false }
    }





    
    const promise = new Promise(function(resolve, reject) {
        setTimeout(() => {
            if (email === 'demo@demo.com' && password === 'demo123') {
                resolve({
                    ok: true, 
                    uid: "2b0c88e8-14bb-4b45-ad3f-23ce3e703a02",
                    displayName: "John Doe",
                    email,
                    photoURL: 'https://mui.com/static/images/avatar/2.jpg'
                });
            } else {
                resolve({ok: false, errorMessage: 'invalid credentials'});
            }
        }, 1000);
    });
    return promise;
}

export const startLogout = () => {
    return async( dispatch ) => {
        await logoutWithEmailAndPassword();
        localStorage.removeItem('user');
        dispatch(logout());
    }
}

export const logoutWithEmailAndPassword = async() => {
    const promise = new Promise(function(resolve, reject) {
        setTimeout(() => resolve({}), 500);
    });
    return promise;
}