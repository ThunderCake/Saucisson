import React, { Component, cloneElement } from 'react'
import { connect } from 'react-redux'

import { register } from 'reducers/keyboard'

const mapStateToProps = ({ keyboard: { selected, registred } }) => ({ selected, registred })
const actions = { register }

class Keyboardable extends Component {

  state = {
    isPressed: false
  }

  onEnter = () => {
    this.setState({ isPressed: true }, () => setTimeout(() => this.setState({ isPressed: false }), 300))
    this.props.onEnter()
  }

  componentWillMount () {
    this.id = this.props.registred
    this.props.register()
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
      <div
        data-keyboardable-is-focused={ this.id === selected }
        data-keyboardable-id={ this.id }
        >
          { cloneElement(children, {
            keyboardFocused: this.id === selected ,
            keyboardPressed: this.state.isPressed
          }) }
      </div>
    )
  }

}

export default connect(mapStateToProps, actions)(Keyboardable)
