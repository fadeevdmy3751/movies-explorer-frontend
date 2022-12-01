import './App.css';

import {Route, Switch, useHistory} from "react-router-dom";
import {useEffect, useState} from "react";
import Main from "../Main/Main";
import Header from "../Header/Header";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile";
import Page404 from "../Page404/Page404";
import Footer from "../Footer/Footer";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Preloader from "../Preloader/Preloader";
import getAllMovies from "../../utils/MoviesApi";


const headerPaths = ['/movies', '/saved-movies', '/profile', '/'];
const footerPaths = ['/movies', '/saved-movies', '/'];


export default function App() {
    const [currentUser, setCurrentUser] = useState({});
    const [isBurgerOpened, setIsBurgerOpened] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const history = useHistory()

    function onClickBurger() {
        setIsBurgerOpened(!isBurgerOpened);
    }

    function closeBurger() {
        setIsBurgerOpened(false)
    }

    function handleLogin({email}) {
        setLoggedIn(true)
        setCurrentUser({name: email.split('@')[0], email})
        history.push('/movies')
    } // заглушка

    function handleSignOut() {
        setLoggedIn(false)
        setCurrentUser({name: "", email: ""})
        localStorage.removeItem("films")
        history.push('/movies')
    }

    return (
        <div className="app">

            <CurrentUserContext.Provider value={currentUser}>
                <Route exact path={headerPaths}>
                    <Header
                        loggedIn={loggedIn}
                        onClickBurger={onClickBurger}
                        isBurgerOpened={isBurgerOpened}
                        closeBurger={closeBurger}
                    />
                </Route>
                <Switch>
                    <Route exact path='/'>
                        <Main/>
                    </Route>
                    <Route exact path='/signup'>
                        <Register/>
                    </Route>
                    <Route exact path='/signin'>
                        <Login handleLogin={handleLogin}/>
                    </Route>
                    <Route exact path= {["/movies", "/saved-movies"]}>
                        <Movies/>
                    </Route>
                    {/*<Route exact path='/saved-movies'>*/}
                    {/*    <Movies/>*/}
                    {/*</Route>*/}
                    <Route exact path='/profile'>
                        <Profile
                            loggedIn={loggedIn}
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
