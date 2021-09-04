import { useState, useEffect, useRef, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';

// Get token from utils
// import getToken from './utils/getToken';

// Context
import UserContext from './context/UserContext';


import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import EditProfile from './pages/profile/editProfile/EditProfile';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Sidebar from './components/sidebar/Sidebar';
import Topbar from './components/topbar/Topbar';
import Error from './pages/error/Error';
import User from './pages/users/User';
import { AuthContext } from './context/authContext/authContext';


function App() {
  const { user } = useContext(AuthContext)

  const [allUsers, setAllUsers] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [profile, setUserProfile] = useState({});
  const [isLoading, setIsloading] = useState(null);
  const [profilePicture, setProfilePicture] = useState('');
  const [posts, setPosts] = useState([]);

  const sharePic = useRef();
  const topBarPic = useRef();

  useEffect(() => {

    if(!user) return;

    // Get Loggedin user,s profile
    const fetchProfile = async () => {
      setIsloading(true)
      try {
        const res = await axios.get(`/profile/${user?.id}`)
        setUserProfile(res.data)
        setProfilePicture(res.data.profilePicture);
        setFollowers(res.data.followers);
        setFollowing(res.data.followings);
        setIsloading(false)
      } catch (e) {
        // error
      }
    }

    // Get posts of users following
    const fetchPosts = async () => {
      const data = {
        userId: user?.id
      }

      try {
        const res = await axios.post(`/posts`, data)
        setPosts(res.data.reverse());
      } catch (e) {
        // error
      }
    }

    // Get All users
    const fetchAllUsers = async () => {
      try {
        const res = await axios.get('/profile/all-user');
        setAllUsers(res.data)
      } catch (e) {
        // error
      }
    }

    fetchPosts();
    fetchProfile();
    fetchAllUsers()

  }, [user]);


  return (
    <UserContext.Provider value={{ user, sharePic, topBarPic, profile, profilePicture, posts, isLoading, setUserProfile, setProfilePicture, setPosts, following }}>
      <Router>
        <Switch>
          <Route exact path="/">
            {user ? <Home /> : <Redirect to='/auth/login' />}

          </Route>
          <Route exact path="/profile/:id">
            {user ? <Profile /> : <Redirect to='/auth/login' />}

          </Route>
          <Route exact path="/profile/edit/:id">
            <EditProfile />
          </Route>
          <Route exact path="/sidebar">
            {user ? (
              <>
                <Topbar />
                <Sidebar />
              </>
            ) : <Redirect to='/auth/login' />}

          </Route>
          <Route exact path="/people/all">
            {user ? <User users={allUsers} title="All Users" /> : <Redirect to='/auth/login' />}

          </Route>
          <Route exact path="/followers" >
            {user ? <User users={followers} title="Followers" /> : <Redirect to='/auth/login' />}

          </Route>
          <Route exact path="/following" >
            {user ? <User users={following} title="Following" /> : <Redirect to='/auth/login' />}

          </Route>
          <Route exact path="/auth/login">
            {user ? <Redirect to='/' /> : <Login />}
          </Route>
          <Route exact path="/auth/register">
            {user ? <Redirect to='/' /> : <Register />}
          </Route>
          <Route>
            <Error />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
