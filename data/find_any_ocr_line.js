const fs = require('fs');

const logPath = 'C:\\Users\\ABHISHEK SAHOO\\.gemini\\antigravity-ide\\brain\\11bb7368-1748-4098-b394-5254fc596ad4\\.system_generated\\logs\\transcript_full.jsonl';

const lines = fs.readFileSync(logPath, 'utf8').split('\n');

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;
  if (line.includes('Start of PDF')) {
    console.log(`LINE ${i} contains 'Start of PDF'`);
    try {
      const obj = JSON.parse(line);
      console.log('Keys:', Object.keys(obj));
      console.log('Type:', obj.type);
      console.log('Source:', obj.source);
      // Let's dump the entire text to ocr_data.txt
      // Find where 'Start of PDF' is in the properties
      for (const [k, v] of Object.entries(obj)) {
        if (typeof v === 'string' && v.includes('Start of PDF')) {
          console.log(`Found in key '${k}' (length: ${v.length})`);
          fs.writeFileSync('C:\\Users\\ABHISHEK SAHOO\\Desktop\\Rajtilak Analytics\\Rajtilak-client-view\\data\\ocr_data.txt', v, 'utf8');
          console.log('Saved to data/ocr_data.txt successfully!');
          break;
        }
      }
    } catch (e) {
      console.log('Could not parse as JSON. Line start:', line.slice(0, 500));
    }
  }
}
