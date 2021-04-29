import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

const MainMenu = (props) => {
  const [projects, setProjects] = useState(props.dbProjects)
  const history = useHistory()

  const linkTo = (name) => {
    history.push(`/${name.toLowerCase().split(' ').join('-')}`)
  }

  useEffect(() => {
    if (projects.length === 0) {
      setProjects(props.dbProjects)
    }

    if (projects[props.activeIndex] && projects[props.activeIndex].id) {
      setList()
    }
    if (projects.length > 0 && props.dbProjects !== projects) {
      if (projects.length > 0 && props.dbProjects.length > projects.length) {
        console.log('db > projects')
        setProjects(props.dbProjects)
        history.push(`/${props.dbProjects[props.dbProjects.length - 1].name.toLowerCase().split(' ').join('-')}`)
        props.setActiveIndex(props.dbProjects.length - 1)
      }
      if (projects.length > 0 && props.dbProjects.length < projects.length) {
        console.log('db < projects')
        setProjects(props.dbProjects)
      }
    }
  }, [props.dbProjects])

  const setList = () => {
    const miniList = document.getElementById('em-list')
    const activeItem = `em-item-${props.activeIndex}`
    const centerPosition = miniList.children[3].id
    if (centerPosition !== activeItem) {
      if (props.activeIndex < 3) {
        miniList.prepend(miniList.children[miniList.children.length - 1])
        setList()
      }
      if (props.activeIndex > 3) {
        miniList.append(miniList.children[0])
        setList()
      }
    }
  }

  return (
    <section
      id='editor-menu'
      className={props.menuEdit ? 'edit' : null}
      style={{ justifyContent: 'center', height: '100%', top: 0 }}
    >
      <div id='em-frame' className={props.menuMode === 'rotate' ? 'rotate' : 'editing'}>
        <ul id='em-list'>
          {props.dbProjects.map((item, index) => (
            <li
              id={`em-item-${index}`}
              className={index === props.activeIndex ? 'em-item active' : 'em-item'}
              onClick={() => linkTo(item.name)}
              key={index}
            >
              <p style={{ textALign: 'right' }}>{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

MainMenu.propTypes = {
  dbProjects: PropTypes.array,
  menuEdit: PropTypes.bool,
  menuMode: PropTypes.string,
  activeIndex: PropTypes.number,
  setActiveIndex: PropTypes.any
}

export default MainMenu
