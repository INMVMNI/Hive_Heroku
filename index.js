const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'dist')));

// app.use(express.static(__dirname));

// Put all API endpoints under '/api'
app.get('/api/words', (req, res) => {
  const words = ['fart', 'face', 'bucket', 'tree'];

  // Return them as json
  res.json(words);

  console.log(`Sent ${words} words`);
});

// if (process.env.NODE_ENV === 'production') {
// 	app.use(express.static('client/build'));
// }

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname+'/client/build/index.html'), function(err) {
//     if (err) {
//       res.status(500).send(err)
//     }
//   });
// });

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'index.html'), function(err) {
//     if (err) {
//       res.status(500).send(err)
//     }
//   });
// });

// app.use(express.static(path.join(__dirname, './client/build')))

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '/client/build/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})
// app.get('*', (request, response) => {
// 	response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
// });

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`W0rds listening on ${port}`);
