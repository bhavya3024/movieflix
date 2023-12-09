import {
    makeStyles,
    Dropdown,
    Option,
    useId,
} from "@fluentui/react-components";
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import axios from "axios";
import { changeGenre } from './Header-Reducer';
import { API_KEY, GENRE_URL } from "../../constants";


const useStyle = makeStyles({
    headerMain: {
        display: 'flex',
        position: 'fixed',
        zIndex: 1000,
        backgroundColor: '#000000',
        width: '100%',
        paddingTop: '10px',
        top: 0,
        alignItems: 'center',
        '@media screen and (max-width: 600px)': {
           flexDirection: 'column',
        }
    },
    movieLogo: {
        minHeight: '100px',
        minWidth: '100px',
    },
    tabList: {
        paddingTop: '10px',
        paddingBottom: '10px',
        display: 'flex',
        marginRight: '40px',
        alignItems: 'center',
    },
    tabListButtons: {
        marginLeft: '10px',
        maxHeight: '50px',
        color: 'darkgray',
        '&:hover': {
            backgroundColor: 'red',
        },
        '&:focus': {
            backgroundColor: 'red',
            color: 'white',
        }
    },
    dropdown: {
        maxHeight: '40px',
        marginLeft: '30px',
        maxWidth: '300px',
        minWidth: '300px',
        overflowX: 'hidden',
        overflowY: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        '@media screen and (max-width: 600px)': {
            flexDirection: 'column',
            marginBottom: '10px'
        },
    },
});

export default function Header() {
    const style = useStyle();
    const dispatch = useDispatch();
    const [genres, setGenres] = useState([]); 
    const dropdownId = useId('dropdown');

    const storeGenreInLocalStorage = (genres) => {
        genres.forEach(genre => {
            localStorage.setItem(`genre_${genre.id}`, genre.name);
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


    const onGenreSelected = (values) => {
        dispatch(changeGenre({
           genres: values
        }));
    };

    return (
        <div className={style.headerMain}>
            <img src="src/assets/fancode-fc.png" className={style.movieLogo} />
            <label id={dropdownId}>Select Genre</label>
            <Dropdown title="Select Year" multiselect={true}  className={style.dropdown} expandIcon={false} defaultValue={genres[0]?.id}  id={dropdownId} onOptionSelect={(event, option) => onGenreSelected(option.selectedOptions)} placeholder="Select Genre">
                {genres.map((genre, index) => <Option key={Math.random() + index}  value={genre.id} text={genre.name}>{genre.name}</Option>)}
            </Dropdown>
            <label className={style.dropDownLabel} id={dropdownId} title="Select Year"></label>
        </div>
    );
}