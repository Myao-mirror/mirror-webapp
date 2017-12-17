export default function usernameSubmit(fname, fruit) {
  return (dispatch) => {
    const username = `${fname}-${fruit}`;
    dispatch({
      type: 'USERNAME_FORM_SUBMIT',
      payload: {
        fname,
        fruit,
        username,
      },
    });
  };
}
