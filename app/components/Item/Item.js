import React from 'react'
import styles from './styles.css'

import { Motion, spring, presets } from 'react-motion'
const springConfig = { stiffness: 300, damping: 18 }

const Item = ({ keyboardFocused, keyboardPressed, title, cover, shadow, style }) =>
  <Motion style={{
    x: spring(keyboardFocused ? 1.2 : 1, springConfig),
    shadow: keyboardFocused ? spring(16, springConfig) : spring(1, springConfig)
  }} >
      { ({x, shadow}) =>
        <div style={ {
          transform: `scale(${x})`,
          zIndex: keyboardFocused ? 10 : 0,
          position: 'relative'
        } } >
            <div className={ styles.view }
              data-is-selected={ keyboardFocused }
              data-is-pressed={ keyboardPressed }
              style={ style } >
              <div className={ styles.entry }>
                <div className={ styles.cover } style={ {
                  boxShadow: `rgba(0, 0, 0, 0.2) 0px ${shadow}px ${2 * shadow}px 0px`,
                  backgroundImage: `url(${cover})`
                } } ></div>
              </div>
            </div>
        </div>}
  </Motion>

export default Item
