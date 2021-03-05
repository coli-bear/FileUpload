import React from 'react';
import FileUploadListItem from "./FileUploadListItem";

const FileUploadList = ({fileInfos, handleRemove}) => {
  return (
    <div className="card">
      <div className="card-header">Selected file list</div>
      <ul className="list-group list-group-flush">
        {fileInfos &&
        fileInfos.map((file, idx) => (
          <FileUploadListItem
            file={file}
            idx={idx}
            handleRemove={handleRemove}
          />
        ))
        }
      </ul>
    </div>
  );
}

export default React.memo(FileUploadList);