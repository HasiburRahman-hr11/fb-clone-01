import { useState } from 'react';
import './register.css';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';



export default function Register() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState({});
    const history = useHistory();


    let errors = {}
    const validateForm = () => {
        // First Name
        if (!formData.firstName.match(/^[a-zA-Z ]*$/)) {
            errors.firstName = 'Alphabate Only.'
        }
        if (formData.firstName.length < 2) {
            errors.firstName = 'Too Short,Min 2 Charecters.'
        }
        if (formData.firstName.length > 20) {
            errors.firstName = 'Too Long,Max 20 Charecters.'
        }
        // Last Name
        if (!formData.lastName.match(/^[a-zA-Z ]*$/)) {
            errors.lastName = 'Alphabate Only.'
        }
        if (formData.lastName.length < 2) {
            errors.lastName = 'Too Short,Min 2 Charecters.'
        }
        if (formData.lastName.length > 20) {
            errors.lastName = 'Too Long,Max 20 Charecters.'
        }

        // password
        if (formData.password.length < 5) {
            errors.password = 'Too Short, Min 5 Charecters.'
        }

        // Confirm Password
        if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Password Does Not Match.'
        }

        return setError(errors)
    }



    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }



    const handleSubmit = async (e) => {
        e.preventDefault();
        validateForm()

        if (Object.keys(errors).length === 0) {
            try {
                await axios.post('/api/auth/register', formData);
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                });

                history.push("/auth/login");
            } catch (e) {
                console.log(e.response);
                if (e.response.data.errorEmail) {
                    errors.email = e.response.data.errorEmail
                    setError({ ...error, email: e.response.data.errorEmail })
                }
            }
        }

    }


    return (
        <div className="register d__flex align__center">
            <div className="auth__page_wrapper d__flex align__center">
                <div className="auth__left">
                    <h3>facebook</h3>
                    <p>Connect with friends and the world <br /> around you on Facebook</p>
                </div>
                <div className="auth__right">
                    <div className="auth__form_wrapper">
                        <form
                            action="/auth/register"
                            className="auth__form"
                            onSubmit={handleSubmit}
                        >
                            <div className="input__group d__flex">
                                <div className="input__half_first">
                                    <input
                                        type="text"
                                        placeholder="First Name"
                                        name="firstName"
                                        className={error.firstName ? 'auth__input is__invalid' : 'auth__input'}
                                        required
                                        onChange={handleChange}
                                        value={formData.firstName}
                                    />
                                    <p className="form_error">{error.firstName && error.firstName}</p>
                                </div>
                                <div className="input__half_last">
                                    <input
                                        type="text"
                                        placeholder="Last Name"
                                        name="lastName"
                                        className={error.lastName ? 'auth__input is__invalid' : 'auth__input'}
                                        required
                                        onChange={handleChange}
                                        value={formData.lastName}
                                    />
                                    <p className="form_error">{error.lastName && error.lastName}</p>
                                </div>
                            </div>
                            <div className="input__group">
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    name="email"
                                    className="auth__input"
                                    // eslint-disable-next-line react/jsx-no-duplicate-props
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
                                    value={formData.password}
                                />
                                <p className="form_error">{error.password && error.password}</p>
                            </div>
                            <div className="input__group">
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    name="confirmPassword"
                                    className={error.confirmPassword ? 'auth__input is__invalid' : 'auth__input'}
                                    required
                                    onChange={handleChange}
                                />
                                <p className="form_error">{error.confirmPassword && error.confirmPassword}</p>
                            </div>
                            <div className="input__group">
                                <button className="form__btn auth__btn" type="submit" >
                                    Register
                                </button>
                            </div>
                        </form>

                        <p style={{ textAlign: 'center', fontWeight: '500' }}>or</p>

                        <p><Link to="/auth/login" className="form__btn link__btn">Login </Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}
