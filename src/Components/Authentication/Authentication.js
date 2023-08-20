import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "../UI/Card";

import classes from "./Authentication.module.css";
import LogIn from "./LogIn";
import SignUp from "./SignUp";

const Authentication = () => {
    
    const [isLoginVisible, setIsLoginVisible] = useState(true);


    const switchHandler = () => {
        setIsLoginVisible(!isLoginVisible);
    }

  return (
    <section className={classes.auth}>
      <Card>
        {!isLoginVisible&& <SignUp className={classes.authPage} />}
        {isLoginVisible && <LogIn className={classes.authPage} />}

        <div className={classes.lowerCon}>
          <p>
            {!isLoginVisible ? "Already have an account?" : "Create new account." }<button className={classes.switchBtn} onClick={switchHandler}><Link>{!isLoginVisible ? "Log In" : "Sign up"}</Link></button>
          </p>
        </div>
      </Card>
    </section>
  );
};

export default Authentication;
