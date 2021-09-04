import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './topbar.css';

// Material Icons
import { Search, OndemandVideo, Storefront, Home, SupervisedUserCircle, Flag, Add, Forum, NotificationsActive, ExpandMore, Menu, ChevronLeft } from '@material-ui/icons';
import { IconButton , CircularProgress } from '@material-ui/core';

import Loading from '../loading/Loading';

// Context
import UserContext from '../../context/UserContext';


export default function Topbar() {
    const { user, topBarPic, profile, isLoading, profilePicture } = useContext(UserContext);

    const [isSearch, setIsSearch] = useState(false);
    const [searchResult, setSearchResult] = useState(false);
    const [terms, setTerms] = useState('');
    const [searchResponse, setSearchResponse] = useState([]);
    const [loading , setLoading] = useState(false)

    const searchHandler = async (term) => {
        try {
            const res = await axios.get(`/api/search?term=${term}`)
            if (res.status === 200) {
                setSearchResponse(res.data)
                if(res.data.length > 0){
                    setLoading(false)
                }
            }
            if(res.status === 404){
                setLoading(false)
            }
            
        } catch (e) {
            console.log( e)
        }
    }

    const searchChange = (e) => {
        setTerms(e.target.value.toLowerCase());
        if(e.target.value.length > 1){
            setLoading(true)
        }else{
            setLoading(false)
        }
        searchHandler(e.target.value)
        
    }

    return (
        <>
            {isLoading && (
                <Loading />
            )}

            <div className="topbar d__flex align__center">
                <div className="topbar__left d__flex align__center">
                    <div className={searchResult ? 'logo hide' : 'logo'}>
                        <Link to="/">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                                alt="Logo"
                            />
                            <span className="mobile__logo">Facebook</span>
                        </Link>
                    </div>
                    {searchResult && (
                        <IconButton
                            className="search__result_close"
                            onClick={() => setSearchResult(false)}>
                            <ChevronLeft />
                        </IconButton>
                    )}
                    <div className="search_bar" >

                        <Search
                            className={searchResult ? 'search__icon hide' : 'search__icon'}
                            onClick={() => setIsSearch(true)} />

                        <div className={!isSearch ? 'search_wrapper' : 'search_wrapper active'}>
                            <div className="search__input_wrapper">

                                <IconButton
                                    className="search__close"
                                    onClick={() => { setIsSearch(false); setSearchResult(false) }}>
                                    <ChevronLeft />
                                </IconButton>

                                <input
                                    type="text"
                                    placeholder="Search Facebook"
                                    id="search"
                                    name="search"
                                    onChange={searchChange}
                                    className="search__input"
                                    onClick={() => setSearchResult(true)}
                                />
                            </div>
                            <div className={searchResult ? 'search__result_wrapper active' : 'search__result_wrapper'}>
                                
                                <div className="search__result_item">
                                    {searchResponse && searchResponse.map((result, index) => (
                                        <div key={index} className="search__result_item_wrapper" onClick={() => { setIsSearch(false); setSearchResult(false) }} >
                                            {result.profilePicture && (
                                                <Link to={`/profile/${result._id}`} className="d__flex align__center">
                                                    <div className="result__img">
                                                        <img src={result.profilePicture} alt="Profile" />

                                                    </div>
                                                    <div className="result__text">
                                                        <h4>{result.firstName + ' ' + result.lastName}</h4>
                                                    </div>
                                                </Link>
                                            )}
                                            {result.thumbnail && (
                                                <Link to={`/profile/${result.author}`} className="d__flex align__center">
                                                    <div className="result__img">
                                                        <img src={result.thumbnail} alt="Thumbnail" />

                                                    </div>
                                                    <div className="result__text">
                                                        <h4>{result.description.substr(0 , 20) + '...'}</h4>
                                                    </div>
                                                </Link>

                                            )}


                                        </div>
                                    ))}
                                </div>
                                {loading && (
                                    <div className="loading__spinner">
                                        <CircularProgress className="loading__spinner_icon" color="primary" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="topbar__center">
                    <div className="topbar__options d__flex align__center">
                        <Link to="/" className="topbar__option active">
                            <Home className="topbar__option_icon" />
                        </Link>
                        <div className="topbar__option">
                            <OndemandVideo className="topbar__option_icon" />
                        </div>
                        <div className="topbar__option">
                            <Storefront className="topbar__option_icon" />
                        </div>

                        <div className="topbar__option">
                            <Flag className="topbar__option_icon" />
                        </div>
                        <div className="topbar__option option__hide_small">
                            <SupervisedUserCircle className="topbar__option_icon" />
                        </div>
                        <Link to="/sidebar" className="topbar__option option__menu">
                            <Menu className="topbar__option_icon" />
                        </Link>
                    </div>
                </div>
                <div className="topbar__right d__flex align__center">
                    <Link to={`/profile/${user?.id}`} className="topbar__info d__flex align__center">
                        <img src={profilePicture === '/uploads/avatar.png' ? process.env.REACT_APP_DEF_FOLDER+profilePicture : profilePicture} className="topbar__info_icon" alt="Profile" ref={topBarPic} />
                        <h4>{profile?.firstName?.toUpperCase()}</h4>
                    </Link>
                    <div className="topbar__action_btns">
                        <IconButton className="topbar__action_btn">
                            <Add />
                        </IconButton>
                        <IconButton className="topbar__action_btn">
                            <Forum />
                        </IconButton>
                        <IconButton className="topbar__action_btn">
                            <NotificationsActive />
                        </IconButton>
                        <IconButton className="topbar__action_btn">
                            <ExpandMore />
                        </IconButton>
                    </div>
                </div>
            </div>

        </>
    )
}
