const xml2js = require('xml2js');
const util = require('util');
xml2js.parseStringPromise = util.promisify(xml2js.parseString);

async function main() {
    var xml = "<root>Hello xml2js!</root>"
    const parsedXml = await xml2js.parseStringPromise(xml);
    
    console.log(parsedXml);

}

main();