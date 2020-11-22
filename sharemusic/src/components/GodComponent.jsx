import React, { Component } from "react";
import NavBar from "./NavBar";
import MasterLogin from "./login/MasterLogin";
import "../components/GodComponent.scss";
import fire from "../config/fire";
import storageRef from "../config/storage";
import Audioplayer from "../components/Home/Audioplayer";
import UserProfile from "../components/Home/userProfile";
import AudioGrid from "../components/Home/AudioGrid";
class GodComponent extends Component {
  state = {
    isLoggedIn: false,
    isSigningIn: true,
    currentSong:'',
    currentSongName:'',
    currentSongImage:'https://picsum.photos/id/237/200/300',
    userPlayLists:[]
  };
  deletePlayListHandler=(playListPath)=>{
    const userPlayLists=this.state.userPlayLists.filter(path=>path!=playListPath);
    this.setState({userPlayLists});
  }
  handleLoginForm = (bool) => {
    if (bool) {
      this.setState({ isSigningIn: true });
    } else {
      this.setState({ isSigningIn: false });
    }
  };
  loadUserPlayLists=()=>{
    let userPlayLists = [];
    var userid = fire.auth().currentUser.uid;
    storageRef.child("users/" + userid + "/PlayLists/").listAll().then((res) => {
        res.prefixes.forEach(function (itemRef) {
          userPlayLists.push(itemRef.location.path_);
        });
        this.setState({ userPlayLists: userPlayLists });
      })
      .catch(function (error) {
        console.log("Unable to fetch songs", error);
      });
  }
  handleUserLogin = (bool) => {
    if (bool) {
      this.loadUserPlayLists();
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
    let leftClass = this.state.isLoggedIn ? "leftLoggedIn" : "leftHome";
    let rightClass = this.state.isLoggedIn ? "rightLoggedIn" : "rightHome";
    let bodyClass=this.state.isLoggedIn?"bodyLoggedIn":"bodyHome"
    return (
      <React.Fragment>
        <div className="head">
          <NavBar
            propsofGD={this.state}
            loginUser={this.handleUserLogin}
            LoginForm={this.handleLoginForm}
          />
        </div>
        <div className={bodyClass}>
          <div className={leftClass}>
            {this.state.isLoggedIn && (
              <UserProfile
                propsofGD={this.state}
                LoginForm={this.handleLoginForm}
                loginUser={this.handleUserLogin}
              />
            )}
            {this.state.isLoggedIn && this.state.currentSong &&(
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
            {this.state.isLoggedIn && <AudioGrid playSong={this.playSong} userPlayLists={this.state.userPlayLists} deletePlayListHandler={this.deletePlayListHandler}/>}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default GodComponent;
