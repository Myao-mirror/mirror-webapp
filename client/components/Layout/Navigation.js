import React from 'react';
import * as kendo from '@progress/kendo-ui';
/* Alternative approaches to load Kendo UI will be:
import '@progress/kendo-ui';
require("@progress/kendo-ui/js/kendo.all.js"); */
import '@progress/kendo-theme-default/dist/all.css';
import { Calendar } from '@progress/kendo-dateinputs-react-wrapper';
import Link from '../Link';

class Navigation extends React.Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     dateTime: new Date()
  //   };

  //   this.onchange = this.onchange.bind(this);
  // }

  // onchange(e) {
  //   this.setState({
  //     dateTime: e.sender.value()
  //   });
  // }

  componentDidMount() {
    window.componentHandler.upgradeElement(this.root);
  }

  componentWillUnmount() {
    window.componentHandler.downgradeElements(this.root);
  }

  render() {
    return (
      <nav className="mdl-navigation" ref={node => { this.root = node; }}>
        <Link className="mdl-navigation__link" to="/">Home</Link>
        <Link className="mdl-navigation__link" to="/about">About</Link>
        <Link className="mdl-navigation__link" to="/grid">Table Grid</Link>
        <Link className="mdl-navigation__link" to="/not-found">Not Found</Link>
        {/* <Calendar value={this.state.dateTime} change={this.onchange}/> */}
      </nav>
    );
  }

}

export default Navigation;
