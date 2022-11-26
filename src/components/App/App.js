import './App.css';

import {Route, Switch} from "react-router-dom";
import {useState} from "react";
import Main from "../Main/Main";
import Header from "../Header/Header";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile";
import Page404 from "../Page404/Page404";
import Footer from "../Footer/Footer";


const headerPaths = ['/movies', '/saved-movies', '/profile', '/'];
const footerPaths = ['/movies', '/saved-movies', '/'];


export default function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isBurgerOpened, setIsBurgerOpened] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  
  function onClickBurger() {
    setIsBurgerOpened(!isBurgerOpened);
  }
  
  function handleRegister() {
  } // заглушка
  function handleLogin() {
    setLoggedIn(true)
  }
  function handleSignOut(){
    setLoggedIn(false)
    setCurrentUser({ name:"", email:"" })
  }
  function handleProfile({ name, email }) {
    setCurrentUser({ name, email })
  }
  
  return (
    <div className="app">
      
      <CurrentUserContext.Provider value={currentUser}>
        <Route exact path={headerPaths}>
          <Header
            loggedIn={true/*loggedIn*/}
            onClickBurger={onClickBurger}
            isBurgerOpened={isBurgerOpened}
          />
        </Route>
        <Switch>
          <Route exact path='/'>
            <Main/>
          </Route>
          <Route exact path='/signup'>
            <Register handleRegister={handleRegister}/>
          </Route>
          <Route exact path='/signin'>
            <Login handleLogin={handleLogin}/>
          </Route>
          <Route exact path='/movies'>
            <Movies/>
          </Route>
          <Route exact path='/saved-movies'>
            <Movies/>
          </Route>
          <Route exact path='/profile'>
            <Profile
              loggedIn={loggedIn}
              handleProfile={handleProfile}
              handleSignOut={handleSignOut}/>
          </Route>
          <Route path='*'>
            <Page404/>
          </Route>
        </Switch>
        <Route exact path={footerPaths}>
          <Footer/>
        </Route>
      
      </CurrentUserContext.Provider>
    </div>
  )
}
