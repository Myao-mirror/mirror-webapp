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
const PET_INTENT = 'petSettings';

// CONTEXT PARAMETERS
const USERNAME_PARAM = 'username';
const COMPONENT_PARAM = 'component';
const DISPLAY_BOOL_PARAM = 'bool';
const PET_COMMAND_PARAM = 'petCommand';

// CHANGE THE STRING "TRUE"/"FALSE" TO BOOL (Mapping string to bool)
const stringBoolMap = {
  false: false,
  true: true,
};

// CHANGE THE STRING TO NUM (Mapping string to num)
// const petCommandMap = {
//   rest: this.petRest += 1,
//   play: this.petPlay += 1,
//   work: this.petWork += 1,
//   food: this.petFood += 1,
// };

exports.myaoMirrorWebhook = functions.https.onRequest((req, res) => {
  const assistant = new Assistant({ request: req, response: res });

  // MAP INTENTS TO ACTIONS
  const actionMap = new Map();
  actionMap.set(DISPLAY_ALL_INTENT, displayAll);
  actionMap.set(WEATHER_INTENT, weatherSettings);
  actionMap.set(PET_INTENT, petSettings);
  assistant.handleRequest(actionMap);

  // ACTION TO DISPLAY ALL COMPONENT
  function displayAll(assistant) {
    const username = req.body.result.parameters[USERNAME_PARAM].toLowerCase();
    const displayBool = req.body.result.parameters[DISPLAY_BOOL_PARAM];

    const user = dbRoot.child(username);
    const displayUpdates = {};
    displayUpdates['/news/settings/active'] = stringBoolMap[displayBool];
    displayUpdates['/time/settings/active'] = stringBoolMap[displayBool];
    displayUpdates['/weather/settings/active'] = stringBoolMap[displayBool];
    displayUpdates['/pet/settings/active'] = stringBoolMap[displayBool];
    user.update(displayUpdates);

    const status = stringBoolMap[displayBool] ? 'Here are all the good stuff for you!' : 'Here is an empty mirror for you!';
    const speech = `Hey ${username}! ${status}`;
    assistant.ask(speech);
  }

  function petSettings(assistant) {
    const username = req.body.result.parameters[USERNAME_PARAM].toLowerCase();
    const petCommand = req.body.result.parameters[PET_COMMAND_PARAM].toLowerCase();

    const user = dbRoot.child(username);
    const petUpdates = {};
    const path = `/$pet/settings/${petCommand}/count`;
    let currentCount = admin.database().ref(`/voice-pi/${username}/pet/settings/${petCommand}/count`);
    currentCount.on('value', (snap) => {
      snap.val();
      petUpdates[`/pet/settings/${petCommand}/count`] = (snap.val() + 1);
      user.update(petUpdates);
    });

    const speech = `Hey, I made your pet go ${petCommand} for you!`;
    assistant.ask(speech);
  }

  // TODO:  EXPAND WEATHER ACTIONS
  function weatherSettings(assistant) {
    const username = req.body.result.parameters[USERNAME_PARAM].toLowerCase();
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
