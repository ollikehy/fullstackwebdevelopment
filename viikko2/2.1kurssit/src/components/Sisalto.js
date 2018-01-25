import React from 'react';
import Osa from './Osa'

const Sisalto = ({osat}) => {
    return (
        <ul>
            {osat.map(osa=><Osa key={osa.id} osa={osa}/>)}
        </ul>
    )
}

export default Sisalto