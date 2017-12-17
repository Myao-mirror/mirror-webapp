const functions = require('firebase-functions');
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
const FIRST_NAME_PARAM = 'name';
const COMPONENT_PARAM = 'component';
const DISPLAY_BOOL_PARAM = 'bool';
const PET_COMMAND_PARAM = 'petCommand';
// const PET_NAME_PARAM = 'petName';

// CHANGE THE STRING "TRUE"/"FALSE" TO BOOL (Mapping string to bool)
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
  actionMap.set(PET_INTENT, petSettings);
  assistant.handleRequest(actionMap);

  // ACTION TO DISPLAY ALL COMPONENT
  function displayAll(assistant) {
    const username = req.body.result.parameters[USERNAME_PARAM].toLowerCase();
    const name = req.body.result.parameters[FIRST_NAME_PARAM];
    const displayBool = req.body.result.parameters[DISPLAY_BOOL_PARAM];

    const user = dbRoot.child(username);
    const displayUpdates = {};
    displayUpdates['/news/settings/active'] = stringBoolMap[displayBool];
    displayUpdates['/time/settings/active'] = stringBoolMap[displayBool];
    displayUpdates['/weather/settings/active'] = stringBoolMap[displayBool];
    displayUpdates['/pet/settings/active'] = stringBoolMap[displayBool];
    user.update(displayUpdates);

    const status = stringBoolMap[displayBool] ? 'Here are all the good stuff for you!' : 'Here is an empty mirror for you!';
    const speech = `Hey ${name}! ${status}`;
    assistant.ask(speech);
  }

  // ACTION FOR PET COMPONENT
  function petSettings(assistant) {
    const username = req.body.result.parameters[USERNAME_PARAM].toLowerCase();
    const petCommand = req.body.result.parameters[PET_COMMAND_PARAM].toLowerCase();
    // const petName = req.body.result.parameters[PET_NAME_PARAM] ? req.body.result.parameters[PET_NAME_PARAM] : 'MyaoPet';

    const user = dbRoot.child(username);
    const petUpdates = {};
    const currentCount = dbRoot.child(`/${username}/pet/settings/actions/${petCommand}/count`);
    currentCount.once('value', (snap) => {
      snap.val();
      petUpdates[`/pet/settings/actions/${petCommand}/count`] = snap.val() + 1;
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
