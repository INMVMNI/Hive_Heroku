import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { throttle } from 'lodash'
import PropTypes from 'prop-types'

const Project = (props) => {
  const project = props.dbProjects[props.projIndex]
  const [showHeader, setShowHeader] = useState(true)
  const [prevScrollPos, setPrevScrollPos] = useState(0)

  useEffect(() => {
    imgLoader()
  }, [])

  const handleScroll = () => {
    const currentScrollPos = document.getElementById('project').scrollTop
    setPrevScrollPos(currentScrollPos)
    if (prevScrollPos > currentScrollPos) {
      setShowHeader(true)
    }
    if (prevScrollPos < currentScrollPos) {
      setShowHeader(false)
    }
  }

  const handleScrollThrottled = throttle(handleScroll, 250)

  useEffect(() => {
    document.getElementById('project').addEventListener('scroll', handleScrollThrottled)
    return () =>
      document.getElementById('project').removeEventListener('scroll', handleScrollThrottled)
  }, [prevScrollPos, showHeader, handleScrollThrottled])

  const showHqImg = (item) => {
    document.getElementById(item + 'cont').classList.add('show')
  }

  useEffect(() => {
    if (window.innerWidth > 800 || document.documentElement.clientWidth > 800) {
      document.getElementById('project').addEventListener('wheel', horizontalScroll)
      return () =>
        document.getElementById('project').removeEventListener('wheel', horizontalScroll)
    }
  }, [])

  const horizontalScroll = (e) => {
    if (window.innerWidth > 800 || document.documentElement.clientWidth > 800) {
      document.getElementById('gallery').scrollLeft += e.deltaY
    }
  }

  useEffect(() => {
    window.addEventListener('resize', reseizeHandler)
    return () => {
      window.removeEventListener('resize', reseizeHandler)
    }
  }, [])

  const reseizeHandler = () => {
    if (window.innerWidth > 800 || document.documentElement.clientWidth > 800) {
      document.getElementById('project').addEventListener('wheel', horizontalScroll)
    }
    if (window.innerWidth < 800 || document.documentElement.clientWidth < 800) {
      document.getElementById('project').removeEventListener('wheel', horizontalScroll)
    }
  }

  const imgLoader = () => {
    let index = 0

    const buildImage = () => {
      if (index < project.images.length) {
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

  return (
    <main id='project'>
      <div id='gallery'>
        {project.images.map((item, index) => (
          Object.prototype.hasOwnProperty.call(project.images[index], 'card_text') || Object.prototype.hasOwnProperty.call(project.images[index], 'title')
            ? <div className='card gallery-item' key={index}>
              {item.title
                ? <h1>{item.title}</h1>
                : null
              }
              <p className={item.title ? null : 'no-title'}>{item.card_text}</p>
            </div>
            : <div id={item + 'cont'} className='p-img-cont gallery-item' style={{ position: 'relative' }} key={index}>
              <img
                id={item}
                className='p-img'
                data-src={'https://res.cloudinary.com/hive-la-home/image/upload/f_auto,q_auto:low,dpr_auto,w_auto/v1/' + item}
                onLoad={() => showHqImg(item)}
              />
              <div className='lqip-wrap'>
                <img
                  className='lq-img'
                  src= {
                    CSS.supports('backdrop-filter', 'blur()')
                      ? 'https://res.cloudinary.com/hive-la-home/image/upload/f_auto,q_1,dpr_auto,h_30,c_scale/v1/' + item
                      : 'https://res.cloudinary.com/hive-la-home/image/upload/f_auto,q_1,dpr_auto,h_30,c_scale/e_blur:10/v1/' + item
                  }
                />
              </div>
            </div>

        ))}
      </div>
      <Header setShowNav={props.setShowNav} project={project} page={'project'} color={'dark'} showHeader={showHeader} scrollPos={prevScrollPos}/>
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
    </main>
  )
}

Project.propTypes = {
  dbProjects: PropTypes.array,
  projIndex: PropTypes.number,
  setShowNav: PropTypes.any,
  setShowEdit: PropTypes.any
}

export default Project
