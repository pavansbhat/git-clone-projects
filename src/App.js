import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Signin from './Component/Signin'
import Gistheader from "./Component/Gistheader";
import Allgists from "./Component/Allgists";
import Header from './Component/header/Header';
import Revision from './Component/Revision';
import Viewrevisions from './Component/Viewrevisions'
import Login from './Component/header/Login';
import Notfound from './Component/header/Notfound';
import { connect } from 'react-redux';
import * as userAction from './redux/appjs/appActions'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      location: '',
      urls: [],
      filesname: [],
      gistid: [],
    }
  }

  componentDidMount() {

    this.getUData()

  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.appState.userData !== this.props.appState.userData) {
      this.getGistsset();
    }
  }


  async getUData() {
    this.props.getUserData();
  }


  async getGistsset() {
    const { appState } = this.props;
    if (appState && appState.userData) {
      const { userData } = appState;
      const name = userData.login;
      this.props.getGistsdata(name);
    }
  }




  render() {
    const { urls, gistid } = this.state;
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/">
              <Login />
              <Signin />
            </Route>
            <Route exact path="/allgists"><Header /><Allgists /></Route>

            <Route exact path='/revision/:id'>
              <Header /><Revision />
            </Route>

            <Route exact path='/viewrev/:id'>
              <Header /><Viewrevisions />
            </Route>


            <Route exact path="/home" component={Gistheader} />
            <Route path="*"><Login /><Notfound /></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  appState: state.app
})

const mapDispatchToProps = dispatch => {
  return {
    getUserData: () => dispatch(userAction.getUserdetails()),
    getGistsdata: (name) => dispatch(userAction.getGistsdetails(name))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);











