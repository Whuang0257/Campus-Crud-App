var express = require("express");
var router = express.Router();
const { Student } = require("../database/models/student");

/* GET all campuses. */
// /api/campuses
router.get("/", async (req, res, next) => {
    // try to get campuses object from database
    try {
        // campuses will be the result of the Campus.findAll promise
        const students = await Student.findAll();
        // if campuses is valid, it will be sent as a json response
        res.status(200).json(students);
    } catch (err) {
        // if there is an error, it'll passed via the next parameter to the error handler middleware
        next(err);
    }
});

// Route to serve single campus based on its id
// /api/campuses/:id
// /api/campuses/456 would respond with a campus with id 456
router.get("/:id", async (req, res, next) => {
    // take the id from params
    const { id } = req.params;
    // query the database for a campus with matching id
    try {
        // if successful:
        const student = await Student.findByPk(id);
        // send back the campus as a response
        res.status(200).json(student);
    } catch (err) {
        // if error:
        // handle error
        next(err);
    }
});

// Route to handle adding a campus
// /api/campuses/
router.post("/", async (req, res, next) => {
    // Take the form data from the request body
    const { fName, lName, email, imageUrl, gpa } = req.body;
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
});

// Route to handle editing a campus
// /api/campuses/:id
// /api/campuses/456 would modify a campus with id 456
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
        // if successfull:
        // Find a campus with a matching id from the database
        const student = await Student.findByPk(id);
        // database would return a valid campus object or an error
        console.log(updatedObj);
        // modify the campus object with new form data
        await student.set(updatedObj);
        // save the new campus object to the data
        // database would return a new campus object
        const updatedStudent = await student.save();
        console.log(updatedStudent);
        // send the newCampus as a response from the API
        res.status(201).send(updatedStudent);
    } catch (err) {
        // if error:
        // handle the error
        next(err);
    }
});

// Route to handle removing a campus
router.delete("/:id", async (req, res, next) => {
    const { id } = req.params;
    // get an id for a campus to delete
    try {
        // pass the id to the database to find campus to be deleted
        // database would either respond succcess or fail
        const student = await Student.findByPk(id);
        // invoke the .destroy() method on the returned campus
        await student.destroy();
        // send a success message to the client
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
});

module.exports = router;