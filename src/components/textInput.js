import React, { Component } from 'react';

export default class TextInput extends Component {
    render() {
        return <div id="FormControlBox">
            {this.props.icon ? <span style={{ width: 30 }}>{this.props.icon}</span> : null}
            <input type={this.props.type} placeholder={this.props.placeholder} onChange={this.props.HandleChange} autoComplete="off" id={this.props.InputID} />
            <span onClick={this.props.HideShow_Password} style={{ color: "#C4CBD1" }}>{this.props.PasswordIcon}</span>
        </div>
    }
}