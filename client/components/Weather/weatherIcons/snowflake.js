import React from 'react';

class Snowflake extends React.Component {
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
        <path
          fill="none"
          stroke="#00FFFF"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="M16.583,49.232c-6.181,0-11.191-4.396-11.191-10.578c0-5.287,3.665-9.717,8.595-10.888c-0.305-0.901-0.469-1.869-0.469-2.873c0-4.976,4.033-9.009,9.008-9.009c2.47,0,4.707,0.993,6.334,2.603l0.002-0.001c2.192-4.832,7.059-8.193,12.709-8.193c7.705,0,13.951,6.246,13.951,13.95c0,0.988-0.299,2.881-0.299,2.881v-0.002c4.998,1.121,8.73,5.584,8.73,10.919c0,6.181-5.01,11.191-11.191,11.191"
        />
        <g>

          <line fill="none" stroke="#00FFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="34.672" y1="36.857" x2="34.672" y2="61.607" />

          <line fill="none" stroke="#00FFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="47.047" y1="49.232" x2="22.297" y2="49.232" />

          <polyline
            fill="none"
            stroke="#00FFFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            points="24.297,45.649 27.881,49.233 24.297,52.816"
          />

          <polyline
            fill="none"
            stroke="#00FFFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            points="45.047,52.815 41.464,49.232 45.047,45.649"
          />

          <polyline
            fill="none"
            stroke="#00FFFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            points="31.089,59.607 34.672,56.024 38.256,59.607"
          />

          <polyline
            fill="none"
            stroke="#00FFFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            points="38.256,38.857 34.672,42.441 31.089,38.857"
          />

          <line fill="none" stroke="#00FFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="43.423" y1="40.482" x2="25.922" y2="57.983" />

          <line fill="none" stroke="#00FFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="43.423" y1="57.983" x2="25.922" y2="40.482" />
        </g>
      </svg>
    );
  }
}

export default Snowflake;
