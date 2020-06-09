import React from 'react';
import{DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import firebase from 'firebase';
import Todo from './Todo';
import WorkInProgress from './WorkInProgress';
import Complete from './Complete';



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
                <h2>"My Board"</h2>
                <h4 style = {{textAlign: 'center', color: 'red'}}>Please Sign-in !! </h4>
               
              </div>
            );
          }
        return(
            
            <div>
                <h2>"My Board"</h2>
                {<h4>Welcome {currentUser.displayName}! You are now signed-in!</h4> }
                {<button onClick= {this.signOut}>Sign Out</button>}
                <hr />
                {/* {!currentUser && <p>Signing In....</p>} */}
              

                <div className = "board">
                    
                        <div className= "each-list">
                           <div><h2>
                                To - Do <hr style={{border: "2px solid red", width: "50%"}}/>
                            </h2></div>
                                <Todo /> 
                                
                        </div>
                                
                        <div className= "each-list">
                            <h2>
                                In-Progress <hr style={{border: "2px solid orange", width: "50%"}}/>
                            </h2>
                                 <WorkInProgress /> 
                        </div> 

                        <div className= "each-list">
                            <h2>
                                Complete  <hr style={{border: "2px solid rgb(5, 177, 5)", width: "50%"}}/>   
                            </h2>
                                 <Complete /> 
                        </div>
                    
                </div>

            </div>

        )
    }

}