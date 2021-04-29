import React, { useState } from 'react'
import CoverImages from '../components/CoverImages'
import ReactScrollWheelHandler from 'react-scroll-wheel-handler'
import Header from '../components/Header'
import MainMenu from '../components/MainMenu'
import LogoOverlay from '../components/LogoOverlay'
import PropTypes from 'prop-types'

const Main = (props) => {
  const [imageCount, setImageCount] = useState(0)

  const setActivePrev = () => {
    const menuList = document.getElementById('em-list')
    if (props.activeIndex === 0) {
      props.setActiveIndex(menuList.children.length - 1)
    }
    if ((props.activeIndex > 0) && props.activeIndex < (menuList.children.length)) {
      props.setActiveIndex(props.activeIndex - 1)
    }
  }

  const setActiveNext = () => {
    const menuList = document.getElementById('em-list')
    if (props.activeIndex === menuList.children.length - 1) {
      props.setActiveIndex(0)
    }
    if (props.activeIndex < (menuList.children.length - 1)) {
      props.setActiveIndex(props.activeIndex + 1)
    }
  }

  const uppy = () => {
    console.log('up');

    const menuList = document.getElementById('em-list')
    const active = document.getElementById(`em-item-${props.activeIndex}`)
    const height = active.previousSibling.offsetHeight
    menuList.style.cssText = `transform: translateY(-${height}px) ; transition: transform 0s`
    menuList.prepend(menuList.children[menuList.children.length - 1])
    setActivePrev()
    setTimeout(() => {
      menuList.style.cssText = 'transform: translateY(0px) ; transition: transform .5s'
    }, 10)
  }

  const downy = () => {
    console.log('down');

    const menuList = document.getElementById('em-list')
    menuList.classList.add('shifting')
    const active = document.getElementById(`em-item-${props.activeIndex}`)
    const height = active.offsetHeight
    menuList.style.cssText = `transform: translateY(-${height}px) ; transition: transform .5s`
    setActiveNext()
    setTimeout(() => {
      menuList.style.cssText = 'transform: translateY(0px) ; transition: transform 0s'
      menuList.append(menuList.children[0])
      menuList.classList.remove('shifting')
    }, 500)
  }

  return (
    <main id='main' className={props.showNav ? 'nav-dark' : null}>
      <Header setShowNav={props.setShowNav} color={'light'} page={'main'} loggedIn={props.loggedIn}/>
      <ReactScrollWheelHandler
        upHandler={uppy}
        downHandler={downy}
        timeout={550}
        style={{ width: '100%', height: '100%', outline: 'none' }}
      >
        <CoverImages
          {...props}
          imageCount={imageCount}
          setImageCount={setImageCount}
        />

        <MainMenu
          {...props}
        />

      </ReactScrollWheelHandler>

      <div
        onClick={() => props.setShowEdit(true)}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '40px',
          height: '40px'
        }}
      >
      </div>

      <LogoOverlay inProp={props.initialLoad}/>

    </main>
  )
}

Main.propTypes = {
  dbProjects: PropTypes.array,
  loggedIn: PropTypes.bool,
  activeIndex: PropTypes.number,
  showNav: PropTypes.bool,
  initialLoad: PropTypes.bool,
  setShowEdit: PropTypes.any,
  setActiveIndex: PropTypes.any,
  setShowNav: PropTypes.any,
  setInitialLoad: PropTypes.any
}

export default Main
