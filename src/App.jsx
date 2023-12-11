import React from 'react';
import './App.css';
import Header from './Components/Main-Page/Header/Header';
import MovieList from './Components/Main-Page/Movie-List/Movie-List';


export default () => <div className="main">
  <Header />
  <MovieList/>
</div>;