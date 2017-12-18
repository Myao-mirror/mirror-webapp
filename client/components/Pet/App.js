import React from 'react';
import fire from '../../utils/firebase/setup';
import Pet from './Pet';

const dbRoot = fire.database().ref().child('voice-pi');
const fireUser = dbRoot.child('alice-kiwi');
const petActive = fireUser.child('/pet/settings/active');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      petActive: true,
    };
  }

  componentDidMount() {
    const stringBoolMap = {
      false: false,
      true: true,
    };
    petActive.on('value', (snap) => {
      this.setState({
        petActive: stringBoolMap[snap.val()],
      });
    });
  }

  componentWillUnmount() {
    petActive.off();
  }

  render() {
    return (
      <div>
        { this.state.petActive ? <Pet /> : null }
      </div>
    );
  }
}

export default App;
