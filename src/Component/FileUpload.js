
import React, { useState } from 'react';
import { parseLAS } from '../utils/lasParser'; 
import Viewer from './Viewer'; 

function FileUpload() {
  const [lasData, setLasData] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = e.target.result;
          const parsedData = parseLAS(data);
          setLasData(parsedData);
        } catch (error) {
          console.error('Error parsing LAS file:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <input type="file" accept=".las" onChange={handleFileChange} />
      {lasData && <Viewer lasData={lasData} />}
    </div>
  );
}

export default FileUpload;
