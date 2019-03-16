import React from 'react'

import Editor from '../Editor/Editor'

import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

const Landing = () => (
    <DragDropContextProvider backend={HTML5Backend}>
        <Editor /> 
    </DragDropContextProvider>
)

export default Landing;