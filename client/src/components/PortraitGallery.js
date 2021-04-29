import React from 'react'
import firebase from 'firebase/app'
import 'firebase/database'
import PropTypes from 'prop-types'

const PortraitGallery = (props) => {
  const project = props.dbProjects[props.previewIndex]

  const setPrtrtBgImage = (imgID) => {
    const dbProject = firebase.database().ref(`projects/${props.previewIndex}`)
    const project = props.dbProjects[props.previewIndex]
    if (project.portrait_background && project.portrait_background === imgID) {
      project.portrait_background = null
    } else {
      project.portrait_background = imgID
    }
    dbProject.set(project)
  }

  return (
    project
      ? <div id='prtrt-gallery'>
        {props.dbProjects[props.previewIndex] && props.dbProjects[props.previewIndex].portrait_images
          ? project.portrait_images.map((item, index) => (
            <figure
              className={item === props.dbProjects[props.previewIndex].portrait_background ? 'active' : null}
              key={item}
            >
              <img
                key={index}
                src={'https://res.cloudinary.com/hive-la-home/image/upload/v1/' + item}
                onClick = {() => setPrtrtBgImage(item)}
              />
            </figure>
          ))
          : <p>NO PORTRAIT IMAGES</p>
        }
      </div>
      : null
  )
}

PortraitGallery.propTypes = {
  previewIndex: PropTypes.number,
  dbProjects: PropTypes.array
}

export default PortraitGallery
