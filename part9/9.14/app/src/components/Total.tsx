import React from 'react'

interface Props {
    total: number;
}

const Total = ({ total }: Props) => {
    return (
        <div>
            <p>Number of exercises {total}</p>
        </div>
    )
}

export default Total;