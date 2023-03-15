import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavbarToggler, NavbarBrand, Collapse} from "reactstrap";
import brandLogo from "../../images/ses_logo.png";

export default class Navi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <Navbar style={{backgroundColor: "rgb(255, 165, 0)",color:"white"}} expand="md" fixed="top" className="mb-3">
        <NavbarBrand tag={Link} to="/">
          <img src={brandLogo} alt="Brand logo" width="10" height="10" />
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
        </Collapse>
      </Navbar>
    );
  }
}
