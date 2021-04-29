import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import AdminHeader from '../components/AdminHeader'
import PropTypes from 'prop-types'
import { throttle } from 'lodash'


const About = (props) => {
  const [showHeader, setShowHeader] = useState(true)
  const [prevScrollPos, setPrevScrollPos] = useState(0)

  const handleScroll = () => {
    const currentScrollPos = document.getElementById('about').scrollTop
    setPrevScrollPos(currentScrollPos)
    if (prevScrollPos > currentScrollPos) {
      setShowHeader(true)
      console.log('setShowHeader(true)');
    }
    if (prevScrollPos < currentScrollPos) {
      setShowHeader(false)
      console.log('setShowHeader(false)');
    }
  }

  const handleScrollThrottled = throttle(handleScroll, 250)

  useEffect(() => {
    document.getElementById('about').addEventListener('scroll', handleScrollThrottled)
    console.log('listener set');
    return () =>
      document.getElementById('about').removeEventListener('scroll', handleScrollThrottled)
  }, [prevScrollPos, showHeader, handleScrollThrottled])

  return (
    <main id='about'>
      {props.showEdit
        ? <AdminHeader setShowNav={props.setShowNav} loggedIn={props.loggedIn} showEdit={props.showEdit} color='dark' showHeader={showHeader} page={'about'}/>
        : <Header setShowNav={props.setShowNav} showHeader={showHeader} loggedIn={props.loggedIn} color='dark' page={'about'} />
      }

      <div className='img-outer'>
        <img src={'https://res.cloudinary.com/hive-la-home/image/upload/v1612916264/About/about-square.jpg'}/>
      </div>
      <span>Jessica Flemming + Devon McKeon</span>

      <div id='text'>
        <h2>Hive LA Home is a Los Angeles based interior design company inspired by travel, nature, comfort, and functionality.
          Hive specializes in creating a warm and welcoming environment for their clients’ homes.
        </h2>

        <p>Hive LA Home founders, Devon McKeon and Jess Fleming met in 2004 while working in the visual department for Anthropologie in New York City.
        Brought together by after-work happy hours and a shared organic design aesthetic, their friendship blossomed.
        They're the women who can both hang the shelves and host the dinner parties.
        </p>

        <h3>DEVON</h3>

        <p>Devon got her professional start at ABC Carpet & Home where she perfected her skills creating beautiful tablescapes and beds for the visuals department.
          After the Hive team relocated to the west coast, Devon decided to take a more hands-on approach in design and spent a year volunteering with Habitat for Humanity
          learning how to frame a room, hang drywall and wear steel toe boots.  Soon after, she worked as a top designer for the esteemed Rooms & Gardens in Santa Monica.
          Devon designed many beautiful homes throughout her 9 years with Rooms & Gardens, as well as bringing a seaside style to the Casa del Mar Hotel suites.
        </p>

        <h3>JESS</h3>

        <p>In between dazzling Anthropologie and forming Hive LA Home with Devon, Jess embarked on a four-year adventure working on private yachts. Life at sea brought
        many valuable lessons, including how to maximize small spaces.

        When Jess returned to Los Angeles she decided to enter the world of gourmet cuisine, where she became the GM for the famed restaurant Farmshop and Artisan Market in
        Brentwood, California. Jess’s love for fine dining, restaurants, and travel give Hive LA a unique edge on other traditional designers.
        </p>
      </div>
    {/*<div className='img-outer'>
      <img src={'https://res.cloudinary.com/hive-la-home/image/upload/v1612986623/About/fabric.jpg'}/>
    </div>
    <div className='img-outer'>
      <img src={'https://res.cloudinary.com/hive-la-home/image/upload/v1612986622/About/blue-paper.jpg'}/>
    </div>
    <div className='img-outer'>
      <img src={'https://res.cloudinary.com/hive-la-home/image/upload/v1612986623/About/tiles.jpg'}/>
    </div>
    <div className='img-outer'>
      <img src={'https://res.cloudinary.com/hive-la-home/image/upload/v1612986623/About/kiln.jpg'}/>
    </div>
    <div className='img-outer'>
      <img src={'https://res.cloudinary.com/hive-la-home/image/upload/v1612986623/About/rendering.jpg'}/>
    </div>
    <div className='img-outer'>
      <img src={'https://res.cloudinary.com/hive-la-home/image/upload/v1586896832/About/Hive-note.jpg'}/>
    </div>
    <div className='img-outer'>
      <img src={'https://res.cloudinary.com/hive-la-home/image/upload/v1612986790/About/houzz-badges.jpg'}/>
    </div>
    <div className='img-outer'>
      <img src={'https://res.cloudinary.com/hive-la-home/image/upload/v1612986799/About/houseB-logo.jpg'}/>
    </div>*/}
    </main>
  )
}
About.propTypes = {
  loggedIn: PropTypes.bool,
  setShowNav: PropTypes.any
}

export default About
