import React from 'react';
import Task from './not-needed-Task';
import Todo from './Todo';
import WorkInProgress from './WorkInProgress';
import Complete from './Complete'



export default class Card extends React.Component{
    render(){

        const { card } = this.props;

        return(
            <div className= "card"> 
                {/* {card.tasks.map((task,taskIndex) =>(
                    <div> <Todo /></div>
                    <div><WorkInProgress /></div>
                    <div><Complete /></div>
                    // // <Todo task= {task} taskIndex= {taskIndex} key= {taskIndex} />
                    // <Todo task= {task} taskIndex= {taskIndex} key= {taskIndex} />,
                    // <WorkInProgress task= {task} taskIndex= {taskIndex} key= {taskIndex} />

                ))}  */}
                <div> <Todo /></div>
                <div><WorkInProgress /></div>
                <div><Complete /></div> 


            </div>

        )
    }
}


