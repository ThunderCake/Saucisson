import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Motion, spring } from 'react-motion'
import { pluck } from 'ramda'

import styles from './Settings.css'

import themes from 'utils/gradients'
import { Keyboardable } from 'components/'
import { set } from 'reducers/settings'

const springConfig = { stiffness: 300, damping: 18 }

const Entry = ({ keyboardFocused, keyboardPressed, children }) =>
  <Motion style={ {
    shadow: keyboardFocused ? spring(16, springConfig) : spring(0, springConfig)
  } } >
    { ({ shadow }) =>
      <div
        className={ styles.entry }
        style={ {boxShadow: `rgba(0, 0, 0, 0.2) 0px ${shadow}px ${2 * shadow}px 0px`} }
        data-is-selected={ keyboardFocused }
        data-is-pressed={ keyboardPressed } >
        { children }
      </div> }
  </Motion>

const mapStateToProps = ({ settings }) => ({ settings })
const actions = { set }

class Settings extends Component {

  handleThemeChange = () => {
    const choices = pluck(['name'], themes)
    const selection = choices[Math.floor(Math.random() * choices.length)]
    this.props.set('theme', selection)
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
            <h2 className={ styles.title }>Player</h2>
            <ul>
              <li>
                <Keyboardable>
                  <Entry>Save position on exit</Entry>
                </Keyboardable>
              </li>
              <li>
                <Keyboardable>
                  <Entry>Contrast</Entry>
                </Keyboardable>
              </li>
              <li>
                <Keyboardable offset={ { down: 40 } } >
                  <Entry>Brightness</Entry>
                </Keyboardable>
              </li>
            </ul>
            <h2 className={ styles.title }>Interface</h2>
            <ul>
              <li>
                <Keyboardable onEnter={ this.handleThemeChange } offset={ { up: 40 } } >
                  <Entry>Theme</Entry>
                </Keyboardable>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, actions)(Settings)
