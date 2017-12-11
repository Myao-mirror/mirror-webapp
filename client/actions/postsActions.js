import axios from 'axios';
// import { Posts } from '../views/modules/posts/Posts';

export default function fetchPosts() {
  return (dispatch) => {
    const target = 'news/new';
    axios.get(`http://www.reddit.com/r/${target}/.json`)
      .then((res) => {
        dispatch({ type: 'GET_POSTS', payload: res.data.data.children.map(obj => obj.data) });
        console.log('Get Posts from postsAction.js Dispatch');
      })
      .catch((err) => {
        dispatch({ type: 'POSTS_ERROR', payload: err });
        console.log('Error from postsActions.js Dispatch');
      });
  };
}

