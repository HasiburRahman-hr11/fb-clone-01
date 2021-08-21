import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
// Material Icons
import { HighlightOff } from '@material-ui/icons'
// Edit Profile Dependencies
import './editProfile.css';
import Topbar from '../../../components/topbar/Topbar';
import Loading from '../../../components/loading/Loading';

// Context
import UserContext from '../../../context/UserContext';

export default function EditProfile() {
    const {user , profile , isLoading , setUserProfile} = useContext(UserContext);

    const [formEmpty, setFormEmpty] = useState(true);
    const [updated, setUpdated] = useState(false);


    const [editData, setEditData] = useState({
        firstName: '',
        lastName: '',
        birthday: '',
        relationship: '',
        address: '',
        bio: ''
    });

    const isEmptyForm = () => {

        let { firstName, lastName, birthday, relationship, bio, address } = editData
        if (!firstName && !lastName && !birthday && !relationship && !bio && !address) {
            setFormEmpty(true)
        } else {
            setFormEmpty(false)
        }
    }

    useEffect(() => {
        isEmptyForm();
    });


    const handleChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value })

    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`/profile/edit/${user.id}`, editData)
            if (res.data.success) {
                setUpdated(true)
                setUserProfile(res.data.profile)
            } else {
                setUpdated(false)
            }
        } catch (e) {
            console.log(e)
        }

        setEditData({
            firstName: '',
            lastName: '',
            birthday: '',
            relationship: '',
            address: '',
            bio: ''
        })
    }

    return (
        <>
            {isLoading && (
                <Loading/>
            )}
            <Topbar />
            {updated && (
                <div className="update__message">
                    <h4>Profile Updated Successfully</h4>
                    <HighlightOff onClick={() => setUpdated(false)} className="close__update_message" />
                </div>
            )}
            <div className="edit__profile d__flex align__center">

                <div className="edit__profile_wrapper">
                    <h2 className="edit__profile_title">Hello<span> {profile.firstName} </span> want to change anything?</h2>
                    <form onSubmit={handleSubmit} className="edit__profile_form">
                        <div className="form__input_box d__flex">
                            <div className="input__half">
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    className="edit__form_input"
                                    name="firstName"
                                    id="firstName"
                                    onChange={handleChange}
                                    value={editData.firstName}
                                />
                            </div>
                            <div className="input__half">
                                <label htmlFor="lastName">First Name</label>
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    className="edit__form_input"
                                    name="lastName"
                                    id="lastName"
                                    onChange={handleChange}
                                    value={editData.lastName}
                                />
                            </div>
                        </div>
                        <div className="form__input_box d__flex">
                            <div className="input__half">
                                <label htmlFor="birthday">Birthday</label>
                                <input
                                    type="date"
                                    name="birthday"
                                    id="birthday"
                                    className="edit__form_input"
                                    onChange={handleChange}
                                    value={editData.birthday}
                                />
                            </div>
                            <div className="input__half">
                                <label htmlFor="relationship">Relationship</label>
                                <input
                                    type="text"
                                    name="relationship"
                                    id="relationship"
                                    placeholder="Relationship status"
                                    className="edit__form_input"
                                    onChange={handleChange}
                                    value={editData.relationship}
                                />
                            </div>
                        </div>
                        <div className="form__input_box">
                            <div className="input__full">
                                <label htmlFor="address">Address</label>
                                <input
                                    name="address"
                                    id="address"
                                    placeholder="Address"
                                    className="edit__form_input"
                                    onChange={handleChange}
                                    value={editData.address}
                                />
                            </div>
                        </div>
                        <div className="form__input_box">
                            <div className="input__full">
                                <label htmlFor="bio">Bio</label>
                                <textarea
                                    name="bio"
                                    id="bio"
                                    placeholder="Your bio"
                                    className="edit__form_input"
                                    onChange={handleChange}
                                    value={editData.bio}
                                ></textarea>
                            </div>
                        </div>
                        <div className="form__input_box">
                            <div className="input__full">
                                <button
                                    type="submit"
                                    className="edit__profile_submit"
                                    disabled={formEmpty}
                                >Update</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
