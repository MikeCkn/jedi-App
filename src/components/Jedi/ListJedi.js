import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {Button} from "react-bootstrap";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class ListJedi extends Component {
    
    render() {
        const jedis = this.props.data.map((jedi, index) =>
            <li key={index} className="divAlignItems">
                <span>{index+1} : {jedi.name}</span>
                <Button onClick={()=>this.props.deleteJedi(jedi.id)}>X</Button>
            </li>
        )

        return (
            <ul>
                <ReactCSSTransitionGroup
                    transitionName="example"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}
                >
                    {jedis}
                </ReactCSSTransitionGroup>
            </ul>
        );
    }
}

ListJedi.propTypes = {
    data: PropTypes.array.isRequired,
    deleteJedi: PropTypes.func
}