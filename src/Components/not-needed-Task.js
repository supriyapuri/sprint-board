import React from 'react';

export default class Card extends React.Component{
    render(){
        const { task } = this.props;
        return(
            <div className = "task">
                <span>
                    {task.id}
                    {task.title}  {task.icon}<br/>
                    Content: {task.content}
                </span>
            </div>
        )
    }
}
