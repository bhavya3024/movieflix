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
    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(2012);
    const [minYear, setMinYear] = useState(selectedYear);
    const [maxYear, setMaxYear] = useState(selectedYear);
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
            if (selectedYear + 1 > maxYear) {
                setMaxYear(selectedYear + 1);
                setSelectedYear(selectedYear + 1);
            } else {
                setSelectedYear(maxYear + 1);
            }
        } else if (isUp) {
            setTopScroll(true);
            if (selectedYear - 1 < minYear) {
                setMinYear(selectedYear - 1);
                setSelectedYear(selectedYear - 1);
            } else {
                setSelectedYear(minYear - 1);
            }
            window.scrollTo({
                top: firstTimeLoading ? 0 : 500, // Adjust the value as needed
            });
            setFirstTimeLoading(false);
        }
    };
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