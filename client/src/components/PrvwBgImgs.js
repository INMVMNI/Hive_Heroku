import React from 'react'
import PropTypes from 'prop-types'

const PrvwBgImgs = (props) => {
  return (
    <section id='cover-imgs' className={props.aligning ? 'aligning' : null}>
      {
        props.dbProjects.map((item, index) => (
          props.mode === 'phone' && item.portrait_background
            ? <div
              className={ props.activeItem
                ? (item.id === props.activeItem
                  ? 'cover-image active'
                  : 'cover-image')
                : (index === props.activeIndex
                  ? 'cover-image active'
                  : 'cover-image')
              }
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundImage: `url('https://res.cloudinary.com/hive-la-home/image/upload/e_contrast:30/v1/${item.portrait_background}.jpg')`,
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
                transition: 'opacity .75s .01s'
              }}
              key={item.id}>
            </div>
            : <div
              className={ props.activeItem
                ? (item.id === props.activeItem
                  ? 'cover-image active'
                  : 'cover-image')
                : (index === props.activeIndex
                  ? 'cover-image active'
                  : 'cover-image')
              }
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundImage: `url('https://res.cloudinary.com/hive-la-home/image/upload/e_contrast:30/v1/${item.backgroundImage}.jpg')`,
                backgroundPosition: item.backgroundPosition + ' center',
                backgroundSize: 'cover'
              }}
              key={item.id}>
            </div>
        ))}
      <div
        id='preview-overlay'
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%'
        }}
      >
      </div>
    </section>
  )
}

PrvwBgImgs.propTypes = {
  dbProjects: PropTypes.array,
  mode: PropTypes.string,
  activeIndex: PropTypes.number,
  activeItem: PropTypes.number,
  aligning: PropTypes.bool
}

export default PrvwBgImgs
