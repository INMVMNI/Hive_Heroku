import React, { useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import firebase from 'firebase/app'
import 'firebase/auth'
import PropTypes from 'prop-types'

const Login = (props) => {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)

  const handleEmailInputChange = (e) => {
    setEmail(e.currentTarget.value)
  }

  const handlePwordInputChange = (e) => {
    setPassword(e.currentTarget.value)
  }

  const login = () => {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
    // Handle Errors here.
      var errorCode = error.code
      var errorMessage = error.message
      alert('error code: ' + errorCode + ' error message: ' + errorMessage)
    })
  }

  const logout = () => {
    firebase.auth().signOut().then(function () {
      alert('Logged Out')
    }).catch(function (error) {
      alert('log out error')
    })
  }

  const changePassword = () => {
    var auth = firebase.auth()
    var emailAddress = auth.currentUser.email

    auth.sendPasswordResetEmail(emailAddress).then(function () {
      // Email sent.
      alert('password reset email sent')
    }).catch(function (error) {
      alert('change password error')
    })
  }

  return (
    <main id='login'>
      {props.loggedIn
        ? <section>
          <h2>LOGGED IN</h2>
          <div className='btn-wrap'>
            <button>change email</button>
            <button onClick={() => changePassword()}>reset password</button>
            <button onClick={() => logout()}>logout</button>
          </div>
        </section>
        : <section>
          <h2>log in</h2>
          <form>
            <input type='email' placeholder='email' onChange={(e) => handleEmailInputChange(e)}></input>
            <input type='password' placeholder='passoword' onChange={(e) => handlePwordInputChange(e)}></input>
            <div className='btn-wrap'>
              <button onClick={() => login()} disabled={!email && !password}>log in</button>
            </div>
          </form>
        </section>
      }
      <AdminHeader setShowNav={props.setShowNav} color={'dark'}/>
    </main>
  )
}

Login.propTypes = {
  loggedIn: PropTypes.bool,
  setShowNav: PropTypes.any
}

export default Login
