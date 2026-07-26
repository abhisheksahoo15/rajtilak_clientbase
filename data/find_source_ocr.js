const fs = require('fs');

const logPath = 'C:\\Users\\ABHISHEK SAHOO\\.gemini\\antigravity-ide\\brain\\11bb7368-1748-4098-b394-5254fc596ad4\\.system_generated\\logs\\transcript_full.jsonl';
const lines = fs.readFileSync(logPath, 'utf8').split('\n');

console.log('Total log lines:', lines.length);

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;
  if (line.includes('Start of PDF')) {
    try {
      const obj = JSON.parse(line);
      console.log(`Line ${i}: type = ${obj.type}, source = ${obj.source}, step_index = ${obj.step_index}, size = ${line.length}`);
    } catch (e) {
      console.log(`Line ${i} (invalid JSON): contains 'Start of PDF'`);
    }
  }
}
