import './widget.css';
import { MoreHoriz, Cake } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import Active from './active/Active';
import UserContext from '../../context/UserContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom'

const PF = process.env.REACT_APP_DEFAULT_FOLDER

export default function Widget() {
    const { following } = useContext(UserContext);
    console.log(following)
    return (
        <div className="widget scrollbar">
            <div className="widget__wrapper">
                {/* Notification */}
                <div className="widget__notifications">
                    <div className="notification__item">
                        <div className="notification__header d__flex align__center">
                            <span></span>
                            <IconButton className="notification__option">
                                <MoreHoriz />
                            </IconButton>
                        </div>
                        <div className="notification__body d__flex">
                            <Cake className="notification__icon" />
                            <p><strong>Sakib Al Hasan</strong> and <strong>6 others </strong> have birthdays today. Wish the good thaughts!</p>
                        </div>
                    </div>

                </div>
                <hr className="hr_fade" />

                {/* Sponsored */}
                <div className="widget__sponsored">
                    <p className="widget__list_title">Sponsored</p>
                    <ul className="sponsored__list">
                        <li className="sponsored__list_item d__flex align__center">
                            <div className="sponsored__img">
                                <img src="https://images.pexels.com/photos/2292953/pexels-photo-2292953.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" alt="Sponsored" />
                            </div>
                            <div className="sponsored__content">
                                <h3 className="sponsored__item_title">50% off today</h3>
                                <p className="sponsored__url">www.freenow.com</p>
                            </div>
                        </li>
                        <li className="sponsored__list_item d__flex align__center">
                            <div className="sponsored__img">
                                <img src="https://images.pexels.com/photos/626986/pexels-photo-626986.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" alt="Sponsored" />
                            </div>
                            <div className="sponsored__content">
                                <h3 className="sponsored__item_title">Black Friday 50% off</h3>
                                <p className="sponsored__url">www.grabnow.com</p>
                            </div>
                        </li>
                    </ul>
                </div>

                {/* Active Friends */}
                <div className="active__friend_list">

                    {following && following.map((f, i) => (
                        <Link key={i} to={`/profile/${f._id}`}>
                            <Active  image={PF + f.profilePicture} title={f?.firstName + ' ' + f?.lastName} />
                        </Link>

                    ))}
                </div>
            </div>
        </div>
    )
}
