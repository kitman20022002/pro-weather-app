import './FileUploader.css';
import React from 'react';

const FileUploader = (props) => {
  const hiddenFileInput = React.useRef(null);

  const handleClick = (event) => {
    event.preventDefault();
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    event.preventDefault();
    props.handleFile(event);
  };

  return (
    <>
      <button type="button" onClick={handleClick}>
        Upload a file
      </button>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{ display: 'none' }}
      />
    </>
  );
};

export default FileUploader;
