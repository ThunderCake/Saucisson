import React, { Component, cloneElement } from 'react'
import { connect } from 'react-redux'

import { register, unregister } from 'reducers/keyboard'

const mapStateToProps = ({ keyboard: { selected, registred, keypress } }) => ({ selected, registred, keypress })
const actions = { register, unregister }
const defaultOffset = { up: 0, down: 0, left: 0, right: 0 }

class Keyboardable extends Component {

  offset = { ...defaultOffset, ...this.props.offset }

  onEnter = () => {
    this.props.onEnter()
  }

  componentWillMount () {
    this.id = this.props.registred
    this.props.register()
  }

  componentWillUnmount () {
    this.props.unregister()
  }

  componentWillReceiveProps ({ selected }) {
    if (selected === this.id) {
      const event = new CustomEvent('keyboardableFocused', { detail: this })
      document.dispatchEvent(event)
    }
  }

  render () {
    const { children, selected } = this.props

    return (
      <span
        data-keyboardable-is-focused={ this.id === selected }
        data-keyboardable-id={ this.id }
        >
        { cloneElement(children, {
          keyboardFocused: this.id === selected,
          keyboardPressed: this.id === selected && this.props.keypress
        }) }
      </span>
    )
  }

}

export default connect(mapStateToProps, actions)(Keyboardable)
