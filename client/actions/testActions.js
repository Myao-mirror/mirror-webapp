import axios from 'axios';

export function testDisplayAction() {
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

export function testPostDisplayRequest(displayBool) {
  return (dispatch) => {
    axios.post('http://localhost:3000/api/display', { Name: 'test', DisplayBool: displayBool })
      .then((res) => {
        dispatch({ type: 'POST_DATA', payload: res.data });
        console.log('************************ post response ', res);
      })
      .catch((err) => {
        dispatch({ type: 'DISPLAY_EROOR', payload: err });
      });
  };
}
