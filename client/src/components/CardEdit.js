import React, { useState } from 'react'
import ConfirmDialog from './ConfirmDialog'
import firebase from 'firebase/app'
import 'firebase/database'
import PropTypes from 'prop-types'

const CardEdit = (props) => {
  const [dialogInput, setDialogInput] = useState(false)

  const removeCard = (index) => {
    const db = firebase.database().ref('projects')
    const projects = [...props.dbProjects]
    projects[props.projIndex].images.splice(index, 1)
    db.set(projects)
  }

  const updateCard = (index) => {
    const input = document.getElementById(`card${props.index}`).innerText
    const db = firebase.database().ref('projects')
    const projects = [...props.dbProjects]
    projects[props.projIndex].images[index].card_text = input
    db.set(projects)
  }

  const addTitle = () => {
    const db = firebase.database().ref('projects')
    const projects = [...props.dbProjects]
    projects[props.projIndex].images[props.index].title = projects[props.projIndex].name
    db.set(projects)
  }

  const updateTitle = (index) => {
    const input = document.getElementById(`title${props.index}`).innerText
    const db = firebase.database().ref('projects')
    const projects = [...props.dbProjects]
    projects[props.projIndex].images[index].title = input
    db.set(projects)
  }

  const removeTitle = () => {
    const db = firebase.database().ref('projects')
    const projects = [...props.dbProjects]
    projects[props.projIndex].images[props.index].title = null
    db.set(projects)
  }

  return (
    <figure className='card' >
      <figure className='rmv-card-btn-cont'>
        <img className='rmv-card-btn' src={require('../assets/icons/plus-dark.svg')} onClick={() => setDialogInput(true)} />
      </figure>
      {props.item.title
        ? <figure>
          <p onClick={() => removeTitle()}>&times;</p>
          <pre
            className='title-input'
            id={`title${props.index}`}
            contentEditable="true"
            suppressContentEditableWarning="true"
            onBlur={() => updateTitle(props.index)}
          >
            {props.item.title}
          </pre>
        </figure>
        : <h3 onClick={() => addTitle()}>+ TITLE</h3>
      }
      <pre
        className={props.item.title ? 'body-input' : 'body-input has-title'}
        id={`card${props.index}`}
        contentEditable="true"
        suppressContentEditableWarning="true"
        placeholder='Enter Body Text Here'
        onBlur={() => updateCard(props.index)}>
        {props.item.card_text}
      </pre>
      <ConfirmDialog
        setDialogInput={setDialogInput}
        item={'This Card'}
        action={removeCard}
        actionParam={props.index}
        inProp={dialogInput}
      />
    </figure>
  )
}

CardEdit.propTypes = {
  projIndex: PropTypes.number,
  index: PropTypes.number,
  dbProjects: PropTypes.array,
  item: PropTypes.any
}

export default CardEdit
