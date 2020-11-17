import React, { Component } from "react";
import fire from "../config/fire";
import storageRef from "../config/storage";
class NavBar extends Component {
  constructor(props) {
    super(props);
    fire.database().ref("PublicPlayList/").once("value").then((snapshot)=>{
      var searchOptions=snapshot.val();
      console.log('searchOptions',searchOptions);
      this.setState({publicPlayLists:searchOptions});
    });
  }
  AddPlayList = (event) => {
    var playListName=event.innerHTML;
    if (playListName != undefined) {
      let ownerID=this.state.publicPlayLists[playListName].ownerId;
      storageRef.child('users/'+ownerID+'/PlayLists/'+playListName).listAll().then((res) => {
        res.items.forEach(function (itemRef) {
          itemRef.getDownloadURL().then(function(url) {
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = function(event) {
              var blob = xhr.response;
              console.log('This is the blob',blob);
              var userid = fire.auth().currentUser.uid;
              itemRef.getMetadata().then(function(metadata) {
                console.log('file metadata',metadata)
                storageRef.child("users/" +userid +"/PlayLists/" +playListName +"/"+metadata.name)
                  .put(blob,metadata)
                  .then((snapshot) => {
                    console.log("Uploaded a blob or file!", snapshot);
                    //this.forceUpdateHandler();
                  })
                  .catch(function (error) {
                    console.log("error in file upload", error);
                  });
              }).catch(function(error) {
                console.log('error in getting metadata',error);
              });
            };
            xhr.open('GET', url);
            xhr.send();
            var img = document.getElementById('myimg');
            img.src = url;
          }).catch(function(error) {
            console.log('error while downloading',error);
          });
        });
      })
      .catch(function (error) {
        console.log("Unable to fetch songs in usersongs", error);
      });
      
    }
  };
  // AddPlayList=(event)=>{
  //   console.log('Adding PlayLists is working',event);
  //   var playListName=event.innerHTML;
  //   console.log('This is the playListName',playListName);

  // }
  showSearchResults = () => {
    let publicPlayLists=this.state.publicPlayLists;
    let searchInput=document.getElementById('searchBar');
    let searchInputValue=searchInput.value;
    publicPlayLists=Object.keys(publicPlayLists);
    //searchInput.nextElementSibling.childNodes[0]="";
    var currentDiv =0;
    for(var i=0;i<publicPlayLists.length;i++){
      
        if(publicPlayLists[i].substring(0,searchInputValue.length)==searchInputValue&&currentDiv<3){
          searchInput.nextElementSibling.childNodes[currentDiv].innerHTML=publicPlayLists[i];
          currentDiv++;
      }
    }
    console.log('publicPlayLists',publicPlayLists);
  };
  render() {
    let inputClass = "form-control mr-sm-2 w-25 p-3 ";
    let LogOutbuttonClass = "btn btn-outline-success my-2 my-sm-0 ";
    let buttonClassLogin = "btn btn-outline-success my-2 my-sm-0 m-3 ";
    let buttonClassSignup = "btn btn-outline-success my-2 my-sm-0 m-3 ";
    inputClass += this.props.propsofGD.isLoggedIn ? "" : "d-none";
    LogOutbuttonClass += this.props.propsofGD.isLoggedIn ? "" : "d-none";
    buttonClassLogin += this.props.propsofGD.isLoggedIn ? "d-none" : "";
    buttonClassSignup += this.props.propsofGD.isLoggedIn ? "d-none" : "";
    if (this.props.propsofGD.isSigningIn) {
      buttonClassLogin = buttonClassLogin.replace("outline-", "");
    } else {
      buttonClassSignup = buttonClassLogin.replace("outline-", "");
    }

    return (
      <React.Fragment>
        <nav
          style={{ height: "100%" }}
          className="navbar navbar-expand-lg navbar-light bg-light"
        >
          <a className="navbar-brand" href="#">
            shareMusic
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto"></ul>
            <div className="dropdown">
              <input
                className={inputClass}
                onInput={() => {
                  this.showSearchResults();
                }}
                type="search"
                id="searchBar"
                placeholder="Search"
                aria-haspopup="true" aria-expanded="false"
                data-toggle="dropdown"
              />
              <ul className="dropdown-menu">
                <li onClick={e=>this.AddPlayList(e.target)} value="test"></li>
                <li onClick={e=>this.AddPlayList(e.target)} value="test"></li>
                <li onClick={e=>this.AddPlayList(e.target)} value="test"></li>
              </ul>
            </div>
            <button
              className={LogOutbuttonClass}
              onClick={() => this.props.loginUser(false)}
              type="submit"
            >
              Logout
            </button>
            <button
              className={buttonClassLogin}
              onClick={() => this.props.LoginForm(true)}
              type="submit"
            >
              Login
            </button>
            <button
              className={buttonClassSignup}
              onClick={() => this.props.LoginForm(false)}
              type="submit"
            >
              Register
            </button>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default NavBar;
