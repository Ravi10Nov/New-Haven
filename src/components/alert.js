
import React, { Component } from 'react';
import '../App.css';
import Close from '../assets/Close.png';
import cross from '../assets/Cross.png';
export default class alert extends Component {
    render() {
        return (
            <div id="alertBox" style={{borderLeft:`6px solid ${this.props.Icon === cross? 'red' : "green"}`}}>
                <div style={{ display: "flex", alignItems: "center"}}>
                    <div style={{ width: 20, height: 20, borderRadius: 100, display: "flex", justifyContent: "center", alignItems: "center" }}>
                        {this.props.Icon ? <img src={this.props.Icon} style={{width:"30px",height:"30px"}} /> : null}
                    </div>
                    <span id="alertBoxTxt">{this.props.text}</span>
                </div>
                <img onClick={this.props.clicked} src={Close} />
            </div>
        )
    }
}