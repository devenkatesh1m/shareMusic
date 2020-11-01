import React, { Component } from "react";

export default class Audioplayer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <audio controls style={{width:'100%'}} src={this.props.propsofGD.currentSong} autoPlay>
        {/* <source src={this.props.propsofGD.currentSong} type="audio/mpeg" /> */}
      </audio>
    );
  }
}
