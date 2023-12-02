import * as React from "react";
import {
    makeStyles,
} from "@fluentui/react-components";
import { createAlova, useRequest } from 'alova';
import GlobalFetch from 'alova/GlobalFetch';
import ReactHook from 'alova/react';
import { API_KEY, API_URL } from '../../constants';
import { useState } from "react";
import MovieCard from "./Movie-Card";

const alovaInstance = createAlova({
    statesHook: ReactHook,
    requestAdapter: GlobalFetch(),
    responded: response => response.json()
});

const useStyle = makeStyles({
    movieList: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
    }
});

export default function MovieList() {
    const style = useStyle();
    const [page, setPage] = useState(1);
    const [releaseDate, setReleaseDate] = useState(2012);

    const { loading, data, error } = useRequest(
        alovaInstance.Get(`${API_URL}`, {
            params: {
                api_key: API_KEY,
                page: 1,
                primary_release_year: releaseDate,
            }
        })
    );

    return (<>
        {loading ? <>Loading...</> : ''}
        <div className={style.movieList}>
            {data ? data?.results.map((result, index) => <MovieCard title={result.original_title} posterPath={result.poster_path} backdropPath={result.backdrop_path} />) : ''}
        </div>
        {error ? error.message : ''}
    </>
    );
}