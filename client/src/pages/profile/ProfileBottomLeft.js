import { Cake, Home, Favorite, RssFeed } from '@material-ui/icons';
import { useState, useEffect } from 'react';
import Friend from './friends/Friend';
import axios from 'axios';

const PF = process.env.REACT_APP_DEFAULT_FOLDER

export default function ProfileBottomLeft({ profile }) {

    const [followers, setFollowers] = useState([])
    const [followings, setFollowings] = useState([])

    useEffect(() => {
        const fetchFollowers = async () => {
            try {
                const res = await axios.get(`/api/profile/followers/${profile?._id}`)
                setFollowers(res.data.followers)
            } catch (e) {
                // error
            }
        }


        const fetchAllFollowings = async () => {
            try {
                const res = await axios.get(`/api/profile/followings/${profile?._id}`)
                setFollowings(res.data.followings)
            } catch (e) {
                // error
            }
        }


        fetchAllFollowings();
        fetchFollowers();
    }, [profile._id])


    

    return (
        <div className="profile__bottom_left">
            <div className="profile__leftbar_item">
                <h4 className="leftbar__item_title">Intro</h4>
                <p className="profile__bio">
                    {profile?.bio}
                </p>
                <hr className="hr_fade" />

                {profile.birthday && (
                    <p className="profile__works d__flex align__center">
                        <Cake className="profile__work_icon" />
                        <span>Birthday <strong>{new Date(profile.birthday).toLocaleDateString()}</strong></span>
                    </p>
                )}
                {profile.address && (
                    <p className="profile__works d__flex align__center">
                        <Home className="profile__work_icon" />
                        <span>Lives in <strong>{profile.address}</strong></span>
                    </p>
                )}
                {profile.relationship && (
                    <p className="profile__works d__flex align__center">
                        <Favorite className="profile__work_icon" />
                        <span>Relationship Status <strong>{profile.relationship}</strong></span>
                    </p>
                )}
                <p className="profile__works d__flex align__center">
                    <RssFeed className="profile__work_icon" />
                    <span>Followed by <strong> {profile?.followers && profile.followers.length}</strong> people</span>
                </p>
            </div>

            <div className="profile__leftbar_item">
                <div className="profile__leftbar_friendlist d__flex align__centers">
                    <h4 className="leftbar__item_title">Followings</h4>
                    <span>See All Followings</span>
                </div>
                <p className="total__friends">{profile?.followers && profile.followings.length} Followings</p>
                <div className="profile__leftbar_friends">

                    {followings.map(following => (
                        <Friend name={following?.firstName} image={PF+following?.profilePicture} url={`/profile/${following._id}`} key={following._id} />
                    ))}

                </div>
            </div>

            <div className="profile__leftbar_item">
                <div className="profile__leftbar_friendlist d__flex align__centers">
                    <h4 className="leftbar__item_title">Followers</h4>
                    <span>See All Followers</span>
                </div>
                <p className="total__friends">{profile?.followers && profile.followers.length} followers</p>
                <div className="profile__leftbar_friends">

                    {followers.map(follower => (
                        <Friend name={follower?.firstName} image={PF+follower?.profilePicture} url={`/profile/${follower._id}`} key={follower._id}  />
                    ))}

                </div>
            </div>
        </div>
    )
}
