import { useState, useEffect } from 'react'
import axios from 'axios'
import Modal from 'react-modal'
import YouTube from 'react-youtube'
import './App.css'

// tell react-modal which element is the app root 
Modal.setAppElement('#root');

function App() {
  const [movies, setMovies] = useState([]);
  const API_KEY = import.meta.env.VITE_API_KEY;


  useEffect(() => {
  axios
    .get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&append_to_response=videos`)
    .then(response => {
      setMovies(response.data.results)
    })
  }, []);


  function MovieList({movies}) {
    if (movies.length === 0) {
      return(
        <div style={{flex: 1, padding: 20}}>
          <p>Loading, please wait...</p>
        </div>
      )
    } else {
      return(
        <div className="movies">
          {
            movies.map((movie,index) =>
              <MovieItem key={index} movie={movie}/>
            )
          }
        </div>
      )
    }
  }


  function MovieItem({movie}) {
    const [movieDetails, setMovieDetails] = useState({});
    const [isOpen, setIsOpen] = useState(false);

    function openModal()  { setIsOpen(true); }
    function closeModal() { setIsOpen(false); }


    useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}&append_to_response=videos`)
      .then(response => {
        setMovieDetails(response.data);
      })
    }, []);


    let IMAGEPATH = 'http://image.tmdb.org/t/p/w500'
    let imageurl = IMAGEPATH + movie.poster_path;
    const genres = movieDetails.genres?.map(genre => genre.name).join(', ');
    // get first youtube video
    const videoKey = movieDetails.videos?.results?.[0]?.key;


    <YouTube 
      videoId={videoKey} 
      opts={{
        width: '100%',
        height: '480',
        playerVars: { autoplay: 1 }   // (1) auto play when opened
      }}
    />


    return (
      <>
        <article className="card">
          <div className="poster">
            <img src={imageurl} alt={movie.original_title} loading="lazy" />
          </div>
          <div className="meta">
            <h2 className="title">{movie.original_title}</h2>
            <p className="genres">{genres}</p>
            <p className="overview">{movie.overview}</p>
          </div>
          <button className="btn" onClick={openModal}>Watch trailer</button>
        </article>

        <Modal
          isOpen={isOpen}
          onRequestClose={closeModal}     // enables ESC + overlay click to close
          className="modalContent"
          overlayClassName="modalOverlay"
          contentLabel="Movie trailer"    // accessible label
          closeTimeoutMS={150}
        >
          {/* modal content goes here */}
          <div className="videoWrap">
            <YouTube videoId={videoKey} />
          </div>
          <button className="btn ghost" onClick={closeModal}>Close</button>
        </Modal>
      </>
    )
  }


  return (
    <div className="app theme-dark"> {/* try theme-dark or theme-olive*/}
      <MovieList movies={movies}/>
    </div>
  )
}

export default App