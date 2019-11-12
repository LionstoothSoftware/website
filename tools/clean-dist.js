const fs = require('fs-extra');
const path = require('path');

async function emptyDir(dir) {
    await fs.emptyDir(dir);
}

const distDir = path.join(__dirname, '../dist');

emptyDir(distDir).catch(e => console.error(e));
