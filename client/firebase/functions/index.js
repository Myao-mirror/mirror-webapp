

const http = require('http');
const Assistant = require('actions-on-google').ApiAiAssistant;
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const know = admin.database().ref('/voice-pi');

// INTENT NAMES
const USERNAME_INTENT = 'getUsername';
const ACTION_INTENT = 'action_to_display';

// CONTEXT
const WELCOME_CONTEXT = 'welcome';
const USERNAME_CONTEXT = 'ask_username';
const ACTION_CONTEXT = 'ask_action';
const ANSWER_CONTEXT = 'answer';

// CONTEXT PARAMETERS
const USERNAME_PARAM = 'username';
const ANSWER_PARAM = 'answer';


// exports.myaoWebhook = (req, res) => {
exports.myaoWebhook = functions.https.onRequest((req, res) => {
  const assistant = new Assistant({ request: req, response: res });

  const actionMap = new Map();
  actionMap.set(USERNAME_INTENT, getUsername);
  actionMap.set(ACTION_INTENT, action_to_display);
  assistant.handleRequest(actionMap);

  function getUsername(assistant) {
    const username = req.body.result.parameters.username;
    const component = req.body.result.parameters.component;
    const bool = req.body.result.parameters.bool;
    const user = know.child(username.toLowerCase());
    let speech = '';
    if (bool && component == 'news') {
      let decision = true;
      if (bool.toLowerCase() == 'no') {
        decision = false;
      }
      user.set({
        news: decision,
      });
      speech = `Hey ${username}! I now set your ${component} to ${decision}.`;
      assistant.ask(speech);
    }
    user.child(component.toString()).once('value', (changeSetting) => {
      speech = `Hey ${username}! Your ${component} is set to ${changeSetting.val()}.`;
      console.log('_____________________changeSetting', changeSetting);
      assistant.ask(speech);
    });
  }

  function action_to_display(assistant) {

  }
