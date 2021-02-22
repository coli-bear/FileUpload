import React, {useState, useRef} from 'react';
import axios from "axios";

import '../Default.css'
import './Upload.css'

const FileUploader = () => {
    // 업로드 파일 목록
    const [uploadFiles, setUploadFiles] = useState({});
    const [fileList, setFileList] = useState(new Array());
    const [nextId, setNextId] = useState(fileList.length);

    const liGen = value => <li key={value.id} ><b>{value.id}</b>: {value.name}</li>

    const onClick = () => {
        const formData = new FormData();

        for(const [_, value] of Object.entries(uploadFiles)) {
            formData.append('files', value);
        }

        axios({
            method: "POST",
            url: "http://54.180.89.89:8000/upload/coli-server/testfolder",
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        setUploadFiles({});
        setFileList(new Array());
    }

    const onChange = (e) => {
        const selectFiles = e.target.files;
        let nextFileList = new Array();
        let nextSelectFiles = new Object();
        let id = nextId;

        for (const [_, value] of Object.entries(selectFiles) ) {
            nextSelectFiles = {...nextSelectFiles, [id]:value};
            nextFileList = nextFileList.concat({
                id:id++,
                name:value.name
            });
        }
        setUploadFiles({...uploadFiles,...nextSelectFiles});
        setNextId(id);
        setFileList(fileList.concat(nextFileList.map(liGen)));
    }

    const fileRef = useRef();
    return (
        <div>
            <input type='file' multiple onChange={onChange} ref={fileRef} />
            <button onClick={onClick}>Upload</button>
            <div name="fileListView">
                <ul>
                    {fileList}
                </ul>
            </div>
        </div>
    )
}

export default FileUploader;