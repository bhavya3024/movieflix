import {
    makeStyles,
    useId,
    Checkbox,
} from "@fluentui/react-components";
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import axios from "axios";
import { changeGenre } from './Header-Reducer';
import { API_KEY, GENRE_URL } from "../../constants";
import Logo from '../../../src/assets/fancode-fc.svg';
import './Header.css';


export default function Header() {
    const dispatch = useDispatch();
    const [genres, setGenres] = useState([]);
    let [selectedGenres, setSelectedGeneres] = useState([]);

    const storeGenreInLocalStorage = (genres) => {
        genres.forEach(genre => {
            localStorage.setItem(`genre_${genre.id}`, genre.name);
            genreSelection.set(genre.id, false);
        });
    };

    const fetchQualities = async () => {
        const { data } = await axios.get(GENRE_URL, {
            params: {
                api_key: API_KEY,
            }
        });
        setGenres(() => [...data.genres]);
        storeGenreInLocalStorage(data.genres);
    }

    useEffect(() => {
        fetchQualities();
    }, []);


    const onGenreSelected = (genreId) => {
        if (!selectedGenres.includes(genreId)) {
            selectedGenres.push(genreId);
        } else {
            selectedGenres = selectedGenres.filter(id => id !== genreId);
        }
        dispatch(changeGenre({
            genres: selectedGenres
        }));
        setSelectedGeneres(() => [...selectedGenres])
    };

    const resetGenreSelection = () => {
        setSelectedGeneres(() => []);
        dispatch(changeGenre({
            genres: []
        }));
    };

    return (
        <div className="header">
            <img src={Logo} className="movie-logo" />
            <div className="genre-buttons">
            {genres.map((genre, index) =>
                <React.Fragment key={Math.random() + index}>
                    <button className={`${selectedGenres.includes(genre.id) ? 'genre-button-active' : 'genre-button'}`} onClick={() => onGenreSelected(genre.id)}>{genre.name}</button>
                </React.Fragment>)}
            </div>
            <button className="reset-button" onClick={() => resetGenreSelection()}>Reset Selection</button>
        </div>
    );
}
