module.exports = (sequelize, DataTypes) => {
  const scheme = sequelize.define('scheme', {
    schemeId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  },
  {
    tableName: 'schemes',
    freezeTableName: true,
    timestamps: false
  })
  scheme.associate = function (models) {
    scheme.hasOne(models.sequence, {
      foreignKey: 'schemeId',
      as: 'sequence'
    })
    scheme.hasOne(models.batchProperties, {
      foreignKey: 'schemeId',
      as: 'batchProperties'
    })
    scheme.hasMany(models.paymentRequest, {
      foreignKey: 'schemeId',
      as: 'paymentRequests'
    })
    scheme.hasMany(models.batch, {
      foreignKey: 'schemeId',
      as: 'batches'
    })
  }
  return scheme
}
