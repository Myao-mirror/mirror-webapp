import React from 'react';

class BigRain extends React.Component {
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
          d="M55.981,21.629c5.181,1.162,9.052,5.791,9.052,11.322c0,6.408-5.196,11.604-11.604,11.604H15.914c-6.409,0-11.604-4.559-11.604-10.969c0-5.48,3.801-10.076,8.911-11.289c-0.315-0.936-0.486-1.938-0.486-2.98c0-5.158,4.182-9.34,9.341-9.34c2.561,0,4.88,1.029,6.568,2.697h0.001c2.273-5.01,7.319-8.494,13.18-8.494c7.988,0,14.465,6.477,14.465,14.465c0,1.023-0.309,2.986-0.309,2.986V21.629z"
        />
        <line fill="none" stroke="#00FFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="19.287" y1="51.713" x2="18.287" y2="58.795" />
        <line fill="none" stroke="#00FFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="29.662" y1="51.713" x2="27.662" y2="65.795" />
        <line fill="none" stroke="#00FFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="40.407" y1="51.713" x2="38.407" y2="65.795" />
        <line fill="none" stroke="#00FFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="50.782" y1="51.713" x2="49.782" y2="58.795" />
      </svg>
    );
  }
}

export default BigRain;
