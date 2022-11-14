import {Route, Switch} from "react-router-dom";
import Main from "../Main/Main";
import {useState} from "react";
import Header from "../Header/Header";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Page404 from "../Page404/Page404";
import Footer from "../Footer/Footer";


const headerPaths = ['/movies', '/saved-movies', '/profile', '/'];
const footerPaths = ['/movies', '/saved-movies', '/'];


export default function App() {

    const [isBurgerOpened, setIsBurgerOpened] = useState(false);
    // const [loggedIn, setLoggedIn] = useState(false);

    function onClickBurger() {
        setIsBurgerOpened(!isBurgerOpened);
    }

    function handleRegister() {
    } // заглушка
    function handleLogin() {
    } // заглушка

    return (
        <div className="app">
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
                    <SavedMovies/>
                </Route>
                <Route exact path='/profile'>
                    <Profile/>
                </Route>
                <Route path='*'>
                    <Page404/>
                </Route>
            </Switch>
            <Route exact path={footerPaths}>
                <Footer/>
            </Route>
        </div>
    )
}
