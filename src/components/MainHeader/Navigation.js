import React from 'react';

import classes from './Navigation.module.css';

//Здесь просто со знаниями JS были созданы эти навигации. Мы "РОУТИНГ" еще не прошли, и поэтому довольствуемся только этим.

const Navigation = (props) => {
  return (
    <nav className={classes.nav}>
      <ul>
        {props.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {props.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {props.isLoggedIn && (
          <li>
            <button onClick={props.onLogout}>Logout</button> {/* ушул кнопка MainHeaderге барат, ал жактан кайра appjs ке барат. Ушул басылганда кайра Login page чыгат */}
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
