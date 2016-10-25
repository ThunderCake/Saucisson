import React from 'react'
import styles from './styles.css'

const Tile = ({ keyboardFocused, keyboardPressed, index, name }) =>
  <span
    data-index={ index }
    data-pressed={ keyboardPressed }
    data-focused={ keyboardFocused }
    className={ styles.view }>
    { name }
  </span>

export default Tile
