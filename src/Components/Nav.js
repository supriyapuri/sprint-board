import React from 'react';
import {Link, withRouter} from 'react-router-dom';

class Nav extends React.Component {
    render() {
        return (
            <div className = "Nav-bar">
                    <Link to="/">Home</Link>
                    <Link to="/board">Board</Link>
                
            </div>
        )
    }
}

export default withRouter(Nav);