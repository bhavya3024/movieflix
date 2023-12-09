import * as React from "react";
import { makeStyles, shorthands } from "@fluentui/react-components";
import { Card, CardPreview } from "@fluentui/react-components";
import { IMAGE_W_500_URL } from "../../constants";

const resolveAsset = (asset) => `${IMAGE_W_500_URL}/${asset}`;

const useStyles = makeStyles({
  card: {
    ...shorthands.margin("auto"),
    marginTop: '10px',
    marginRight: '5px',
    height: 'fit-content',
    position: 'relative',
    border: 'none',
  },
  cardPreview: {
    position: 'relative',
    width: '100%',
    minHeight: '300px',
  },
  posterPathImage: {
    width: '100%',
    height: '100%',
    opacity: '0.5',
  },
  textContainer: {
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '100%',
    padding: '10px',
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

  return (
    <Card className={styles.card}>
      <CardPreview className={styles.cardPreview}>
        <img
          src={resolveAsset(movie.poster_path)}
          alt={movie.title}
          className={styles.posterPathImage}
        />
        <div className={styles.textContainer}>
          <h3 className={styles.title}>{movie.title}</h3>
          <p>
            {movie.genre_ids.map(genreId => localStorage.getItem(`genre_${genreId}`)).join(',')}
          </p>
          <p>{movie.overview}</p>
        </div>
      </CardPreview>
    </Card>
  );
}
