import { useState, useEffect } from "react";
import {
    makeStyles,
} from "@fluentui/react-components";
import { API_KEY, API_URL } from '../../constants';
import MovieCard from "./Movie-Card";
import axios from "axios";
import FluentSpinner from "../Spinner";
import { useSelector } from 'react-redux';

const useStyle = makeStyles({
    movieList: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        marginLeft: '80px',
        marginRight: '80px',
        marginTop: '10px',
    }
});

export default function MovieList() {
    const style = useStyle();
    const [selectedYear, setSelectedYear] = useState(2012);
    const [loading, setLoading] = useState(false);
    const [movieList, setMovieList] = useState([]);
    const [topScroll, setTopScroll] = useState(false);
    const [firstTimeLoading, setFirstTimeLoading] = useState(false);

    //  const [error, setError] = useState();

    const fetchMovies = async () => {
        if (loading) {
            return;
        }
        setLoading(() => true);
        const { data } = await axios.get(API_URL, {
            params: {
                api_key: API_KEY,
                page: 1,
                primary_release_year: selectedYear,
            }
        });
        setLoading(() => false);
        let updatedMovieList;
        if (!firstTimeLoading) {
            updatedMovieList = topScroll ? [...data.results, ...movieList] : [...movieList, ...data.results];
        } else {
            updatedMovieList = [...data.results];
        }
        setMovieList(() => updatedMovieList);
    };


    window.onscroll = () => {
        if (loading) { // if movies are loading, prevent loading more movies at a time
            return;
        }
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollPosition = window.scrollY;
        const isBottom = windowHeight + scrollPosition >= documentHeight;
        const isUp = window.scrollY === 0;
        if (isBottom) {
            setTopScroll(false);
            setSelectedYear(selectedYear + 1);
        } else if (isUp) {
            setTopScroll(true);
            setSelectedYear(selectedYear - 1);
            window.scrollTo({
                top: firstTimeLoading ? 0 : 500, // Adjust the value as needed
            });
            setFirstTimeLoading(false);
        }
    };
    // if (selectedYear !== currentSelectedYear) {
    //     window.scroll({
    //         top: 0,
    //     });
    // }


    // useEffect(() => {
    //     if (page !== 1) {
    //         fetchMovies(true);
    //     }
    // }, [page]);
    useEffect(() => {
        fetchMovies(true);
    }, [selectedYear]);

    return (<>
        {loading ? <FluentSpinner label={'LOADING...'} /> : ''}
        <div className={style.movieList}>
            {movieList?.map((result, index) => <MovieCard key={Math.random() + index} title={result.original_title} posterPath={result.poster_path} backdropPath={result.backdrop_path} />)}
        </div>
        {/* //   {error ? error.message : ''} */}
    </>
    );
}