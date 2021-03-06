//default Employee class to be expanded on by more specific subclasses

class Employee{
    constructor(name, id, email ){
        this.name = name;
        this.id = id;
        this.email = email;
        this.role = 'Employee';
    }

    // getters/setters
    getName(){return this.name;}
    getId(){return this.id;}
    getEmail(){return this.email;}
    getRole(){return this.role;}
}

module.exports = Employee;