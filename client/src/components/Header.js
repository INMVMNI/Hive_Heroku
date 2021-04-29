import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

const Header = (props) => {
  const history = useHistory()
  const location = useLocation()

  const linkTo = (path) => {
    if (location.pathname !== path) {
      history.push(path)
    }
  }

  return (
    <section
      id='headerr'
      className={
        (window.innerWidth < 800 || document.documentElement.clientWidth < 800) && (props.page === 'project')
          ? 'mobile ' + props.page + ' ' + props.color
          : props.page + ' ' + props.color
      }
      style={
        ((window.innerWidth < 800 || document.documentElement.clientWidth < 800) && (props.page === 'project')) || (props.page === 'about')
          ? props.showHeader
            ? { transform: 'translateY(0%)', transition: 'transform .25s' }
            : { transform: 'translateY(-100%)', transition: 'transform .25s' }
          : null
      }
    >
      {window.innerWidth < 450 || document.documentElement.clientWidth < 450
        ? <div id='inner' className={props.color}>
          { props.color === 'dark'
            ? <img className='logo' onClick={() => linkTo('/')} src={require('../assets/icons/logo-spaced-test-3-dark.svg')}/>
            : <img className='logo' onClick={() => linkTo('/')} src={require('../assets/icons/logo-spaced-test-3.svg')}/>
          }
          <div id='header-btns' style={{ height: '100%' }}>
            <figure id='navy-icon' className={props.color} onClick={() => props.setShowNav(true)}>
              <div className='line'></div>
              <div className='line'></div>
              <div className='line last'></div>
            </figure>
          </div>
        </div>
        : <div id='inner' className={props.color}>
          { props.color === 'dark'
            ? <img className='logo' onClick={() => linkTo('/')} src={require('../assets/icons/logo-spaced-test-3-dark.svg')}/>
            : <img className='logo' onClick={() => linkTo('/')} src={require('../assets/icons/logo-spaced-test-3.svg')}/>
          }
          <div id='header-btns' style={{ height: '100%' }}>
            <figure id='navLinks' className={props.color}>
              <p className={location.pathname === '/' ? 'underlined' : null} onClick={() => linkTo('/')}>PORTFOLIO</p>
              <p className={location.pathname === '/about' ? 'underlined' : null} onClick={() => linkTo('/about')}>ABOUT</p>
              <p className={location.pathname === '/contact' ? 'underlined' : null} onClick={() => linkTo('/contact')}>CONTACT</p>
            </figure>
          </div>
        </div>
      }
    </section>
  )
}

Header.propTypes = {
  page: PropTypes.string,
  color: PropTypes.string,
  setShowNav: PropTypes.any,
  showHeader: PropTypes.bool
}

export default Header
