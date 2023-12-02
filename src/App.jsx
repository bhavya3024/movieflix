import React from 'react';
import './App.css';
import Header from './Components/Main-Page/Header';
import MovieList from './Components/Main-Page/Movie-List';


export default () => <div className="main">
  <Header />
  <MovieList />
</div>;