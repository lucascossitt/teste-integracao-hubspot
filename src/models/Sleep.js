module.exports = async function (ms) {
    return new Promise(async resolve => {
        setTimeout(resolve, ms)
    })
}