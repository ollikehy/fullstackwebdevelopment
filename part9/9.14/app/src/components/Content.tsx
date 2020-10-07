import React from 'react';
import Part from './Part';
import { CoursePart } from '../types';

interface Props {
    parts: CoursePart[];
}

const Content = ({ parts }: Props) => {
    return (
        <div>
            {parts.map((part, index) => {
                return (
                    <div key={index} >
                        <Part part={part} />
                    </div>
                )
            })}
        </div>
    )
}

export default Content;