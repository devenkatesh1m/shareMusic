import React, { Component } from "react";
import storageRef from "../../config/storage";
import fire from "../../config/fire";
import AudioComponent from "../Home/AudioComponent";
import UserPlayList from "../Home/UserPlayList";
import "./AudioGrid.scss";
import $ from "jquery";
class AudioGrid extends Component {
  state = {
    Top10AudioComponentsList: [],
    userAudioComponentsList: [],
  };
  constructor(props) {
    super(props);
    let Top10ComponentsList = this.state.Top10AudioComponentsList;
    storageRef.child("Top10/").listAll().then((res) => {
        res.items.forEach(function (itemRef) {
          Top10ComponentsList.push(itemRef);
          console.log("itemRef", itemRef);
        });
        this.setState({ Top10AudioComponentsList: Top10ComponentsList });
      })
      .catch(function (error) {
        console.log("Unable to fetch songs", error);
      });
  }
  playSong = (src, statesobj) => {
    this.props.playSong(src, statesobj);
  };
  addPlayList=()=>{
    let playListName=document.getElementById("newPlayListName");
    if(playListName){
      var userid = fire.auth().currentUser.uid;
      storageRef.child('users/'+userid+'/PlayLists/'+playListName.value);
    }
  }
  render() {
    //let AudioObjects = this.state.Top10AudioComponentsList;
    let i = 1;
    return (
      <React.Fragment>
        <div className="Top10List">
          <h1>Top 10</h1>
          <div className="AudioComponents">
            {this.state.Top10AudioComponentsList.map((AudioObject) => (
              <AudioComponent
                key={i++}
                playSong={this.playSong}
                FileInfo={AudioObject}
              />
            ))}
          </div>
        </div>
        {/*My playList*/}
        <UserPlayList
        playSong={this.playSong}
        />
        <button className="btn btn-primary" onClick={this.addPlayList()}>Add PlayList</button>
        <input type="text" class="form-control" id="newPlayListName" />
      </React.Fragment>
    );
  }
}

export default AudioGrid;
