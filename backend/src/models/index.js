const{Sequelize,DataTypes}=require('sequelize');
const config=require('../config/database')[process.env.NODE_ENV||'development'];
if(!process.env.DATABASE_URL)throw Error('DATABASE_URL is required');
const sequelize=new Sequelize(process.env.DATABASE_URL,{dialect:'postgres',logging:false,dialectOptions:config.dialectOptions});
module.exports={sequelize,Service:require('./service')(sequelize,DataTypes),Blog:require('./blog')(sequelize,DataTypes),Admin:require('./admin')(sequelize,DataTypes)};
