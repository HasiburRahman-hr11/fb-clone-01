import './error.css';
import Topbar from '../../components/topbar/Topbar';

export default function Error() {
    return (
        <>
            <Topbar/>
            <div className="error__page">
                <div className="error__page_wrapper">
                    <p>Opps! page not found</p>
                    <h2>404</h2>
                    <p>The page you reached could not found</p>
                </div>
            </div>
        </>
    )
}
