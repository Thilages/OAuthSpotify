import SpotifyWebApi from 'spotify-web-api-node'
import { handle_refresh } from './Home'



const GetUserLinked = async (setsonglist) => {
  const spotipyApp = new SpotifyWebApi()
  try {
    spotipyApp.setAccessToken(localStorage.getItem("access_token"))
    await spotipyApp.getMySavedTracks().then((data) => {

      setsonglist(data.body.items)


    })
  } catch (error) {
    handle_refresh()

  }

}

export { GetUserLinked }