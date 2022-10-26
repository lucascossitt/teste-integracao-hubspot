const hubspot = require('@hubspot/api-client')

module.exports = async function (contact) {
    return new Promise(async function (resolve, reject) {
        try {
            const hubspotClient = new hubspot.Client({accessToken: process.env.HUBSPOT_APPLICATION_TOKEN})
            const contactObj = {
                properties: {
                    company: contact.nomeEmpresa,
                    firstname: contact.nomeCompleto.toString().split(' ')[0],
                    lastname: contact.nomeCompleto.toString().split(' ')[1],
                    email: contact.email,
                    phone: contact.telefone,
                    website: contact.website
                }
            }

            await hubspotClient.crm.contacts.basicApi.create(contactObj)
                .then(response => resolve(response))
                .catch(err => reject(err))
        } catch (err) {
            reject(err)
        }
    })
}