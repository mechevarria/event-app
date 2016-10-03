module.exports = function(sequelize, DataTypes) {
  var Event = sequelize.define('Event', {
  
    title: {
      type: DataTypes.STRING,
      validate: {
        notNull: false,
        
        
        
      },
      
    },
  
    description: {
      type: DataTypes.STRING,
      validate: {
        notNull: false,
        
        
        
      },
      
    },
  
  })

  return Event
}
