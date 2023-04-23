import React from 'react';
import { Link } from 'react-router-dom';


const Navigation = ({ userObj }) => {
    return(
        <nav className='MenuForm'>
            <ul>
                <li>
                    <Link to="/">
                        <div className='TabForm'>
                            <span className='MenuTab'></span>
                            <span className="TabName">Home</span>
                        </div>
                    </Link>
                </li>
                <li>
                    <Link to="/profile">
                        <div className='TabForm'>
                            <span className='MenuTab'></span>
                            <span className="TabName">{userObj.displayName ? userObj.displayName : "[이름없음]"}의 프로필</span>
                        </div>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;