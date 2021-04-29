import React from 'react'
import PrvwBgImgs from './PrvwBgImgs'
import PreviewMenu from './PreviewMenu'
import AlignBtns from './AlignBtns'
import ReactScrollWheelHandler from 'react-scroll-wheel-handler'
import PropTypes from 'prop-types'

const Preview = (props) => {
  const menuUp = () => {
    const menuList = document.getElementById('pm-list')
    const active = document.getElementById(`pm-item-${props.previewIndex}`)
    const height = active.previousSibling.offsetHeight
    menuList.style.cssText = `transform: translateY(-${height}px) ; transition: transform 0s`
    menuList.prepend(menuList.children[menuList.children.length - 1])
    if (props.previewIndex === 0) {
      props.setPreviewIndex(menuList.children.length - 1)
    }
    if ((props.previewIndex > 0) && props.previewIndex < (menuList.children.length)) {
      props.setPreviewIndex(props.previewIndex - 1)
    }
    setTimeout(() => {
      menuList.style.cssText = 'transform: translateY(0px) ; transition: transform .5s'
    }, 10)
  }

  const menuDown = () => {
    const menuList = document.getElementById('pm-list')
    const active = document.getElementById(`pm-item-${props.previewIndex}`)
    const height = active.offsetHeight
    menuList.style.cssText = `transform: translateY(-${height}px) ; transition: transform .5s`
    if (props.previewIndex === menuList.children.length - 1) {
      props.setPreviewIndex(0)
    }
    if (props.previewIndex < (menuList.children.length - 1)) {
      props.setPreviewIndex(props.previewIndex + 1)
    }
    setTimeout(() => {
      menuList.style.cssText = 'transform: translateY(0px) ; transition: transform 0s'
      menuList.append(menuList.children[0])
    }, 500)
  }

  return (
    <section id='preview-window'>
      <div id='preview-border'>
        <figure id='preview'>
          <ReactScrollWheelHandler
            upHandler={menuUp}
            downHandler={menuDown}
            timeout={500}
            style={{ width: '100%', height: '100%' }}
          >
            <PrvwBgImgs dbProjects={props.dbProjects} activeIndex={props.previewIndex} mode={props.mode} aligning={props.aligning}/>
            <div id='bgs-header'>
              <figure>
                <img id='bgs-logo' src={require('../assets/icons/logo-spaced-test-3.svg')} />
                {props.mode === 'phone'
                  ? <div id='bgs-nav-icon'>
                    <div className='line'></div>
                    <div className='line'></div>
                    <div className='line last'></div>
                  </div>
                  : <div id='nav-btns'>
                    <p>PROJECTS</p>
                    <p>ABOUT</p>
                    <p>CONTACTS</p>
                  </div>
                }
              </figure>
            </div>
            <PreviewMenu dbProjects={props.dbProjects} previewIndex={props.previewIndex} mode={props.mode}/>
          </ReactScrollWheelHandler>
          <AlignBtns {...props}/>
        </figure>
      </div>
    </section>
  )
}

Preview.propTypes = {
  dbProjects: PropTypes.array,
  previewIndex: PropTypes.number,
  setPreviewIndex: PropTypes.any,
  mode: PropTypes.string,
  aligning: PropTypes.bool
}

export default Preview
