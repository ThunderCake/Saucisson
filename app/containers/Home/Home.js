import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetch } from 'reducers/movies'
import { Grid, Loader } from 'components/'

const mapStateToProps = ({ movies }) => {
  return { movies }
}

const actions = { fetch }

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
