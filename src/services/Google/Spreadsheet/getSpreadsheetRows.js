const {GoogleSpreadsheet} = require('google-spreadsheet')
const credentials = {
    client_email: 'teste-spreadsheet@driven-crane-366622.iam.gserviceaccount.com',
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCy+teVvp9Ga6N9\nfcD74X0kMmAcdf6YxBcgZmdvhDSVliZMVvCHnXjeetxuzzGwIRR0m/7oCfK23Wt5\nL3Ew48KCdaUjFR0smZpus8zmWR3lzAfJH3X8wVCkxJZpXTYOkanQkFVJrv/nNDvt\nkMSqBymMCbGtFnqDVK68hhLzx54dgZtkww7Tkf7433SIL17xGEaONFJ7clW9kNF+\n0YrkIZuZyxSQUhOIdFjF5nFo6checSueybGOLzcPT/tH6LPr8g11t/d6uqKouD3R\nHxMBeK8o1fg+sVeknSEvl36k556mSyC+wwY2CdHFT0u6uDMX598j9CzKT5nhxv8+\nFxxICxoHAgMBAAECggEAD03ryV43eGoT3NM4AVHSxZmZJlXgo2eBIsAe8CY56OCh\n/b0hbDdG8p9G4iLNeOYbPa1pKqZPHtvoKMCpyShwpX8x08ImcH3h+r1dNAVCzTeZ\nItWR3T8aijxVMEVMLgq+npr48AgK0dZhmXrblj5uiw75JnfZmglPt8cvL7FOD++0\nmgCXsIZeJndaiHA4GvcY/NQZH1QkPT98LAglT/WEBvxLr2lHTzWjUqrsXZwvnE5i\n0yzLY2J3QaUbjAddL6YKeaRhFHc4NIiHeaLyjO+nAz9WgGjy3ZfyLI2xkvVgAlI3\nnE/3fyoWPgR+Bzq+TGeYeY8D2qyMc+99nZmqoAt5YQKBgQDfU/QENLF/dpjeKRbk\n6fqRUiA1HvOWEIbx4SRGUIFlieXALEYqOV54qEXNhj/ZtZTFpQQONnr5192ZPyZx\nfdD2g5w+Ih89KXqfSfpN1yw+31ROV6PAcQZHiGxCU9Ld7p7mDO1arjJULyXqqRJG\nWcggYQZuMMCfKOzUxteAH394zQKBgQDNKfhxcdUL/NEMbCBPH9IPsA91GKVS496A\nnsI4VEXx4dV+P6PQzR+gg025+JDXy9ptlDGDLK25GaVPKVV7TaOkY//TQTRO2agm\nAxq2L9zLhJpAexY2PYLCyhNiS0glaemJhFri772pb6oEQauE/iyttxMjkgxepsPN\naHr8YIvuIwKBgF5SF8o68whRb4jMs9WkmGYN2Hp3AwvLGSNJIkfsMmpPDlDWoh+t\nMSAmeayu2YK6dQXwhsD184RXzkit6i+eosWqmi+Hu8faH+bsmKGNkitPqUyZKRja\n43sMvCRbQMDoygWBSjG1Rp5Vd18fXw+FVcePEucxAfl2kGfhPxzmsLC1AoGAQV47\nA2JCgDRIIw4caTl5Q3hUJHn6yuNBlHeA6FOpiXzr+fKq7i89AXZ0gGl7NNaFvN43\nvFSy8UQDkKpZyxScrBcUfqnK0ci1s47PpvavAcU5JIxTMmr8y7V44Zuc3BbXyvH5\nx06dfmvOntaRoKkfcSXgmjfBazL1NfAxJ1JXo0MCgYB0+lJhc2uZNXKwCrF0plmC\nvzD5JkUx8/CHML4eu24bAVYD+lYDPupTIpagxnx8ghgOEA3UOeajk0W9JpMUStpt\nXqSN9zWgaecLlq/dRnLzKshdjbmhmEgMIBj3Wwf6kwvqwmeZQQqqMQMMzKahAW04\natUS/QjciaA/TCnm81q01w==\n-----END PRIVATE KEY-----\n"
}

module.exports = async function (sheetId) {
    return new Promise(async function (resolve, reject) {
        try {
            const doc = new GoogleSpreadsheet(sheetId)
            doc.useServiceAccountAuth(credentials)
                .then(async () => {
                    doc.loadInfo()
                        .then(async () => {
                            const sheet = doc.sheetsByIndex[0]
                            await sheet.getRows()
                                .then(async rows => {
                                    const formatedRows = rows.map(r => {
                                        return {
                                            nomeEmpresa: r.NomeEmpresa,
                                            nomeCompleto: r.NomeCompleto,
                                            email: r.Email,
                                            telefone: r.Telefone,
                                            website: r.Website
                                        }
                                    })

                                    resolve(formatedRows)
                                })
                                .catch(err => reject(err))
                        })
                        .catch(err => reject(err))
                })
                .catch(err => reject(err))
        } catch (err) {
            reject(err)
        }
    })
}