import * as React from "react";
import {
    makeStyles,
    Button,
    TabList,
} from "@fluentui/react-components";

const useStyle = makeStyles({
    headerMain: {
        display: 'flex',
        marginTop: '10px',
    },
    movieLogo: {
        minHeight: '40px',
        minWidth: '100px',
    },
    tabListButtons: {
        marginLeft: '10px',
        color: 'darkgray',
        '&:hover': {
            backgroundColor: 'red',
        },
        '&:focus': {
            backgroundColor: 'red',
            color: 'white',
        }
    }
});

export default function Header() {
    const style = useStyle();
    return (
        <div className={style.headerMain}>
            <img src="src/assets/fancode-fc.png" className={style.movieLogo} />
            <TabList>
                <Button className={style.tabListButtons} >All</Button>
                <Button className={style.tabListButtons} >Action</Button>
                <Button className={style.tabListButtons} >Comedy</Button>
                <Button className={style.tabListButtons} >Horror</Button>
                <Button className={style.tabListButtons} >Drama</Button>
            </TabList>
        </div>
    );
}