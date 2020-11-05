import React, { Component } from "react";
import NavBar from "./NavBar";
import MasterLogin from "./login/MasterLogin";
import "../components/GodComponent.scss";
import fire from "../config/fire";
import Audioplayer from "../components/Home/Audioplayer";
import UserProfile from "../components/Home/userProfile";
import AudioGrid from "../components/Home/AudioGrid";
class GodComponent extends Component {
  state = {
    isLoggedIn: false,
    isSigningIn: true,
    currentSong:'dummy.mp3',
    currentSongName:'',
    currentSongImage:'https://picsum.photos/id/237/200/300'
  };
  handleLoginForm = (bool) => {
    if (bool) {
      this.setState({ isSigningIn: true });
    } else {
      this.setState({ isSigningIn: false });
    }
  };
  handleUserLogin = (bool) => {
    if (bool) {
      this.setState({ isLoggedIn: true });
    } else {
      fire
        .auth()
        .signOut()
        .then(() => {
          this.setState({ isLoggedIn: false });
        })
        .catch(function (error) {
          alert("user cannot be signed out " + error);
        });
    }
  };
  playSong=(res,statesobj)=>{
    this.setState({currentSong:res,currentSongName:statesobj.songName,
    currentSongImage:statesobj.songImage});
  }
  render() {
    let leftClass = this.state.isLoggedIn ? "leftL" : "leftH";
    let rightClass = this.state.isLoggedIn ? "rightL" : "rightH";
    return (
      <React.Fragment>
        <div className="head">
          <NavBar
            propsofGD={this.state}
            loginUser={this.handleUserLogin}
            LoginForm={this.handleLoginForm}
          />
        </div>
        <div className="body">
          <div className={leftClass}>
            {this.state.isLoggedIn && (
              <UserProfile
                propsofGD={this.state}
                LoginForm={this.handleLoginForm}
                loginUser={this.handleUserLogin}
              />
            )}
            {this.state.isLoggedIn && (
              <Audioplayer
              propsofGD={this.state}
              />
            )}
          </div>
          {this.state.isLoggedIn && <div className="HLine"></div>}
          <div className={rightClass}>
            {!this.state.isLoggedIn && (
              <MasterLogin
                propsofGD={this.state}
                LoginForm={this.handleLoginForm}
                loginUser={this.handleUserLogin}
              />
            )}
            {this.state.isLoggedIn && <AudioGrid playSong={this.playSong}/>}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default GodComponent;
