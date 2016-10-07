import React, { Component } from 'react'
import { Item } from '../'

import { Keyboardable } from 'components/'
import styles from './styles.css'

const ITEMS_PER_ROW = 7

class Grid extends Component {

  componentWillMount () {
    this.handleResize()
  }

  componentDidMount () {
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize = () => {
    const { innerWidth } = window
    const width = innerWidth / ITEMS_PER_ROW
    this.setState({
      size: {
        width,
        height: width * (1426 / 1000)
      }
    })
  }

  handleEnter = item => {
    console.log(item)
    // IPC.send('play', item)
  }

  render () {
    const { size } = this.state
    const { items } = this.props

    return (
      <div ref='view' className={ styles.view }>
        <div className={ styles.grid }>
          { items.map((item, i) =>
            <Keyboardable onEnter={ () => this.handleEnter(item) } >
              <Item style={ size } key={ i } { ...item } />
            </Keyboardable>
          ) }
        </div>
      </div>
    )
  }
}

export default Grid
