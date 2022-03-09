const fs = require('fs');
const path = require('path');

// write data to file for persistence
const sync = (data) => {
    console.log('syncing');
    const json = JSON.stringify(data);
    fs.writeFile(path.join(__dirname, 'temp/file.txt'), json, (err) => {
        if(err) console.log(err);
    });
}

// read written data to the file
const readFile = () => {
    try { 
        const data = fs.readFileSync(path.join(__dirname, 'temp/file.txt'), 'utf8');
        if(data) return JSON.parse(data);
        else return {}
    } catch(e) {
        return {};
    }
}

module.exports = {
    sync,
    readFile
}