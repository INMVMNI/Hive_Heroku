import React, { useState } from 'react'
import HorizontalSort from './HorizontalSort'
import GridSort from './GridSort'
import { Transition } from 'react-transition-group'
import PropTypes from 'prop-types'

const SortController = (props) => {
  const [openGrid, setOpenGrid] = useState(false)
  const [galleryItems, setGalleryItems] = useState(props.dbProjects[props.projIndex].images)

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
    <Transition
      in={props.inProp}
      unmountOnExit
      timeout={{ enter: 0, exit: 500 }}
    >
      {state => (
        <section style={{ ...defaultStyle, ...transitionStyles[state] }}>
          <HorizontalSort
            dbProjects={props.dbProjects}
            projIndex={props.projIndex}
            project={props.project}
            setOpenGrid = {setOpenGrid}
            setOpenSort={props.setOpenSort}
            galleryItems = {galleryItems}
            setGalleryItems = {setGalleryItems}
            inProp={props.inProp}
            sortHandler={props.sortHandler}
          />

          {openGrid
            ? <GridSort
              dbProjects={props.dbProjects}
              projIndex={props.projIndex}
              project={props.project}
              setOpenGrid = {setOpenGrid}
              galleryItems = {galleryItems}
              setGalleryItems = {setGalleryItems}

            />
            : null
          }
        </section>
      )}
    </Transition>
  )
}

SortController.propTypes = {
  dbProjects: PropTypes.array,
  projIndex: PropTypes.number,
  project: PropTypes.object,
  inProp: PropTypes.bool,
  setOpenSort: PropTypes.any,
  sortHandler: PropTypes.any
}

export default SortController
