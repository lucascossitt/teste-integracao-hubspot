const getSpreadsheetDocument = require('../src/services/Google/Spreadsheet/getSpreadsheetRows')

const sheetId = '1dhD9U2MIDUDlbbkW4yohzqhnTQb5TZC_aLTMZsMjuuE'

getSpreadsheetDocument(sheetId)
    .then(doc => console.log(doc))
    .catch(err => console.error(err))