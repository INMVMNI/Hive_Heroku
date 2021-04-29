import React, { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import firebase from 'firebase/app'
import 'firebase/database'
import { Transition } from 'react-transition-group'
import PropTypes from 'prop-types'

const ListEditor = (props) => {
  const [projects, setProjects] = useState(props.dbProjects)

  useEffect(() => {
    setProjects(props.dbProjects)
  }, [props.dbProjects])

  const updateProjects = (srcI, destI) => {
    const projs = [...projects]
    projs.splice(destI, 0, projs.splice(srcI, 1)[0])
    setProjects(projs)
    const dbProjects = firebase.database().ref('projects')
    dbProjects.set(projs)
  }

  const updateName = (e, index) => {
    e.preventDefault()
    const project = projects[index]
    const input = document.getElementById(`name-edit-${index}`)
    project.name = input.value
    const db = firebase.database().ref(`projects/${index}`)
    db.set(project)
    input.blur()
  }

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
      in={props.menuEdit}
      unmountOnExit
      timeout={{ enter: 0, exit: 500 }}
    >
      {state => (
        <div id ='trans-wrap' style={{ ...defaultStyle, ...transitionStyles[state] }}>
          {CSS.supports(`(backdrop-filter: blur()) or (-moz-backdrop-filter: blur()) or
            (-o-backdrop-filter: blur()) or (-webkit-backdrop-filter: blur())`)
            ? null
            : <div
              id='le-overlay'
              style={{
                backgroundImage: window.innerWidth < 480 && props.dbProjects[props.activeIndex].portrait_background
                  ? `url('https://res.cloudinary.com/hive-la-home/image/upload/e_contrast:30/v1/${props.dbProjects[props.activeIndex].portrait_background}.jpg')`
                  : `url('https://res.cloudinary.com/hive-la-home/image/upload/e_contrast:30/v1/${props.dbProjects[props.activeIndex].backgroundImage}.jpg')`,
                backgroundPosition: window.innerWidth < 480 && props.dbProjects[props.activeIndex].portrait_background
                  ? 'center center'
                  : props.dbProjects[props.activeIndex].backgroundPosition + ' center'
              }}
            ></div>
          }
          <section id='list-editor-wrap'>
            <div style={{ zIndex: '3' }}>
              <div id='close-wrap'>
                <h3>REORDER &#183; RENAME &#183; REMOVE</h3>
                <img src={require('../assets/icons/x-icon_12.75x2-gray.svg')} onClick={() => props.setMenuEdit(false)}/>
              </div>
              <DragDropContext onDragEnd={(param) => updateProjects(param.source.index, param.destination.index)}>
                <Droppable droppableId="droppable-1" >
                  {(provided, _) => (
                    <div id='list-editor' tabIndex="0" ref={provided.innerRef} {...provided.droppableProps} >
                      {projects.map((item, index) => (
                        <Draggable key={item.id} draggableId={'draggable-' + item.id} index={index}>
                          {(provided, snapshot) => (
                            <div className='list-item' ref={provided.innerRef} {...provided.draggableProps}>
                              <img src={require('../assets/icons/handle-dark.svg')} className='handle' {...provided.dragHandleProps}/>
                              <form onSubmit={e => updateName(e, index)}>
                                <input
                                  id={`name-edit-${index}`}
                                  type='text' defaultValue={projects[index].name}
                                  onBlur={e => updateName(e, index)}
                                  spellCheck="false"
                                >
                                </input>
                              </form>
                              <img src={require('../assets/icons/x-icon_12.75x2-gray.svg')} className='rmv-btn' onClick={() => props.setDialogInput(index)}/>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          </section>
        </div>
      )}
    </Transition>
  )
}

ListEditor.propTypes = {
  activeIndex: PropTypes.number,
  dbProjects: PropTypes.array,
  menuEdit: PropTypes.any,
  setMenuEdit: PropTypes.any,
  setDialogInput: PropTypes.any
}

export default ListEditor
