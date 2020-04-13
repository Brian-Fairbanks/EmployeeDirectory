//This class should inherit from Employee.
const Employee = require("./Employee.js")

// Intern Class
class Intern extends Employee{
    constructor(name, id, email, school){
        super(name, id, email);
        this.role = "Intern";
        this.school = school;
    }

    //Getters/Setters
    getSchool(){return this.school;}
}

module.exports = Intern;