import './feed.css'
import Stories from '../stories/Stories'
import Share from '../share/Share'
import Post from '../post/Post';

import { useContext } from 'react';

import UserContext from '../../context/UserContext';
import { Link } from 'react-router-dom';

export default function Feed() {
    const { posts } = useContext(UserContext)

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
                <>
                    <h2 className="no__post mb-3">No Post found!</h2>
                    <p style={{fontSize:'17px'}}>
                        <Link to="/people/all">
                            <strong style={{ color: '#1877F2' }} >Follow </strong>
                        </Link> 
                        people to see their posts or create one.
                    </p>
                </>
            )}
        </div>
    )
}
