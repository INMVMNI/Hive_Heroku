import React from 'react'
import firebase from 'firebase/app'
import 'firebase/database'
import PropTypes from 'prop-types'

const AlignBtns = (props) => {
  const setBgPosition = (position) => {
    props.setAligning(true)
    const dbProject = firebase.database().ref(`projects/${props.previewIndex}`)
    const project = props.dbProjects[props.previewIndex]
    project.backgroundPosition = position
    dbProject.set(project)
  }
  return (
    <section id='align-btns'>
      <figure
        className={props.dbProjects[props.previewIndex].backgroundPosition === 'left' ? 'active' : null}
        onClick={() => setBgPosition('left')}
      >
        <p>LEFT</p>
      </figure>
      <figure
        className={props.dbProjects[props.previewIndex].backgroundPosition === 'center' ? 'active' : null}
        onClick={() => setBgPosition('center')}
      >
        <p>CENTER</p>
      </figure>
      <figure className={props.dbProjects[props.previewIndex].backgroundPosition === 'right' ? 'active' : null}
        onClick={() => setBgPosition('right')}
      >
        <p>RIGHT</p>
      </figure>
    </section>
  )
}

AlignBtns.propTypes = {
  previewIndex: PropTypes.number,
  dbProjects: PropTypes.array,
  setAligning: PropTypes.any
}

export default AlignBtns
