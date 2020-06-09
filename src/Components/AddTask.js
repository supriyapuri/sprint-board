import React from 'react';
import firebase from 'firebase';

const firestore= firebase.firestore();

export default class AddTask extends React.Component{
       state={
            showForm: false,
            todos: {
                title :'',
                category :''
            }
        }

        onEntryChange= (e) => {
            console.log(e)
            
            const value = e.target.value;
            
            this.setState({
                todos:{
                    ...this.state.todos,
                [e.target.name] : value }
            })
    
        }

        AddTask= (e)=> {

            e.preventDefault();
            const uid = firebase.auth().currentUser.uid;

            firestore.collection('users')
            .doc(uid)
            .collection('todos').add({
                title: this.state.todos.title,
                category: this.state.todos.category,

            }).then(()=>{
                this.setState({
                    todos: {
                        title: '',
                        category: ''
                    },
                    showForm: false
                })
            })

        }
    

        renderForm () {
            return(
                <div>
                    <form onSubmit={this.AddTask}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <input type= "text" 
                                        name = 'title' 
                                        placeholder='Title' 
                                        value= {this.state.todos.title}
                                        onChange= {this.onEntryChange} required />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input type= "text" 
                                        name= 'category' 
                                        placeholder='Category'
                                        value= {this.state.todos.category}
                                        onChange= {this.onEntryChange} required />
                                    </td>
                                </tr>
                            </tbody>     
                        </table>
                        <button type="submit">Add Task</button> 
                    
                    </form>
                </div>
            )
        }


    render(){
        return(
            <div>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons"rel="stylesheet"></link>

                    <button  onClick={() => this.setState({showForm: true})}>
                                <i className="material-icons">note_add</i>
                    </button>
                        {this.state.showForm && this.renderForm()}      

            </div>
        )
    }
}
