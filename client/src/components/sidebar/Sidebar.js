import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
// import axios from 'axios';

// Sidebar Dependencies
import './sidebar.css';
import SidebarItem from './sidebar-item/SidebarItem';

// Material Icons
import { EmojiFlags, People, SupervisedUserCircle, ExpandMoreOutlined, ExitToApp } from '@material-ui/icons';

import Loading from '../loading/Loading';

// Context
import UserContext from '../../context/UserContext';
import { logout } from '../../context/authContext/authActions';
import { AuthContext } from '../../context/authContext/authContext';


export default function Sidebar() {
    const { user, profile, profilePicture, isLoading } = useContext(UserContext);
    const {dispatch} = useContext(AuthContext)


    const history = useHistory();

    const handleLogout = () => {
        localStorage.removeItem("fb_token");
        localStorage.removeItem("fb_user");
        dispatch(logout())
        history.push('/auth/login')
    }
    return (
        <div className="sidebar scrollbar">
            {isLoading && (
                <Loading />
            )}
            <Link to={`/profile/${user?.id}`}>
                <SidebarItem src={profilePicture === '/uploads/avatar.png' ? process.env.REACT_APP_DEF_FOLDER+profilePicture : profilePicture}  title={profile?.firstName + ' ' + profile?.lastName} />
            </Link>
            <Link to="/followers">
                <SidebarItem Icon={People} title="Followers" />
            </Link>
            <Link to="/following">
                <SidebarItem Icon={SupervisedUserCircle} title="Following" />
            </Link>

            <Link to="/people/all">
                <SidebarItem Icon={EmojiFlags} title="Find People" />
            </Link>

            <div className="sidebar__item d__flex align__center" onClick={handleLogout}>
                <ExitToApp className="sidebar__icon" />
                <p className="sidebar__item_title">Logout</p>
            </div>

            <SidebarItem Icon={ExpandMoreOutlined} title="More" />
            <hr className="hr_fade" />
        </div>
    )
}
