const fs = require('fs');

const logPath = 'C:\\Users\\ABHISHEK SAHOO\\.gemini\\antigravity-ide\\brain\\11bb7368-1748-4098-b394-5254fc596ad4\\.system_generated\\logs\\transcript_full.jsonl';
const lines = fs.readFileSync(logPath, 'utf8').split('\n');

console.log(`Total lines: ${lines.length}`);
for (let i = 0; i < Math.min(25, lines.length); i++) {
  const line = lines[i].trim();
  if (!line) continue;
  try {
    const obj = JSON.parse(line);
    console.log(`Line ${i}: TYPE = ${obj.type}, source = ${obj.source}, step_index = ${obj.step_index}`);
    if (obj.content) {
      console.log(`  Preview: "${obj.content.slice(0, 150).replace(/\n/g, ' ')}..."`);
    }
  } catch (e) {
    console.log(`Line ${i}: Could not parse`);
  }
}
