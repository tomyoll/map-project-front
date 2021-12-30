import React, { useRef } from 'react';
import { Button } from '@mui/material';

export default function FileUploader({ setImages, multiple = true }) {
  const inputRef = useRef(null);

  const handleFileChosen = async (file) => new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = reject;
    fileReader.readAsDataURL(file);
  });

  // eslint-disable-next-line max-len
  const readAllFiles = async (AllFiles) => Promise.all(AllFiles.map(async (file) => handleFileChosen(file)));

  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = Array.from(e.dataTransfer.files);
    } else if (e.target) {
      files = Array.from(e.target.files);
    }
    if (files.length > 10) {
      files.length = 10;
    }
    Promise.resolve(readAllFiles(files))
      .then((res) => setImages((image) => [...image, ...res]));
  };

  return (
    <>
      <input style={{ display: 'none' }} ref={inputRef} accept=".png,.jpg,.jpeg" multiple={multiple} type="file" onChange={onChange} />
      <Button fullWidth variant="contained" component="span" onClick={() => inputRef.current.click()}>
        Загрузить фотографии
      </Button>
    </>
  );
}
