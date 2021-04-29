import React, { useEffect } from 'react'
import firebase from 'firebase/app'
import 'firebase/database'
import PropTypes from 'prop-types'

const LandscapeGallery = (props) => {
  useEffect(() => {
    loadImgs()
  }, [props.previewIndex])

  const setBgImage = (imgID) => {
    const dbProject = firebase.database().ref(`projects/${props.previewIndex}`)
    const project = props.dbProjects[props.previewIndex]
    project.backgroundImage = imgID
    dbProject.set(project)
    loadImgs()
  }

  // const loadImgs = () => {
  //   const wideImgs = props.dbProjects[props.previewIndex].wideImages
  //   for (const [i, wideImg] of wideImgs.entries()) {
  //     const img = new Image()
  //     img.src = 'https://res.cloudinary.com/hive-la-home/image/upload/f_auto,q_auto:low,dpr_auto,w_auto/v1/' + wideImg
  //     img.onload = () => {
  //       const domImgCont = document.getElementById(i)
  //       const domImg = domImgCont.children[0]
  //       domImg.src = domImg.src = domImg.dataset.src
  //       domImgCont.classList.add('loaded')
  //     }
  //   }
  // }

  const loadImgs = () => {
    if (props.dbProjects[props.previewIndex].wideImages) {
      const wideImgs = props.dbProjects[props.previewIndex].wideImages
      for (const [i, wideImg] of wideImgs.entries()) {
        const img = new Image()
        img.src = 'https://res.cloudinary.com/hive-la-home/image/upload/f_auto,q_auto:low,dpr_auto,w_auto/v1/' + wideImg
        img.onload = () => {
          const domImgCont = document.getElementById(i)
          const domImg = domImgCont.children[0]
          domImg.src = domImg.src = domImg.dataset.src
          domImgCont.classList.add('loaded')
        }
      }
    }
  }

  return (
    <div id='lndscp-glry'>
      { props.dbProjects[props.previewIndex] && props.dbProjects[props.previewIndex].wideImages
        ? props.dbProjects[props.previewIndex].wideImages.map((item, index) => (
          <figure
            id={index}
            className={item === props.dbProjects[props.previewIndex].backgroundImage ? 'active' : null}
            key={item}>
            <img
              src={''}
              data-src={'https://res.cloudinary.com/hive-la-home/image/upload/f_auto,q_auto:low,dpr_auto,w_auto/v1/' + item}
              onClick = {() => setBgImage(item)}
            />
          </figure>
        ))
        : <p>NO WIDE IMAGES</p>
      }
      <div id='end-gap' style={{ color: 'white', fontSize: '5px' }}>p</div>
    </div>
  )
}

LandscapeGallery.propTypes = {
  previewIndex: PropTypes.number,
  dbProjects: PropTypes.array
}

export default LandscapeGallery
