import React, { Component } from 'react'
import { connect } from 'react-redux'
import { filter, head, compose, find, propEq } from 'ramda'
import { Howl } from 'howler'
import { goBack } from 'react-router-redux'

import themes from 'utils/gradients'
import { keyboardSelect, keydown, keyup } from 'reducers/keyboard'

import {
  KEYCODE_ARROW_LEFT,
  KEYCODE_ARROW_UP,
  KEYCODE_ARROW_RIGHT,
  KEYCODE_ARROW_DOWN,
  KEYCODE_ENTER,
  KEYCODE_BACK,
  KEYCODES_ARROWS,
  SOUND_TICK,
  SOUND_CLICK } from 'utils/'

const nearestElement = compose(head, filter(({ dataset }) => dataset.keyboardableId))

const mapStateToProps = ({ settings, keyboard: { selected } }) => ({ selected, settings })
const actions = { keyboardSelect, goBack, keydown, keyup }

const Pointer = ({ style }) => <div style={ { ...style, padding: 2, zIndex: 10000, borderRadius: '50%', position: 'absolute', background: 'red', width: 2, height: 2 } } />
const DEBUG = true

class App extends Component {

  state = {
    debugPointerStyle: { top: 0, left: 0 }
  }

  sounds = {
    tick: new Howl({ src: SOUND_TICK }),
    click: new Howl({ src: SOUND_CLICK })
  }

  componentDidMount () {
    document.addEventListener('keyboardableFocused', this.handleKeyboardFocused)
    document.addEventListener('keyup', this.handleKeyUp)
    document.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.handleKeyDown)
    document.removeEventListener('keyup', this.handleKeyUp)
    document.removeEventListener('keyboardableFocused', this.handleKeyboardFocused)
  }

  playKeyboardSound (keyCode) {
    if (KEYCODES_ARROWS.indexOf(keyCode) !== -1) this.sounds.tick.play()
  }

  handleKeyboardFocused = ({ detail }) => {
    this.setState({ focusedComponent: detail })
  }

  handleKeyboardEnter = element => {
    this.sounds.click.play()
    this.state.focusedComponent.onEnter()
  }

  handleKeyboardBack = () =>
    this.props.goBack()

  handleKeyUp = () =>
    this.props.keyup()

  handleKeyDown = event => {
    event.preventDefault()
    event.keyCode === KEYCODE_ENTER ? this.props.keydown() : null
    const element = document.querySelector('[data-keyboardable-is-focused="true"]')
    const customOffset = this.state.focusedComponent.offset

    if (!element) {
      return this.props.keyboardSelect(0)
    }

    const { top, left, width, height } = element.children[0].getBoundingClientRect()

    const hidpi = parseFloat(getComputedStyle(document.body).fontSize) === 32
    const offset = hidpi ? 40 : 20

    const position = {
      top: top + (height / 2),
      left: left + (width / 2)
    }

    switch (event.keyCode) {
      case KEYCODE_ENTER:
        return this.handleKeyboardEnter()
      case KEYCODE_BACK:
        return this.handleKeyboardBack()
      case KEYCODE_ARROW_LEFT:
        position.left = position.left - (width / 2) - offset
        break
      case KEYCODE_ARROW_UP:
        position.top = (position.top - (height / 2) - offset) - customOffset.up
        break
      case KEYCODE_ARROW_RIGHT:
        position.left = position.left + (width / 2) + offset
        break
      case KEYCODE_ARROW_DOWN:
        position.top = (position.top + (height / 2) + offset) + customOffset.down
        break
    }

    if (DEBUG) this.setState({ debugPointerStyle: position })

    const nodeList = document.elementsFromPoint(position.left, position.top)
    const nearest = nearestElement(nodeList)

    if (nearest) {
      this.playKeyboardSound(event.keyCode)
      this.props.keyboardSelect(nearest.dataset.keyboardableId)
    };
  }

  render () {
    const { settings: { theme } } = this.props
    const { colors } = find(propEq('name', theme), themes) || themes[0]
    const style = {
      background: `linear-gradient(to left, ${colors[0]} , ${colors[1]})`
    }

    return (
      <div style={ style }>
        { DEBUG ? (<Pointer style={ this.state.debugPointerStyle } />) : null }
        { this.props.children }
      </div>
    )
  }
}

export default connect(mapStateToProps, actions)(App)
