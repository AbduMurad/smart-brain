const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '0f8d707666d1468c910cdff5a6b9dc68'
   });

const handleApiCall = (req, res) => {
    app.models.predict('c0c0ac362b03416da06ab3fa36fb58e3', req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with api'))
}

const handleImage = (req, res, knex) => {
    const { id } = req.body;
    knex('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0])
    })
    .catch(err =>
        res.status(404).json('Unable to get entries')
        )
    }
    
module.exports = {
    handleImage,
    handleApiCall
}