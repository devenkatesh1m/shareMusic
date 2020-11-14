import React, { Component } from 'react';

class NavBar extends Component {
  constructor(props) {
    super(props);
  }
  showSearchResults=()=>{

  }
    render() { 
      let inputClass="form-control mr-sm-2 w-25 p-3 ";
      let LogOutbuttonClass="btn btn-outline-success my-2 my-sm-0 ";
      let buttonClassLogin="btn btn-outline-success my-2 my-sm-0 m-3 ";
      let buttonClassSignup="btn btn-outline-success my-2 my-sm-0 m-3 ";
      inputClass+=(this.props.propsofGD.isLoggedIn)?"":"d-none";
      LogOutbuttonClass+=(this.props.propsofGD.isLoggedIn)?"":"d-none";
      buttonClassLogin+=(this.props.propsofGD.isLoggedIn)?"d-none":"";
      buttonClassSignup+=(this.props.propsofGD.isLoggedIn)?"d-none":"";
      if(this.props.propsofGD.isSigningIn){
        buttonClassLogin=buttonClassLogin.replace('outline-','');
      }
      else{
        buttonClassSignup=buttonClassLogin.replace('outline-','');
      }
      
        return (
            <React.Fragment>
        <nav style={{height:"100%"}} className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">shareMusic</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto"></ul>
              <input className={inputClass} onInput={this.showSearchResults} type="search" placeholder="Search" aria-label="Search"/>
              <button className={LogOutbuttonClass} onClick={()=>this.props.loginUser(false)} type="submit">Logout</button>
              <button className={buttonClassLogin} onClick={()=>this.props.LoginForm(true)} type="submit">Login</button>
              <button className={buttonClassSignup} onClick={()=>this.props.LoginForm(false)} type="submit">Register</button>
          </div>
        </nav>
      </React.Fragment>
        );
    }
}
 
export default NavBar;