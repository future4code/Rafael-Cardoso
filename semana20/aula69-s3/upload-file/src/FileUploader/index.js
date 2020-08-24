import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const FormContainer = styled.form`
  margin: 0 auto;
  min-height: 100vh;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  div {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  img {
    margin: 1rem;
  }
  p {
    margin: 1rem;
  }
`

const FileUploader = () => {

  const [link, setLink] = useState(undefined);

  const handleFile = async (event) => {
    try {
      const data = new FormData();
      data.append('file', event.target.files[0]);

      const result = await axios.put('http://localhost:3003/file/upload', data);    
      setLink(result.data.link);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <FormContainer>
      <input type='file' onChange={handleFile} />
      {link && (
        <div>
          <img src={link} alt={'Minha imagem'}/>
          <p><a href={link}>Link para o arquivo</a></p>
        </div>
      )}
    </FormContainer>
  )
}

export default FileUploader;