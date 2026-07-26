const fs = require('fs');

const logPath = 'C:\\Users\\ABHISHEK SAHOO\\.gemini\\antigravity-ide\\brain\\11bb7368-1748-4098-b394-5254fc596ad4\\.system_generated\\logs\\transcript_full.jsonl';

const lines = fs.readFileSync(logPath, 'utf8').split('\n');

console.log(`Total lines: ${lines.length}`);
for (let i = lines.length - 1; i >= 0; i--) {
  const line = lines[i].trim();
  if (!line) continue;
  try {
    const obj = JSON.parse(line);
    if (obj.type === 'USER_INPUT' && (obj.content.includes('Start of PDF') || obj.content.includes('Start of OCR'))) {
      console.log(`FOUND OCR IN USER_INPUT AT LINE ${i}`);
      console.log(`Content length: ${obj.content.length}`);
      // Write content to a file so we can view it
      fs.writeFileSync('C:\\Users\\ABHISHEK SAHOO\\Desktop\\Rajtilak Analytics\\Rajtilak-client-view\\data\\ocr_data.txt', obj.content, 'utf8');
      console.log('Saved OCR data to data/ocr_data.txt');
      break;
    }
  } catch (e) {
    // ignore
  }
}
