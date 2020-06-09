import React from 'react';
import firebase from 'firebase';


const firestore= firebase.firestore();

export default class Complete extends React.Component{
    state ={
            completedTasks:[]
        }


    componentDidMount() {
        const uid = firebase.auth().currentUser.uid;
        firestore
        .collection('users')
        .doc(uid)
        .collection('completed')
        .onSnapshot(snapshot => {
            this.setState({completedTasks: snapshot.docs});
        })
    }

    onEditClick= (complete) => (e) => {
        const uid = firebase.auth().currentUser.uid;
        const { title } = complete.data();
        const {category}= complete.data();
        const updatedTitle= prompt('Edit Title', title);
        const updatedCategory= prompt('Edit Category', category);
        if (updatedTitle !== null){
                firestore.collection('users')
                    .doc(uid)
                    .collection('completed')
                    .doc(complete.id)
                    .update({title: updatedTitle});
            if(updatedCategory !== null){
                firestore.collection('users')
                    .doc(uid)
                    .collection('completed')
                    .doc(complete.id)
                    .update({category: updatedCategory});
                }

        }
    }

    onDeleteClick=(complete) => (e) => {
        const uid = firebase.auth().currentUser.uid;
        const shouldDelete = window.confirm('Are you sure?')
        if (shouldDelete){
            firestore.collection('users')
                .doc(uid)
                .collection('completed')
                .doc(complete.id)
                .delete();

        }
    }

    render(){
            const completeItems= this.state.completedTasks
                .map((complete,key) => <div className= 'task' key= {complete.id}>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons"rel="stylesheet"></link>
                <span>
                    Title: {complete.data().title} ✅<br/>
                    Category: {complete.data().category}
                    <br/>
                    <button onClick= {this.onEditClick(complete)}><i  style= {{color: 'rgb(5, 177, 5)'}} className="material-icons" >edit
                    </i></button> <span />
                    <button onClick= {this.onDeleteClick(complete)}><i style= {{color: 'rgb(5, 177, 5)'}}className="material-icons">delete
                    </i></button>
                </span>
                        
                         </div>)
            return(
                    <div>{completeItems}</div>
                        
        )

    }


}