import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

const PreviewMenu = (props) => {
  useEffect(() => {
    setMenu()
  }, [])

  const setMenu = () => {
    const menu = document.getElementById('pm-list')
    const activeItem = `pm-item-${props.previewIndex}`
    const centerPosition = menu.children[3].id
    if (centerPosition !== activeItem) {
      if (props.previewIndex < 3) {
        menu.prepend(menu.children[menu.children.length - 1])
        setMenu()
      }
      if (props.previewIndex > 3) {
        menu.append(menu.children[0])
        setMenu()
      }
    }
  }

  return (
    <section id='prvw-menu' className={props.mode}>
      <div id='pm-frame'>
        <ul id='pm-list'>
          {props.dbProjects.map((item, index) => (
            <li
              id={`pm-item-${index}`}
              className={index === props.previewIndex ? 'pm-item active' : 'pm-item'}
              key={index}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

PreviewMenu.propTypes = {
  dbProjects: PropTypes.array,
  previewIndex: PropTypes.number,
  mode: PropTypes.string
}

export default PreviewMenu
