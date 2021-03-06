//"force starting with one manager, then come back to add as many interns and engineers as needed"

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


/* # Functions 
#################################################*/

function getEmployeeType(){
    return inquirer.prompt([
        {
            type:'list',
            message:`Enter the Employee's role : `,
            choices:['Engineer','Intern'],
            name:'role'
        }

    ]);
}

// each employee type (manager, engineer, or intern) has slightly different information
function getStandardQuestions(role){
    //standard qeustions to ask all employees
    const standardQuestions = [
        {
            type:'input',
            message:`Name of ${role}: `,
            name:'name'
        },
        {
            type:'input',
            message:`ID# of ${role}: `,
            name:'id'
        },
        {
            type:'input',
            message:`Email for ${role}: `,
            name:'email'
        },
    ];

    let questions;
    //Engineer
    if (role=="Engineer"){
        questions = [...standardQuestions,
        {
            type:'input',
            message:`GitHub for ${role}: `,
            name:'github'
        }]
    }
    //Intern
    else if (role=="Intern"){
        questions = [...standardQuestions,
        {
            type:'input',
            message:`School for ${role}: `,
            name:'school'
        }]
    }
    //Manager
    else if (role=="Manager"){
        questions = [...standardQuestions,
        {
            type:'input',
            message:`Office Number for ${role}: `,
            name:'officeNumber'
        }]
    }

    return inquirer.prompt(questions);
}

// a prompt to determine if the user wants to add more employees
function addMorePrompt(){
    return inquirer.prompt([
        {
            type:'list',
            message:`Add more users? : `,
            choices:['Yes',"No"],
            name:'confirm'
        }

    ]);
}


async function run(){
    const employees = [];
    let firstRun = true;
    // loop through the employee creation untill the user says do not add more
    do{
        // Write code to use inquirer to gather information about the development team members,
        // the first run should always be a manager
        if(!firstRun){
            type = await getEmployeeType();
        }
        else{
            firstRun = false;
            type = {role:"Manager"}
        }

        let data = await getStandardQuestions(type.role);

        // and to create objects for each team member (using the correct classes as blueprints!)
        switch(type.role){
            case 'Engineer':
                employees.push( new Engineer(data.name, data.id, data.email, data.github));
                break;
            case 'Intern':
                employees.push( new Intern(data.name, data.id, data.email, data.school));
                break;
            case 'Manager':
                employees.push( new Manager(data.name, data.id, data.email, data.officeNumber));
                break;
        }

        //ask if they want to add more users.  End loop if 'No'.
        var getMore = await addMorePrompt();
    } while (getMore.confirm!= "No");

    //console.log( employees );

    // After the user has input all employees desired, call the `render` function (required
    // above) and pass in an array containing all employee objects; the `render` function will
    // generate and return a block of HTML including templated divs for each employee!

    const html = render(employees);
    //console.log(html);

    // After you have your html, you're now ready to create an HTML file using the HTML
    // returned from the `render` function. Now write it to a file named `team.html` in the
    // `output` folder. You can use the variable `outputPath` above target this location.
    // Hint: you may need to check if the `output` folder exists and create it if it
    // does not.
    try{
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR);
        }
    }
    catch(err){
        return console.log(err);
    }
    fs.writeFile(outputPath, html, function(err){
        if (err){return console.log(err)}
        console.log("Successfully wrote team.html.");
    })

}


/* # Main 
#################################################*/
run();