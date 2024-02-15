import React, { useEffect, useState } from 'react'
import "./Cardpost.css"
import axios from "../Components/Axios"
import { API_KEY, imageUrl } from '../Constants/Constants'
import { Button, Card } from 'react-bootstrap'
import YouTube from 'react-youtube'

function Cardposts(props) {
  const [movies, setMovies] = useState([])
  const [urlid, setUrlid] = useState("")
  const [showVideo, setShowVideo] = useState(false)

  useEffect(() => {
    axios.get(props.url).then((res) => {
      console.log(res.data);
      setMovies(res.data.results)
    })
  },[])

  const handleMovie = (id) => {
    console.log(id);
    axios
      .get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
      .then((res) => {
        if(res.data.results.length !== 0) {
          setUrlid(res.data.results[0].key)
          console.log("video Running");
          setShowVideo(true)
        } else {
          console.log("not available");
        }
      })
  }

  const handleCloseVideo = () => {
    setUrlid("")
    setShowVideo(false)
  }

  const opts = {
    height: "400",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  }

  return (
    <div 
    classname="container-fluid d-flex justify-content-left"
    style={{
      // overflowX: "scroll",
      // overflowY: "scroll",
      backgroundColor: "black"
    }}
    >
      <div className="card-wrap">
        {movies.map((res) => (
          <Card
            className='posters'
            style={{
              
              
              margin: "15px",
              backgroundColor: "black",
              color: "white"
            }}
            key={res.id}
          >
            <Card.Img 
              variant='top'
              src={`${imageUrl + res.backdrop_path}`}
            />
            <div className='card-title-wrap'>
              <div className='movie-title' title={res.title || res.name}>{res.title || res.name}</div>

              <Button
                variant='outline-light'  
                onClick={() => handleMovie(res.id)}
              >
                PLAY
              </Button>
            </div>
          </Card>
        ))}
        {showVideo && (
          <div className="abc">
            <div className="video-container">
              <YouTube opts={opts} videoId={urlid} />
              <button className='close-btn' onClick={handleCloseVideo}>
                X
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cardposts