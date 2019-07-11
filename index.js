const xml2js = require('xml2js');
const fs = require('fs');
const util = require('util');
xml2js.parseStringPromise = util.promisify(xml2js.parseString);

async function main() {
    let xml = fs.readFileSync('xml.xml');
    const parsedXml = await xml2js.parseStringPromise(xml);
    
    // console.log(parsedXml);
    const joinArray = parsedXml.webreports.join;
    let duplicateJoins = [];
    for (let i = 0; i < joinArray.length; i++) {
        const join = joinArray[i];
        const fromName = join.entity_from_name[0];
        const toName = join.entity_to_name[0];
        if (duplicateJoins.some((dupeJoin) => dupeJoin.fromName === fromName && dupeJoin.toName === toName))
            continue; // Already found this duplicate join

        for (let j = i + 1; j < joinArray.length; j++)
        {
            if (fromName === joinArray[j].entity_from_name[0] && toName === joinArray[j].entity_to_name[0])
            {
                duplicateJoins.push({ fromName: fromName, toName: toName });
                console.log(`Duplicate joins found with entity_from_name '${fromName}' and entity_to_name '${toName}'`);
                break;
            }
        }
    }

    console.table(duplicateJoins);
}

main();