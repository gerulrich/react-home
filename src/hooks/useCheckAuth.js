import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/slices/auth";


export const useCheckAuth = () => {
  
    const {status} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!!user) {
            const {uid, email, displayName, photoURL} = JSON.parse(user);
            dispatch(login({uid, email, displayName, photoURL}));
        } else {
            dispatch(logout({}));
        }
    }, []);

    return status;    

}
