module.exports = options => {
    return async (req, res, next) => {
        const modelName = require('inflection').classify(req.params.resource)
        req.Model = require(`../models/${modelName}`)
        req.resource = req.params.resource
        next()
    }
}