require('dotenv').config()
const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('./typescript-361922-7437b2dd1edf.json');
(async () => {
    // Initialize the sheet - doc ID is the long id in the sheets URL
    const doc = new GoogleSpreadsheet('11Y0dOG8x0pnGRxnjt2xSQ_7m-QmUB9ANh0PJykN078A');

    // Initialize Auth - see https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication

    await doc.useServiceAccountAuth(creds)

    await doc.loadInfo(); // loads document properties and worksheets
    console.log(doc.title);
    await doc.updateProperties({ title: 'renamed doc' });

    const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
    console.log(sheet.title);
    console.log(sheet.rowCount);

    // adding / removing sheets
    const newSheet = await doc.addSheet({ title: 'hot new sheet!' });
    await newSheet.delete();

})()
const doc = new GoogleSpreadsheet('11Y0dOG8x0pnGRxnjt2xSQ_7m-QmUB9ANh0PJykN078A');
console.log(doc);
module.exports = doc.addSheet('asd')

