import './feed.css'
import Stories from '../stories/Stories'
import Share from '../share/Share'
import Post from '../post/Post';

import { useContext } from 'react';

import UserContext from '../../context/UserContext';

export default function Feed() {
    const { posts} = useContext(UserContext)

    return (
        <div className="feed">
            <Stories />
            <Share />
            {
                posts.map(post => (
                    <Post key={post._id} post={post} />
                ))
            }
            {posts.length < 1 && (
                <h2 className="no__post">No Post found!</h2>
            )}
        </div>
    )
}
