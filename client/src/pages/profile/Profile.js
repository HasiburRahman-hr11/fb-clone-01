import { useParams, Link, useHistory } from 'react-router-dom';
import { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';

// Material Icons
import { Edit, CameraAlt, Delete, Cancel, GroupAdd } from '@material-ui/icons';

import Topbar from '../../components/topbar/Topbar';
// Profile Dependencies
import './profile.css';
import ProfileBottomLeft from './ProfileBottomLeft'
import Share from '../../components/share/Share';
import Post from '../../components/post/Post';
import Button from '../../components/button/Button';
import Loading from '../../components/loading/Loading';

// Context 
import UserContext from '../../context/UserContext';



export default function Profile() {

    const { user, sharePic, topBarPic, setProfilePicture } = useContext(UserContext)
    const params = useParams();

    const [profile, setProfile] = useState({});
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsloading] = useState(null);
    const [deleteModal, setDeleteModal] = useState(false);
    const [followings, setFollowings] = useState(null)

    

    
    const history = useHistory();
    const profilePic = useRef();
    const coverPic = useRef();



    useEffect(() => {

        const fetchProfile = async () => {
            setIsloading(true)
            try {
                const res = await axios.get(`/api/profile/${params?.id}`)
                setProfile(res.data)
                setPosts(res.data.posts.reverse())
                res.data.followers.forEach((follower)=>{
                    setFollowings(Object.values(follower).includes(user?.id))
                })

                setIsloading(false)
            } catch (e) {
                // error
            }
        }
        fetchProfile();




    }, [params.id, history, user?.id]);



    const uploadProfilePicture = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('profile-picture', file);

        try {
            const res = await axios.post(`/profile/upload-profile/${params?.id}`, formData)
            console.log(res)
            profilePic.current.src = res.data.newProfilePicture;
            sharePic.current.src = res.data.newProfilePicture;
            topBarPic.current.src = res.data.newProfilePicture;
            setProfilePicture(res.data.newProfilePicture);
        } catch (error) {
            // error
            console.log(error)
        }

    }

    const uploadCoverPhoto = async (e) => {

        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('cover-photo', file);

        try {
            const res = await axios.post(`/profile/upload-cover/${params?.id}`, formData)
            coverPic.current.src = res.data.newcoverPhoto;
        } catch (e) {
            // error
        }

    }

    // Delete Profile
    const deleteProfileHandler = async () => {
        try {

            const res = await axios.delete(`/profile/delete/${params?.id}`)
            if (res.status === 200) {
                localStorage.removeItem('token');
                history.push('/auth/login')
                window.location.reload();
            }
        } catch (e) {
            // error
        }
    }


    //  Follow User
    const handleFollow = async () => {
        const sender = user.id
        try {
            const res = await axios.put(`/profile/follow/${params?.id}`, { senderId: sender })
            if (res.status === 200) {
                setFollowings(!followings)
            }
        } catch (e) {
            // error
        }
    }


    return (
        <>
            {isLoading && (
                <Loading />
            )}
            <Topbar />

            <div className="profile">
                <div className="profile__top">
                    <div className="profile__top_wrapper">
                        <div className="profile__images">
                            <img src={profile.coverPhoto === '/uploads/cover.jpg' ? process.env.REACT_APP_DEF_FOLDER+profile.coverPhoto : profile?.coverPhoto} alt="Profile Cover" className="cover__photo" ref={coverPic} />
                            {user?.id === profile?.user && (
                                <label htmlFor="cover-photo" className="edit__cover">
                                    <Edit className="edit__cover_icon" />
                                    <input type="file" name="cover-photo" id="cover-photo" hidden onChange={uploadCoverPhoto} />
                                </label>
                            )}

                            <div className="profile__picture">
                                <img src={profile.profilePicture === '/uploads/avatar.png' ? process.env.REACT_APP_DEF_FOLDER+profile?.profilePicture : profile?.profilePicture} alt="Profile" id="profilePicture" ref={profilePic} />
                                {user?.id === profile?.user && (
                                    <label htmlFor="profile-picture" className="upload__profile_pic">
                                        <CameraAlt className="upload__profile_icon" />
                                        <input type="file" name="profile-picture" id="profile-picture" hidden onChange={uploadProfilePicture} />
                                    </label>
                                )}

                            </div>
                            <div className="profile__meta d__flex align__center">
                                <h2 className="profile__username">
                                    {profile?.firstName + ' ' + profile?.lastName}
                                </h2>

                                {user?.id === profile?.user ? (
                                    <div className="d__flex align__center profile__meta_btns">
                                        <Button classes="edit__profile_btn d__flex align__center">
                                            <Link to={`/profile/edit/${profile._id}`}>
                                                <Edit className="edit__profile_icon" />
                                                Edit Profile
                                            </Link>
                                        </Button>


                                        <Button classes="edit__profile_btn delete__profile_btn d__flex align__center" clickEvent={() => setDeleteModal(true)}>
                                            <Delete className="delete__profile_icon" />
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="d__flex align__center profile__meta_btns">
                                        <Button classes="edit__profile_btn follow__profile_btn d__flex align__center" clickEvent={handleFollow}>
                                            <GroupAdd className="edit__profile_icon" />
                                            {followings ? 'Unfollow' : 'Follow'}
                                            
                                        </Button>
                                    </div>
                                )}

                            </div>
                        </div>

                    </div>
                </div>
                <div className="profile__bottom">
                    <div className="profile__bottom_wrapper d__flex">

                        <ProfileBottomLeft profile={profile} />


                        <div className="profile__bottom_right">
                            <div className="feed">
                                {user?.id === profile?.user ? (
                                    <Share user={user} />
                                ) : ''}

                                {posts ? posts.map((post) => (
                                    <Post isUser={user?.id === profile?.user} key={post._id} post={post} />
                                )) : ''}

                                {posts.length < 1 && (
                                    <h2 className="no__post">No Post yet!</h2>
                                )}
                            </div>
                        </div>


                    </div>
                </div>
            </div>



            {/* Modal */}
            {deleteModal && (
                <div className="delete__modal d__flex align__center">
                    <div className="delete__modal_wrapper">
                        <Cancel className="delete__modal_icon" onClick={() => setDeleteModal(false)} />
                        <div className="delete__modal_header">
                            <h4>Delete Account? </h4>
                        </div>
                        <div className="delete__modal_content d__flex align__center">
                            <Button classes="delete__modal_btn" clickEvent={deleteProfileHandler}>
                                Delete
                            </Button>
                            <Button classes="cancel__modal_btn" clickEvent={() => setDeleteModal(false)}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
