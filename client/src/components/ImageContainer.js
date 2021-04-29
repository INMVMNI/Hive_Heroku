import React, { useState } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'

import ConfirmDialog from './ConfirmDialog'

const ImageContainer = (props) => {
  const [dialogInput, setDialogInput] = useState(false)

  const removeImage = () => {
    const data = new FormData()
    data.set('projIndex', props.projIndex)
    data.set('galleryIndex', props.galleryIndex)
    axios.post('/api/update/remove', data)
      .then(res => (
        console.log(res)
      ))
    setDialogInput(false)
  }

  return (
    <div className='img-cont'>
      <img
        id={props.item}
        src={'https://res.cloudinary.com/hive-la-home/image/upload/f_auto,q_1,dpr_auto,h_40,c_scale/e_blur:300/v1/' + props.item}
        data-src={'https://res.cloudinary.com/hive-la-home/image/upload/f_auto,q_auto:low,dpr_auto,w_auto/v1/' + props.item}
      />
      <figure className='rmv-img-btn-cont'>
        <img className='rmv-img-btn' src={require('../assets/icons/plus-dark.svg')} onClick={() => setDialogInput(true)} />
      </figure>
      <ConfirmDialog
        setDialogInput={setDialogInput}
        item={'This Image'}
        action={removeImage}
        actionParam={null}
        inProp={dialogInput}
      />
    </div>
  )
}

ImageContainer.propTypes = {
  projIndex: PropTypes.number,
  galleryIndex: PropTypes.number,
  item: PropTypes.any
}

export default ImageContainer
