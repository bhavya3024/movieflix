import { useState, useEffect } from "react";
import {
    makeStyles,
} from "@fluentui/react-components";
import { API_KEY, API_URL } from '../../constants';
import MovieCard from "./Movie-Card";
import axios from "axios";
import FluentSpinner from "../Spinner";
import { useSelector } from "react-redux";


const useStyle = makeStyles({
    movieList: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        flexWrap: 'wrap',
        marginLeft: '80px',
        marginRight: '80px',
        marginTop: '10px',
        '@media screen and (max-width: 600px)': {
            gridTemplateColumns: 'repeat(1, 1fr)',
        },
        '@media screen and (max-width: 1500px) and (min-width: 600px)': {
            gridTemplateColumns: 'repeat(2, 1fr)',
        },
    },
});

export default function MovieList() {
    const style = useStyle();
    const [selectedYear, setSelectedYear] = useState(2012);
    const [minYear, setMinYear] = useState(selectedYear);
    const [maxYear, setMaxYear] = useState(selectedYear);
    const [loading, setLoading] = useState(false);
    const [movieList, setMovieList] = useState([]);
    const [topScroll, setTopScroll] = useState(false);
    const [firstTimeLoading, setFirstTimeLoading] = useState(false);
    const genres = useSelector((state) => state.headerReducer.genres);
    const [prevGenre, setPrevGenre] = useState(genres);

    const fetchMovies = async () => {
        if (loading) {
            return;
        }
        setLoading(() => true);
        const encodedArray = genres.join('%7C')
        const { data } = await axios.get(`${API_URL}?with_genres=${encodedArray}`, {
            params: {
                api_key: API_KEY,
                page: 1,
                primary_release_year: selectedYear,
                sort_by: 'popularity.desc',
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
        setPrevGenre(() => [...genres]);
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
            if (selectedYear + 1 > maxYear && selectedYear + 1 <= new Date().getFullYear()) {
                setMaxYear(selectedYear + 1);
                setSelectedYear(selectedYear + 1);
            } else {
                setSelectedYear(maxYear + 1);
            }
            window.scrollTo({
                top: firstTimeLoading ? 0 : documentHeight - 500, // Adjust the value as needed
            });
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
        if (JSON.stringify(prevGenre) !== JSON.stringify(genres)) {
            setFirstTimeLoading(true);
        }
        fetchMovies();
    }, [selectedYear, genres]);

    return (<>
        {loading ? <FluentSpinner label={'LOADING...'} /> : ''}
        <div className={style.movieList}>
            {movieList?.map((movie, index) => <MovieCard key={Math.random() + index} 
            {...movie}
            // title={result.original_title} 
            // posterPath={result.poster_path} 
            // backdropPath={result.backdrop_path}
            />)}
        </div>
        {/* //   {error ? error.message : ''} */}
    </>
    );
}