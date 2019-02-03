// An executor is responsible for sending out the commands which we run on the machine
//
// @param data -> Array of Commands to Execute
//
// The executioner may not use the `is_complete` property; it perhaps will only receive a
// completely parsed string of commands or a serialised object of commands

import robot from 'robotjs';

// Executing a tree would consist of parsing an array of actions
//
// The structure of the data has already been defined
// [
//   keyTap      => { type: 'key-tap', value: 'enter', modifier: [""] }
//   keyToggle   => { type: 'key-toggle', value: 'enter', event: "down/up", modifier: [""] }
//   typeString  => { type: 'text', text: 'enter', event: "send" }
// ]
const executeTree = (
  data,
  executions = {
    "key-tap": robot.keyTap,
    "key-toggle": robot.keyToggle,
    "text": robot.typeString,
  }
) => {
  if(data.complete) {
    data.actions.forEach(function (action) {
      executions
      switch(action.type) {
        case 'key-tap':
          executions[action.type](action.value, action.modifier)
          break;
        case 'key-toggle':
          executions[action.type](action.value, action.event, action.modifier)
          break;
        case 'text':
          executions[action.type](action.text)
          break;
        default:
      }
    });
  }
}

const commands = {
  string: executeString,
  tree: executeTree
}

export default commands;


