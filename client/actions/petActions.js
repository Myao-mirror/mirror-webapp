import axios from 'axios';
import Counter from '../components/PetComp/Counter';

export default function fetchPet() {
  return (dispatch) => {
    axios.get(Counter)
      .then((res) => {
        dispatch({ type: 'GET_COUNT', payload: res });
      })
      .catch((err) => {
        dispatch({ type: 'COUNT_ERROR', payload: err });
      });
  };
}

