import axios from 'axios';

export default function testDisplayAction() {
  return (dispatch) => {
    axios.get('http://localhost:3000/api/display')
      .then((res) => {
        dispatch({ type: 'TEST_DISPLAY', payload: res.data[0] });
        console.log('testDisplay res: ', res);
      })
      .catch((err) => {
        dispatch({ type: 'DISPLAY_ERROR', payload: err });
        console.log('testDisplay err: ', err);
      });
  };
}
