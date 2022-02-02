import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {  //Здесь он сработает только один раз, после оценки и рендера, Welcome Back навсегда останется, пока мы не очистим в Application память.
    const storedUserLoggedInfo = localStorage.getItem('isLoggedIn');

    if(storedUserLoggedInfo === '1') {
      setIsLoggedIn(true)
    }
  }, [])

  const loginHandler = (email, password) => { //loginHandler тольrо submit иштегенде иштейт
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem('isLoggedIn', '1')
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false); //когда нажимаем на log out бул false болот жана login компоненти корунуп калат, home корунбойт
    localStorage.removeItem('isLoggedIn') // это мы сделали для того чтобы при log out, данные в локал сторэйдж тоже очистились через ключ, и при перезагрузке мы увидим login page, где снова можем "зарегаться"
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} /> 
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />} {/* эгерде isLoggedIn, true болгон болсо, анда биз ! оператору менен аны falseко айландырып койдук, ошондо бул жок болуп кетет */}
        {isLoggedIn && <Home onLogout={logoutHandler} />} {/* setIsLogin true болсо, ушул рендер болуп калат. */}
      </main>
      
    </React.Fragment>
  );
}

export default App;
