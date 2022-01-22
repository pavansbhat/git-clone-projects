import axios from 'axios';
import React from 'react';
import './Revisions.css';
import { Link } from 'react-router-dom';
import { TOKEN } from '../config'
import { connect } from 'react-redux'

class Revisions extends React.Component {
    constructor() {
        super();
        this.state = {
            img: '',
            version: '',
            name: '',
            gist: '',
            content: ''
        }
    }

    componentDidMount() {
        const { userInfoData } = this.props;
        if (userInfoData && userInfoData.userData) {
            const { userInfoData: { userData } } = this.props;
            this.setState({
                name: userData.login,
                img: userData.avatar_url
            })
        }
        this.handleName()
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.userInfoData !== this.props.userInfoData) {
            const { userInfoData: { userData } } = this.props;
            this.setState({
                name: userData.login,
                img: userData.avatar_url
            })
        }

    }


    handleName = async () => {
        console.log(window.location.href)
        let x = await axios.get('https://api.github.com/gists/' + window.location.href.split('/').pop(), {
            headers: { Authorization: `Token ${TOKEN}` }
        }
        );
        let name = Object.values(x.data.files)[0].filename;
        let content = Object.values(x.data.files)[0].content;
        this.setState({
            gist: name,
            content: content,
        })
    }



    render() {
        console.log();
        return (
            <div className='Main-content'>
                <div className='user-gist-details'>
                    <div className='users-details'>
                        <div className='use-details'>
                            <img className='user-avatar' src={this.state.img} />
                            <span className='gists-1'>{this.state.name}/</span>
                            <span className='gists-1'>{this.state.gist}</span>
                        </div><br />
                        <div className='switch-links'>
                            <Link className='links-sets' to={'/revision/' + window.location.href.split('/').pop()}>Code</Link>
                            <Link className='links-sets' to={'/viewrev/' + window.location.href.split('/').pop()}> Revisions </Link>
                        </div>
                    </div>
                </div>
                <div className='text-area-content'>
                    <textarea className='Contents-a' value={this.state.content} />
                </div>
            </div>
        )
    }


}

const mapStateToProps = state => ({
    userInfoData: state.app
})

export default connect(mapStateToProps, null)(Revisions);