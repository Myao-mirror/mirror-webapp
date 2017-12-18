export function usernameSubmit(fname, fruit) {
  return (dispatch) => {
    const username = `${fname}-${fruit}`;
    dispatch({
      type: 'USERNAME_FORM_ONCHANGE',
      payload: {
        fname,
        fruit,
        username,
      },
    });
  };
}

export function checkIfExist(bool) {
  return (dispatch) => {
    dispatch({
      type: 'CHECK_IF_EXIST',
      payload: bool,
    });
  };
}
