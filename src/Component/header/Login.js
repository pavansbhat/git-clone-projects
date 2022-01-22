import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { Icon, InlineIcon } from '@iconify/react';
import markGithub16 from '@iconify/icons-octicon/mark-github-16';


function Login() {
    return (
        <div className='header-container'>
            <div className='header-area'>
                <header>GitHub Gist &nbsp;<Icon icon={markGithub16} /></header>
                <Link className='all-gists-1' to='/home' >Login</Link>
            </div>
        </div>
    )
}

export default Login;