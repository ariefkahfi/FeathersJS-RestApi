const Sequelize = require('sequelize')
const sequelize = new Sequelize('feathers_db1','arief','arief',{
    dialect:'mysql',
    operatorsAliases: false
})


class PersonModel { 
    constructor(){
        this.defineModel()
        this.syncAll()
    }
    syncAll(){
        return sequelize.sync()
    }
    defineModel(){
        this.Person = sequelize.define('person',{
            person_id:{
                type:Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            person_name:{
                type:Sequelize.STRING,
                allowNull: false
            }
        },{
            tableName:'person',
            timestamps: false
        })
    }
}

module.exports = PersonModel