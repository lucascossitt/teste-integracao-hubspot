require('dotenv').config()
const getSpreadsheetRows = require('./services/Google/Spreadsheet/getSpreadsheetRows')
const createContactHubspot = require('./services/Hubspot/createContact')
const Sleep = require('./models/Sleep')
const publicEmailDomainsList = require('./models/publicEmailDomainsList')

getSpreadsheetRows(process.env.GOOGLE_SPREADSHEET_ID).then(async rows => {

    for await (let row of rows) {
        try {
            if (publicEmailDomainsList.includes(row.email)) continue;

            await Sleep(1000)
            await createContactHubspot(row)
                .then(() => console.log(`(${rows.indexOf(row) + 1}/${rows.length}) Contato "${row.nomeCompleto}" criado com sucesso`))
                .catch(err => console.error(err.body.message))
        } catch (err) {
            console.error(err)
        }
    }

    await process.exit()

}).catch(err => console.error(err))