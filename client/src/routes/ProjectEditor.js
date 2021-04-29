import React, { useState, useEffect, useRef } from 'react'
import GalleryAddBtn from '../components/GalleryAddBtn'
import CardEdit from '../components/CardEdit'
import ImageContainer from '../components/ImageContainer'
import Uploader from '../components/Uploader'
import SortController from '../components/SortController'
import AdminHeader from '../components/AdminHeader'
import firebase from 'firebase/app'
import 'firebase/database'
import PropTypes from 'prop-types'

const ProjectEditor = (props) => {
  const [expandedBtn, setExpandedBtn] = useState('')
  const [openSort, setOpenSort] = useState(false)
  const [showUploader, setShowUploader] = useState(false)
  const [galleryIndex, setGalleryIndex] = useState('')
  const project = props.dbProjects[props.projIndex]
  const sortRef = useRef(openSort)

  const sortHandler = (x) => {
    sortRef.current = x
    setOpenSort(x)
  }

  useEffect(() => {
    if (window.innerWidth > 800 || document.documentElement.clientWidth > 800) {
      document.getElementById('project-ed').addEventListener('wheel', horizontalScroll)
      return () =>
        document.getElementById('project-ed').removeEventListener('wheel', horizontalScroll)
    }
  }, [])

  const horizontalScroll = (e) => {
    if ((window.innerWidth > 800 || document.documentElement.clientWidth > 800) && !sortRef.current) {
      document.getElementById('gallery-ed').scrollLeft += e.deltaY
    }
  }

  useEffect(() => {
    if (openSort) {
      document.getElementById('project-ed').removeEventListener('wheel', horizontalScroll)
    }
    if (!openSort) {
      document.getElementById('project-ed').addEventListener('wheel', horizontalScroll)
    }
  }, [openSort])

  useEffect(() => {
    imgLoader()
  }, [project.images])

  const imgLoader = () => {
    let index = 0

    const buildImage = () => {
      if (index < project.images.length) {
        // if (project.images[index].hasOwnProperty('card_text') || project.images[index].hasOwnProperty('description')) {
        if (Object.prototype.hasOwnProperty.call(project.images[index], 'card_text') || Object.prototype.hasOwnProperty.call(project.images[index], 'title')) {
          index++
          buildImage()
        } else {
          const img = new Image()
          img.src = 'https://res.cloudinary.com/hive-la-home/image/upload/f_auto,q_auto:low,dpr_auto,w_auto/v1/' + project.images[index]
          img.onload = () => {
            index++
            const domImg = document.getElementById(project.images[index - 1])
            domImg.src = domImg.dataset.src
            buildImage()
          }
        }
      }
    }
    buildImage()
  }

  const deleteSelect = (index) => {
    const db = firebase.database().ref('projects')
    const projects = [...props.dbProjects]
    projects[props.projIndex].images.splice(index, 1)
    db.set(projects)
  }

  return (
    <main id='project-ed'>
      {openSort
        ? null
        : <AdminHeader
          {...props}
          page={'project'}
          color={'dark'}
          sortHandler={sortHandler}
        />
      }
      <div id='blur-container' className={openSort ? 'blur' : null}>
        <section id='gallery-ed'>
          {project.images.map((item, index) => (
            <figure className='item-cont' key={index}>
              <span className='add-btn-wrap'>
                <GalleryAddBtn
                  {...props}
                  setShowUploader={setShowUploader}
                  expandedBtn={expandedBtn}
                  setExpandedBtn={setExpandedBtn}
                  setGalleryIndex={setGalleryIndex}
                  galleryIndex={index}
                  galleryCount={project.images.length}
                />
              </span>
              {Object.prototype.hasOwnProperty.call(project.images[index], 'card_text') || Object.prototype.hasOwnProperty.call(project.images[index], 'title')
                ? <CardEdit item={item} index={index} dbProjects={props.dbProjects} projIndex={props.projIndex}/>
                : <ImageContainer item={item} galleryIndex={index} projIndex={props.projIndex} deleteSelect={deleteSelect}/>
              }
            </figure>
          ))}
          <figure className='item-cont'>
            <span className='add-btn-wrap'>
              <GalleryAddBtn
                {...props}
                setShowUploader={setShowUploader}
                expandedBtn={expandedBtn}
                setExpandedBtn={setExpandedBtn}
                galleryIndex={project.images.length}
                setGalleryIndex={setGalleryIndex}
              />
            </span>
          </figure>
        </section>
      </div>
      <SortController
        {...props}
        setOpenSort ={setOpenSort}
        project={project}
        inProp={openSort}
        sortHandler={sortHandler}
      />
      <Uploader
        {...props}
        setShowUploader={setShowUploader}
        setExpandedBtn={setExpandedBtn}
        expandedBtn={expandedBtn}
        galleryIndex={galleryIndex}
        setGalleryIndex={setGalleryIndex}
        inProp={showUploader}
        newProject={false}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '40px',
          height: '40px'
        }}
        onClick={() => props.setShowEdit(false)}
      >
      </div>
    </main>
  )
}

ProjectEditor.propTypes = {
  projIndex: PropTypes.number,
  dbProjects: PropTypes.array,
  loggedIn: PropTypes.bool,
  setShowEdit: PropTypes.any,
  setShowNav: PropTypes.any
}

export default ProjectEditor
