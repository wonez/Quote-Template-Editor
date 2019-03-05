import React from 'react'

import TemplateList from '../TemplateList/TemplateList'
import EditorSidebar from '../EditorSidebar/EditorSidebar'
import TemplateEditorList from '../TemplateEditorList/TemplateEditorList';

import classes from './Editor.scss'

const Editor = () => (
    <div className={classes.Editor}>
        <TemplateList />
        <TemplateEditorList />
        <EditorSidebar />
    </div>
)

export default Editor;