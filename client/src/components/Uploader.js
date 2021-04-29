import React, { useLayoutEffect, useState } from 'react'
import AddNewProject from './AddNewProject'
import UploadSpinner from './UploadSpinner'
import axios from 'axios'
import { Transition } from 'react-transition-group'
import PropTypes from 'prop-types'

const Uploader = (props) => {
  const [uploadFiles, setUploadFiles] = useState('')
  const [projectName, setProjectName] = useState(null)
  const [uploading, setUploading] = useState(false)

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

  useLayoutEffect(() => {
    const dropArea = document.getElementById('drop-area')
    if (dropArea) {
      ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false)
      })
      ;['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false)
      })
      ;['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false)
      })
      dropArea.addEventListener('drop', handleDrop, false)
    }
  }, [projectName])

  const preventDefaults = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const highlight = () => {
    const dropArea = document.getElementById('drop-area')
    dropArea.classList.add('highlight')
  }

  const unhighlight = () => {
    const dropArea = document.getElementById('drop-area')
    dropArea.classList.remove('highlight')
  }

  const handleDrop = (e) => {
    const dt = e.dataTransfer
    const files = dt.files

    for (const file of files) {
      setUploadFiles(uploadFiles => [...uploadFiles, file])
      const reader = new FileReader()
      reader.onloadend = () => {
        const img = document.createElement('img')
        img.src = reader.result
        img.classList.add('upload-img-prev')
        document.getElementById('drop-area').appendChild(img)
      }
      reader.readAsDataURL(file)
    }
  }

  const onChangeHandler = (e) => {
    const files = e.target.files
    let landCount = 0
    for (const file of files) {
      setUploadFiles(uploadFiles => [...uploadFiles, file])
      const reader = new FileReader()
      reader.onloadend = () => {
        const img = document.createElement('img')
        img.src = reader.result
        img.classList.add('upload-img-prev')
        document.getElementById('drop-area').appendChild(img)
        img.onload = () => {
          if (img.width > img.height) {
            landCount++
          }
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadNew = () => {
    if (!uploadFiles) {
      alert('please select files to upload')
    }

    if (uploadFiles) {
      let imgCount = 0
      let landscapeImgCount = 0
      for (const uploadFile of uploadFiles) {
        const reader = new FileReader()

        reader.onloadend = () => {
          const img = new Image()
          img.src = reader.result
          img.onload = () => {
            imgCount++
            if (img.width > img.height) {
              landscapeImgCount++
            }
            if (imgCount === uploadFiles.length) {
              if (landscapeImgCount < 1) {
                alert('You must include at least one landscape oriented image to use as a background for the portfolio page')
              }
              if (landscapeImgCount >= 1) {
                setUploading(true)
                const formdata = new FormData()
                formdata.set('name', projectName)

                for (const uploadFile of uploadFiles) {
                  formdata.append('name-of-input-key', uploadFile)
                }
                axios.post('/api/upload', formdata)
                  .then(res => {
                    if (res.statusText === 'OK') {
                      setTimeout(() => {
                        props.setShowUploader(false)
                      }, 2000)
                    }
                  })
                setUploadFiles('')
              }
            }
          }
        }
        reader.readAsDataURL(uploadFile)
      }
    }
  }

  const uploadAdd = () => {
    if (!uploadFiles) {
      alert('please select files to upload')
    } else {
      setUploading(true)
      const formdata = new FormData()
      formdata.set('projectIndex', props.projectIndex)
      formdata.set('galleryIndex', props.galleryIndex)
      for (const uploadFile of uploadFiles) {
        formdata.append('name-of-input-key', uploadFile)
      }
      axios.post('/api/update/upload', formdata)
        .then(res => {
          if (res.statusText === 'OK') {
            setTimeout(() => {
              props.setShowUploader(false)
              setUploading(false)
            }, 2000)
          }
        })
      if (props.setExpandedBtn) {
        props.setExpandedBtn('')
      }
      setUploadFiles('')
      props.setGalleryIndex('bork')
    }
  }

  const cancelUpload = () => {
    if (props.setExpandedBtn) {
      props.setExpandedBtn('')
    }
    props.setShowUploader(false)
    setUploadFiles('')
    setProjectName(null)
  }

  const tester = () => {
    console.log(uploadFiles)
    for (const uploadFile of uploadFiles) {
      const reader = new FileReader()
      reader.readAsDataURL(uploadFile)
      reader.onloadend = () => {
        console.log(reader.result.length)
      }
    }
  }

  return (
    <Transition
      in={props.inProp}
      unmountOnExit
      timeout={{ enter: 0, exit: 500 }}
    >
      {state => (
        <section id='uploader' style={{ ...defaultStyle, ...transitionStyles[state] }}>
          { CSS.supports(`(backdrop-filter: blur()) or (-moz-backdrop-filter: blur()) or
            (-o-backdrop-filter: blur()) or (-webkit-backdrop-filter: blur())`)
            ? null
            : <div id='backdrop'
              style={
                props.dbProjects[props.activeIndex]
                  ? {
                    backgroundImage: `url('https://res.cloudinary.com/hive-la-home/image/upload/e_contrast:30/v1/${props.dbProjects[props.activeIndex].backgroundImage}.jpg')`,
                    backgroundPosition: props.dbProjects[props.activeIndex].backgroundPosition + ' center',
                    filter: 'blur(8px) brightness(.8)',
                    transform: 'scale(1.1)'
                  }
                  : null
              }
            >
            </div>
          }
          {props.projectIndex === null && projectName === null
            ? <AddNewProject
              setProjectName={setProjectName}
              setShowUploader={props.setShowUploader}
            />
            : uploading
              ? <UploadSpinner uploading={uploading} />

              : <div id='upl-container'>
                <img
                  id='close-btn'
                  src={require('../assets/icons/x-icon_16x1-white.svg')}
                  onClick={() => cancelUpload()}
                />
                <h2>UPLOAD IMAGES</h2>
                <div id='drop-area'>
                  <p>DROP FILES HERE</p>
                </div>
                <figure>
                  <p onClick={() => tester()}>OR</p>
                </figure>
                <div id='btn-cont'>
                  <input id='file' type='file' name='name-of-input-key' multiple onChange={onChangeHandler}></input>
                  <label htmlFor='file'>CHOOSE FILES...</label>
                  <button
                    onClick={props.projectIndex ? () => uploadAdd() : () => uploadNew()}
                    className={uploadFiles ? 'active' : null}>upload</button>
                </div>
              </div>
          }
        </section>
      )}
    </Transition>
  )
}

Uploader.propTypes = {
  dbProjects: PropTypes.array,
  projectIndex: PropTypes.number,
  activeIndex: PropTypes.number,
  galleryIndex: PropTypes.string,
  setShowUploader: PropTypes.any,
  setExpandedBtn: PropTypes.any,
  setGalleryIndex: PropTypes.any,
  inProp: PropTypes.bool
}

export default Uploader
