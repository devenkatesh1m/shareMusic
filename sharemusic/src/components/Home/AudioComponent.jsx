import React, { Component } from "react";
import "./AudioComponent.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons/faPlayCircle";
import storageRef from "../../config/storage";
class AudioComponent extends Component {
  componentWillMount(){
    let pathRef = this.props.FileInfo;
    pathRef.getMetadata().then((metadata)=>{
      //console.log('file metadata',metadata);
      let songName=metadata.name;
      let songImage='data:image/png;base64,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';
      if(metadata.customMetadata!=undefined){
        songName=metadata.customMetadata.songTitle;
        songImage=metadata.customMetadata.songPicture;
      }
      this.setState({songName:songName,songImage:songImage});
    }).catch(function(error) {
      console.log('metadata error',error);
    });
  }
  constructor(props) {
    super(props);
    this.state={
      songName:'',
      songImage:''
    }
    
  }
  
  playMusic=()=>{
    var pathRef = this.props.FileInfo.location.path_;
    storageRef.child(pathRef).getDownloadURL().then((url)=> {
        this.props.playSong(url,this.state);
        console.log('song url',url);
        url=url.substring(0,url.indexOf('.mp3')+4);
        var jsmediatags = require("jsmediatags");
        jsmediatags.read(url, {
  onSuccess: function(tag) {
    //console.log('jsmediatags',tag);
  },
  onError: function(error) {
    console.log('jsmediatagserror',error);
  }
});
    }).catch(function(error) {
      console.log("unable to fetch download url "+error);
      console.log(error);
    });
  }
  render() {
    
    return (
      <div className="card" style={{ width: "12rem" }}>
        <img
          className="card-img-top"
          src={this.state.songImage}
          style={{ width: "100%", height: "80%" }}
          alt="Card image cap"
        />
        <div className="card-body">
          <h5 className="card-title">
            <button className="playBtn" onClick={this.playMusic}>
              <FontAwesomeIcon icon={faPlayCircle} />
            </button>
                <h5>{this.state.songName}</h5>
          </h5>
        </div>
      </div>
    );
  }
}

export default AudioComponent;
