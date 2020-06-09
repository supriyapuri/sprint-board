import React from 'react';
import {Link, withRouter} from 'react-router-dom';

class Nav extends React.Component {
    render() {
        return (
            <div >
                    <Link to="/"><em>Home  </em></Link>
                    <Link to="/board"><em>Board</em></Link>
                
            </div>
        )
    }
}

export default withRouter(Nav);