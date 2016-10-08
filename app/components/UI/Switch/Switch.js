import React from 'react'
import styles from './Switch.css'

const Switch = ({ value }) =>
  <div className={ styles.view } data-value={ value } >
    <div className={ styles.toggle } />
  </div>

export default Switch
