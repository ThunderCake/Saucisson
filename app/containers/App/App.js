import React, { Component } from 'react'
import { connect } from 'react-redux'
import { findDOMNode } from 'react-dom'
import { filter, head, compose } from 'ramda'
import { Howl } from 'howler'

import { keyboardEvent } from 'reducers/keyboard'
import { Keyboardable } from 'components/'

import {
  KEYCODE_ARROW_LEFT,
  KEYCODE_ARROW_UP,
  KEYCODE_ARROW_RIGHT,
  KEYCODE_ARROW_DOWN,
  KEYCODE_ENTER,
  KEYCODES_ARROWS } from 'utils/'

import {
  SOUND_TICK,
  SOUND_CLICK, } from 'utils/'

const nearestElement = compose(head, filter(({ dataset }) => dataset.keyboardableId))

const mapStateToProps = ( { keyboard: { selected } } ) => ({ selected })
const actions = { keyboardEvent }

class App extends Component {

  sounds = {
    tick: new Howl({ src: SOUND_TICK }),
    click: new Howl({ src: SOUND_CLICK })
  }

  componentDidMount () {
    document.addEventListener('keydown', this.handleKeyboardNavigation)
    document.addEventListener('keyboardableFocused', this.handleKeyboardFocused)
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.handleKeyboardNavigation)
    document.removeEventListener('keyboardableFocused', this.handleKeyboardFocused)
  }

  playKeyboardSound (keyCode) {
    if (KEYCODES_ARROWS.indexOf(keyCode) !== -1 ) this.sounds.tick.play()
  }

  handleKeyboardFocused = ({ detail }) => {
    this.setState({ focusedComponent: detail })
  }

  handleKeyboardEnter = element => {
    this.sounds.click.play()
    this.state.focusedComponent.onEnter()
  }

  handleKeyboardNavigation = ({ keyCode }) => {
    const element = document.querySelector('[data-keyboardable-is-focused="true"]')
    const { bottom, top, left, right, width, height } = element.getBoundingClientRect()
    const offset = 10;

    const position = {
      top: top + (height / 2),
      left: left + (width / 2)
    }

    switch (keyCode) {
      case KEYCODE_ENTER:
        return this.handleKeyboardEnter()
      case KEYCODE_ARROW_LEFT:
        position.left = position.left - (width / 2) - offset
        break;
      case KEYCODE_ARROW_UP:
        position.top = position.top - (height / 2) - offset
        break;
      case KEYCODE_ARROW_RIGHT:
        position.left = position.left + (width / 2) + offset
        break;
      case KEYCODE_ARROW_DOWN:
        position.top = position.top + (height / 2) + offset
        break;
    }

    const nodeList = document.elementsFromPoint(position.left, position.top)
    const nearest = nearestElement(nodeList)

    if (nearest) {
      this.playKeyboardSound(keyCode)
      this.props.keyboardEvent(nearest.dataset.keyboardableId)
    };

  }

  render () {
    return (
      <div>{ this.props.children }</div>
    )
  }
}

export default connect(mapStateToProps, actions)(App);
