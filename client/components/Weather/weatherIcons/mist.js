import React from 'react';

class Mist extends React.Component {
  constructor(props) {
    super(props);
    this.height = this.props.height;
    this.width = this.props.width;
  }
  render() {
    return (
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width={this.width}
        height={this.height}
        viewBox="0 0 70 70"
        enableBackground="new 0 0 70 70"
      >
        <line fill="none" stroke="#00FFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="9.559" y1="47.234" x2="60.09" y2="47.234" />
        <line fill="none" stroke="#00FFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="6.365" y1="41.098" x2="62.979" y2="41.098" />
        <line fill="none" stroke="#00FFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="8.416" y1="34.962" x2="61.306" y2="34.962" />
        <line fill="none" stroke="#00FFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="13.466" y1="28.827" x2="56.935" y2="28.827" />
        <line fill="none" stroke="#00FFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="35.194" y1="16.556" x2="50.745" y2="16.556" />
        <line fill="none" stroke="#00FFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="17.492" y1="22.42" x2="26.146" y2="22.42" />
        <line fill="none" stroke="#00FFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="32.194" y1="22.556" x2="53.745" y2="22.556" />
        <line fill="none" stroke="#00FFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="14.559" y1="53.234" x2="56.09" y2="53.234" />
      </svg>
    );
  }
}

export default Mist;
