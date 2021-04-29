import React, { Component } from 'react'
import firebase from 'firebase/app'
import 'firebase/database'
import PropTypes from 'prop-types'

class Horizontal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      images: this.props.dbProjects[this.props.projIndex].images,
      selected: null
    }
  }

  componentDidMount () {
    document.getElementById('h-sort').addEventListener('wheel', this.horizontalScroll)
  }

  componentDidUpdate (prevProps) {
    if (this.props.dbProjects[this.props.projIndex].images !== prevProps.dbProjects[this.props.projIndex].images) {
      this.setState({ images: this.props.dbProjects[this.props.projIndex].images })
    }
  }

  select (index) {
    this.setState({ selected: index })
    if (this.state.selected === index) {
      this.setState({ selected: null })
    } else {
      this.setState({ selected: index })
    }
  }

  insertHiddenImage (index) {
    const destIndex = index
    const originIndex = this.state.selected
    const images = [...this.state.images]
    images.splice(index, 0, images[originIndex])
    this.setState({ images: images, selected: null }, this.widthTransition(originIndex, destIndex, images))
  }

  widthTransition (originIndex, destIndex, images) {
    const adjustedOriginIndex = originIndex > destIndex ? (originIndex + 1) : originIndex
    const origin = document.getElementById('rh-' + adjustedOriginIndex)
    const width = document.getElementById('rh-' + originIndex).offsetWidth + 'px'
    const translistening = (e) => {
      if (e.propertyName === 'opacity') {
        this.removeImageAndStyle(origin, adjustedOriginIndex, destIndex)
        document.getElementById('rh-' + destIndex).removeEventListener('transitionend', translistening)
      }
    }

    requestAnimationFrame(() => {
      origin.style.cssText = 'width: ' + width + '; opacity: 0;'
      const dest = document.getElementById('rh-' + destIndex)
      dest.style.cssText = 'width: 0px; opacity: 0;'
      dest.addEventListener('transitionend', translistening)
      requestAnimationFrame(() => {
        origin.style.cssText = 'width: 0px;  transition: .75s; opacity: 0;'
        dest.style.cssText = 'width: ' + width + '; opacity: 1; transition: width .75s , opacity .5s  .75s'
      })
    })
  }

  removeImageAndStyle (origin, adjustedOriginIndex, destIndex) {
    const images = [...this.state.images]
    origin.removeAttribute('style')
    const dest = document.getElementById('rh-' + destIndex)
    dest.removeAttribute('style')
    images.splice(adjustedOriginIndex, 1)
    this.setState({ images: images })
    const db = firebase.database().ref('projects')
    const projects = [...this.props.dbProjects]
    projects[this.props.projIndex].images = images
    db.set(projects)
  }

  horizontalScroll (e) {
    document.getElementById('h-sort-gallery').scrollLeft += e.deltaY
  }

  render () {
    return (
      <main id="h-sort">
        <header>
          <div></div>
          {this.state.selected === null
            ? <p onClick={() => this.tempFunction() }>SELECT ITEM TO MOVE</p>
            : <p>SELECT DROP POINT</p>
          }
          <figure>
            <img src={require('../assets/icons/grid-btn2.svg')} onClick={() => this.props.setOpenGrid(true)}/>
            <img src={require('../assets/icons/x-icon_15.5x2-gray.svg')} onClick={() => this.props.sortHandler(false)}/>
          </figure>
        </header>
        <section id="h-sort-gallery" className={Number.isInteger(this.state.selected) ? 'show-btns' : null}>
          {this.state.images.map((item, index) => {
            return (
              Object.prototype.hasOwnProperty.call(item, 'card_text') || Object.prototype.hasOwnProperty.call(item, 'description')
                ? <figure id={'rh-' + index} className= {this.state.selected === index ? 'horiz-card select' : 'horiz-card'} key={index}>
                  {(Number.isInteger(this.state.selected) && this.state.selected === index) || (Number.isInteger(this.state.selected) && (this.state.selected + 1) === index)
                    ? <div className='gap'></div>
                    : <div className='gap'>
                      <figure className='drop-point' onClick={() => this.insertHiddenImage(index)}>
                        <div>
                          <img src={require('assets/icons/drop-btn-3.svg')} />
                        </div>
                      </figure>
                    </div>
                  }
                  <figure onClick={() => this.select(index)}>
                    {item.title
                      ? <h1>{item.title}</h1>
                      : null
                    }
                    <p>{item.card_text}</p>
                  </figure>
                </figure>
                : <figure className='horiz-imgCont' id={'rh-' + index} key= {index}>
                  {(Number.isInteger(this.state.selected) && this.state.selected === index) || (Number.isInteger(this.state.selected) && (this.state.selected + 1) === index)
                    ? <div className='gap'></div>
                    : <div className='gap'>
                      <figure className='drop-point' onClick={() => this.insertHiddenImage(index)}>
                        <div>
                          <img src={require('assets/icons/drop-btn-3.svg')} />
                        </div>
                      </figure>
                    </div>
                  }
                  <div className={this.state.selected === index ? 'image-wrap select' : 'image-wrap'} onClick={() => this.select(index)}>
                    <img className='image' src={'https://res.cloudinary.com/hive-la-home/image/upload/f_auto,q_auto:low,dpr_auto,w_auto/v1/' + item} alt=''></img>
                  </div>
                </figure>
            )
          })}
          <figure className='horiz-imgCont' id={'rh-' + this.state.images.length} key= {this.state.images.length}>
            {this.state.selected === this.state.images.length - 1
              ? <div className='gap end'></div>
              : <div className='gap end'>
                <figure className='drop-point' onClick={() => this.insertHiddenImage(this.state.images.length)}>
                  <div>
                    <img src={require('assets/icons/drop-btn-3.svg')} />
                  </div>
                </figure>
              </div>
            }
          </figure>
        </section>
      </main>
    )
  }
}

Horizontal.propTypes = {
  projIndex: PropTypes.number,
  dbProjects: PropTypes.array,
  sortHandler: PropTypes.any,
  setOpenGrid: PropTypes.any
}

export default Horizontal
