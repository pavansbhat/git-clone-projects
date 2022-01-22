import React from 'react';
import './Yourgist.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Yourgist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gists: [],
            gistid: []
        }
    }

    componentDidMount = () => {
        const { userInfoData } = this.props;
        if (userInfoData && userInfoData.data) {
            const { userInfoData: { data } } = this.props;
            this.handleData(data);
            this.handleClick(data);
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.userInfoData.data !== this.props.userInfoData.data) {
            const { userInfoData: { data } } = this.props;
            this.handleClick(data);
            this.handleData(data);
        }
    }

    handleData = (data) => {
        let obj = [];
        data.forEach((item) => {
            obj.push(Object.values(item.files)[0]);
        })
        this.setState({
            gists: obj
        })
    }

    handleClick = (info) => {
        let gistsids = info.map((item) => {
            return item.id;
        });
        this.setState({
            gistid: gistsids,
        })
    }


    render() {
        const { gists, gistid } = this.state;
        return (
            <div className='sub-heading'>
                {
                    gists && gists.length > 0 ?
                        gists.map((item, index) => {
                            return (
                                <div key={index} className='gist-list'>
                                    <Link className='user-gist-list' to={'/revision/' + gistid[index]} >{item.filename}</Link>
                                </div>
                            )
                        })
                        : null
                }
                <Link className='user-gist-list' to="/allgists">View your gists</Link>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    userInfoData: state.app
})

export default connect(mapStateToProps, null)(Yourgist);