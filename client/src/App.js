import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route } from "react-router-dom";

import Movie from "./Movies/Movie";
import MovieList from "./Movies/MovieList";

import SavedList from './Movies/SavedList';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const getMovies = () => {
      axios
        .get('http://localhost:5000/api/movies')
        .then(response => {
          setMovieList(response.data);
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }
    getMovies();
  }, []);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  return (
    <div>
      <SavedList list={savedList} />
      <Route path="/">
        <MovieList movies={movieList}/>
      </Route>
      <Route path="/movies/:id" component={Movie}/>
    </div>
  );
};

export default App;
