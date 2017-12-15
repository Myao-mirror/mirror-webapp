const functions = require('firebase-functions');
// const http = require('http');
const Assistant = require('actions-on-google').DialogflowApp;
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const dbRoot = admin.database().ref('/voice-pi');

// INTENT NAMES
// 🔥 IMPORTANT: make sure the INTENT NAME is exactly the same as ACTION NAME(aka the function name below). e.g: INTENT NAME is 'displayAll', function name is 'displayAll'. Otherwise it cause error: no matching intent handler for: <intent name>.
const DISPLAY_ALL_INTENT = 'displayAll';
const WEATHER_INTENT = 'weatherSettings';

// CONTEXT PARAMETERS
const USERNAME_PARAM = 'username';
const COMPONENT_PARAM = 'component';
const DISPLAY_BOOL_PARAM = 'bool';

// CHANGE THE STRING "TRUE"/"FALSE" TO BOOL
const stringBoolMap = {
  false: false,
  true: true,
};

exports.myaoMirrorWebhook = functions.https.onRequest((req, res) => {
  const assistant = new Assistant({ request: req, response: res });

  // MAP INTENTS TO ACTIONS
  const actionMap = new Map();
  actionMap.set(DISPLAY_ALL_INTENT, displayAll);
  actionMap.set(WEATHER_INTENT, weatherSettings);
  assistant.handleRequest(actionMap);


  // ACTION TO DISPLAY ALL COMPONENT
  function displayAll(assistant) {
    const username = req.body.result.parameters[USERNAME_PARAM];
    const displayBool = req.body.result.parameters[DISPLAY_BOOL_PARAM];

    const user = dbRoot.child(username);
    const displayUpdates = {};
    displayUpdates['/news/settings/active'] = displayBool;
    displayUpdates['/time/settings/active'] = displayBool;
    displayUpdates['/weather/settings/active'] = displayBool;
    displayUpdates['/pet/settings/active'] = displayBool;
    user.update(displayUpdates);

    const status = stringBoolMap[displayBool] ? 'Here are all the good stuff for you!' : 'Here is an empty mirror for you!';
    const speech = `Hey ${username}! ${status}`;
    assistant.ask(speech);
  }

  // TODO:  EXPAND WEATHER ACTIONS
  function weatherSettings(assistant) {
    const username = req.body.result.parameters[USERNAME_PARAM];
    const component = req.body.result.parameters[COMPONENT_PARAM];
    const displayBool = req.body.result.parameters[DISPLAY_BOOL_PARAM];
    
    const user = dbRoot.child(username);
    const settingUpdates = {};
    const path = `/${component}/settings/active`;
    settingUpdates[path] = stringBoolMap[displayBool];
    user.update(settingUpdates);

    const status = stringBoolMap[displayBool] ? 'on' : 'off';
    const speech = `I turned ${status} the ${component} for you!`;
    assistant.ask(speech);
  }
});
