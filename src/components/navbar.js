import React, { Component } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../assets/Medicine-Wheel---12-x-12.jpg';
import './navbar.css';
import { HashLink } from 'react-router-hash-link';



export default class navbar extends Component {

    constructor() {
        super();

        this.state = {
            expanded: false
        }
    }

    componentDidMount() {
        document.getElementById("root").style.background = "white";
    }

    setToggle = () => {
        this.setState({
            expanded: !this.state.expanded
        })
        if (this.state.expanded) {
            document.getElementById("root").style.background = "white";
        }
        else {
            document.getElementById("root").style.background = "rgba(247, 241, 241, 0.9)";
        }
    }

    render() {
        return (
            <Navbar expand="lg" onToggle={this.setToggle} sticky="top" className='inner_main_navbar'>
                <Container>
                    <Navbar.Brand className={"flex flex-row items-center"} ><img src={logo} style={{ width: 50, height: 50, marginRight: '10px' }} alt="" /><span id='headerTitle' >Spirit of Truth Native American Church</span></Navbar.Brand>

                    {this.state.expanded ?
                        <Navbar.Toggle>
                            <span aria-controls="basic-navbar-nav" className="material-icons-outlined">
                                close
                            </span>
                        </Navbar.Toggle>
                        :
                        (<Navbar.Toggle  >
                            <span aria-controls="basic-navbar-nav" className="material-icons-outlined">
                                menu
                            </span>
                        </Navbar.Toggle>)
                    }

                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end ">


                        <Nav className="m-auto extra">
                        </Nav>
                        <Nav>
                            <Nav.Link id="Links" style={{ display: "flex", justifyContent: "center" }}><HashLink to="/#Top" style={{ textDecoration: "none", color: "#18498B", fontSize: '18px', letterSpacing: '1.5px' }}>Home</HashLink></Nav.Link>

                            <Nav.Link id="Links" style={{ display: "flex", justifyContent: "center" }}><HashLink to="/ContactUs#Top" style={{ textDecoration: "none", color: "#18498B", fontSize: '18px', letterSpacing: '1.5px' }}>Contact</HashLink></Nav.Link>

                            <Nav.Link id="Links" style={{ display: "flex", justifyContent: "center" }}><HashLink to="/FAQ#Top" style={{ textDecoration: "none", color: "#18498B", fontSize: '18px', letterSpacing: '1.5px' }}>FAQ</HashLink></Nav.Link>

                            <Nav.Link id="Links" style={{ display: "flex", justifyContent: "center" }}><HashLink to="/directory" style={{ textDecoration: "none", color: "#18498B", fontSize: '18px', letterSpacing: '1.5px' }}>Directory</HashLink></Nav.Link>

                            <Nav.Link id="Links" style={{ display: "flex", justifyContent: "center" }}><HashLink to="/Signup#Top" style={{ textDecoration: "none", color: "#18498B", fontSize: '18px', letterSpacing: '1.5px' }}>Join</HashLink></Nav.Link>

                            <Button style={{ background: '#18498B' }} id="SigninBtn"><HashLink to="/Signin#Top" style={{ textDecoration: "none", color: "white", letterSpacing: '1.5px' }}>Sign In</HashLink>
                            </Button>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}