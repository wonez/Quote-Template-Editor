import React from 'react';

const GetChildren = ({children}) => {
    console.log(children);
    return Object.keys(children).map(child => (
        <div key={child} style={{ position: 'absolute', left: children[child].x, top: children[child]. y}}>
            Ladjenje jaji
        </div>
    ))
}

export default GetChildren;