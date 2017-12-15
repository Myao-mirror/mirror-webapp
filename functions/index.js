const functions = require('firebase-functions');
// const http = require('http');
const Assistant = require('actions-on-google').DialogflowApp;
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const dbRoot = admin.database().ref('/voice-pi');

// INTENT NAMES
// 🔥 IMPORTANT: make sure the INTENT NAME is exactly the same as ACTION NAME, in this case, the function name below. e.g: INTENT NAME is 'displayAll', function name is 'displayAll'. Otherwise it cause error: no matching intent handler for: <intent name>.
const DISPLAY_ALL_INTENT = 'displayAll';

// CONTEXT PARAMETERS
const USERNAME_PARAM = 'username';
const COMPONENT_PARAM = 'component';
const DISPLAY_BOOL_PARAM = 'bool';


exports.myaoMirrorWebhook = functions.https.onRequest((req, res) => {
  const assistant = new Assistant({ request: req, response: res });

  const actionMap = new Map();
  actionMap.set(DISPLAY_ALL_INTENT, displayAll);
//   actionMap.set(ACTION_INTENT, action_to_display);
  assistant.handleRequest(actionMap);

  function displayAll(assistant) {
    const username = req.body.result.parameters[USERNAME_PARAM];
    const displayBool = req.body.result.parameters[DISPLAY_BOOL_PARAM];
    const user = dbRoot.child(username);
    
    let displayUpdates = {};
    displayUpdates['/news/settings/active'] = displayBool;
    displayUpdates['/time/settings/active'] = displayBool;
    displayUpdates['/weather/settings/active'] = displayBool;
    displayUpdates['/pet/settings/active'] = displayBool;

    user.update(displayUpdates);
    const status = displayBool ? 'Here are all the good stuff for you!' : 'Here is an empty mirror for you!';
    const speech = `Hey ${username}! ${status}`;
    assistant.ask(speech);
  }
});
