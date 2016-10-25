import React from 'react'
import { Motion, spring } from 'react-motion'
import { type } from 'ramda'

import { Switch } from 'components/'

import styles from './styles.css'
const springConfig = { stiffness: 300, damping: 18 }

const fromValue = type => {
  switch (type) {
    case 'Boolean':
      return Switch
    case 'String':
    default:
      return ({ value }) => <span>{ value }</span>
  }
}

const SettingEntry = ({ value = '', children, keyboardFocused, keyboardPressed }) => {
  const Value = fromValue(type(value))

  return (
    <Motion style={ {
      x: spring(keyboardFocused ? 1.05 : 1, springConfig),
      shadow: keyboardFocused ? spring(16, springConfig) : spring(0, springConfig)
    } } >
      { ({ x, shadow }) =>
        <div
          className={ styles.view }
          style={ {
            boxShadow: `rgba(0, 0, 0, 0.2) 0px ${shadow}px ${2 * shadow}px 0px`,
            transform: `scale(${x})`,
            zIndex: keyboardFocused ? 10 : 0
          } }
          data-is-selected={ keyboardFocused }
          data-is-pressed={ keyboardPressed } >
          <span>{ children }</span>
          <Value value={ value } />
        </div> }
    </Motion>
  )
}

export default SettingEntry
