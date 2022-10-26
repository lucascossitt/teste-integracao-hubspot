const createContact = require('../src/services/Hubspot/createContact')

const contact = {
    nomeEmpresa: 'Empresa Teste',
    nomeCompleto: 'Lucas Cossitt',
    email: 'lucas@cossitt.com',
    telefone: '44999999999',
    website: 'https://lucascossitt.com'
}

createContact(contact)
    .then(response => console.log(response))
    .catch(err => console.error(err))