// Libraries
import React from 'react';
import { Button, Dropdown, Menu } from 'semantic-ui-react';
import Store from "electron-store";

// Services
import broadcasters from '../../services/broadcasters'

// Data
const userPreferences = new Store({
  name: "user-preferences"
});

export default class SpeechControls extends React.Component {
  constructor() {
    super()
    this.state = {
      recording: false,
      adapter: userPreferences.get("speechAdapter")
    }
  }

  render() {
    const speech = this.props.speech
    const adapter = speech.adapters[this.state.adapter]

    const toggleSpeech = () => {
      let recording = this.state.recording
      this.setState({
        recording: !recording
      })
    }

    const start = () => {
      toggleSpeech()
      return broadcasters['client']('toggle-speech', 'start')
    }

    const stop = () => {
      toggleSpeech()
      return broadcasters['client']('toggle-speech', 'stop')
    }

    const selectOptions = (object) => {
      let options = Object.keys(object).map((adapter) => (
        { key: adapter, value: adapter, text: adapter }
      ))
      return options
    }

    const selectAdapter = (e) => {
      let adapter = e.target.textContent
      this.setState({
        adapter: adapter
      })
      return userPreferences.set("speechAdapter", adapter);
    }

    return (
      <Menu.Menu position='right'>
        <Menu.Item>
        <Dropdown
          placeholder='Select adapter'
          options={selectOptions(speech.adapters)}
          defaultValue={this.state.adapter}
          onChange={selectAdapter}
          disabled={this.state.recording} />
      </Menu.Item>
      <Menu.Item>
        <Button.Group>
          <Button positive disabled={this.state.recording} onClick={start}>Launch speech</Button>
          <Button.Or text='' />
          <Button negative disabled={!this.state.recording} onClick={stop}>Stop speech</Button>
        </Button.Group>
        </Menu.Item>
      </Menu.Menu>

      );
  }
}
