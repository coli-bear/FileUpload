import React, {useState, useEffect, useCallback, useRef} from "react";
import UploadService from "services/file/FileUploadService";
import FileUploadList from "./FileUploadList";
import FileUploadSelect from "./FileUploadSelect";
import FileUploadProgress from "./FileUploadProgress";
import FileUploadMessage from "./FileUploadMessage";


const UploadFiles = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [progressInfos, setProgressInfos] = useState({val: []});
  const [message, setMessage] = useState([]);
  const [fileInfos, setFileInfos] = useState([]);
  
  const [nextId, setNextId] = useState(0);
  
  const progressInfosRef = useRef();
  
  const handleSelectFiles = useCallback(e => {
      let selectFiles = e.target.files;
      let nextFileInfos = [];
      let nextSelectedFiles = [];
      let id = nextId;
      for (const [_, value] of Object.entries(selectFiles)) {
        const fileName = value.name;
        if (fileInfos.indexOf(fileName) === -1) {
          nextSelectedFiles = nextSelectedFiles.concat(value);
          nextFileInfos = nextFileInfos.concat(fileName);
        }
      }
      setSelectedFiles(selectedFiles.concat(nextSelectedFiles));
      setFileInfos(fileInfos.concat(nextFileInfos));
      setProgressInfos({val: []});
    }
    , [fileInfos, selectedFiles, nextId]
  )
  
  const handleUploadFiles = useCallback(() => {
    const files = Array.from(selectedFiles);
    
    let _progressInfos = files.map(file => ({
        percentage: 0,
        fileName  : file.name
      })
    );
    
    progressInfosRef.current = {
      val: _progressInfos
    };
    
    const uploadPromises = files.map((files, index) => handleUpload(index, files));
    
    Promise.all(uploadPromises)
      .then(() => UploadService.getFiles())
      .then(files => {
        console.log(files)
        setFileInfos(files.data);
      });
    
    setMessage([]);
    
  }, [selectedFiles]);
  
  const handleUpload = useCallback((idx, file) => {
    let _progressInfos = [...progressInfosRef.current.val];
    return UploadService.upload(file, e => {
      _progressInfos[idx].percentage = Math.round(
        (100 * e.loaded) / e.total
      );
      setProgressInfos({val: _progressInfos});
    })
      .then(() => {
        setMessage(prevMessage => ([
          ...prevMessage,
          "Uploaded the file successfully: " + file.name,
        ]));
      })
      .catch(() => {
        _progressInfos[idx].percentage = 0;
        setProgressInfos({val: _progressInfos});
        
        setMessage(prevMessage => ([
          ...prevMessage,
          "Could not upload the file: " + file.name
        ]));
      })
  }, [])
  
  // useEffect(() => {
  //   UploadService.getFiles().then(res => {
  //     setFileInfos(res.data);
  //   });
  // }, []);
  
  return (
    <div>
      {progressInfos && progressInfos.val.length > 0 &&
      progressInfos.val.map((progressInfo, idx) => (
        <FileUploadProgress idx={idx} progressInfo={progressInfo}/>
      ))}
      <FileUploadSelect
        selectedFiles={selectedFiles}
        handleSelectFiles={handleSelectFiles}
        handleUploadFiles={handleUploadFiles}
      />
      {message.length > 0 && (
        <FileUploadMessage message={message}/>
      )}
      <FileUploadList fileInfos={fileInfos}/>
    </div>
  );
};

export default UploadFiles;