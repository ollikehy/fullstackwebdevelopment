import React from 'react';

const Osa = ({osa}) => {
    return (
        <div>
            <li>{osa.nimi} {osa.tehtavia}</li>
        </div>
    )
}

export default Osa