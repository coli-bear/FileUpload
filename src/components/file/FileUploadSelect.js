import React from 'react';

const FileUploadSelect = (
  {selectedFiles, handleSelectFiles, handleUploadFiles}
) => {
  return (
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
  
  )
}

export default FileUploadSelect;