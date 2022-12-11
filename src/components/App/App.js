import './App.css';

import {Redirect, Route, Switch, useHistory, useLocation} from "react-router-dom";
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
import useEscapePress from "../../hooks/useEscapePress";
import mainApi from "../../utils/MainApi";
import Preloader from "../Preloader/Preloader";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import MessageBox from "../MessageBox/MessageBox";
import SavedMovies from "../SavedMovies/SavedMovies";


const headerPaths = ['/movies', '/saved-movies', '/profile', '/'];
const footerPaths = ['/movies', '/saved-movies', '/'];


export default function App() {
    const history = useHistory()
    const location = useLocation();
    const [currentUser, setCurrentUser] = useState({});
    const [isBurgerOpened, setIsBurgerOpened] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [load, setLoad] = useState(false); //todo false
    const [MessageBoxOpen, setMessageBoxOpen] = useState({
        isOpen: false, successful: true, text: '',
    });
    const [savedMoviesList, setSavedMoviesList] = useState([]);

    //todo удалить путь.txt
    //todo console.log удалять

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
        // setShowLoader(true);
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
        // setShowLoader(false));
    }

    function handleLogin({email, password}) {
        // setShowLoader(true);
        setLoad(false);
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
                isOpen: true, successful: false, text: err,
            }))
            .finally(() => setLoad(true));
        // setShowLoader(false));
    }

    function handleSignOut() {
        setCurrentUser({});
        setLoggedIn(false);
        localStorage.clear();
        mainApi.logout().then((data) => {
            setMessageBoxOpen({
                isOpen: true, successful: true, text: 'Успешно разлогинен!',
            })
            history.push('/')
        })
            .catch(err => setMessageBoxOpen({
                isOpen: true, successful: false, text: err,
            }))
    }

    function handleProfile({name, email}) {
        // setShowLoader(true);
        setLoad(false);
        mainApi
            .updateUser(name, email)
            .then(newUserData => {
                setCurrentUser(newUserData);
                setMessageBoxOpen({
                    isOpen: true, successful: true, text: 'Ваши данные обновлены!',
                });
            })
            .catch(err => setMessageBoxOpen({
                isOpen: true, successful: false, text: err,
            }))
            .finally(() => setLoad(true));
        // setShowLoader(false));
    }


    function handleSaveMovie(movie) {
        mainApi
            .addNewMovie(movie)
            .then(newMovie => setSavedMoviesList([newMovie, ...savedMoviesList]))
            .catch(err => setMessageBoxOpen({
                isOpen: true, successful: false, text: err,
            }));
    }

    function handleDeleteMovie(movie) {
        // console.log({movie})
        const savedMovie = savedMoviesList.find((item) => item._id === movie._id || item.movieId === movie.movieId);
        // console.log({savedMovie})
        mainApi
            .deleteMovie(savedMovie._id)
            .then(() => {
                // console.log('del success')
                // console.log({movie})
                // console.log({savedMoviesList})
                const newMoviesList = savedMoviesList.filter(m => m._id !== savedMovie._id);
                // console.log({newMoviesList})
                setSavedMoviesList(newMoviesList);
            })
            .catch(err => setMessageBoxOpen({
                isOpen: true, successful: false, text: err,
            }));
    }

// проверка токена и авторизация пользователя
    useEffect(() => {
        // const path = location.pathname;
        // setShowLoader(true);
        setLoad(false);
        mainApi.getUserInfo()
            .then(data => {
                if (data) {
                    setLoggedIn(true);
                    setCurrentUser(data);
                    // history.push(path);
                }
            })

            .finally(() => {
                // setShowLoader(false);
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
            {!load ? <Preloader/> : (<CurrentUserContext.Provider value={currentUser}>
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
