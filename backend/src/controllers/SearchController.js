const Dev = require('../models/dev');
const ParseStringAsArray = require('../utils/ParseStringAsArray');

// Métodos de controller: index, show, store, update e destroy
module.exports = {
    async index(req, res) {
        const { techs, latitude, longitude } = req.query;
        const techsArray = ParseStringAsArray(techs);
        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000,
                },
            },
        });
        return res.json({ devs });
    },
}