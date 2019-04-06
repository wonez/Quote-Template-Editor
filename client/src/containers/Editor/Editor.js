import React from 'react'

import TemplateList from '../TemplateList/TemplateList'
import EditorSidebar from '../EditorSidebar/EditorSidebar'
import TemplateEditorList from '../TemplateEditorList/TemplateEditorList';
import Status from '../../components/Status/Status'
import Loading from '../../components/Loading/Loading';

import classes from './Editor.scss'

const Editor = () => (
    <div className={classes.Editor}>
        <Status />
        <TemplateList />
        <TemplateEditorList />
        <EditorSidebar />
        <Loading />
    </div>
)

export default Editor;