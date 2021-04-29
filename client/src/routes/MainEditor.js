import React, { useState } from 'react'
import CoverImages from '../components/CoverImages'
import ReactScrollWheelHandler from 'react-scroll-wheel-handler'
import Uploader from '../components/Uploader'
import ConfirmDialog from '../components/ConfirmDialog'
import AdminHeader from '../components/AdminHeader'
import BackgroundImageSelect from '../components/BackgroundImageSelect'
import ListEditor from '../components/ListEditor'
import MainMenu from '../components/MainMenu'
import AdminEditBtns from '../components/AdminEditBtns'
import axios from 'axios'
import PropTypes from 'prop-types'

const AdminMain = (props) => {
  const [showUploader, setShowUploader] = useState(false)
  const [dialogInput, setDialogInput] = useState(false)
  const [menuMode, setMenuMode] = useState('rotate')
  const [menuEdit, setMenuEdit] = useState(false)
  const [showImgSlct, setShowImgSlct] = useState(false)

  const removeProject = (dbIndex) => {
    setDialogInput(false)
    if (dbIndex === props.dbProjects.length - 1) {
      props.setActiveIndex(props.activeIndex - 1)
    }
    const formdata = new FormData()
    formdata.set('index', dbIndex)
    axios.post('api/remove-project', formdata)
      .then(res => {
        console.log(res)
      })
  }

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
    <main id='main-editor'>
      <AdminHeader
        {...props}
        color={'light'}
      />
      <ReactScrollWheelHandler
        upHandler={uppy}
        downHandler={downy}
        timeout={500}
        pauseListeners={menuEdit}
        style={{ width: '100%', height: '100%', outline: 'none' }}
      >

        <CoverImages dbProjects={props.dbProjects} activeIndex={props.activeIndex} />

        <ListEditor
          {...props}
          setMenuEdit={setMenuEdit}
          setDialogInput={setDialogInput}
          menuEdit={menuEdit}
        />

        <MainMenu
          {...props}
          menuMode={menuMode}
          setMenuMode={setMenuMode}
          menuEdit={menuEdit}
          setMenuEdit={setMenuEdit}
          setShowUploader={setShowUploader}
          setDialogInput={setDialogInput}
          setShowImgSlct={setShowImgSlct}
        />

        <ConfirmDialog
          setDialogInput={setDialogInput}
          item={
            typeof dialogInput === 'number'
              ? props.dbProjects[dialogInput].name
              : null
          }
          action={removeProject}
          actionParam={dialogInput}
          inProp={typeof dialogInput === 'number'}
        />
      </ReactScrollWheelHandler>
      <Uploader
        {...props}
        setShowUploader={setShowUploader}
        projectIndex={null}
        galleryIndex={null}
        inProp={showUploader}
        newProject={true}
      />

      <BackgroundImageSelect
        {...props}
        inProp={showImgSlct}
        setShowImgSlct={setShowImgSlct}
      />
      <AdminEditBtns
        setShowUploader={setShowUploader}
        setShowImgSlct={setShowImgSlct}
        menuEdit={menuEdit}
        setMenuEdit={setMenuEdit}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '40px',
          height: '40px'
          // bottom: '1vh',
          // left: '2vh',
          // fontSize: '1.25vh',
          // fontFamily: 'Futura PT',
          // letterSpacing: '.5vh',
          // color: 'white'
        }}
        onClick={() => props.setShowEdit(false)}
      >
      </div>
    </main>
  )
}

AdminMain.propTypes = {
  dbProjects: PropTypes.array,
  loggedIn: PropTypes.bool,
  activeIndex: PropTypes.number,
  menuEdit: PropTypes.bool,
  setActiveIndex: PropTypes.any,
  setShowNav: PropTypes.any,
  setExpandedBtn: PropTypes.any,
  setShowEdit: PropTypes.any
}

export default AdminMain
