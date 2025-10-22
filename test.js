// Simple test to verify HTML exists
const fs = require('fs');
const assert = require('assert');

try {
    const html = fs.readFileSync('index.html', 'utf8');
    assert(html.includes('Hello from Jenkins'), 'HTML should contain greeting');
    console.log('✅ Test passed: HTML content is valid');
    process.exit(0);
} catch (error) {
    console.log('❌ Test failed:', error.message);
    process.exit(1);
}
