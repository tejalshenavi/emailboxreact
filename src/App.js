import React, { useEffect, useRef } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Authentication from "./Components/Authentication/Authentication";
import RootLayout from "./Components/Layout/Root";
import Compose from "./Components/Profile/Compose";
import Root2Layout from "./Components/Layout/Root2";
import Inbox from "./Components/Profile/Inbox";
import { useDispatch, useSelector } from "react-redux";
import { inboxItemFill } from "./store/inbox-slice";
import EmailMessage from "./Components/Profile/EmailMessage";
import SentBox from "./Components/Profile/SentBox";
import { sentboxItemFill } from "./store/sentbox-slice";
import Profile from "./Components/Profile/Profile";
import SentMessageRead from "./Components/Profile/SentMessageRead";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const intervalRef = useRef(null);

  useEffect(() => {
    if (auth.isLoggedIn) {
      dispatch(inboxItemFill(auth.email));
      dispatch(sentboxItemFill(auth.email));
    }
  })

  useEffect(() => {
    if (auth.isLoggedIn) {
      dispatch(inboxItemFill(auth.email));
      dispatch(sentboxItemFill(auth.email));

      // Start the interval and store the reference
      intervalRef.current = setInterval(() => {
        dispatch(inboxItemFill(auth.email));
        dispatch(sentboxItemFill(auth.email));
        console.log("render");
      }, 2000);
    }

    // Clean up the interval when the component unmounts or when auth.isLoggedIn changes to false
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [auth.isLoggedIn, dispatch, auth.email]);

  

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Authentication />} />
          {auth.isLoggedIn && (
            <Route path="/profile" element={<Root2Layout />} exact>
              <Route index element={<Profile />} />
              <Route path="/profile/compose" element={<Compose />} exact />
              <Route path="/profile/inbox" element={<Inbox />} exact />
              <Route
                path="/profile/inbox/message"
                element={<EmailMessage />}
                exact
              />
              <Route path="/profile/sentbox" element={<SentBox />} exact />
              <Route
                path="/profile/sentbox/message"
                element={<SentMessageRead />}
                exact
              />
            </Route>
          )}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
