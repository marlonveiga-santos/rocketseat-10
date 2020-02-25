const axios = require('axios');
const Dev = require('../models/dev');
const ParseStringAsArray = require('../utils/ParseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');

// Métodos de controller: index, show, store, update e destroy
module.exports = {
    async index(req, res) {
        const devs = await Dev.find();
        return res.json(devs);
    },


    async store(req, res) { //Async devido a requisições para sites externos
        const { github_username, techs, latitude, longitude } = req.body;
        let dev = await Dev.findOne({ github_username });
        if (!dev) {
            const response = await axios.get(`https://api.github.com/users/${github_username}`);
            const { name = login, avatar_url, bio } = response.data; // {x=y} Igual a condicional if em objetos destruturados
            const techsArray = ParseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            })

            //filtrar as conexões no raio de 10Km e ao menos uma tecnologia compativel
            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techsArray
            );
            sendMessage(sendSocketMessageTo, "new-dev", dev);
        }
        else{
            res.status(500).send({ error: 'Already used' });
        }
        return res.json(dev);
    },


    async update(req, res) {
          const {
            github_username,
            name,
            avatar_url,
            bio,
            techs,
            longitude,
            latitude
        } = req.body;

        const dev = await Dev.findOne({github_username});

        if(dev!==undefined){

            function newLocation(lat,long){
                if(lat!==undefined&&long!==undefined){
                    return {
                        type: 'Point',
                        coordinates: [long, lat]
                    }
                }
                else {
                    return {
                        type: 'Point',
                        coordinates: [dev.location.coordinates[0] , dev.location.coordinates[1]]
                    }
                }
            }

    
            function techsArray (techsUpdated){
                if(techsUpdated!==undefined){
                    return ParseStringAsArray(techsUpdated);
                }
                else {
                    return dev.techs
                }
            }
    
            await Dev.updateOne({ github_username },
                {
                    $set:{
                        name: name?name:dev.name,
                        avatar_url:avatar_url?avatar_url:dev.avatar_url,
                        bio:bio?bio:dev.bio,
                        techs: techsArray(techs),
                        location: newLocation(latitude,longitude)
                    }
                    
                    
            },
                {
                    returnNewDocument: false
                });
            return res.json(dev);
        }
        else{
            res.status(404).send({ error: 'User not found' });
        }
    },


    async destroy(req, res) {
        const { github_username } = req.query;
        const dev = await Dev.deleteOne({ github_username });
        if(!dev) {
            return res.status(404).json({ error: 'Dev not found' })
          }
        return res.json();
    }
}