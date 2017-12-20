const functions = require('firebase-functions');
const Assistant = require('actions-on-google').DialogflowApp;
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);
const dbRoot = admin.database().ref('/voice-pi');

/*
INTENT NAMES
🔥 IMPORTANT: make sure the INTENT NAME is exactly the same as ACTION NAME(aka the function name below).
e.g: INTENT NAME is 'displayAll', function name is 'displayAll'. Otherwise it cause error: no matching intent handler for: <intent name>.
*/
const DISPLAY_ALL_INTENT = 'displayAll';
const WEATHER_INTENT = 'componentSettings';
const NEWS_INTENT = 'componentSettings';
const TIME_INTENT = 'componentSettings';
const PET_INTENT = 'petSettings';
const PET_NAME_INTENT = 'petNameSetting';

// CONTEXT PARAMETERS
const USERNAME_PARAM = 'username';
const FIRST_NAME_PARAM = 'name';
const COMPONENT_PARAM = 'component';
const DISPLAY_BOOL_PARAM = 'bool';
const PET_COMMAND_PARAM = 'petCommand';
const PET_NAME_PARAM = 'petName';

// CHANGE THE STRING "TRUE"/"FALSE" TO BOOL (Mapping string to bool)
const stringBoolMap = {
  false: false,
  true: true,
};

// CHANGE PET COMMAND INTO PHRASE (Mapping string to string)
const petCommandMap = {
  food: 'eat all of your food',
  rest: 'sleep all day',
  play: 'play with all of your favorite breakable things',
  work: 'make all of dat money',
};

