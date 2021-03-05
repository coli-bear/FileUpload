import React from 'react';

const FileUplaodProgress = ({progressInfo, idx}) => {
  return (
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
  );
}

export default FileUplaodProgress;