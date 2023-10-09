module.exports = (sequelize, DataTypes) => {
  const sequence = sequelize.define('sequence', {
    schemeId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: false },
    nextAP: DataTypes.INTEGER,
    nextAR: DataTypes.INTEGER
  },
  {
    tableName: 'sequences',
    freezeTableName: true,
    timestamps: false
  })
  return sequence
}
