import React from 'react';
import firebase from 'firebase';
import NewTask from './NewTask';

const firestore= firebase.firestore();

export default class Tasks extends React.Component{
    state ={
            tasks:[]
        }

        componentDidMount() {
            const uid = firebase.auth().currentUser.uid;

            firestore.collection('users')
             .doc(uid)
             .collection('tasks')
            
            .onSnapshot(snapshot => {
                this.setState({tasks: snapshot.docs});
                
            });
        }

        onEditClick= (task) => (e) => {

            const { taskName } = task.data();
            const {category}= task.data();
            const updatedTaskName = prompt('Edit TaskName', taskName);
            const updatedCategory= prompt('Edit Category', category);
            const uid = firebase.auth().currentUser.uid;
    
            if (updatedTaskName !== null){
                firestore.collection('users')
                    .doc(uid)
                    .collection('tasks')
                    .doc(task.id)
                    .update({taskName: updatedTaskName});
                if(updatedCategory !== null){
                    firestore.collection('users')
                        .doc(uid)
                        .collection('tasks')
                        .doc(task.id)
                        .update({category: updatedCategory});
                    }
            }
        }


        onDeleteClick=(task) => (e) => {
            const uid = firebase.auth().currentUser.uid;
            const shouldDelete = window.confirm('Are you sure?')
            if (shouldDelete){
                firestore.collection('users')
                    .doc(uid)
                    .collection('tasks')
                    .doc(task.id)
                    .delete();
    
            }
        }

        onDragStart = (event, task) => {
            const taskFireStoreId = task.id;
            event.dataTransfer.setData("taskFireStoreId", taskFireStoreId); 
        }

        onDragOver = (event) => {
            event.preventDefault();    
        }
    
        onDrop = (event, cat, symbol) => {
           
            let taskFireStoreId = event.dataTransfer.getData("taskFireStoreId")
            const uid = firebase.auth().currentUser.uid;
            firestore.collection('users')
                    .doc(uid)
                    .collection('tasks')
                    .doc(taskFireStoreId)
                    .update({type : cat, symbol: symbol});             
        }

        

        render(){
           
            
            var tasks = {
                todo:[],
                inProgress: [],
                complete: []
              }

            this.state.tasks.forEach((task,key) => {
                    tasks[task.data().type].push(
                        <div  key={task.data().taskName} onDragStart = {(event) => this.onDragStart(event, task)}
                            draggable className = "eachTask"> 
                            <span> 
                                {task.data().symbol} <b>Title :</b> {task.data().taskName} <br/>
                                <b>Category :</b> {task.data().category}<br/>
                                <button onClick= {this.onEditClick(task)}><i  className="material-icons" >edit</i></button> <span />
                                <button onClick= {this.onDeleteClick(task)}><i className="material-icons">delete</i></button>
                            </span> <br/>
                        </div>
                );
              });

        return(
            <div>{(tasks.todo[0] || tasks.inProgress[0] || tasks.complete[0] ) ? <p> </p> : <p> To begin planning, click on "Add New Task" in the To-do list</p> }
              
                    <div className="board">
                        
                            <div className= "eachType" onDragOver={(event)=>this.onDragOver(event)}
                                onDrop={(event)=>{this.onDrop(event, "todo", '⭕️')}}>
                                <div> 
                                        <h2>
                                            To - Do  <hr style={{border: "2px solid red", width: "50%"}}/>
                                        </h2>
                                        
                                    </div>
                                    <div>  
                                        {tasks.todo}
                                        <NewTask />
                                    </div>
                                    

                            </div>

                            <div className= "eachType" onDragOver={(event)=>this.onDragOver(event)}
                                onDrop={(event)=>{this.onDrop(event, "inProgress", '🔆️')}} >
                                    <h2>
                                        In-Progress <hr style={{border: "2px solid rgb(241, 92, 33)", width: "50%"}}/>
                                    </h2>
                                    <span> 
                                        {tasks.inProgress}
                                    </span>      
                            </div> 

                            <div className= "eachType" onDragOver={(event)=>this.onDragOver(event)}
                                onDrop={(event)=>this.onDrop(event, "complete", '✅')}>
                                    <h2>
                                            Complete  <hr style={{border: "2px solid rgb(5, 177, 5)", width: "50%"}}/>   
                                    </h2>
                                        <span> {tasks.complete} </span>    
                            </div>     
                    </div>
          </div>
	    );
        

        }
}