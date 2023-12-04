import {
    makeStyles,
    Button,
    TabList,
    Dropdown,
    Option,
    useId,
    Label,
} from "@fluentui/react-components";
import { useState } from 'react';
 
import { useDispatch } from 'react-redux';
import { changeYear } from './Header-Reducer';


const useStyle = makeStyles({
    headerMain: {
        display: 'flex',
        position: 'fixed',
        zIndex: 1000,
        backgroundColor: '#000000',
        width: '100%',
        paddingTop: '10px',
        top: 0,
        alignItems: 'center'
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
        height: '40px',
        marginLeft: '30px',
    },
    dropDownLabel: {
        color: '#ffffff',
    },
});

export default function Header() {
    const style = useStyle();
    const dispatch = useDispatch();
    const dropdownId = useId("dropdown");
    const [currentYear, setCurrentYear] = useState(2012);
    const yearDropDowns = [];
    let startingYear = 2012;
    // while (startingYear <= new Date().getFullYear()) {
    //     yearDropDowns.push(startingYear);
    //     startingYear++;
    // }

    const onYearChanged = (optionValue) => {
        setCurrentYear(optionValue);
        dispatch(changeYear({
            year: optionValue
        }))
    }


    return (
        <div className={style.headerMain}>
            <img src="src/assets/fancode-fc.png" className={style.movieLogo} />
            <TabList className={style.tabList}>
                <Button className={style.tabListButtons} size="large" >All</Button>
                <Button className={style.tabListButtons} size="large" >Action</Button>
                <Button className={style.tabListButtons} size="large" >Comedy</Button>
                <Button className={style.tabListButtons} size="large" >Horror</Button>
                <Button className={style.tabListButtons} size="large" >Drama</Button>
            </TabList>
            <label id={dropdownId}>Select year</label>
            {/* <Dropdown title="Select Year" className={style.dropdown} defaultValue={currentYear} id={dropdownId} onOptionSelect={(event, option) => onYearChanged(option.optionValue)} placeholder="Select Year">
                {yearDropDowns.map((year, index) => <Option key={Math.random() + index} text={year}>{year}</Option>)}
            </Dropdown> */}
            <label className={style.dropDownLabel} id={dropdownId} title="Select Year"></label>
        </div>
    );
}