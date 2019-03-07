import React from 'react';
import FileUpload from '../../components/FileUpload'
import { Title } from 'bloomer';

const Upload = props => {
  return (
    <>
      <Title isSize={1}>Upload</Title>
      <FileUpload userId={props.userId} />
    </>
  );
};

export default Upload;
