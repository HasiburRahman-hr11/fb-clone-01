import React, { useContext, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import './users.css';
import Topbar from '../../components/topbar/Topbar';
import Loading from '../../components/loading/Loading';
import UserContext from '../../context/UserContext';
import Sidebar from '../../components/sidebar/Sidebar';


export default function User({ users, title }) {
    const { isLoading } = useContext(UserContext);

    const history = useHistory()
    // Checking if user is logged in

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            history.push('/auth/login')
        }
    }, [history]);

    // Sort Users
    users.sort(function(a, b){
        if(a.firstName < b.firstName) { return -1; }
        if(a.firstName > b.firstName) { return 1; }
        return 0;
    })


    return (
        <>
            {isLoading && (
                <Loading />
            )}
            <Topbar />
            <div className="all__users d__flex">
                <Sidebar />
                <div className="all__users_wrapper">
                    <h2 className="page__title">{title}</h2>
                    <div className="user__list_group d__flex">
                        {users?.length > 0 && users.map(user => (
                            <Link to={`/profile/${user._id}`} key={user._id} className="user__list_item">
                                <div className="user__profilePic">
                                    <img src={user.profilePicture} alt="Profile Pic" />
                                </div>
                                <div className="user__info">
                                    <h2>{user.firstName + ' ' + user.lastName}</h2>
                                </div>
                            </Link>
                        ))}
                    </div>
                    {users?.length < 1 && (
                        <h1 className="no__user">Nothin found!</h1>
                    )}
                </div>
            </div>
        </>
    )
}
