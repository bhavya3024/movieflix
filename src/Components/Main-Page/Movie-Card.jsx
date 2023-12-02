

import * as React from "react";
import {
    makeStyles,
    Body1,
    Caption1,
    Button,
    shorthands,
} from "@fluentui/react-components";
import { ArrowReplyRegular, ShareRegular } from "@fluentui/react-icons";
import {
    Card,
    CardFooter,
    CardHeader,
    CardPreview,
} from "@fluentui/react-components";
import { IMAGE_W_500_URL } from "../../constants";

const resolveAsset = (asset) => `${IMAGE_W_500_URL}/${asset}`;
const useStyles = makeStyles({
    card: {
        ...shorthands.margin("auto"),
        marginTop: '10px',
        minWidth: '100%',
        height: '500px',
    },
    posterPathImage: {
        maxWidth: '300px',
        maxHeight: '500px',
    }
});


export default function MovieCard({
    title,
    posterPath,
    backdropPath
}) {
    const styles=  useStyles();
    return (
        <Card className={styles.card}>
            <CardHeader
                image={
                    <img
                        src={resolveAsset(posterPath)}
                        alt={title}
                        className={styles.posterPathImage}
                    />
                }
            />
            <CardPreview>
                <b>{title}</b>
            </CardPreview>

            <CardFooter>
                {/* <Button icon={<ArrowReplyRegular fontSize={16} />}>Reply</Button>
                <Button icon={<ShareRegular fontSize={16} />}>Share</Button> */}
            </CardFooter>
        </Card>
    );
}