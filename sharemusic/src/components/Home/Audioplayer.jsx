import React, { Component } from "react";
export default class Audioplayer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let imageurl=this.props.propsofGD.currentSongImage;
    return (
      <React.Fragment>
      <img src={imageurl}  id="playerSongImage" alt="" />
      <h1>{this.props.propsofGD.currentSongName}</h1>
      <audio controls style={{width:'100%'}} src={this.props.propsofGD.currentSong} autoPlay>
      </audio>
      </React.Fragment>
    );
  }
}
