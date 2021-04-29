import React from 'react'
import PropTypes from 'prop-types'

const AdminEditBtns = props => {
  return (
    <div id='main-edit-btns' style={{ position: 'absolute', bottom: '3vh', width: '100%', height: '20px', display: 'flex', justifyContent: 'center' }}>
      <img
        style={{ height: '100%', cursor: 'pointer' }}
        src={require('../assets/icons/plus-btn.svg')}
        onClick={() => props.setShowUploader(true)}
        title='Add New Project'
      />
      <img
        id='bg-btn'
        src={require('../assets/icons/image-btn.svg')}
        onClick={() => props.setShowImgSlct(true)}
        style={{ height: '90%', margin: '0 45px', cursor: 'pointer' }}
        title='Background Image Select'
      />
      <img
        id='edit-list-btn'
        src={require('../assets/icons/list-btn.svg')}
        onClick={() => props.setMenuEdit(!props.menuEdit)}
        style={{ height: '90%', cursor: 'pointer' }}
        title='Reorder, Rename, or Remove Items'
      />
    </div>
  )
}

AdminEditBtns.propTypes = {
  menuEdit: PropTypes.bool,
  setMenuEdit: PropTypes.any,
  setShowUploader: PropTypes.any,
  setShowImgSlct: PropTypes.any
}

export default AdminEditBtns
