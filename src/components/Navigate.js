import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ userObj }) => {
    console.log(userObj.displayName);
    return(
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/profile">{userObj.displayName ? userObj.displayName : "[이름없음]"}의 프로필</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;