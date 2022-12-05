import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";

// react-router-dom v6 위로는 Switch가 이름이 Routes로 변경됨

const AppRouter = ({isLoggedIn}) => {


    return (
        <Router>
            {isLoggedIn && <Navigation/>}
            <Routes>
                {
                    isLoggedIn ? (
                        <>
                            <Route exact path="/" element={<Home/>} />
                            <Route exact path="/profile" element={<Profile/>} />
                        </>
                    ) : (
                        <>
                            <Route exact path="/" element={<Auth/>} />
                        </>
                    )
                }
            </Routes>
        </Router>
    );
};

export default AppRouter;