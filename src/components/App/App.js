import './App.css';

import {Redirect, Route, Switch, useHistory} from "react-router-dom";
import {useEffect, useState} from "react";
import Main from "../Main/Main";
import Header from "../Header/Header";
import Register from "../Register/Register";
import Login from "../Login/Login";
import mainApi from "../../utils/MainApi";
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile";
import Page404 from "../Page404/Page404";
import Footer from "../Footer/Footer";
import useEscapePress from "../../hooks/useEscapePress";
import Preloader from "../Preloader/Preloader";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import MessageBox from "../MessageBox/MessageBox";
import SavedMovies from "../SavedMovies/SavedMovies";
import CurrentUserContext from "../../contexts/CurrentUserContext";


const headerPaths = ['/movies', '/saved-movies', '/profile', '/'];
const footerPaths = ['/movies', '/saved-movies', '/'];


export default function App() {
    const history = useHistory()
    const [currentUser, setCurrentUser] = useState({});
    const [isBurgerOpened, setIsBurgerOpened] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [load, setLoad] = useState(false);
    const [MessageBoxOpen, setMessageBoxOpen] = useState({
        isOpen: false, successful: true, text: '',
    });
    const [savedMoviesList, setSavedMoviesList] = useState([]);

    function onClickBurger() {
        setIsBurgerOpened(!isBurgerOpened);
    }

    useEscapePress(onClickBurger, isBurgerOpened);

    function closeMessageBox() {
        setMessageBoxOpen({...MessageBoxOpen, isOpen: false});
    }

    function closeBurger() {
        setIsBurgerOpened(false)
    }

    function handleRegister({name, email, password}) {
        setLoad(false);
        mainApi
            .createUser(name, email, password)
            .then(data => {
                if (data._id) {
                    handleLogin({email, password});
                }
            })
            .catch(err => setMessageBoxOpen({
                isOpen: true, successful: false, text: 'ошибка регистрации ' + err,
            }))
            .finally(() => setLoad(true));
    }

    function handleLogin({email, password}) {
        setLoad(false);
        localStorage.clear();
        mainApi
            .login(email, password)
            .then((data) => {
                if (!data) {
                    console.log("При авторизации что-то пошло не так!")
                } else {
                    setLoggedIn(true);
                    history.push('/movies');
                    setMessageBoxOpen({
                        isOpen: true, successful: true, text: 'Добро пожаловать!',
                    });
                }
            })
            .catch(err => setMessageBoxOpen({
                isOpen: true, successful: false, text: 'Неверное имя пользователя или пароль',
            }))
            .finally(() => setLoad(true));
    }

    function handleSignOut(emergency = false) {
        setCurrentUser({});
        setLoggedIn(false);
        localStorage.clear();
        if (emergency === false) {
            setMessageBoxOpen({
                isOpen: true, successful: false, text: 'что-то пошло не так, вы были разлогинены',
            })
            return;
        }
        mainApi.logout().then((data) => {
            setMessageBoxOpen({
                isOpen: true, successful: true, text: 'Успешно разлогинен!',
            })
            history.push('/')
        })
            .catch(err => {
                if (err === 'tokenError')
                    handleSignOut(true)
                else
                    setMessageBoxOpen({isOpen: true, successful: false, text: err,})
            })
    }

    function handleProfile({name, email}) {
        setLoad(false);
        mainApi
            .updateUser(name, email)
            .then(newUserData => {
                setCurrentUser(newUserData);
                setMessageBoxOpen({
                    isOpen: true, successful: true, text: 'Ваши данные обновлены!',
                });
            })
            .catch(err => {
                if (err === 'tokenError')
                    handleSignOut(true)
                else
                    setMessageBoxOpen({isOpen: true, successful: false, text: err,})
            })
            .finally(() => setLoad(true));
    }


    function handleSaveMovie(movie) {
        mainApi
            .addNewMovie(movie)
            .then(newMovie => setSavedMoviesList([newMovie, ...savedMoviesList]))
            .catch(err => {
                if (err === 'tokenError')
                    handleSignOut(true)
                else
                    setMessageBoxOpen({isOpen: true, successful: false, text: err,})
            });
    }

    function handleDeleteMovie(movie) {
        const savedMovie = savedMoviesList.find((item) => item._id === movie._id || item.movieId === movie.movieId);
        mainApi
            .deleteMovie(savedMovie._id)
            .then(() => {

                const newMoviesList = savedMoviesList.filter(m => m._id !== savedMovie._id);
                setSavedMoviesList(newMoviesList);
            })
            .catch(err => {
                if (err === 'tokenError')
                    handleSignOut(true)
                else
                    setMessageBoxOpen({isOpen: true, successful: false, text: err,})
            });
    }

// проверка токена и авторизация пользователя
    useEffect(() => {
        setLoad(false);
        mainApi.getUserInfo()
            .then(data => {
                if (data) {
                    setLoggedIn(true);
                    setCurrentUser(data);
                }
            })
            .finally(() => {
                setLoad(true);
            });
    }, []);

    // инициализация данных профиля
    useEffect(() => {
        if (loggedIn) {
            mainApi.getUserInfo()
                .then(me => setCurrentUser(me))
                .catch((err) => setMessageBoxOpen({
                    isOpen: true, successful: false, text: err,
                }))
                .finally(() => setLoad(true));
            // setShowLoader(false));
        } else {
            setCurrentUser({})
        }
    }, [loggedIn])

    useEffect(() => {
        if (loggedIn && currentUser) {
            mainApi
                .getSavedMovies()
                .then(data => {
                    const UserMoviesList = data.filter(m => m.owner === currentUser._id);
                    setSavedMoviesList(UserMoviesList);
                })
                .catch(err => {
                    console.log(err)
                    setMessageBoxOpen({
                        isOpen: true, successful: false, text: err,
                    })
                });
        }
    }, [currentUser, loggedIn]);

    return (
        <div className="app">
            <Route exact path={headerPaths}>
                <Header
                    loggedIn={loggedIn}
                    onClickBurger={onClickBurger}
                    isBurgerOpened={isBurgerOpened}
                    closeBurger={closeBurger}
                />
            </Route>
            {!load ? <Preloader/> : (
                <CurrentUserContext.Provider value={currentUser}>
                    <Switch>
                        <Route exact path='/'>
                            <Main/>
                        </Route>
                        <Route exact path='/signup'>
                            {!loggedIn ? (<Register handleRegister={handleRegister}/>) : (<Redirect to='/'/>)}
                        </Route>
                        <Route exact path='/signin'>
                            {!loggedIn ? (<Login handleLogin={handleLogin}/>) : (<Redirect to='/'/>)}
                        </Route>
                        <ProtectedRoute
                            path='/movies'
                            component={Movies}
                            loggedIn={loggedIn}
                            setMessageBox={setMessageBoxOpen}
                            savedMoviesList={savedMoviesList}
                            onLikeClick={handleSaveMovie}
                            onDeleteClick={handleDeleteMovie}
                        />
                        <ProtectedRoute
                            path='/saved-movies'
                            component={SavedMovies}
                            loggedIn={loggedIn}
                            savedMoviesList={savedMoviesList}
                            onDeleteClick={handleDeleteMovie}
                            setMessageBox={setMessageBoxOpen}
                        />
                        <ProtectedRoute
                            path='/profile'
                            component={Profile}
                            loggedIn={loggedIn}
                            handleProfile={handleProfile}
                            handleSignOut={handleSignOut}
                        />
                        <Route path='*'>
                            <Page404/>
                        </Route>
                    </Switch>
                </CurrentUserContext.Provider>)}
            <Route exact path={footerPaths}>
                <Footer/>
            </Route>
            <MessageBox
                status={MessageBoxOpen}
                onClose={closeMessageBox}
            />
        </div>
    )
}
