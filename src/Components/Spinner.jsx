import * as React from "react";
import { Spinner } from "@fluentui/react-components";
import {
    makeStyles,
    tokens,
} from "@fluentui/react-components";


const useStyle = makeStyles({
    spinnerContainer: {
       display: 'flex',
       position: 'fixed',
       zIndex: 10000,
       width: '100%',
       height: '100%',
       alignItems: 'center',
       alignContent: 'center',
       verticalAlign: 'center',
    },
    invertedWrapper: {
        width: '100%',
        backgroundColor: tokens.colorPaletteRedBackground3,
    },
});

export default function FluentSpinner(props)  {
   const style = useStyle();
   return  <div className={style.spinnerContainer}> <Spinner size="huge" appearance="inverted" className={style.invertedWrapper} {...props} /></div>
}