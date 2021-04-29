import React, { useState, useEffect } from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import MainEditor from './routes/MainEditor'
import Project from './routes/Project'
import ProjectEditor from './routes/ProjectEditor'
import Contact from './routes/Contact'
import About from './routes/About'
import Login from './routes/Login'
import Main from './routes/Main'
import Nav from './components/Nav'
import firebase from 'firebase/app'
import 'firebase/database'
import config from '../config/firebase_config'
import 'firebase/auth'
// import PropTypes from 'prop-types'

firebase.initializeApp(config)

export const App = (props) => {
  const [loggedIn, setLoggedIn] = useState(true)
  const [showEdit, setShowEdit] = useState(false)
  const [showNav, setShowNav] = useState(false)
  const [dbProjects, setDbProjects] = useState([])
  const [activeIndex, setActiveIndex] = useState(3)
  const [previewMode, setPreviewMode] = useState(null)
  const [activeFPSection, setActiveFPSection] = useState(0)
  const [initialLoad, setInitialLoad] = useState(true)

  const location = useLocation()

  const duration = (location === '/') ? 1000 : 3000

  // firebase.auth().onAuthStateChanged(function (user) {
  //   console.log('onAuthStateChanged')
  //   if (user && !loggedIn) {
  //     // User is signed in.
  //     setLoggedIn(true)
  //     // setShowEdit(true)
  //     console.log('User is signed in.')
  //   } else if (!user && loggedIn) {
  //     // No user is signed in.
  //     console.log('No User is signed in.')
  //     setLoggedIn(false)
  //   }
  // })

  useEffect(() => {
    const dbProjects = firebase.database().ref('projects')
    dbProjects.on('value', snap => {
      setDbProjects(snap.val())
    })
  }, [])

  // useEffect(() => {
  //   if (loggedIn) {
  //     const dbProjects = firebase.database().ref('projects')
  //     dbProjects.on('value', snap => {
  //       setDbProjects(snap.val())
  //       console.log('DB set, logged in')
  //     })
  //   }
  //   if (!loggedIn) {
  //     const dbProjects = firebase.database().ref('projects')
  //     dbProjects.once('value', snap => {
  //       setDbProjects(snap.val())
  //       console.log('DB set, not logged in')
  //     })
  //   }
  // }, [])

  // useEffect(() => {
  //   const dbProjects = firebase.database().ref('projects')
  //   dbProjects.once('value', snap => {
  //     setDbProjects(snap.val())
  //     console.log('DB set once')
  //   })
  // }, [])
  //
  // useEffect(() => {
  //   firebase.database().ref('projects').on('value', snap => {
  //     if (loggedIn) {
  //       console.log('DB update, logged in')
  //       // setDbProjects(snap.val())
  //     }
  //   })
  // })

  // useEffect(()=> {
  //   const connectedRef = firebase.database().ref('.info/connected')
  //   connectedRef.on('value', snap => {
  //     if(snap.val() === true) {
  //       console.log('connected');
  //     } else {
  //       console.log('not connected');
  //     }
  //   })
  // }, [])

  const shifting = () => {
    const projy = [...dbProjects]
    const db = firebase.database().ref('projects')
    projy.push(projy[0])
    projy.shift()
    db.set(projy)
  }

  const logout = () => {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
    // An error happened.
    })
  }

  return (
    <div id='appjs' style={{ backgroundColor: 'white', height: '100%' }}>
      <TransitionGroup component={null}>
        <CSSTransition
          key={location.key}
          timeout={duration}
          // timeout={{1000}}
          classNames='fade'
        >
          <Switch location={location}>

            <Route
              exact path='/'
              render={
                loggedIn && showEdit
                  ? ({ location }) =>
                    <MainEditor
                      showEdit={showEdit}
                      setShowEdit={setShowEdit}
                      setShowNav={setShowNav}
                      loggedIn={loggedIn}
                      dbProjects={dbProjects}
                      previewMode={previewMode}
                      setPreviewMode={setPreviewMode}
                      activeIndex={activeIndex}
                      setActiveIndex={setActiveIndex}
                      shifting={shifting}
                      logout={logout}
                    />
                  : ({ location }) =>
                    <Main
                      dbProjects={dbProjects}
                      loggedIn={loggedIn}
                      showEdit={showEdit}
                      setShowEdit={setShowEdit}
                      showNav={showNav}
                      setShowNav={setShowNav}
                      activeIndex={activeIndex}
                      setActiveIndex={setActiveIndex}
                      logout={logout}
                      activeFPSection={activeFPSection}
                      setActiveFPSection={setActiveFPSection}
                      initialLoad={initialLoad}
                      setInitialLoad= {setInitialLoad}
                    />
              }
            />
            {dbProjects.map((item, index) => (
              <Route
                path={`/${item.name.toLowerCase().split(' ').join('-')}`}
                key={item.id}
                render={
                  loggedIn && showEdit
                    ? ({ location }) =>
                      <ProjectEditor
                        projIndex={index}
                        dbProjects={dbProjects}
                        setShowNav={setShowNav}
                        loggedIn={loggedIn}
                        showEdit={showEdit}
                        setShowEdit={setShowEdit}
                      />
                    : ({ location }) =>
                      <Project
                        projIndex={index}
                        dbProjects={dbProjects}
                        setShowNav={setShowNav}
                        loggedIn={loggedIn}
                        showEdit={showEdit}
                        setShowEdit={setShowEdit}
                        logout={logout}
                      />
                }
              />
            ))}
            <Route path='/about' render={() => <About setShowNav={setShowNav} loggedIn={loggedIn} showEdit={showEdit}/>}/>
            <Route path='/contact' render={() => <Contact setShowNav={setShowNav} loggedIn={loggedIn} showEdit={showEdit}/>}/>
            <Route path='/login' render={() => <Login loggedIn={loggedIn} setShowNav={setShowNav}/>}/>
          </Switch>

        </CSSTransition>
      </TransitionGroup>
      <Nav
        loggedIn={loggedIn}
        showEdit={showEdit}
        setLoggedIn={setLoggedIn}
        setShowEdit={setShowEdit}
        showNav={showNav}
        setShowNav={setShowNav}
        inProp={showNav}
      />
    </div>
  )
}
