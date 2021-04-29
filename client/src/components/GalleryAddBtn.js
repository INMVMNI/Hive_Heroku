import React from 'react'
import firebase from 'firebase/app'
import 'firebase/database'

const GalleryAddBtn = (props) => {
  const addCard = (index) => {
    const db = firebase.database().ref('projects')
    const projects = [...props.dbProjects]
    const project = projects[props.projIndex]
    project.images.splice(index, 0, { card_text: '' })
    db.set(projects)
    props.setExpandedBtn('')
  }

  const newImageHandler = () => {
    console.log(props)
    props.setShowUploader(true)
    props.setGalleryIndex(props.galleryIndex)
    if (props.expandedBtn) {
      props.setExpandedBtn('')
    }
  }

  return (
    <figure
      tabIndex='100'
      className= {props.expandedBtn === props.galleryIndex ? 'glry-add-btn expand' : 'glry-add-btn'}
      onFocus={props.expandedBtn === props.galleryIndex ? null : () => props.setExpandedBtn(props.galleryIndex)}
      onBlur={() => props.setExpandedBtn('')}
      style={(props.expandedBtn === 0) && (props.galleryIndex === 0) ? {marginLeft: '10vh'} : (props.expandedBtn === props.galleryCount ) && (props.galleryIndex === props.galleryCount) ? { marginRight: '8vh' } : null}
    >
      {props.expandedBtn === props.galleryIndex
        ? <figure className={'add-select'}>
          <img src={require('assets/icons/add-img-btn.svg')} onClick={() => newImageHandler()}/>
          <p>:</p>
          <img src={require('assets/icons/add-card-btn.svg')} onClick={() => addCard(props.galleryIndex)}/>
        </figure>
        : <img className={'expand-btn'} src={require('../assets/icons/plus-dark.svg')}/>
      }
    </figure>
  )
}

export default GalleryAddBtn
