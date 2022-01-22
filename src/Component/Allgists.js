import React from 'react';
import axios from 'axios';
import './Allgists.css';
import { Icon } from '@iconify/react';
import codeSquare24 from '@iconify/icons-octicon/code-square-24';
import starIcon from '@iconify/icons-octicon/star';
import config from '../config';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as allGistsActions from '../redux/Allgists/allgistsAction'


// var equal = require('deep-equal');
const TOKEN = config.TOKEN;

class Allgists extends React.Component {
    constructor() {
        super();
        this.state = {
            img: '',
            owner: '',
            urls: [],
            filesName: [],
            contents: [],
            flag: [],
            gistid: [],
        }
    }

    componentDidMount() {
        const { userInfoData, contents } = this.props;
        if (userInfoData && userInfoData.data) {
            const { userInfoData: { data } } = this.props;
            this.handleUserData(data);
        }
        if (userInfoData && userInfoData.userData) {
            const { userInfoData: { userData } } = this.props;
            this.setState({
                owner: userData.login,
                img: userData.avatar_url
            })
        }
        if (contents && contents.contentData) {
            const { contents: { contentData } } = this.props
            this.setState({
                contents: contentData
            })
        }

    }

    componentDidUpdate(prevProps, prevState) {


        if (prevState.urls !== this.state.urls) {
            this.handleLoad();

        }

        if (prevProps.userInfoData.data !== this.props.userInfoData.data) {
            const { userInfoData: { data } } = this.props;
            this.handleUserData(data);
        }

        if (prevProps.contents.contentData !== this.props.contents.contentData) {
            const { contents: { contentData } } = this.props
            this.setState({
                contents: contentData
            })
        }

        if (prevProps.userInfoData !== this.props.userInfoData) {
            const { userInfoData: { userData } } = this.props;
            this.setState({
                owner: userData.login,
                img: userData.avatar_url
            })
        }
    }


    handleUserData = (data) => {
        console.log('PAVAN->', data);
        let tempArr = [];
        let tempIdArr = [];
        let tempFileName = [];
        data.forEach((item) => {
            tempArr.push(item.url);
            tempIdArr.push(item.id);
            tempFileName.push(Object.keys(item.files));
        })
        this.setState({
            urls: tempArr,
            filesName: tempFileName,
            gistid: tempIdArr
        })
        this.handleStar(tempIdArr)

    }


    handleStar = async (id) => {
        let counter = [];
        id.forEach((item) => {
            counter.push(0);
        })
        id.map(async (item, index) => {
            try {
                let res = await axios.get(`https://api.github.com/gists/${item}/star`, {
                    headers: {
                        Accept: `application/vnd.github.v3+json`,
                        Authorization: `Token ${TOKEN}`,
                    },
                })
                if (res && res.status === 204) {
                    counter[index] = 1;
                } else {
                    counter[index] = 0;
                }
            } catch (err) {
                console.error(err);
            }
        })
        this.setState({
            flag: counter
        })
    }

    handleLoad = async () => {
        const { urls } = this.state;
        await this.props.getContent(urls);
    }

    handleStargist = async (index) => {
        const { gistid } = this.state;
        const id = gistid[index];
        const { flag } = this.state;
        try {
            const result = await axios.put(`https://api.github.com/gists/${id}/star`, {
                gist_id: id
            }, {
                headers: {
                    Accept: `application/vnd.github.v3+json`,
                    Authorization: `Token ${TOKEN}`,
                },
            })
            if (result && result.status === 204) {
                flag[index] = 1
            }
            this.setState({
                flag,
            }, () => this.forceUpdate())
        } catch (e) {
            console.error(e);
        }

    }

    handleUnstargist = async (index) => {
        const { gistid } = this.state;
        const id = gistid[index];
        const { flag } = this.state;
        try {
            const result = await axios.delete(`https://api.github.com/gists/${id}/star`, {
                headers: {
                    Accept: `application/vnd.github.v3+json`,
                    Authorization: `Token ${TOKEN}`,
                },
            })
            if (result && result.status === 204) {
                flag[index] = 0
            }
            this.setState({
                flag,
            }, () => this.forceUpdate())
        } catch (e) {
            console.error(e);
        }
    }

    render() {
        const { flag, filesName, gistid, img, owner, contents } = this.state;
        return (

            <div className='main-container' >
                <div className='all-contents'>
                    <div className='owner-info'>
                        <img className='profile-img' src={img} alt='user' />
                        <h2 className='user-names'>{owner}</h2>
                    </div>
                    <div className='profile-info'>
                        <div className='gists-lists'>

                            <div className='all-area'><span className='gist-small-header'>All gists </span>

                                <p className='numer-of-gists'>{filesName.length}</p>

                            </div>
                            {
                                filesName && filesName.length > 0 ?
                                    filesName.map((item, index) => {
                                        return (
                                            <div key={index} className='each-gist'>
                                                <div className='naming-contents'>
                                                    <div className='name-gist'>
                                                        <div className='icon-owner'>
                                                            <img className='icon-image' src={img} alt='' />
                                                            <p className='gis'>{owner}/  </p>
                                                            <Link className='gis' to={'/revision/' + gistid[index]}>{item}</Link>
                                                        </div>
                                                        <div className='svg-contents'>
                                                            <Icon className='code-square' icon={codeSquare24} />
                                                            <p className='file-c'>1 file</p>
                                                            {
                                                                flag[index] === 1 ? (
                                                                    <div className='icon-starred'>
                                                                        <Icon className='code-square' onClick={() => this.handleUnstargist(index)} icon={starIcon} color="yellow" />
                                                                        <p className='file-c'>Starred</p>
                                                                    </div>
                                                                ) : (<div className='icon-starred'>

                                                                    <Icon className='code-square' icon={starIcon} onClick={() => this.handleStargist(index)} />
                                                                    <p className='file-c'>Starit</p>
                                                                </div>)
                                                            }

                                                        </div>
                                                    </div>
                                                </div>
                                                <textarea value={contents[index]} className='text-area' />

                                            </div>
                                        )
                                    }) : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    userInfoData: state.app,
    contents: state.allgist,
})

const mapDispatchToProps = dispatch => {
    return {
        getContent: (url) => dispatch(allGistsActions.getContents(url)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Allgists);