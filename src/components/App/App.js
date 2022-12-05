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
import InfoTooltip from "../InfoTooltip/InfoTooltip";


const headerPaths = ['/movies', '/saved-movies', '/profile', '/'];
const footerPaths = ['/movies', '/saved-movies', '/'];


export default function App() {
  const history = useHistory()
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState({});
  const [isBurgerOpened, setIsBurgerOpened] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [load, setLoad] = useState(false);
  const [showLoader, setShowLoader] = useState(false)
  const [TooltipOpen, setTooltipOpen] = useState({
    isOpen: false,
    successful: true,
    text: '',
  });
  const [savedMoviesList, setSavedMoviesList] = useState([]);
  
  function onClickBurger() {
    setIsBurgerOpened(!isBurgerOpened);
  }
  
  useEscapePress(onClickBurger, isBurgerOpened);
  
  function closeInfoTooltip() {
    setTooltipOpen({...TooltipOpen, isOpen: false});
  }
  
  function closeBurger() {
    setIsBurgerOpened(false)
  }
  
  function handleRegister({name, email, password}) {
    setShowLoader(true);
    mainApi
    .createUser(name, email, password)
    .then(data => {
      if (data._id) {
        handleLogin({email, password});
      }
    })
    .catch(err =>
      setTooltipOpen({
        isOpen: true,
        successful: false,
        text: err,
      })
    )
    .finally(() => setShowLoader(false));
  }
  
  function handleLogin({email, password}) {
    setShowLoader(true);
    mainApi
    .login(email, password)
    .then((data) => {
      if (!data) {
        console.log("При авторизации что-то пошло не так!")
      } else {
        setLoggedIn(true);
        history.push('/movies');
        setTooltipOpen({
          isOpen: true,
          successful: true,
          text: 'Добро пожаловать!',
        });
      }
    })
    .catch(err =>
      setTooltipOpen({
        isOpen: true,
        successful: false,
        text: err,
      })
    )
    .finally(() => setShowLoader(false));
  }
  
  function handleSignOut() {
    setCurrentUser({});
    setLoggedIn(false);
    localStorage.clear();
    mainApi.logout().then((data) => {
        setTooltipOpen({
          isOpen: true,
          successful: true,
          text: 'Успешно разлогинен!',
        })
        history.push('/')
      }
    )
    .catch(err =>
      setTooltipOpen({
        isOpen: true,
        successful: false,
        text: err,
      })
    )
  }
  
  function handleProfile({name, email}) {
    setShowLoader(true);
    mainApi
    .updateUser(name, email)
    .then(newUserData => {
      setCurrentUser(newUserData);
      setTooltipOpen({
        isOpen: true,
        successful: true,
        text: 'Ваши данные обновлены!',
      });
    })
    .catch(err =>
      setTooltipOpen({
        isOpen: true,
        successful: false,
        text: err,
      })
    )
    .finally(() => setShowLoader(false));
  }

//todo централизованная обработка ошибок
  function handleSaveMovie(movie) {
    mainApi
    .addNewMovie(movie)
    .then(newMovie => setSavedMoviesList([newMovie, ...savedMoviesList]))
    .catch(err =>
      setTooltipOpen({
        isOpen: true,
        successful: false,
        text: err,
      })
    );
  }
  
  function handleDeleteMovie(movie) {
    const savedMovie = savedMoviesList.find(
      (item) => item.movieId === movie.id || item.movieId === movie.movieId
    );
    mainApi
    .deleteMovie(savedMovie._id)
    .then(() => {
      const newMoviesList = savedMoviesList.filter(m => {
        return !(movie.id === m.movieId || movie.movieId === m.movieId);
      });
      setSavedMoviesList(newMoviesList);
    })
    .catch(err =>
      setTooltipOpen({
        isOpen: true,
        successful: false,
        text: err,
      })
    );
  }
  
  useEffect(() => {
    const path = location.pathname;
    setShowLoader(true);
    mainApi.getUserInfo()
    .then(data => {
      if (data) {
        setLoggedIn(true);
        setCurrentUser(data);
        history.push(path);
      }
    })
    .catch(err =>
      setTooltipOpen({
        isOpen: true,
        successful: false,
        text: err,
      })
    )
    .finally(() => {
      setShowLoader(false);
      setLoad(true);
    });
  }, []);
  
  // инициализация данных профиля
  useEffect(() => {
    if (loggedIn) {
      mainApi.getUserInfo()
      .then(me => setCurrentUser(me))
      .catch((err) =>
        setTooltipOpen({
          isOpen: true,
          successful: false,
          text: err,
        })
      )
      .finally(() => setShowLoader(false));
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
      .catch(err =>{
        console.log(err)
        setTooltipOpen({
          isOpen: true,
          successful: false,
          text: err,
        })
      }
      );
    }
  }, [currentUser, loggedIn]);
  
  return (
    <div className="app">
      {!load ? (
        <Preloader isOpen={showLoader}/>
      ) : (
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
              {!loggedIn ? (
                <Register handleRegister={handleRegister}/>
              ) : (
                <Redirect to='/'/>
              )}
            </Route>
            <Route exact path='/signin'>
              {!loggedIn ? (
                <Login handleLogin={handleLogin}/>
              ) : (
                <Redirect to='/'/>
              )}
            </Route>
            {/*<Route exact path={["/movies", "/saved-movies"]}>*/}
            {/*    <Movies/>*/}
            {/*</Route>*/}
            <ProtectedRoute
              path='/movies'
              component={Movies}
              loggedIn={loggedIn}
              setShowLoader={setShowLoader}
              setInfoTooltip={setTooltipOpen}
              savedMoviesList={savedMoviesList}
              onLikeClick={handleSaveMovie}
              onDeleteClick={handleDeleteMovie}
            />
            <ProtectedRoute
              path='/saved-movies'
              component={Movies}
              loggedIn={loggedIn}
              savedMoviesList={savedMoviesList}
              onDeleteClick={handleDeleteMovie}
              setInfoTooltip={setTooltipOpen}
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
          <Route exact path={footerPaths}>
            <Footer/>
          </Route>
          {showLoader ? <Preloader/> : null}
          <InfoTooltip
            status={TooltipOpen}
            onClose={closeInfoTooltip}
          />
        </CurrentUserContext.Provider>
      )}
    </div>
  )
}
