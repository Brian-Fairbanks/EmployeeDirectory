// This class should inherit from Employee.
const Employee = require("./Employee.js");

// Engineer Class
class Engineer extends Employee{
    constructor(name, id, email, gitName){
        super(name, id, email);
        this.role = "Engineer";
        this.github = gitName;
    }

    //Getters/Setters
    getGithub(){return this.github;}

}

module.exports = Engineer;