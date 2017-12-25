import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NewJedi extends Component {
    render() {
        return (
            <div>
                <form onSubmit={this.props.addJediToDb}>
                    <input 
                        className="inputAddJedi"
                        type="text"
                        placeholder={this.props.emptyInput}
                        value={this.props.valueInput}
                        onChange={this.props.inputChange}
                    />
                </form>
            </div>
        );
    }
}

NewJedi.propTypes = {
    valueInput: PropTypes.string.isRequired,
    inputChange: PropTypes.func,
    addJediToDb: PropTypes.func
}