exports.myaoMirrorWebhook = functions.https.onRequest((req, res) => {
  const assistant = new Assistant({ request: req, response: res });

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
    const status = stringBoolMap[displayBool] ? 'Enjoy your Myao mirror display.' : 'Enjoy your boring mirror.';
    const speech = `Here you go ${name}! ${status}`;
    assistant.ask(speech);
  }

  // ACTION FOR PET COMPONENT
  function petSettings(assistant) {
    // Parameters from Dialogflow prompt
    const username = req.body.result.parameters[USERNAME_PARAM].toLowerCase();
    const petCommand = req.body.result.parameters[PET_COMMAND_PARAM].toLowerCase();
    const petName = req.body.result.parameters[PET_NAME_PARAM] ? req.body.result.parameters[PET_NAME_PARAM] : 'your pet';
    // Capture and update value in user settings count when pet command fired
    const user = dbRoot.child(username);
    const petUpdates = {};
    let speech = '';
    if (petCommand === 'quit') {
      petUpdates['/pet/settings/active'] = false;
      user.update(petUpdates);
      speech = 'Pet display turned off.';
      assistant.ask(speech);
    } else if (petCommand === 'open') {
      petUpdates['/pet/settings/active'] = true;
      user.update(petUpdates);
      speech = 'Pet display turned on.';
      assistant.ask(speech);
    } else {
      const currentCount = dbRoot.child(`/${username}/pet/actions/${petCommand}/count`);
      currentCount.once('value', (snap) => {
        petUpdates[`/pet/actions/${petCommand}/count`] = snap.val() + 1;
        user.update(petUpdates);
        const statusText = petCommandMap[petCommand];
        speech = `Hey, I made ${petName} ${statusText} for you!`;
        assistant.ask(speech);
      });
    }
  }

  function petNameSetting(assistant) {
    const petName = req.body.result.parameters[PET_NAME_PARAM] ? req.body.result.parameters[PET_NAME_PARAM] : 'Ms. Myao';
    const username = req.body.result.parameters[USERNAME_PARAM].toLowerCase();
    const user = dbRoot.child(username);
    const name = req.body.result.parameters[FIRST_NAME_PARAM];
    const petNameUpdate = {};
    petNameUpdate['/pet/settings/petName'] = petName;
    petNameUpdate['/pet/settings/active'] = true;
    petNameUpdate['/pet/settings/status'] = 'alive';
    user.update(petNameUpdate);
    const speech = `Congrats ${name}! I'm sure you and ${petName} will be very happy together.`;
    assistant.ask(speech);
  }

  // function weatherSettings(assistant) {
  //   const username = req.body.result.parameters[USERNAME_PARAM].toLowerCase();
  //   const component = req.body.result.parameters[COMPONENT_PARAM];
  //   const displayBool = req.body.result.parameters[DISPLAY_BOOL_PARAM];
  //   if (component === 'weather') {
  //     const user = dbRoot.child(username);
  //     const weatherUpdate = {};
  //     const path = '/weather/settings/active';
  //     weatherUpdate[path] = stringBoolMap[displayBool];
  //     user.update(weatherUpdate);
  //     const status = stringBoolMap[displayBool] ? 'on' : 'off';
  //     // const speech = `I turned ${status} the ${component} for you!`;
  //     const speech = `Weather display turned ${status}.`;
  //     assistant.ask(speech);
  //   } else {
  //     const speech = 'I\'m sorry, I did not understand your weather command. Please repeat what you said.';
  //     assistant.ask(speech);
  //   }
  // }

  // function newsSettings(assistant) {
  //   const username = req.body.result.parameters[USERNAME_PARAM].toLowerCase();
  //   const component = req.body.result.parameters[COMPONENT_PARAM];
  //   const displayBool = req.body.result.parameters[DISPLAY_BOOL_PARAM];
  //   if (component === 'news') {
  //     const user = dbRoot.child(username);
  //     const newsUpdate = {};
  //     const path = '/news/settings/active';
  //     newsUpdate[path] = stringBoolMap[displayBool];
  //     user.update(newsUpdate);
  //     const status = stringBoolMap[displayBool] ? 'on' : 'off';
  //     // const speech = `I turned ${status} the ${component} for you!`;
  //     const speech = `News display turned ${status}.`;
  //     assistant.ask(speech);
  //   } else {
  //     const speech = 'I\'m sorry, I did not understand your news command. Please repeat what you said.';
  //     assistant.ask(speech);
  //   }
  // }

  // function timeSettings(assistant) {
  //   const username = req.body.result.parameters[USERNAME_PARAM].toLowerCase();
  //   const component = req.body.result.parameters[COMPONENT_PARAM];
  //   const displayBool = req.body.result.parameters[DISPLAY_BOOL_PARAM];
  //   if (component === 'time') {
  //     const user = dbRoot.child(username);
  //     const timeUpdate = {};
  //     const path = '/time/settings/active';
  //     timeUpdate[path] = stringBoolMap[displayBool];
  //     user.update(timeUpdate);
  //     const status = stringBoolMap[displayBool] ? 'on' : 'off';
  //     // const speech = `I turned ${status} the ${component} for you!`;
  //     const speech = `Time display turned ${status}.`;
  //     assistant.ask(speech);
  //   } else {
  //     const speech = 'I\'m sorry, I did not understand your time command. Please repeat what you said.';
  //     assistant.ask(speech);
  //   }
  // }

  function componentSettings(assistant) {
    const username = req.body.result.parameters[USERNAME_PARAM].toLowerCase();
    const component = req.body.result.parameters[COMPONENT_PARAM];
    const displayBool = req.body.result.parameters[DISPLAY_BOOL_PARAM];
    const user = dbRoot.child(username);
    const componentUpdate = {};
    const path = `/${component}/settings/active`;
    componentUpdate[path] = stringBoolMap[displayBool];
    user.update(componentUpdate);
    const status = stringBoolMap[displayBool] ? 'on' : 'off';
    const speech = `I turned ${status} the ${component} for you!`;
    assistant.ask(speech);
  }

  // MAP INTENTS TO ACTIONS
  const actionMap = new Map();
  actionMap.set(DISPLAY_ALL_INTENT, displayAll);
  actionMap.set(WEATHER_INTENT, componentSettings);
  actionMap.set(PET_INTENT, petSettings);
  actionMap.set(PET_NAME_INTENT, petNameSetting);
  actionMap.set(NEWS_INTENT, componentSettings);
  actionMap.set(TIME_INTENT, componentSettings);
  assistant.handleRequest(actionMap);
});
