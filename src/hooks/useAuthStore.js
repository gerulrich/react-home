import { useDispatch, useSelector } from 'react-redux';
import { homeApi } from '../api/homeApi';
import { clearErrorMessage, onChecking, onLogin, onLogout } from '../store/slices/auth/authSlice';


export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector( state => state.auth );
    const dispatch = useDispatch();

    const startLogin = async({ email, password }) => {
        dispatch( onChecking() );
        try {
            const { data } = await homeApi.post('/auth/login',{ email, password });
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('token', data.token );
            localStorage.setItem('token-init-date', new Date().getTime() );
            // TODO pasar todos los datos del usaurio (roles)
            dispatch( onLogin({ name: data.name, uid: data.uid }) );
        } catch (error) {
            dispatch( onLogout('Credenciales incorrectas') );
            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 10);
        }
    }

    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');
        if ( !token ) return dispatch( onLogout() );

        try {
            const { data } = await homeApi.get('/auth/renew');
            localStorage.setItem('token', data.token );
            localStorage.setItem('token-init-date', new Date().getTime() );
            dispatch( onLogin({ name: data.name, uid: data.uid }) );
        } catch (error) {
            localStorage.clear();
            dispatch( onLogout() );
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogout());
    }

    return {
        //* Propiedades
        errorMessage,
        status,
        user,

        //* Métodos
        checkAuthToken,
        startLogin,
        startLogout,
    }

}