import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

const CoverImages = (props) => {
  useEffect(() => {
    imageLoader()
  }, [props.dbProjects])

  const imageLoader = () => {
    let index = 0
    const projects = props.dbProjects

    const buildImage = () => {
      if (index < projects.length) {
        if (window.innerWidth < 480 && projects[index].portrait_background) {
          const img = new Image()
          img.src = `https://res.cloudinary.com/hive-la-home/image/upload/e_contrast:30/v1/${projects[index].portrait_background}.jpg`
          img.onload = () => {
            const imgContainer = document.getElementById(`BI-${index}`)
            imgContainer.style.backgroundImage = `url(${img.src})`
            index++
            buildImage()
          }
        }
        if (window.innerWidth < 480 && !projects[index].portrait_background) {
          const img = new Image()
          img.src = `https://res.cloudinary.com/hive-la-home/image/upload/e_contrast:30/v1/${projects[index].backgroundImage}.jpg`
          img.onload = () => {
            const imgContainer = document.getElementById(`BI-${index}`)
            imgContainer.style.backgroundImage = `url(${img.src})`
            index++
            buildImage()
          }
        }
        if (window.innerWidth > 480 && projects[index].backgroundImage) {
          const img = new Image()
          img.src = `https://res.cloudinary.com/hive-la-home/image/upload/e_contrast:30/v1/${projects[index].backgroundImage}.jpg`
          img.onload = () => {
            const imgContainer = document.getElementById(`BI-${index}`)
            imgContainer.style.backgroundImage = `url(${img.src})`
            index++
            buildImage()
          }
        }
      }
      if (index > 0 && index === projects.length && props.setInitialLoad) {
        props.setInitialLoad(false)
        secondaryImageLoader()
      }
    }
    buildImage()
  }

  const secondaryImageLoader = () => {
    const contactImgTall = new Image()
    contactImgTall.src = 'https://res.cloudinary.com/hive-la-home/image/upload/q_auto/v1616609631/Contact/contact-door-right-tall.jpg'
    const contactImgWide = new Image()
    contactImgWide.src = 'https://res.cloudinary.com/hive-la-home/image/upload/q_auto/v1616610020/Contact/contact-door-left-wide.jpg'
    const aboutImg = new Image()
    aboutImg.src = 'https://res.cloudinary.com/hive-la-home/image/upload/v1612916264/About/about-square.jpg'
  }

  return (
    <section id='cover-imgs'>
      {props.dbProjects.map((item, index) => (
        <div
          id={`BI-${index}`}
          className={index === props.activeIndex ? 'cover-image active' : 'cover-image'}
          style={{
            backgroundPosition: window.innerWidth < 480 && item.portrait_background ? 'center center' : item.backgroundPosition + ' center'
          }}
          key={item.id}>
        </div>
      ))}
      <div id='gradient-overlay'></div>
    </section>
  )
}

CoverImages.propTypes = {
  dbProjects: PropTypes.array,
  setInitialLoad: PropTypes.any,
  activeIndex: PropTypes.number
}

export default CoverImages
