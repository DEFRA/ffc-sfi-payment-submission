module.exports = (sequelize, DataTypes) => {
  const queue = sequelize.define('queue', {
    queueId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    paymentRequestId: DataTypes.INTEGER,
    batchId: DataTypes.INTEGER
  }, {
    freezeTableName: true,
    tableName: 'queue',
    timestamps: false
  })
  return queue
}
