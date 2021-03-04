import React, {useState, useEffect, useCallback, useRef} from "react";
import UploadService from "services/file/FileUploadService";

const UploadFiles = () => {
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [progressInfos, setProgressInfos] = useState({val: []});
  const [message, setMessage] = useState('');
  const [fileInfos, setFileInfos] = useState([]);
  
  const progressInfosRef = useRef();
  
  
  const handleSelectFiles = e => {
    setSelectedFiles(e.target.files);
    setProgressInfos({val: []});
  }
  
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
      .then(file => {
        setFileInfos(files.data);
      });
    
    setMessage([]);
    
  });
  
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
  })
  
  useEffect(() => {
    UploadService.getFiles().then(res => {
      setFileInfos(res.data);
    });
  }, []);
  
  return (
    <div>
      {progressInfos && progressInfos.val.length > 0 &&
      progressInfos.val.map((progressInfo, idx) => (
        <div className="mb-2" key={idx}>
          <span>{progressInfo.fileName}</span>
          <div className="progress">
            <div
              className="progress-bar progress-bar-info"
              role="progressbar"
              aria-valuenow={progressInfo.percentage}
              aria-valuemax="100"
              aria-valuemin="0"
              style={{width: progressInfo.percentage + "%"}}
            >
              {progressInfo.percentage} %
            </div>
          </div>
        </div>
      ))}
      
      <div className="row my-3">
        <div className="col-8">
          <label className="btn btn-default p-0">
            <input type="file" multiple onChange={handleSelectFiles}/>
          </label>
        </div>
        
        <div className="col-4">
          <button
            className="btn btn-success btn-sm"
            disabled={!selectedFiles}
            onClick={handleUploadFiles}
          >
            Upload
          </button>
        </div>
      </div>
      
      {message.length > 0 && (
        <div className="alert alert-secondary" role="alert">
          <ul>
            {message.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
      )}
      
      <div className="card">
        <div className="card-header">List of Files</div>
        <ul className="list-group list-group-flush">
          {fileInfos &&
            fileInfos.map((file, idx) => (
              <li className="list-group-item" key={idx}>
                <a href={file.url}>file.name</a>
              </li>
            ))
          }
        </ul>
      </div>
      
    </div>
  );
};

export default UploadFiles;