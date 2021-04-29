import React, { useState, useEffect } from 'react'
import { Transition } from 'react-transition-group'
import LandscapeGallery from './LandscapeGallery'
import PortraitGallery from './PortraitGallery'
import Preview from './Preview'
import PropTypes from 'prop-types'

const BackgroundImageSelect = (props) => {
  const [previewIndex, setPreviewIndex] = useState(props.activeIndex)
  const [mode, setMode] = useState('select')
  const [aligning, setAligning] = useState(false)

  useEffect(() => {
    setPreviewIndex(props.activeIndex)
  }, [props.activeIndex])

  useEffect(() => {
    setMode('select')
  }, [props.inProp])

  const modeSetter = (position) => {
    setAligning(false)
    setMode(position)
  }

  const defaultStyle = {
    transition: 'opacity 500ms ease-in-out',
    opacity: 0
  }

  const transitionStyles = {
    entering: { opacity: 0 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 }
  }

  return (
    props.dbProjects[props.activeIndex]
      ? <Transition
        in={props.inProp}
        unmountOnExit
        timeout={{ enter: 0, exit: 500 }}
      >
        {state => (

          <main id='bgi-slct' style={{ ...defaultStyle, ...transitionStyles[state] }}>
            { CSS.supports(`(backdrop-filter: blur()) or (-moz-backdrop-filter: blur()) or
              (-o-backdrop-filter: blur()) or (-webkit-backdrop-filter: blur())`)
              ? null
              : <div id='backdrop'
                style={
                  props.dbProjects[previewIndex]
                    ? {
                      backgroundImage: `url('https://res.cloudinary.com/hive-la-home/image/upload/e_contrast:30/v1/${props.dbProjects[previewIndex].backgroundImage}.jpg')`,
                      backgroundPosition: props.dbProjects[previewIndex].backgroundPosition + ' center',
                      backgroundSize: 'cover',
                      filter: 'blur(8px) brightness(.8)',
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      transform: 'scale(1.1)'
                    }
                    : null
                }
              >
              </div>
            }
            <section id='bgi-box' className={mode}>
              <header>
                <p>BACKGROUND</p>
                {/*<img id='bgi-close' src={require('../assets/icons/x-icon_15.5x2-gray.svg')} onClick={() => props.setShowImgSlct(false)}/>*/}
                <figure id='bgi-selector'>
                  <div className={mode === 'select' ? 'bgi-btn active' : 'bgi-btn'} onClick={() => modeSetter('select')}>HORIZONTAL</div>
                  <div className={mode === 'align' ? 'bgi-btn active' : 'bgi-btn'} onClick={() => modeSetter('align')}>VERTICAL</div>
                  <div className={mode === 'phone' ? 'bgi-btn active' : 'bgi-btn'} onClick={() => modeSetter('phone')}>PHONE</div>
                </figure>
                <img id='bgi-close' src={require('../assets/icons/x-icon_15.5x2-gray.svg')} onClick={() => props.setShowImgSlct(false)}/>
              </header>
              <Preview
                dbProjects={props.dbProjects}
                previewIndex={previewIndex}
                setPreviewIndex={setPreviewIndex}
                mode={mode}
                aligning={aligning}
                setAligning={setAligning}
              />
              <PortraitGallery
                dbProjects={props.dbProjects}
                previewIndex={previewIndex}
              />
              <LandscapeGallery
                dbProjects={props.dbProjects}
                previewIndex={previewIndex}
              />
            </section>
          </main>
        )}
      </Transition>
      : null
  )
}

BackgroundImageSelect.propTypes = {
  projIndex: PropTypes.number,
  dbProjects: PropTypes.array,
  loggedIn: PropTypes.bool,
  activeIndex: PropTypes.number,
  inProp: PropTypes.any,
  setShowImgSlct: PropTypes.any
}

export default BackgroundImageSelect
