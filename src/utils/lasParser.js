// src/utils/lasParser.js
export function parseLAS(data) {
    const lines = data.split('\n');
    const points = [];
  
    let readingData = false;
    lines.forEach(line => {
      if (line.startsWith('~A')) {
        readingData = true;
        return;
      }
      if (readingData && line.trim()) {
        const [x, y, z] = line.split(/\s+/).map(Number);
        points.push({ x, y, z });
      }
    });
  
    return { points };
  }
  