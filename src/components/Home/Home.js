import React from 'react';

import Card from '../UI/Card/Card';
import classes from './Home.module.css';

const Home = (props) => { //бул компонента рендер болот, когда !isLoggeIn иштегенде. То есть ал true болот, бирок оператор ! менен ал false болот жана жоголуп кетет.
  return (
    // Card здесь как обертка. В него мы дали модульный css. Через пропс className.
    <Card className={classes.home}> 
      <h1>Welcome back!</h1>
    </Card>
  );
};

export default Home;
