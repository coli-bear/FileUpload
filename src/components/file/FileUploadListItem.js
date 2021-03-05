import React from "react";

const FileUploadListItem = ({file, idx, handleRemove}) => {
  return (
      <li className="list-group-item" key={idx}>
        {file}
      </li>
  );
}

export default React.memo(FileUploadListItem);