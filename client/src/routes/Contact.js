import React from 'react'
import Header from '../components/Header'
import AdminHeader from '../components/AdminHeader'
import PropTypes from 'prop-types'

const Contact = props => (
  <main id='contact'>
    {props.loggedIn
      ? <AdminHeader
        {...props}
        color={'dark'}
      />
      : <Header
        {...props}
        color={'dark'}
      />
    }
    <div id='bg-img'></div>
    <section id='contact-text'>
      { window.innerWidth < 500 || document.documentElement.clientWidth < 500
        ? <h1>GET IN <br/> TOUCH</h1>
        : <h1>GET IN TOUCH</h1>
      }
      <h2>AND TELL US ABOUT YOUR SPACE.</h2>
      <figure id='contact-links'>
        <div>
          <p>GENERAL INQUIRIES</p>
          <a>INFO@HIVELAHOME.COM</a>
        </div>
        <div>
          <p>DEVON MCKEON</p>
          <a>DEVON@HIVELAHOME.COM</a>
        </div>
        <div>
          <p>JESSICA FLEMMING</p>
          <a>JESS@HIVELAHOME.COM</a>
        </div>
        <div>
          <p>PHONE</p>
          <a>(703) 799-1800</a>
        </div>
      </figure>
      <figure id='contact-social'>
        <a href='https://www.houzz.com/professionals/kitchen-and-bath-designers/hive-la-home-pfvwus-pf~663619776?' target="_blank" rel='noreferrer'>
          <img src={require('../assets/icons/houzz-dark.svg')}/>
        </a>
        <a href='https://www.instagram.com/hivelahome/' target="_blank" rel='noreferrer'>
          <img src={require('../assets/icons/instagram-dark.svg')}/>
        </a>
        <a href='https://www.facebook.com/hivelahome/' target="_blank" rel='noreferrer'>
          <img src={require('../assets/icons/facebook-dark.svg')}/>
        </a>
        <a href='https://www.pinterest.com/hivelahome/_created/' target="_blank" rel='noreferrer'>
          <img src={require('../assets/icons/pinterest-dark.svg')}/>
        </a>
      </figure>
    </section>
  </main>
)

Contact.propTypes = {
  loggedIn: PropTypes.bool,
  setShowNav: PropTypes.any,
  showEdit: PropTypes.any
}

export default Contact
