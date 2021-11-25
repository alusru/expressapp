const getName = (request,response,next) => {
    response.status(200).send('works')
}

module.exports = {getName};
