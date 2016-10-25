import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './Home.css'

import { fetch, set } from 'reducers/movies'
import { Keyboardable, MenuEntry } from 'components/'
import { push } from 'react-router-redux'
import { map, addIndex } from 'ramda'

const mapIndexed = addIndex(map)

const tiles = [
  { name: 'movies', location: '/movies' },
  { name: 'tv shows', location: '/tvshows' },
  { name: 'music', location: '/music' },
  { name: 'network', location: '/network' },
  { name: 'settings', location: '/settings' }
]

const Menu = ({ onEnter }) => <div> { mapIndexed(({ location, ...props }, index) =>
  <Keyboardable onEnter={ () => onEnter(location) }>
    <MenuEntry index={ index } { ...props } />
  </Keyboardable>, tiles) }</div>

const mapStateToProps = ({ movies }) => ({ movies })
const actions = { fetch, push, set }

class Home extends Component {
  state = { items: [] }

  componentWillMount () {
    const { fetch, movies: { entries } } = this.props
    if (entries.length < 1) fetch()
  }

  render () {
    const { push } = this.props

    return (
      <div>
        <div className={ styles.menu } >
          <Menu onEnter={ push } />
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, actions)(Home)
