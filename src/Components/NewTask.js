import React from 'react';
import firebase from 'firebase';

const firestore= firebase.firestore();

export default class NewTask extends React.Component{
       state={
            showForm: false,
            tasks: {
                taskName :'',
                category: ''
            }
        }

        onEntryChange= (e) => {
            
            
            const value = e.target.value;
            
            this.setState({
                tasks:{
                    ...this.state.tasks,
                [e.target.name] : value }
            })
    
        }

        newTask= (e)=> {

            e.preventDefault();
            const uid = firebase.auth().currentUser.uid;

            firestore.collection('users')
            .doc(uid)
            .collection('tasks').add({
                taskName: this.state.tasks.taskName,
                category: this.state.tasks.category,
                type: "todo",
                symbol: "⭕️"

            }).then(()=>{
                this.setState({
                    tasks: {
                        taskName: '',
                        category: ''
                    },
                    showForm: false
                })
            })

        }

        handleCancel = (e)=>
        {
            e.preventDefault();
            this.setState({
            
                showForm: false

        })}

    

        renderForm () {
            return(
                <div>
                    <form onSubmit={this.newTask}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <input type= "text" 
                                        style= {{ margin : "10px"}} 
                                        name = 'taskName' 
                                        placeholder='Title' 
                                        value= {this.state.tasks.taskName}
                                        onChange= {this.onEntryChange} required />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input type= "text" 
                                        name= 'category' 
                                        style= {{ margin : "10px"}}
                                        placeholder='Category'
                                        value= {this.state.tasks.category}
                                        onChange= {this.onEntryChange} required />
                                    </td>
                                </tr>
                            </tbody>     
                        </table>
                        <button style= {{ backgroundColor: 'white', float:'left'}} 
                            type="submit">Add Task</button> 
                        <button onClick = {this.handleCancel} style= {{ backgroundColor: 'rgb(236, 214, 211)', float:'none'}} 
                            >Cancel</button>
                    
                    </form>
                </div>
            )
        }


    render(){
        return(
            <div>
 
                <button style= {{ backgroundColor: 'white', float:'none', width: '90%'}}
                        onClick={() => this.setState({showForm: true})}>Add New Task 
                </button>
                        {this.state.showForm && this.renderForm()}    
            </div>
        )
    }
}
