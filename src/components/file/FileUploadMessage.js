import React from 'react';

const FileUploadMessage = ({message}) => {
  return (
    <div className="alert alert-secondary" role="alert">
      <ul>
        {message.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    </div>
  );
}

export default FileUploadMessage;