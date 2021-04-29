import React, { useState } from 'react'
import PropTypes from 'prop-types'

const AddNewProjects = (props) => {
  const [newName, setNewName] = useState('')

  const handleInputChange = (e) => {
    setNewName(e.currentTarget.value)
  }

  return (
    <section id='add-new'>
      <div>
        <p>New Project</p>
        <img src={require('../assets/icons/x-icon_15.5x2-gray.svg')} onClick={() => props.setShowUploader(false)}/>
      </div>
      <input id='new-name' type='text' autoFocus placeholder=' project name' maxLength='15' onChange={(e) => handleInputChange(e)}></input>
      <div>
        <button onClick={() => props.setProjectName(newName)} disabled={!newName}>Next</button>
      </div>
    </section>
  )
}

AddNewProjects.propTypes = {
  setProjectName: PropTypes.any,
  setShowUploader: PropTypes.any
}

export default AddNewProjects
