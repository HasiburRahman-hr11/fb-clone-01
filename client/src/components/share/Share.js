import { useContext, useState } from 'react';
import axios from 'axios';

// Material Icons
import { LocationOn, PermMedia, Mood, Close } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

// Share Dependency
import './share.css';

// Context
import UserContext from '../../context/UserContext';


export default function Share() {
    const { user, sharePic , profile , profilePicture , isLoading  ,setPosts } = useContext(UserContext)

    const [modal, setModal] = useState(false);
    const [file, setFile] = useState('');
    const [text, setText] = useState('')

    const userId = user?.id

    const formData = new FormData()
    formData.append('description', text)
    formData.append('userId', userId)
    formData.append('post-thumbnail', file)



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('/api/posts/create-post', formData, { headers: { 'Content-Type': 'multipart/form-data' } })

            setPosts(res.data.reverse());
            setText('')

        } catch (e) {
            // error
        }
    }


    return (
        <>
            {isLoading && (
                <div className="loader">
                    <span>L</span>
                    <span>O</span>
                    <span>A</span>
                    <span>D</span>
                    <span>I</span>
                    <span>N</span>
                    <span>G</span>
                </div>
            )}
            <div className="share__post">
                <div className="share__wrapper">
                    <div className="share__top d__flex align__center">
                        <img src={profilePicture === '/uploads/avatar.png' ? process.env.REACT_APP_DEF_FOLDER+profilePicture : profilePicture}  className="share__profile_pic" alt="Profile" ref={sharePic} />
                        <div className="share__fake_form">
                            <p  
                                className="share__fake_input d__flex align__center"
                                onClick={() => setModal(true)}
                            >{`Whats on your mind, ${profile?.firstName}?`}</p>
                        </div>
                    </div>
                    <hr className="hr_fade" />
                    <div className="share__bottom">
                        <form className="share__actions d__flex align__center">
                            <div className="share__action share__action_bg d__flex align__center" onClick={() => setModal(true)}>
                                <LocationOn className="share__icon share__icon_live" />
                                <span className="share__action_text">Location</span>
                            </div>
                            <div htmlFor="file" className="share__action share__action_bg d__flex align__center" onClick={() => setModal(true)}>
                                <PermMedia className="share__icon share__icon_media" />
                                <span className="share__action_text">Photo/Video</span>
                            </div>
                            <div className="share__action share__action_bg d__flex align__center" onClick={() => setModal(true)}>
                                <Mood className="share__icon share__icon_feeling" />
                                <span className="share__action_text">Feelings/Activity</span>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Modal */}
                <div className={modal ? 'share__modal d__flex align__center active' : 'share__modal d__flex align__center'}>
                    <div className="share__modal_content">
                        <div className="share__modal_header d__flex align__center">
                            <div></div>
                            <h2>Create Post</h2>
                            <IconButton className="modal__close_icon" onClick={() => setModal(false)}>
                                <Close />
                            </IconButton>
                        </div>
                        <div className="share__modal_body">
                            <div className="share__modal_info d__flex align__center">
                                <img src={profilePicture} className="share__profile_pic" alt="profile" />
                                <div className="share__user_info">
                                    <h4>{profile?.firstName + ' ' + profile?.lastName}</h4>
                                </div>
                            </div>
                            <div className="share__form_wrapper">
                                <form
                                    action="/posts/create-post"
                                    className="share__form"
                                    encType="multipart/form-data"
                                    onSubmit={handleSubmit}>
                                    <div className="share__scroll scrollbar">
                                        <textarea
                                            placeholder={`Whats on your mind, ${profile?.firstName}?`}
                                            className="share__modal_textarea"
                                            name="description"
                                            onChange={(e) => setText(e.target.value)}
                                            value={text}
                                        ></textarea>
                                        {file && (
                                            <div className="share__modal_img">
                                                <h5>{file.name}</h5>
                                            </div>
                                        )}
                                    </div>

                                    <div className="share__modal_icons d__flex align__center">
                                        <div className="share__action share__action_bg d__flex align__center">
                                            <LocationOn className="share__icon share__icon_live" />
                                            <span className="share__action_text">Location</span>
                                        </div>
                                        <label htmlFor="post-thumbnail" className="share__action share__action_bg d__flex align__center">
                                            <PermMedia className="share__icon share__icon_media" />
                                            <span className="share__action_text">Photo/Video</span>
                                            <input
                                                type="file"
                                                id="post-thumbnail"
                                                name="post-thumbnail"
                                                accept=".png,.jpeg,.jpg"
                                                hidden
                                                onChange={(e) => setFile(e.target.files[0])}
                                            />
                                        </label>
                                        <div className="share__action share__action_bg d__flex align__center">
                                            <Mood className="share__icon share__icon_feeling" />
                                            <span className="share__action_text">Feelings/Activity</span>
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="share__submit"
                                        onClick={() => setModal(false)}
                                        disabled={!text && !file}
                                    >Post</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
