import React from 'react';

import {
    Toolbar,
    BackButton
} from 'react-onsenui';


const NavBarSearchResults = ({title, back}) => (
    <Toolbar>
        <BackButton onClick={() => alert("w")}>
        </BackButton>

        <div className='center'>{title}</div>
    </Toolbar>
);

export default NavBarSearchResults;