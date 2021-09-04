import { GET_USER_FAILURE, GET_USER_START, GET_USER_SUCCESS, LOGOUT } from "../../constants/authConstant";


export const getUserStart = () => ({type:GET_USER_START});
export const getUserSuccess = (user) =>({type:GET_USER_SUCCESS , payload:user})
export const getUserFailed = (error) =>({type:GET_USER_FAILURE , payload:error})

export const logout = () => ({type:LOGOUT})