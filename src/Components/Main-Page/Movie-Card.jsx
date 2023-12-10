import { useState } from "react";
import { makeStyles, shorthands } from "@fluentui/react-components";
import { Card, CardPreview } from "@fluentui/react-components";
import { IMAGE_W_500_URL } from "../../constants";

const resolveAsset = (asset) => `${IMAGE_W_500_URL}/${asset}`;

const useStyles = makeStyles({
  card: {
    ...shorthands.margin("auto"),
    marginTop: '10px',
    height: 'fit-content',
    position: 'relative',
    paddingRight: '0px!important',
    '--fui-Card--size': '0px!important',
  },
  cardPreview: {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingRight: '0px!important',
  },
  posterPathImage: {
    width: '100%',
    height: '100%',
    opacity: '0.5',
    minWidth: '400px',
    minHeight: '600px',
  },
  textContainer: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    width: '70%!important',
    height: 'fit-content',
    boxSizing: 'border-box',
    color: 'white',
    textAlign: 'left',
  },
  title: {
    fontSize: '1.5rem',
    margin: 0,
    maxWidth: 'fit-content',
  },
});

export default function MovieCard(movie) {
  const styles = useStyles();
  const [loading, setLoading] = useState(true);

  const handleImageLoading = () => {
    console.log('SETTING LOADING -->>', loading);
    setLoading(false);
  };

  return (
    <Card className={styles.card} appearance="subtle">
      <CardPreview className={styles.cardPreview}>
          <img
            src={resolveAsset(movie.poster_path)}
            alt={'Loading.....'}
            className={styles.posterPathImage}
            onLoad={() => handleImageLoading()}
          />
          {loading ? <div>Loading ...</div> :
          <div className={styles.textContainer}>
            <h3 className={styles.title}>{movie.title}</h3>
            <h4>Release year: {new Date(movie.release_date).getFullYear()}</h4>
            <p>
              {movie.genre_ids.map(genreId => localStorage.getItem(`genre_${genreId}`)).join(',')}
            </p>
            <p>{movie.overview}</p>
          </div>}
      </CardPreview>
    </Card>
  );
}
