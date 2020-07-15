var express = require("express");
var router = express.Router();
const { Student } = require("../database/models/student");

/* GET all students. */
router.get("/", async (req, res, next) => {
    try {
        const students = await Student.findAll();
        res.status(200).json(students);
    } catch (err) {
        next(err);
    }
});

// Route to serve single student based on its id
// /api/student/456 would respond with a student with id 456
router.get("/:id", async (req, res, next) => {
    // take the id from params
    const { id } = req.params;
    try {
        const student = await Student.findByPk(id);
        res.status(200).json(student);
    } catch (err) {
        next(err);
    }
});

// Route to handle adding a student 
router.post("/", async (req, res, next) => {
    let errors = [];
    // Take the form data from the request body
    const { fName, lName, email, imageUrl, gpa } = req.body;

    if (!(0 >= gpa <= 4.0)) {
        errors.push({ text: 'Please enter proper gpa' });
    }

        // Check for errors
    if (errors.length > 0) {
        res.render('add', {
            errors, name, imageUrl, address, description
        });
    } else {

        // Create a campus object
        const studentObj = {
            firstName: fName,
            lastName: lName,
            email: email,
            imageUrl: imageUrl,
            gpa: gpa,
        };

        try {
            // Create a new campus on the database
            const newStudent = await Student.create(studentObj);
            // The database would return a campus
            // send that campus as a json to the client
            res.status(201).send(newStudent);
        } catch (err) {
            next(err);
        }
    }
});

// Route to handle editing a student
// /api/student/456 would modify a student with id 456
router.put("/:id", async (req, res, next) => {
    // get the id from request params
    const { id } = req.params;
    // get form data from the request body
    const { fName, lName, email, imageUrl, gpa } = req.body;
    const updatedObj = {
        firstName: fName,
        lastName: lName,
        email: email,
        imageUrl: imageUrl,
        gpa: gpa,
    };
    try {
        // Find a student with a matching id from the database
        const student = await Student.findByPk(id);
        // database would return a valid student object or an error
        console.log(updatedObj);
        // modify the student object with new form data
        await student.set(updatedObj);
        // save the new student object to the data
        // database would return a new student object
        const updatedStudent = await student.save();
        console.log(updatedStudent);
        // send the newStudent as a response from the API
        res.status(201).send(updatedStudent);
    } catch (err) {
        next(err);
    }
});

// Route to handle removing a student
router.delete("/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
        // database would either respond succcess or fail
        const student = await Student.findByPk(id);
        await student.destroy();
        // send a success message to the client
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
});

module.exports = router;