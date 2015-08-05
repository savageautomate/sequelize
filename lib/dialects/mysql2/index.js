'use strict';

var _ = require('lodash')
  , Abstract = require('../abstract')
  , ConnectionManager = require('./connection-manager')
  , Query = require('./query')
  , QueryGenerator = require('./query-generator')
  , DataTypes = require('./data-types');

var Mysql2Dialect = function(sequelize) {
  this.sequelize = sequelize;
  this.connectionManager = new ConnectionManager(this, sequelize);
  this.connectionManager.initPools();
  this.QueryGenerator = _.extend({}, QueryGenerator, {
    options: sequelize.options,
    _dialect: this,
    sequelize: sequelize
  });
};

Mysql2Dialect.prototype.supports = _.merge(_.cloneDeep(Abstract.prototype.supports), {
  'VALUES ()': true,
  'LIMIT ON UPDATE': true,
  'IGNORE': ' IGNORE',
  lock: true,
  forShare: 'LOCK IN SHARE MODE',
  index: {
    collate: false,
    length: true,
    parser: true,
    type: true,
    using: 1,
  },
  indexViaAlter: true,
  NUMERIC: true,
  GEOMETRY: true
});

Mysql2Dialect.prototype.Query = Query;
Mysql2Dialect.prototype.QueryGenerator = QueryGenerator;
Mysql2Dialect.prototype.DataTypes = DataTypes;
Mysql2Dialect.prototype.name = 'mysql2';
Mysql2Dialect.prototype.TICK_CHAR = '`';
Mysql2Dialect.prototype.TICK_CHAR_LEFT = Mysql2Dialect.prototype.TICK_CHAR;
Mysql2Dialect.prototype.TICK_CHAR_RIGHT = Mysql2Dialect.prototype.TICK_CHAR;

module.exports = Mysql2Dialect;
