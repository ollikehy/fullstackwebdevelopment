import React from 'react';
import { CoursePart } from '../types';

interface Props {
    part: CoursePart;
}

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
}

const Part = ({ part }: Props) => {
    switch (part.name) {
        case "Fundamentals":
            return (
                <div><p>{part.name}</p>
                    <p> {part.description}</p>
                </div>
            )
        case "Using props to pass data":
            return (<div><p>{part.name}</p>
                <p>Project count {part.groupProjectCount}</p></div>)
        case "Deeper type usage":
            return (<div>
                <p>{part.name}</p>
                <p>{part.description}</p>
                <p>{part.exerciseSubmissionLink}</p>
            </div>)
        case "TypeScript and the laziness of developers":
            return (
                <div>
                    <p>{part.name}</p>
                    <p>{part.description}</p>
                    <p>boolean developersLazy = {part.developersLazy ? 'true' : 'false'}</p>
                </div>
            )
        default:
            return assertNever(part);
    }
}

export default Part;