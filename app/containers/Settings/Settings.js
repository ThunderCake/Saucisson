import React, { Component } from 'react'
import styles from './Settings.css'

class Settings extends Component {

  componentDidMount () {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = ({ keyCode }) => {
    if (keyCode === 8) this.props.history.goBack();
  }

  render () {
    return (
      <div className={ styles.view }>
        <div className={ styles.header } >
          <h1>Settings</h1>
        </div>
        <div className={ styles.panes } >
          <div>
            Pane 1
          </div>
          <div>
            Pane 2
          </div>
        </div>
      </div>
    )
  }
}

export default Settings
