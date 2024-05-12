import express from 'express'
// import cros from 'cros'
import bodyParser from 'body-parser'
import cors from 'cors'
import SpotifyWebApi from 'spotify-web-api-node'

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.post("/login", (req, res) => {
  const code = req.body.code
  var credentials = {
    clientId: '979685bc93d64c61abbd5f0bfa9a9b79',
    clientSecret: process.env.SECERT_KEY,
    redirectUri: process.env.REDIRECT_URI 
  };

  var spotifyApi = new SpotifyWebApi(credentials);
  spotifyApi.authorizationCodeGrant(code).then(
    function (data) {
      res.json({
        "access_token": data.body.access_token,
        "refresh_token": data.body.refresh_token,
        "expires_in": data.body.expires_in
      })
    },
    function (err) {
      console.log('Something went wrong!', err);
    }
  );
})

app.post("/refresh", (req, res) => {
  const refresh_token = req.body.code['refresh_token']
  const access_token = req.body.code['access_token']
  var credentials = {
    clientId: '979685bc93d64c61abbd5f0bfa9a9b79',
    clientSecret: 'a4f38f3238ea40a5ba7c150b51fb2420',
    redirectUri: 'http://localhost:5173/callback'
  };

  var spotifyApi = new SpotifyWebApi(credentials);
  spotifyApi.setRefreshToken(refresh_token)
  spotifyApi.setAccessToken(access_token)
  spotifyApi.refreshAccessToken().then(
    function (data) {
      console.log('The access token has been refreshed!');

      // Save the access token so that it's used in future calls
      res.json({
        "access_token":data.body.access_token
      });
    })
})

app.listen(3000, () => {
  console.log("i am listening MF")
})