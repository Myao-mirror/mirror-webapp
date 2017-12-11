import axios from 'axios';

export default function fetchPosts() {
  return (dispatch) => {
    const subreddit = 'news/new';
    axios.get(`http://www.reddit.com/r/${subreddit}/.json`)
      .then((res) => {
        dispatch({ type: 'GET_POSTS', payload: res.data.data.children.map(obj => obj.data) });
      })
      .catch((err) => {
        dispatch({ type: 'POSTS_ERROR', payload: err });
      });
  };
}

