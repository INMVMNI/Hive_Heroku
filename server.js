const express = require('express')
const app = express()
const firebase = require('firebase')
const admin = require('firebase-admin')
const multer = require('multer')
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname)
  }
})

const cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: 'hive-la-home',
  api_key: '191961668474999',
  api_secret: 'T4EOXuaJzUhHaqRUqZVHRrMer80'
});

const serviceAccount = require('./firebase_config/firebaseAdmin.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://hive-la-home.firebaseio.com'
})

const dbProjects = admin.database().ref('projects')

const addNewToDB = (name, public_ids, wide_imgs, vert_imgs) => {
  dbProjects.once("value", function(snapshot) {
    var data = snapshot.val();   //Data is in JSON format.
    const projects = [...data]
    let project = {}
    project.name = name
    project.id = Date.now()
    project.images = public_ids
    project.wideImages = wide_imgs
    project.portrait_images = vert_imgs
    project.backgroundPosition = 'center'
    if (wide_imgs.length > 0) {
      project.backgroundImage =  wide_imgs[0]
    }
    else {
      project.backgroundImage =  public_ids[0]
    }
    projects.push(project)
    dbProjects.set(projects)
  });
}


const updateDB = (projectIndex, galleryIndex, public_ids, wide_imgs, vert_imgs) => {
  const dbProject = admin.database().ref('projects/' + projectIndex)
  dbProject.once("value", function(snapshot) {
    var project = snapshot.val();
    var prtrtExists = snapshot.child("portrait_images").exists()
    project.images.splice(galleryIndex, 0, ...public_ids)
    if (wide_imgs) {
      if (snapshot.child("wideImages").exists()) {
        project.wideImages.push(...wide_imgs)
      } else {
        project.wideImages = wide_imgs
        project.backgroundImage = wide_imgs[0]
      }
    }
    if (vert_imgs) {
      if (snapshot.child("portrait_images").exists()) {
        project.portrait_images.push(...vert_imgs)
      } else {
        project.portrait_images = vert_imgs
      }
    }
    dbProject.set(project)
  });
}

app.post('/api/upload', (req, res, next) => {
  const upload = multer({ storage }).array('name-of-input-key')
  upload(req, res, function(err) {
    if (err) {
      return res.send(err)
    }
    const cloudinary = require('cloudinary').v2
    cloudinary.config({
      cloud_name: 'hive-la-home',
      api_key: '191961668474999',
      api_secret: 'T4EOXuaJzUhHaqRUqZVHRrMer80'
    });

    const files = [...req.files]
    let public_ids = []
    let wide_imgs = []
    let vert_imgs = []

    for (let file of files) {
      const path = file.path

      cloudinary.uploader.upload(
        path,
        function(err, image) {
          if (err) return res.send(err)

          public_ids.push(image.public_id)
          if (image.width > image.height) {
            wide_imgs.push(image.public_id)
          }
          if (image.width < image.height) {
            vert_imgs.push(image.public_id)
          }
          if (public_ids.length === req.files.length) {
            addNewToDB(req.body.name, public_ids, wide_imgs, vert_imgs)
            res.send()
          }
          // remove file from server
          const fs = require('fs')
          fs.unlinkSync(path)
        }
      )
    }
  })
})

app.post('/api/update/upload', (req, res, next) => {
  const upload = multer({ storage }).array('name-of-input-key')
  upload(req, res, function(err) {
    if (err) {
      return res.send(err)
    }
    // res.json(req.file)
    const cloudinary = require('cloudinary').v2
    cloudinary.config({
      cloud_name: 'hive-la-home',
      api_key: '191961668474999',
      api_secret: 'T4EOXuaJzUhHaqRUqZVHRrMer80'
    });

    const files = [...req.files]
    let public_ids = []
    let wide_imgs = []
    let vert_imgs = []

    for (let file of files) {
      const path = file.path

      cloudinary.uploader.upload(
        path,
        function(err, image) {
          if (err) return res.send(err)

          public_ids.push(image.public_id)
          if (image.width > image.height) {
            wide_imgs.push(image.public_id)
          }
          if (image.width < image.height) {
            vert_imgs.push(image.public_id)
          }
          if (public_ids.length === req.files.length) {
            updateDB(req.body.projectIndex, req.body.galleryIndex, public_ids, wide_imgs, vert_imgs)
            res.send('juggs')
          }
          // remove file from server
          const fs = require('fs')
          fs.unlinkSync(path)
        }
      )
    }
  })
})

app.post('/api/remove-project', (req, res) => {
  const upload = multer({ storage }).array('name-of-input-key')
  upload(req, res, function(err) {
    if (err) {
      return res.send(err)
    }
    // res.send(req.body.index)
    dbProjects.once("value", function(snapshot) {
      var data = snapshot.val();
      let projects = [...data]
      const index = req.body.index
      if (data[index].images) {
        cloudinary.api.delete_resources(data[index].images, function(err, result) {
          res.send(result)
        })
      }
      projects.splice(index, 1)
      dbProjects.set(projects)
    })
  })
})

app.post('/api/update/remove', (req, res) => {
  const upload = multer({ storage }).array('name-of-input-key')
  upload(req, res, function(err) {
    if (err) {
      return res.send(err)
    }
    dbProjects.once("value", function(snapshot) {
      var projects = snapshot.val();
      const projIndex = req.body.projIndex
      const glryIndex = req.body.galleryIndex
      const img = projects[projIndex].images[glryIndex]
      const wideIndex = projects[projIndex].wideImages.findIndex(i => i === img)
      if (projects[projIndex].images) {
        cloudinary.api.delete_resources(img, function(err, result) {
          res.send(result)
        })
      }
      projects[projIndex].images.splice([glryIndex], 1)
      if (projects[projIndex].wideImages.includes(img)) {
        projects[projIndex].wideImages.splice([wideIndex], 1)
      }
      if (projects[projIndex].backgroundImage === img) {
        if (projects[projIndex].wideImages[0]) {
          projects[projIndex].backgroundImage = projects[projIndex].wideImages[0]
        }
        if (!projects[projIndex].wideImages || !projects[projIndex].wideImages.length)  {
          backupIndex = projects[projIndex].images.findIndex(i => i.hasOwnProperty('card_text') === false)
          projects[projIndex].backgroundImage = projects[projIndex].images[backupIndex]
        }
      }
      dbProjects.set(projects)

    })
  })
})

const port = 5000
app.listen(port, () => console.log(`Server started on port ${port}`))
