import React from 'react'
import { Link } from 'react-router-dom'
import { Transition } from 'react-transition-group'
import PropTypes from 'prop-types'

const Nav = (props) => {
  const bgDefaultStyle = {
    transition: 'opacity 500ms ease-in-out',
    opacity: 0
  }

  const bgTransitionStyles = {
    entering: { opacity: 0 },
    entered: { opacity: 1 },
    exiting: { opacity: 0, transition: 'opacity 250ms 150ms ease-in-out' },
    exited: { opacity: 0 }
  }

  const navDefaultStyle = window.innerWidth < 450 || document.documentElement.clientWidth < 450
    ? {
      transition: 'transform 500ms ease-in-out',
      transform: 'translateX(100%)',
      width: '100vw'
    }
    : {
      transition: 'transform 500ms ease-in-out',
      transform: 'translateX(100%)',
      width: '500px'
    }

  const navTransitionStyles = {
    entering: { transform: 'translateX(100%)' },
    entered: { transform: 'translateX(0%)' },
    exiting: { width: 'translateX(100%)', transition: 'transform 250ms ease-in-out' },
    exited: { width: 'translateX(100%)' }
  }

  const linkDefaultStyle = {
    transition: 'opacity 500ms 200ms ease-in-out',
    opacity: 0
  }

  const linkTransitionStyles = {
    entering: { opacity: 0 },
    entered: { opacity: 1 },
    exiting: { opacity: 0, transition: 'opacity 50ms ease-in-out' },
    exited: { opacity: 0 }
  }

  return (
    <Transition
      in={props.inProp}
      unmountOnExit
      timeout={{ enter: 0, exit: 500 }}
    >
      {state => (
        <div id='nav-bg' style={{ ...bgDefaultStyle, ...bgTransitionStyles[state] }}>
          <section id='nav'
            className={props.showNav ? 'expand' : null}
            style={{ ...navDefaultStyle, ...navTransitionStyles[state] }}
          >
            <img id='nav-close' src={require('../assets/icons/x-icon_16x1.svg')} onClick={() => props.setShowNav(false)}/>
            <nav>
              <Link
                className='nav-link'
                to='/' onClick={() => props.setShowNav(false)}
                style={{ ...linkDefaultStyle, ...linkTransitionStyles[state] }}
              >
                PORTFOLIO
              </Link>
              <Link
                className='nav-link'
                to='/about'
                onClick={() => props.setShowNav(false)}
                style={{ ...linkDefaultStyle, ...linkTransitionStyles[state] }}
              >
                About Us
              </Link>
              <Link
                className='nav-link'
                to='/contact'
                onClick={() => props.setShowNav(false)}
                style={{ ...linkDefaultStyle, ...linkTransitionStyles[state] }}
              >
                Contact
              </Link>
              <div
                id='nav-social'
                style={{ ...linkDefaultStyle, ...linkTransitionStyles[state] }}
              >
                <img src={require('../assets/icons/houzz-dark.svg')}/>
                <img src={require('../assets/icons/instagram-dark.svg')}/>
                <img src={require('../assets/icons/facebook-dark.svg')}/>
                <img src={require('../assets/icons/pinterest-dark.svg')}/>
              </div>
            </nav>
          </section>
        </div>
      )}
    </Transition>
  )
}

Nav.propTypes = {
  inProp: PropTypes.bool,
  loggedIn: PropTypes.bool,
  showNav: PropTypes.bool,
  showEdit: PropTypes.bool,
  setShowEdit: PropTypes.any,
  setShowNav: PropTypes.any
}

export default Nav
