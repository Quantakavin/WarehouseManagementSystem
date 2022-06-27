import React, { useState } from "react";
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

const RichTextEditor: React.FC = () => {
    const [value, setValue] = useState('');
    return(
        <ReactQuill theme="snow" style={{width: "100%"}} value={value} onChange={setValue}/>
    )
}

export default RichTextEditor;