import React from 'react';
import firebase from 'firebase';
import Tasks from './Tasks';




export default class Board extends React.Component{
    state= {
        isSignedIn: false
    }

    componentDidMount() {
        this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
            user => {this.setState({isSignedIn: !!user});}
        );
      }

      componentWillMount(){
        if(this.unregisterAuthObserver){
            this.unregisterAuthObserver();
        }
      }
    signOut= () =>{
        firebase.auth().signOut();
        this.props.history.push('/');
    
    }

    render(){
        
        const currentUser = firebase.auth().currentUser;
        
        if (!currentUser) {
            return (
              <div>
                <h4 style = {{textAlign: 'center', color: 'white'}}>Please Sign-in !! </h4>
               
              </div>
            );
          }

          
        return(
            
            <div>
              <div className = "userDetails">
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons"rel="stylesheet"></link>
                <h4 style= {{color: "white", textAlign: "right"}}>Welcome {currentUser.displayName}! You are now signed-in!
                <button className= "signOut" onClick= {this.signOut}>Sign Out</button></h4> 
              </div>
              {/* <p> To begin planning, click on "Add New Task" in the To-do list </p> */}
                
                <Tasks />
            </div>
        )
    }
}