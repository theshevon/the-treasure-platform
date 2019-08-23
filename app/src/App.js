import React, { Component } from 'react';
import fire from './config/fire';
import "./App.css"

class App extends Component {

  // called for any authentication changes
  authListener(){
    fire.auth().onAuthStageChanged((user) => {
      if (user){
        this.setState({ user });
        localStorage.setItem('user', user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem('user');
      }
    })
  }

  render(){
    return (
      <div className="App">

      </div>
    );
  }
}

export default App;
