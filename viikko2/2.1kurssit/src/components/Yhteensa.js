import React from 'react';

const Yhteensa = ({osat}) => {
    const summaaja = (lisattava, osa) => lisattava + osa.tehtavia
    return (
        <div>
            <p>yhteensä {osat.reduce(summaaja, 0)} tehtävää</p>
        </div>
    )
}

export default Yhteensa