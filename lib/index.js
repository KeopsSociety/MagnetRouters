/*!
 * magnet-routers
 * Copyright(c) 2022 Keops Society
 * MIT Licensed
 */

'use strict'

/**
 * Module dependencies.
 * @private
 */

const fs = require("fs");
const path = require("path");


/**
 * Add all routers in [routersDir] to the Express app.
 *
 * @param {Express}    [app] The express instance
 * @param {string}    [routersDir] The routers folder
 * @public
 */

const initRouters = function(app, routersDir) {
    try {
        let routersFileList = fs.readdirSync(routersDir);

        try {
            routersFileList.forEach(function (file) {
                const fileName = file.replace('.js','');
                const urlMapping = '/' + file.replace('Router.js','').toLowerCase();
                // require(path relative to this file)
                app.use(urlMapping, require(path.join(routersDir, fileName)));
                // app.use(urlMapping, require('../routers/' + fileName));
                console.log(file + ' ==> app.use("' + urlMapping + '", require("' + path.join(routersDir, fileName) + '"));');
            });
        } catch (error) {
            return console.error(error);
        }
    } catch (error) {
        return console.error('Unable to scan directory: ' + routersDir, error);
    }
};

module.exports = initRouters;

const handlers = {

    notFoundHandler: function (req, res, next) {
        const url = req.protocol + '://' + req.get('host') + req.originalUrl;
        console.log('notFoundHandler', url);

        if (res.headersSent) {
            return next();
        }

        // render the 404 page
        res.status(404);
        res.render('notFound', { url: url });
        // res.render('notFound', { url: req.originalUrl });
        // next(err);
    },

    errorHandler: function (err, req, res, next) {
        console.log('errorHandler statusCode: ' + err.statusCode);

        if (res.headersSent) {
            return next();
        }
        
        console.error(err.stack)

        let model = {};
        // set locals, only providing error in development
        if (config && config.environment === 'development') {
            model.error = err;
        }
        model.message = err.message;
        model.statusCode = err.statusCode || 500;

        // render the error page
        res.status(err.statusCode || 500);
        res.render('error', model);
    },
};

module.exports.notFoundHandler = handlers.notFoundHandler;
module.exports.errorHandler = handlers.errorHandler;