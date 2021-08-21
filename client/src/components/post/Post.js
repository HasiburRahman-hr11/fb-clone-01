import './post.css';
import { Public, Favorite, ChatBubbleOutline, Delete } from '@material-ui/icons';
import ReactReadMoreReadLess from "react-read-more-read-less";
import { Link } from 'react-router-dom';
import moment from 'moment';
import UserContext from '../../context/UserContext';
import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Button from '../button/Button';




export default function Post({ post, isUser }) {
    const { user , setPosts } = useContext(UserContext)

    let [liked, setLiked] = useState(false);
    let [totalLike, setTotalLike] = useState(null);
    const [modal, setModal] = useState(false);


    const handleLike = async () => {
        try {
            const data = {
                userId: user.id
            }

            const res = await axios.put(`/posts/like/${post._id}`, data);
            if (res.status === 200) {
                setLiked(!liked)
            }
            if (res.data.liked) {
                setTotalLike(res.data.totalLikes + 1)
            } else {
                setTotalLike(res.data.totalLikes - 1)
            }


        } catch (e) {
            // error
        }
    }


    // Delete Post
    const handlePostDelete = async () => {
        try{
             const res = await axios.delete(`/posts/delete/${post._id}` , {data:{userId:user?.id}});
            setModal(false);
            setPosts(res.data.reverse());
            // window.location.reload(false);
        }catch(e){
            //error
        }
    }


    useEffect(() => {
        setTotalLike(post.likes.length)
        setLiked(post.likes.includes(user.id))
    }, [post, user.id])

    return (
        <div className="posts">
            <div className="post__wrapper">
                <div className="post__top d__flex align__center">
                    <div className="post__top_info d__flex align__center">
                        <Link to={`/profile/${post.author._id}`}>
                            <img src={post.author.profilePicture} className="post__top_avatar" alt="Profile" />
                        </Link>
                        <div>
                            <Link to={`/profile/${post.author._id}`}>
                                <h4>{post.author.firstName + ' ' + post.author.lastName}</h4>
                            </Link>
                            <p className="post__time d__flex align__center">{moment(post.createdAt).fromNow()} <span><Public className="post__info_icon" /></span> </p>
                        </div>
                    </div>

                    {isUser && (
                        <div>
                            <Delete className="post__delete_icon" onClick={()=>setModal(true)}/>
                            {/* Delete Post Modal */}
                            {modal && (
                                <div className="delete__post_modal d__flex align__center">
                                    <div className="modal__wrapper">
                                        <h2>Delete Post?</h2>
                                        <div className="modal__content d__flex align__center">
                                            <Button classes="delete__confirm" clickEvent={handlePostDelete}>Delete</Button>
                                            <Button classes="cancel__modal" clickEvent={()=>setModal(false)} >
                                                Cancel
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                </div>
                <div className="post__middle">
                    <div className="post__content">
                        <ReactReadMoreReadLess
                            charLimit={200}
                            readMoreText={"Show more"}
                            readLessText={"Show less"}
                        >
                            {post.description}
                        </ReactReadMoreReadLess>

                    </div>
                    {post?.thumbnail && (
                        <div className="post__thumbnail">
                            <img src={post.thumbnail} alt="Post Thumbnail" />
                        </div>
                    )}
                </div>
                <div className="post__bottom d__flex align__center">
                    <div className="post__action_btn">
                        <p className="d__flex align__center">
                            <Favorite className={liked ? 'post__liked post__action_icon' : 'post__action_icon'} />
                            <span>{totalLike > 1 ? totalLike + ' Likes' : totalLike + ' Like'} </span>
                        </p>
                    </div>
                    <div className="post__action_btn">

                        <p className="d__flex align__center">
                            <ChatBubbleOutline className="post__action_icon" />
                            <span>101 Comments</span>
                        </p>
                    </div>
                </div>
                <div className="post__reacttions_wrapper">
                    <div className="post__reacttions d__flex align__center">
                        <div className={liked ? 'post__like_btn post__liked' : 'post__like_btn'} onClick={handleLike}>
                            {liked ? 'Liked' : 'Like'}
                        </div>
                        <div className="post__comment_btn">
                            Comment
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
