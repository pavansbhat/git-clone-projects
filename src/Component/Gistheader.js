import React from 'react';
import './Gistheader.css';
import Yourgist from './Yourgist';
import Creategist from './Creategist';
import Header from './header/Header';




class Gistheader extends React.Component {
    render() {

        return (
            <div className='header-container'>

                <Header />

                <Yourgist />
                <Creategist />



            </div>

        )
    }
}


export default Gistheader;
