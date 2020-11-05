import React, { Component } from "react";
import fire from "../../config/fire";
import database from "../../config/database";
import storageRef from "../../config/storage";
import AudioComponent from "../Home/AudioComponent";
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
    let userComponentsList = this.state.userAudioComponentsList;
    storageRef
      .child("Top10/")
      .listAll()
      .then((res) => {
        res.items.forEach(function (itemRef) {
          Top10ComponentsList.push(itemRef);
          console.log("itemRef", itemRef);
        });
        this.setState({ Top10AudioComponentsList: Top10ComponentsList });
      })
      .catch(function (error) {
        console.log("Unable to fetch songs", error);
      });
    var userid = fire.auth().currentUser.uid;
    storageRef
      .child("users/" + userid + "/songs")
      .listAll()
      .then((res) => {
        res.items.forEach(function (itemRef) {
          userComponentsList.push(itemRef);
        });
        this.setState({ userAudioComponentsList: userComponentsList });
      })
      .catch(function (error) {
        console.log("Unable to fetch songs in usersongs", error);
      });
  }
  playSong = (src,statesobj) => {
    this.props.playSong(src,statesobj);
  };
  uploadSong=()=>{
    console.log('closest h1',this);
    console.log('Inside change event');
    var song=document.getElementById("uploadSongs").files[0];
    var userid = fire.auth().currentUser.uid;
    storageRef.child("users/" + userid + "/songs/"+song.name).put(song).then(function(snapshot) {
      console.log('Uploaded a blob or file!',snapshot);
    })
    .catch(function(error){
        console.log('error in file upload',error);
    });
  };
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
        <div className="PlayList">
          <h1 contentEditable="true" id="My play List">My play List</h1>
          <label>
            <button className="btn btn-primary" onClick={()=>{document.getElementById('uploadSongs').click();}}>Upload Song</button>
            <input
              type="file"
              style={{ display: "none" }}
              id="uploadSongs"
              onChange={this.uploadSong}
              accept=".mp3,"
            ></input>
          </label>
          {!this.state.userAudioComponentsList.length == 0 && (
            <div className="AudioComponents">
              {this.state.userAudioComponentsList.map((AudioObject) => (
                <AudioComponent
                  key={i++}
                  playSong={this.playSong}
                  FileInfo={AudioObject}
                />
              ))}
            </div>
          )}
          {this.state.userAudioComponentsList.length == 0 && (
            <div className="AudioComponents">
              <div>No songs in the list</div>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default AudioGrid;
