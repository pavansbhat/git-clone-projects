import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            img: '',
        }
    }

    componentDidMount = () => {
        const { userInfoData } = this.props;
        this.handleData(userInfoData);
        this.handleData(userInfoData)
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.userInfoData !== this.props.userInfoData) {
            const { userInfoData } = this.props;
            this.handleData(userInfoData);
        }
    }

    handleData = (data) => {
        const { userData } = data;
        this.setState({
            img: userData.avatar_url,
        })
    }

    render() {
        const { img } = this.state
        return (
            <div className='header-container'>
                <div className='header-area'>

                    <header><Link className='Home-link' to='/home'>GitHub Gist </Link></header>

                    <p className='all-gists'>All gists</p>
                    <p className='all-gists'>Back to GitHub</p>
                    <Link className='Home-link-1' to='/'>Log out </Link>
                    <img className='user-img' src={img} alt='user' />

                </div>
            </div>

        )
    }
}

const mapStateToProps = state => ({
    userInfoData: state.app
})

export default connect(mapStateToProps, null)(Header);

