var items = require('./item-routes');

module.exports = function (app) {
    app.use('/item-app/items', items);
};
