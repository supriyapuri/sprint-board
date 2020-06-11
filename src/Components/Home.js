import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';



export default class Home extends React.Component {

    uiConfig = {
        signInFlow:'popup',
        signInSuccessUrl:'#/board',
        signInOptions:[
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ]

    }
    


    render() {
        return (
            <div>
                <h3>Welcome to the Sprint-Board. Please sign-in to continue.</h3>
                <p style= {{color: "white"}}>sign in:</p>
                <StyledFirebaseAuth
                uiConfig={this.uiConfig}
                firebaseAuth= {firebase.auth()}/>
            </div>
        )
    }
}



