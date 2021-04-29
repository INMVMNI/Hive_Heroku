import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

const AdminHeader = (props) => {
  const history = useHistory()
  const location = useLocation()

  const linkTo = (path) => {
    if (location.pathname !== path) {
      history.push(path)
    }
  }

  return (
    <section id='headerr'
      className={props.page + ' ' + props.color}
      style={
        props.page === 'about'
          ? props.showHeader
            ? { transform: 'translateY(0%)', transition: 'transform .25s' }
            : { transform: 'translateY(-100%)', transition: 'transform .25s' }
          : null
      }
    >
      <div id='inner' className={props.color}>
        <div style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
          { props.color === 'dark'
            ? <img className='logo' onClick={() => linkTo('/')} src={require('../assets/icons/logo-spaced-test-3-dark.svg')}/>
            : <img className='logo' onClick={() => linkTo('/')} src={require('../assets/icons/logo-spaced-test-3.svg')}/>
          }
        </div>
        <div id='header-btns' style={{ height: '100%' }}>
          {props.showEdit && (props.page === 'project')
            ? <img id='sort-btn' style={{ marginRight: '5px' }} src={require('../assets/icons/sortBtn6.svg')} onClick={() => props.sortHandler(true)}/>
            : null
          }
          {window.innerWidth < 450 || document.documentElement.clientWidth < 450
            ? <figure id='navy-icon' className={props.color} onClick={() => props.setShowNav(true)}>
              <div className='line'></div>
              <div className='line'></div>
              <div className='line last'></div>
            </figure>

            : <figure id='navLinks' className={props.color}>
              <p className={location.pathname === '/' ? 'underlined' : null} onClick={() => linkTo('/')}>PORTFOLIO</p>
              <p className={location.pathname === '/about' ? 'underlined' : null} onClick={() => linkTo('/about')}>ABOUT</p>
              <p className={location.pathname === '/contact' ? 'underlined' : null} onClick={() => linkTo('/contact')}>CONTACT</p>
            </figure>
          }
          {props.loggedIn && props.showEdit
            ? props.color === 'dark'
              ? <img id='login-btn-dark' onClick={() => linkTo('login')} src={require('../assets/icons/user-dark.svg')} style={{ height: '60%', marginLeft: '15px', cursor: 'pointer' }}/>
              : <img id='login-btn' onClick={() => linkTo('login')} src={require('../assets/icons/user.svg')} style={{ height: '60%', marginLeft: '15px', cursor: 'pointer' }}/>
            : null
          }
        </div>
      </div>
    </section>
  )
}

AdminHeader.propTypes = {
  loggedIn: PropTypes.bool,
  page: PropTypes.string,
  color: PropTypes.string,
  showEdit: PropTypes.bool,
  setShowNav: PropTypes.any,
  sortHandler: PropTypes.any
}

export default AdminHeader
