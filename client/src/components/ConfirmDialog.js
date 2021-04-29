import React, { useRef } from 'react'
import PropTypes from 'prop-types'

import { Transition } from 'react-transition-group'

const ConfirmDialog = (props) => {
  const confirm = useRef()

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
        <section id='conf-bg' ref={confirm} style={{ ...defaultStyle, ...transitionStyles[state] }}>
          <div id='conf-box'>
            <p>ARE YOU SURE YOU <br/> WANT TO DELETE</p>
            <span>{props.item} ?</span>
            <div id='conf-btn-cont' >
              <button className='conf-btn' onClick={() => props.action(props.actionParam)}>yes</button>
              <button className='conf-btn' onClick={() => props.setDialogInput(false)} >no</button>
            </div>
          </div>
        </section>
      )}
    </Transition>
  )
}

ConfirmDialog.propTypes = {
  inProp: PropTypes.any,
  item: PropTypes.any,
  action: PropTypes.any,
  setDialogInput: PropTypes.any,
  actionParam: PropTypes.any
}

export default ConfirmDialog
