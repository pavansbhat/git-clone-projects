import React from 'react';
import './Signin.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import './Buttons.css';
import { Link } from 'react-router-dom';

function Signin() {
    return (

        <div className='whole-content'>
            <h1 className='intro-contents'>Built for developers</h1>
            <h3 className='Para'>GitHub is a development platform inspired by the <br />way you work. From open source to business, you <br />can host and review code, manage projects, and<br /> build software alongside 50 million developers.</h3>
            <Link className='Signin-here' to='/home'>Sign in</Link>
        </div>

    )
}

export default Signin;