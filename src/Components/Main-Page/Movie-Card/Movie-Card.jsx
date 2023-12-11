import * as React from 'react';
import { useState } from "react";
import { IMAGE_W_500_URL } from "../../../constants";
import './Movie-Card.css';


const resolveAsset = (asset) => `${IMAGE_W_500_URL}/${asset}`;

export default function MovieCard(movie) {
  const [loading, setLoading] = useState(true);
  const handleImageLoading = () => setLoading(false);
  return (
    <div className="custom-card">
      <img src={resolveAsset(movie.poster_path)} alt="Card" className="card-image" onLoad={() => handleImageLoading()}>
        </img>
      {loading ? <div style={{
        textAlign: 'center'
      }}>LOADING......</div> :
        <div className="card-description">
          <h1>{movie.title}</h1>
          <h4>Release year: {new Date(movie.release_date).getFullYear()}</h4>
          <p>
            {movie.genre_ids.map(genreId => localStorage.getItem(`genre_${genreId}`)).join(',')}
          </p>
          <p>{movie.overview}</p>
        </div>}
    </div>
  );
}
