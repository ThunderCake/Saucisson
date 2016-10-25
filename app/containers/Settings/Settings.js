import React, { Component } from 'react'
import { connect } from 'react-redux'
import { findIndex, propEq } from 'ramda'

import styles from './Settings.css'

import themes from 'utils/gradients'
import { Keyboardable, SettingEntry as Entry } from 'components/'
import { set, toggle } from 'reducers/settings'

const mapStateToProps = ({ settings }) => ({ settings })
const actions = { set, toggle }

class Settings extends Component {

  handleThemeChange = () => {
    const { theme } = this.props.settings
    const i = findIndex(propEq('name', theme), themes)
    const index = i + 1 > themes.length ? 0 : i + 1
    this.props.set('theme', themes[index].name)
  }

  render () {
    const { settings, toggle } = this.props

    return (
      <div className={ styles.view }>
        <div className={ styles.header } >
          <h1>Settings</h1>
        </div>
        <div className={ styles.panes } >
          <div>
            {/*<div className={ styles.icon } />*/}
          </div>
          <div>
            <h2 className={ styles.title }>Player</h2>
            <ul>
              <li>
                <Keyboardable onEnter={ () => toggle('savePositionOnQuit') } >
                  <Entry value={ settings.savePositionOnQuit } >Save position on exit</Entry>
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
                  <Entry value={ settings.theme } >Theme</Entry>
                </Keyboardable>
              </li>
              <li>
                <Keyboardable>
                  <Keyboardable onEnter={ () => toggle('sounds') } >
                    <Entry value={ settings.sounds } >Enable sounds</Entry>
                  </Keyboardable>
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
