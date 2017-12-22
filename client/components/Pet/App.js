// import React from 'react';
// import { connect } from 'react-redux';
// import fire from '../../utils/firebase/setup';
// import Pet from './Pet';

// const dbRoot = fire.database().ref().child('voice-pi');

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       petActive: true,
//     };
//     this.username = '';
//     this.fireUser = {};
//     this.petActive = null;
//   }

//   componentDidMount() {
//     this.username = this.props.username.username;
//     this.fireUser = dbRoot.child(this.username);
//     this.petActive = this.fireUser.child('/pet/settings/active');
//     const stringBoolMap = {
//       false: false,
//       true: true,
//     };
//     this.petActive.on('value', (snap) => {
//       this.setState({
//         petActive: stringBoolMap[snap.val()],
//       });
//     });
//   }

//   componentWillUnmount() {
//     this.petActive.off();
//   }

//   render() {
//     return (
//       <div>
//         <Pet />
//       </div>
//     );
//   }
// }

// const mapStateToProps = state => ({
//   username: state.username,
// });

// export default connect(mapStateToProps)(App);
