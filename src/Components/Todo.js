import React from 'react';
import firebase from 'firebase';
import AddTask from './AddTask';

const firestore= firebase.firestore();

export default class Todo extends React.Component{
    state ={
            todos:[]
        }



    componentDidMount() {
        const uid = firebase.auth().currentUser.uid;
        firestore.collection('users')
         .doc(uid)
        .collection('todos')
        .orderBy('title','asc')
        .onSnapshot(snapshot => {
            this.setState({todos: snapshot.docs});
        })
    }

    onEditClick= (todo) => (e) => {

        const { title } = todo.data();
        const {category}= todo.data();
        const updatedTitle= prompt('Edit Title', title);
        const updatedCategory= prompt('Edit Category', category);
        const uid = firebase.auth().currentUser.uid;

        if (updatedTitle !== null){
            firestore.collection('users')
                .doc(uid)
                .collection('todos')
                .doc(todo.id)
                .update({title: updatedTitle});
            if(updatedCategory !== null){
                firestore.collection('users')
                    .doc(uid)
                    .collection('todos')
                    .doc(todo.id)
                    .update({category: updatedCategory});
                }

        }
    }

    onDeleteClick=(todo) => (e) => {
        const uid = firebase.auth().currentUser.uid;
        const shouldDelete = window.confirm('Are you sure?')
        if (shouldDelete){
            firestore.collection('users')
                .doc(uid)
                .collection('todos')
                .doc(todo.id)
                .delete();

        }
    }



         

    render(){
            const todoItems= this.state.todos
                .map((todo,key) => <div className= 'task' key= {todo.id}>
                    <link href="https://fonts.googleapis.com/icon?family=Material+Icons"rel="stylesheet"></link>
                    <span> 
                            Title: {todo.data().title} ⭕️<br/>
                            Category: {todo.data().category}
                    </span> <br/>
                    <button onClick= {this.onEditClick(todo)}><i  className="material-icons" >edit</i></button> <span />
                    <button onClick= {this.onDeleteClick(todo)}><i className="material-icons">delete</i></button>
                    </div>)
        return(
            <div className= "each-task">{todoItems}
                <AddTask />
            </div>
            
           
        )

    }


}