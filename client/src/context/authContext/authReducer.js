import { GET_USER_FAILURE, GET_USER_START, GET_USER_SUCCESS, LOGOUT } from "../../constants/authConstant";


const authReducer = (state, action) => {
    switch (action.type) {
        case GET_USER_START:
            return {
                user: null,
                isFetching: true,
                error: false
            }
        case GET_USER_SUCCESS:
            return {
                user: action.payload,
                isFetching: false,
                error: false
            }
        case GET_USER_FAILURE:
            return {
                user: null,
                isFetching: false,
                error: action.payload
            }
        case LOGOUT:
            return {
                user: null,
                isFetching: false,
                error: false
            }

        default:
            return state;
    }
}


export default authReducer;