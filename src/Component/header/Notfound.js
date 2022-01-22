import React, { Component } from 'react'
import { Icon, InlineIcon } from '@iconify/react';
import markGithub16 from '@iconify/icons-octicon/mark-github-16';
import './Notfound.css'


class Notfound extends Component {
    render() {
        return (
            <div className='Not-found-content'>
                <div className='Not-found-icon'>
                    <h1 className='error-msg'>4 &nbsp;</h1><Icon className='github-icon' color='red' icon={markGithub16} /><h1 className='error-msg'>&nbsp; 4</h1>

                </div>
                <h4 className='error-msg-1'>Didn’t find anything here!</h4>
            </div>
        )
    }
}

export default Notfound;
