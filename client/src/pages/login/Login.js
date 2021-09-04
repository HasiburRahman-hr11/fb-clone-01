import { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './login.css';
import { AuthContext } from '../../context/authContext/authContext';
import { login } from '../../context/authContext/apiCalls';
import { CircularProgress } from '@material-ui/core'


export default function Login() {
    const { dispatch, isFetching, error: loginError } = useContext(AuthContext)

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState({});
    const history = useHistory();


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    let errors = {}
    const handleSubmit = (e) => {
        e.preventDefault();

        login(dispatch, formData);

        if (loginError) {
            if (loginError?.response.data.errorEmail) {
                errors.email = loginError?.response.data.errorEmail
            }
            if (loginError?.response.data.errorPass) {
                errors.password = loginError?.response.data.errorPass
            }
            setError(errors)
        } else {
            history.push('/');
        }
    }

    return (
        <div className="login d__flex align__center">
            <div className="auth__page_wrapper d__flex align__center">
                <div className="auth__left">
                    <h3>facebook</h3>
                    <p>Connect with friends and the world <br /> around you on Facebook</p>
                </div>
                <div className="auth__right">
                    <div className="auth__form_wrapper">
                        <form
                            action="/auth/login"
                            className="auth__form"
                            onSubmit={handleSubmit}
                        >
                            <div className="input__group">
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    name="email"
                                    className={error.email ? 'auth__input is__invalid' : 'auth__input'}
                                    required
                                    onChange={handleChange}
                                    value={formData.email}
                                />
                                <p className="form_error">{error.email && error.email}</p>
                            </div>
                            <div className="input__group">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    className={error.password ? 'auth__input is__invalid' : 'auth__input'}
                                    required
                                    onChange={handleChange}
                                />
                                <p className="form_error">{error.password && error.password}</p>
                            </div>
                            <div className="input__group">
                                <button className="form__btn auth__btn" type="submit" >
                                    {isFetching ? <CircularProgress className="login_icon" /> : 'Login'}
                                </button>
                            </div>
                        </form>

                        <p style={{ textAlign: 'center', fontWeight: '500' }}>or</p>

                        <p><Link to="/auth/register" className="form__btn link__btn"> Create New Account</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}
