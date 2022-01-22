import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { TOKEN } from '../config'
import { connect } from 'react-redux'

class Viewrevision extends React.Component {
    constructor() {
        super();
        this.state = {
            img: '',
            name: '',
            gist: '',
            contents: [],
            url: [],
        }
    }

    componentDidMount() {
        const { userInfoData } = this.props;
        this.handleData(userInfoData);

        this.handleRevisions();
    }

    componentDidUpdate = (prevProps, PrevState) => {
        const { userInfoData } = this.props;
        if (prevProps.userInfoData !== this.props.userInfoData) {
            this.handleData(userInfoData);
        }
    }

    handleData = (data) => {
        const { userData } = data;
        this.setState({
            img: userData.avatar_url,
            name: userData.login,
        })
    }

    handleRevisions = async () => {
        let normalDatas = await axios.get('https://api.github.com/gists/' + window.location.href.split('/').pop(), {
            headers: { Authorization: `Token ${TOKEN}` }
        }
        )
        console.log(normalDatas);
        let name = Object.values(normalDatas.data.files)[0].filename;
        this.setState({
            gist: name,
        })



        let versions = normalDatas.data.history.map(async (item) => {
            let res = await axios.get(item.url, {
                headers: {
                    Accept: `application/vnd.github.v3+json`,
                    Authorization: `Bearer ${TOKEN}`,
                }
            })
            return res;
        })

        Promise.all(versions).then((res) => {
            console.log(res);
            let result = res.map((item) => {
                return Object.values(item.data.files)[0].content;
            })
            this.setState({
                contents: result,
            })
        })
    }





    render() {
        return (
            <div className='Main-content'>
                <div className='user-gist-details'>
                    <div className='users-details'>
                        <div className='use-details'>
                            <img className='user-avatar' src={this.state.img} alt='' />
                            <span className='gists-1'>{this.state.name}/</span>
                            <span className='gists-1'>{this.state.gist}</span>
                        </div><br />
                        <div className='switch-links'>
                            <Link className='links-sets' to={'/revision/' + window.location.href.split('/').pop()}>Code</Link>
                            <Link className='links-sets' to={'/viewrev/' + window.location.href.split('/').pop()}> Revisions </Link>
                        </div>
                    </div>
                </div>
                {this.state.contents.map((item, index) => {
                    return (
                        <div className='text-area-content'>
                            <textarea className='Contents-a' value={this.state.contents[index]} />
                        </div>
                    )
                })}

            </div>
        )
    }


}

const mapStateToProps = state => ({
    userInfoData: state.app
})

export default connect(mapStateToProps, null)(Viewrevision);
