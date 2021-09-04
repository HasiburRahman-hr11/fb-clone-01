import './home.css';
import Topbar from '../../components/topbar/Topbar';
import Feed from '../../components/feed/Feed';
import Sidebar from '../../components/sidebar/Sidebar';
import Widget from '../../components/widget/Widget';


function Home() {
  
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
