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
    const currentSelectedYear = useSelector((state) => state.headerReducer.year);
    const [selectedYear, setSelectedYear] = useState();
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [movieList, setMovieList] = useState([]);

    //  const [error, setError] = useState();

    const fetchMovies = async (appendData = true) => {
        if (loading) {
            return;
        }
        setLoading(() => true);
        const { data } = await axios.get(API_URL, {
            params: {
                api_key: API_KEY,
                page: appendData ? page : 1,
                primary_release_year: currentSelectedYear,
            }
        });
        setLoading(() => false);
        setMovieList(() => appendData ? [...movieList, ...data.results] : [...data.results]);
        setSelectedYear(currentSelectedYear);

    };


    window.onscroll = () => {
        if (selectedYear !== currentSelectedYear || loading) {
            console.log('DIFFERENT YEAR!');
            return;
        }
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollPosition = window.scrollY;
        const isBottom = windowHeight + scrollPosition >= documentHeight;
        if (isBottom) {
            console.log('PAGE -->>', page);
            setPage(page + 1);
        }
    };

    if (selectedYear !== currentSelectedYear) {
        window.scroll({
            top: 0,
        });
    }


    useEffect(() => {
        if (page !== 1) {
            fetchMovies(true);
        }
    }, [page]);

    useEffect(() => {
        if (selectedYear !== currentSelectedYear) {
            fetchMovies(false);
        }
    }, [selectedYear, currentSelectedYear]);

    return (<>
        {loading ? <FluentSpinner label={'LOADING...'} /> : ''}
        <div className={style.movieList}>
            {movieList?.map((result, index) => <MovieCard key={Math.random() + index} title={result.original_title} posterPath={result.poster_path} backdropPath={result.backdrop_path} />)}
        </div>
        {/* //   {error ? error.message : ''} */}
    </>
    );
}