import axios from 'axios';
import { getUserFailed, getUserStart, getUserSuccess } from './authActions';

export const login = async (dispatch, formData) => {
    dispatch(getUserStart());
    try {
        const res = await axios.post('/auth/login', formData)
        localStorage.setItem('fb_token', res.data.token)
        localStorage.setItem('fb_user', JSON.stringify(res.data.user))
        dispatch(getUserSuccess(res.data.user))

    } catch (error) {
        console.log(error)
        dispatch(getUserFailed(error));
    }
}