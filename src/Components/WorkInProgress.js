import React from 'react';
import firebase from 'firebase';


const firestore= firebase.firestore();

export default class WorkInProgress extends React.Component{
    state ={
            wips:[]
        }

        
    componentDidMount() {
        const uid = firebase.auth().currentUser.uid;
        firestore
        .collection('users')
        .doc(uid)
        .collection('workInProgress')
        .onSnapshot(snapshot => {
            this.setState({wips: snapshot.docs});
            
        })
    }

    onEditClick= (wip) => (e) => {
        const { title } = wip.data();
        const {category}= wip.data();
        const updatedTitle= prompt('Edit Title', title);
        const updatedCategory= prompt('Edit Category', category);
        const uid = firebase.auth().currentUser.uid;
        if (updatedTitle !== null){
            firestore.collection('users')
                .doc(uid)
                .collection('workInProgress')
                .doc(wip.id)
                .update({title: updatedTitle});
            if(updatedCategory !== null){
                firestore.collection('users')
                    .doc(uid)
                    .collection('workInProgress')
                    .doc(wip.id)
                    .update({category: updatedCategory});
                }

        }
    }

    onDeleteClick=(wip) => (e) => {
        const shouldDelete = window.confirm('Are you sure?')
        const uid = firebase.auth().currentUser.uid;
        if (shouldDelete){
            firestore.collection('users')
                .doc(uid)
                .collection('workInProgress')
                .doc(wip.id)
                .delete();

        }
    }

    render(){
            const wipItems= this.state.wips
                .map((wip,key) => <div className= 'task' key= {wip.id}> 
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons"rel="stylesheet"></link>
                <span>
                    Title: {wip.data().title} 🔆️<br/>
                    Category: {wip.data().category}
                    <br/>
                    <button onClick= {this.onEditClick(wip)}><i  style= {{color: 'orange'}} className="material-icons" >edit
                    </i></button> <span />
                    <button onClick= {this.onDeleteClick(wip)}><i style= {{color: 'orange'}}className="material-icons">delete
                    </i></button>
                </span>
                </div>)
        return(
            <div>{wipItems}</div>
           
        )

    }


}