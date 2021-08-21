import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './home.css';
import Topbar from '../../components/topbar/Topbar';
import Feed from '../../components/feed/Feed';
import Sidebar from '../../components/sidebar/Sidebar';
import Widget from '../../components/widget/Widget';


function Home() {
    const history = useHistory()
    // Checking if user is logged in

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            history.push('/auth/login')
        }
    },[history])
    return (
        <>
            <Topbar />
            <div className="home main__content d__flex">
                <Sidebar />
                <Feed />
                <Widget />
            </div>
        </>
    )
}

export default Home
