import React, { Component } from "react";
import "./AudioComponent.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons/faPlayCircle";
import storageRef from "../../config/storage";
class AudioComponent extends Component {
  componentWillMount(){
    let pathRef = this.props.FileInfo;
    pathRef.getMetadata().then((metadata)=>{
      let songName= metadata.name;
      this.setState({songName:songName});
    }).catch(function(error) {
      console.log('metadata error',error);
    });
  }
  constructor(props) {
    super(props);
    this.state={
      songName:''
    }
    
  }
  
  playMusic=()=>{
    var pathRef = this.props.FileInfo.location.path_;
    storageRef.child(pathRef).getDownloadURL().then((url)=> {
        this.props.playSong(url);
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
          src={require('../../images/defaultmusic.jpg')} 
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
