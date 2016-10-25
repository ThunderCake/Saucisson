import React from 'react'
import styles from './styles.css'
import transitions from './transitions.css'
import CSSTransition from 'react-addons-css-transition-group'

const Loader = ({ isLoading }) =>
  <div className={ styles.view }>
    <CSSTransition
      transitionName={ transitions }
      transitionEnterTimeout={ 500 }
      transitionLeaveTimeout={ 500 }>
      { isLoading ? (
        <div>
          <div className={ styles.loader } />
        </div>
       ) : null }
    </CSSTransition>
  </div>

export default Loader
