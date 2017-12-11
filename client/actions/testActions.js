export default function testDisplayAction(displayBool = false) {
  return {
    type: 'TEST_DISPLAY',
    payload: displayBool,
  };
}

