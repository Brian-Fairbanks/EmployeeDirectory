//This class should inherit from Employee.
const Employee = require("./Employee.js");

// Manager Data Class
class Manager extends Employee{
    constructor(name, id, email, office){
        super(name, id, email);
        this.role = "Manager";
        this.officeNumber = office;
    }

    //Getters/Setters
    getOfficeNumber(){return this.officeNumber}
}

//export so this class can be inclulded in other files
module.exports = Manager;