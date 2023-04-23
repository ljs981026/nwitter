import React from "react";
import {HashRouter, Route, Switch} from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/Navigate";
import "../style/Menu.css";
// import { Redirect } from "react-router-dom/cjs/react-router-dom.min";


const AppRouter = ({isLoggedIn, userObj, refreshUser }) => {
    return (
        <HashRouter>
            {isLoggedIn && <Navigation userObj={userObj} />}
            <Switch>
                {isLoggedIn ? (
                <>
                    <Route exact path="/">
                        <Home userObj={userObj} />
                    </Route>
                    <Route exact path="/profile">
                        <Profile userObj={userObj} refreshUser={refreshUser}/>
                    </Route>
                    {/* <Redirect from="*" to="/" /> */}
                </>
            ) : (
                <>
                    <Route exact path="/">
                        <Auth />
                    </Route>
                    {/* <Redirect from="*" to="/" /> */}
                </>
                )
            }
            </Switch>
        </HashRouter>
    )
};

export default AppRouter;
