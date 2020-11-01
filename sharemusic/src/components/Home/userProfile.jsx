import React from "react";
import "./userProfile.scss";
import fire from "../../config/fire";
import database from "../../config/database";
import storageRef from "../../config/storage";
class UserProfile extends React.Component {
  changePP = () => {
    var profilePic = document.getElementById("profilePicUpload").files[0];
    var user = fire.auth().currentUser;
    if (user != null) {
      var uid = user.uid;
      storageRef
        .child("users/" + uid + "/" + uid + ".jpg")
        .put(profilePic)
        .then((snapshot) => {
          storageRef
            .child("users/" + uid + "/" + uid + ".jpg")
            .getDownloadURL()
            .then(function (url) {
              var xhr = new XMLHttpRequest();
              xhr.responseType = "blob";
              xhr.onload = function (event) {
                var blob = xhr.response;
              };
              xhr.open("GET", url);
              xhr.send();
              var img = document.getElementById("userImage");
              img.src = url;
            })
            .catch(function (error) {
              console.log("unable to fetch download url " + error);
              console.log(error);
            });
        });
    }
  };

  render() {
    var user = fire.auth().currentUser.uid;
    var username = "";
    database
      .ref("/users/" + user)
      .once("value")
      .then(function (snapshot) {
        username = snapshot.val().username;
        var ageAndGender = snapshot.val().age + "   " + snapshot.val().gender;
        document.getElementById("username").innerHTML = username;
        document.getElementById("genderAgeTag").innerHTML = ageAndGender;
      });
    storageRef
      .child("users/" + user + "/" + user + ".jpg")
      .getDownloadURL()
      .then(function (url) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = function (event) {
          var blob = xhr.response;
        };
        xhr.open("GET", url);
        xhr.send();
        var img = document.getElementById("userImage");
        img.src = url;
      })
      .catch(function (error) {
        storageRef
          .child("/default/gmaildp.jpeg")
          .getDownloadURL()
          .then(function (url) {
            var xhr = new XMLHttpRequest();
            xhr.responseType = "blob";
            xhr.onload = function (event) {
              var blob = xhr.response;
            };
            xhr.open("GET", url);
            xhr.send();
            var img = document.getElementById("userImage");
            img.src = url;
          })
          .catch(function (error) {
            console.log("imageDownload URL " + error);
          });
      });

    return (
      <React.Fragment>
        <div className="card">
          <label>
            <img
              id="userImage"
              alt="John"
              style={{ width: "100%" }}
              onClick={this.testing}
            />
            <input
              type="file"
              style={{ display: "none" }}
              id="profilePicUpload"
              onChange={this.changePP}
              accept=".jpg,"
            ></input>
          </label>
          <h1 id="username"></h1>
          <p className="title" id="genderAgeTag"></p>
        </div>
      </React.Fragment>
    );
  }
}

export default UserProfile;
