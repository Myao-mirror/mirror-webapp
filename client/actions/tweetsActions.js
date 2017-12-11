export default function fetchTweets(num) {
  return {
    type: 'GET_TWEETS',
    payload: num,
  };
}

