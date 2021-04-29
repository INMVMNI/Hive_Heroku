import React, { useState, useEffect } from 'react'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'
import firebase from 'firebase/app'
import 'firebase/database'
import PropTypes from 'prop-types'

const GridSort = (props) => {
  const [itemSize, setItemSize] = useState(200)

  useEffect(() => {
    if (window.innerWidth < 450 || document.documentElement.clientWidth < 450) {
      setItemSize(100)
    }
  }, [])

  const zoomIn = () => {
    const maxSize = 300
    const newSize = itemSize + 50
    if (newSize <= maxSize) {
      setItemSize(newSize)
    }
  }

  const zoomOut = () => {
    const minSize = 100
    const newSize = itemSize - 50
    if (newSize >= minSize) {
      setItemSize(newSize)
    }
  }

  const GridItem = SortableElement(
    ({ value }) => Object.prototype.hasOwnProperty.call(value, 'card_text')
      ? <li className='grid-card' style={{ borderRadius: itemSize / 25 }}>
        {value.title
          ? <h3 style={{ fontSize: itemSize / 10 }}>{value.title}</h3>
          : null
        }
        <p style={{ fontSize: itemSize / 30 }}>{value.card_text}</p>
      </li>
      : <li style={{ borderRadius: itemSize / 25 }}>
        <img src={'https://res.cloudinary.com/hive-la-home/image/upload/v1/' + value}></img>
      </li>
  )

  const Grid = SortableContainer(({ items }) => {
    return (
      <section id='dnd-grid-cont'>
        <header>
          { window.innerWidth < 450 || document.documentElement.clientWidth < 450
            ? null
            : <figure>
              <div onClick={() => zoomOut()}>&minus;</div>
              <div className={itemSize === 100 ? 'dot active' : 'dot'}></div>
              <div className={itemSize === 150 ? 'dot active' : 'dot'}></div>
              <div className={itemSize === 200 ? 'dot active' : 'dot'}></div>
              <div className={itemSize === 250 ? 'dot active' : 'dot'}></div>
              <div className={itemSize === 300 ? 'dot active' : 'dot'}></div>
              <div onClick={() => zoomIn()}>&#43;</div>
            </figure>
          }
          <p>DRAG AND DROP</p>
          <img src={require('../assets/icons/x-icon_15.5x2-gray.svg')} onClick={() => props.setOpenGrid(false)}/>
        </header>
        <ul
          id='dnd-grid'
          style={{
            gridTemplateColumns: `repeat(auto-fill, ${itemSize}px)`,
            gridAutoRows: `${itemSize}px`
          }}
        >
          {items.map((value, index) => (
            <GridItem key={`item-${index}`} index={index} value={value}/>
          ))}
        </ul>
      </section>
    )
  })

  const onSortEnd = ({ oldIndex, newIndex, collection }) => {
    const db = firebase.database().ref('projects')
    const projects = [...props.dbProjects]
    const array = [...props.galleryItems]
    array.splice(newIndex, 0, array.splice(oldIndex, 1)[0])
    props.setGalleryItems(array)
    projects[props.projIndex].images = array
    db.set(projects)
  }

  return (
    <Grid
      items={props.dbProjects[props.projIndex].images}
      helperClass={'dragging'}
      onSortStart={(_, event) => event.preventDefault()}
      onSortEnd={onSortEnd} axis={'xy'}
    />
  )
}

GridSort.propTypes = {
  projIndex: PropTypes.number,
  dbProjects: PropTypes.array,
  setOpenGrid: PropTypes.any,
  galleryItems: PropTypes.array,
  setGalleryItems: PropTypes.any
}

export default GridSort
