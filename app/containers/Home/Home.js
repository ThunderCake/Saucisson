import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetch } from 'reducers/movies'
import { Grid, Loader, Keyboardable } from 'components/'
import { push } from 'react-router-redux'

const SettingButton = ({ keyboardFocused, keyboardPressed, children }) =>
  <div style={ { width: '200px', padding: 40 } }>
    <img style={ { width: 32, height: 32, filter: keyboardFocused ? 'invert(100%)' : 'initial' } } src='./assets/images/settings.png' />
  </div>

const mapStateToProps = ({ movies }) => ({ movies })
const actions = { fetch, push }

class Home extends Component {
  state = { items: [] }

  componentWillMount () {
    const { fetch, movies: { entries } } = this.props
    if (entries.length < 1) fetch()
  }

  render () {
    const { entries = [], isFetching } = this.props.movies

    return (
      <div>
        <Keyboardable onEnter={ () => this.props.push('/settings') }>
          <SettingButton />
        </Keyboardable>
        <div>
          { !isFetching ? (
            <div>
              <Grid items={ entries } />
            </div>
           ) : null }
        </div>
        <Loader isLoading={ isFetching } />
      </div>
    )
  }
}

export default connect(mapStateToProps, actions)(Home)
