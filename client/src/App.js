import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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

function App() {
  const [user, setUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [profile, setUserProfile] = useState({});
  const [isLoading, setIsloading] = useState(true);
  const [profilePicture, setProfilePicture] = useState('');
  const [posts, setPosts] = useState([]);

  const sharePic = useRef();
  const topBarPic = useRef();

  useEffect(() => {

    // Get Logged in user's token
    const getToken = async () => {
      try {
        const res = await axios.get('/api/home', { headers: { 'x-access-token': localStorage.getItem('token') } })
        if (res.data.user) {
          setUser(res.data.user)
        }

      } catch (e) {
        console.log(e)
      }
    }
    getToken();


    // Get Loggedin user,s profile
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`/api/profile/${user?.id}`)
        setUserProfile(res.data)
        setProfilePicture(res.data.profilePicture);
        setFollowers(res.data.followers);
        setFollowing(res.data.followings);
        setIsloading(false)
      } catch (e) {
        // error
      }
    }
    fetchProfile();



    // Get posts of users following
    const fetchPosts = async () => {
      const data = {
        userId: user.id
      }

      try {
        const res = await axios.post(`/api/posts`, data)
        setPosts(res.data.reverse());
      } catch (e) {
        // error
      }
    }
    fetchPosts();


    // Get All users
    const fetchAllUsers = async () =>{
      try{
        const res = await axios.get('/api/profile/all-user');
        setAllUsers(res.data)
      }catch(e){
        // error
      }
    }
    fetchAllUsers()


  }, [user.id]);


  return (
    <UserContext.Provider value={{ user, sharePic, topBarPic, profile, profilePicture, posts, isLoading , setUserProfile,  setProfilePicture, setPosts, following }}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/profile/:id">
            <Profile />
          </Route>
          <Route exact path="/profile/edit/:id">
            <EditProfile />
          </Route>
          <Route exact path="/sidebar">
            <>
              <Topbar />
              <Sidebar />
            </>
          </Route>
          <Route exact path="/people/all">
            <User users={allUsers} title="All Users" />
          </Route>
          <Route exact path="/followers" >
            <User users={followers} title="Followers"/>
          </Route>
          <Route exact path="/following" >
            <User users={following} title="Following"/>
          </Route>
          <Route exact path="/auth/login">
            <Login />
          </Route>
          <Route exact path="/auth/register">
            <Register />
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
