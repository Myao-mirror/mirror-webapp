import React from 'react';

class Sunny extends React.Component {
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
        <g>
          <circle fill="none" stroke="#00FFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" cx="34.381" cy="35.303" r="16.557" />

          <line fill="none" stroke="#00FFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="34.381" y1="10.736" x2="34.381" y2="5.523" />

          <line fill="none" stroke="#00FFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="4.672" y1="35.304" x2="9.885" y2="35.304" />

          <line fill="none" stroke="#00FFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="51.702" y1="52.625" x2="55.801" y2="56.726" />

          <line fill="none" stroke="#00FFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="12.959" y1="13.883" x2="17.059" y2="17.983" />

          <line fill="none" stroke="#00FFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="17.058" y1="52.626" x2="12.958" y2="56.726" />

          <line fill="none" stroke="#00FFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="55.801" y1="13.884" x2="51.7" y2="17.984" />
          <g>
            <line fill="none" stroke="#00FFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="51.703" y1="17.983" x2="55.803" y2="13.883" />

            <line fill="none" stroke="#00FFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="12.96" y1="56.726" x2="17.06" y2="52.626" />

            <line fill="none" stroke="#00FFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="51.651" y1="52.677" x2="55.75" y2="56.776" />

            <line fill="none" stroke="#00FFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="12.908" y1="13.934" x2="17.008" y2="18.034" />

            <line fill="none" stroke="#00FFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="34.329" y1="59.851" x2="34.329" y2="65.063" />

            <line fill="none" stroke="#00FFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="34.329" y1="5.647" x2="34.329" y2="10.859" />

            <line fill="none" stroke="#00FFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="9.832" y1="35.355" x2="4.62" y2="35.355" />

            <line fill="none" stroke="#00FFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="64.035" y1="35.355" x2="58.822" y2="35.354" />
          </g>
        </g>
      </svg>
    );
  }
}

export default Sunny;
