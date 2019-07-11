const xml2js = require('xml2js');
const fs = require('fs');
const util = require('util');
xml2js.parseStringPromise = util.promisify(xml2js.parseString);

async function main() {
    let xml = fs.readFileSync('xml.xml');
    const parsedXml = await xml2js.parseStringPromise(xml);
    
    console.log(parsedXml);
}

main();