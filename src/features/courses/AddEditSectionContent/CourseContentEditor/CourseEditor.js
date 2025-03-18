import React, {useEffect, useState} from 'react';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

const TextEditor = ({setContentStateOnParent,initContent}) => {

    const [ content, setContent ] = useState(initContent);

    const onChange = (content, delta, source, editor ) => {
        setContent(editor.getHTML());
    };

    useEffect(()=>{
        setContentStateOnParent(content);
    },[content])

    return (
        <>
          
                <ReactQuill className="shadow-sm"
                            theme="snow"
                            style={{
                                height: 350,
                                marginTop: '1rem',
                                display: 'flex',
                                flexDirection: 'column'
                            }}

                            value={content}

                            modules={{
                                toolbar: [
                                    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }], [{size: []}],
                                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                    [{'align': []}],
                                    [{ 'color': [] }, { 'background': [] }],
                                    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                                    ['link', "video","image", "code-block"],
                                    ['clean']
                                ],
                            }}
                            formats={[
                                'header', 'font', 'size',
                                'bold', 'italic', 'underline', 'strike', 'blockquote', 'color', 'background',
                                'list', 'bullet', 'indent', 'link', 'video', 'image', "code-block", "align"
                            ]}
                            onChange={onChange}
                />
            
        </>
    );
};

export default TextEditor;