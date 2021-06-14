import { v4 as uuid } from 'uuid';
import fs from 'fs';

let exams = {}
let questions = {}

/********************************************************/
//       Json file acting as Exam and Question Database
/********************************************************/
fs.readFile('./db/Exams.json', (err, data) => {
    
    if (!err) {
        exams = JSON.parse(data)
    }
    else {
        console.log(err);
    }
})

fs.readFile('./db/Questions.json', (err, data) => {

    if (!err) {
        questions = JSON.parse(data)
    }
    else {
        console.log(err)
    }
})

/**************************************************************/
//    This will get the all the available routes
/**************************************************************/
export const getRoutes = (req, res) => {
    
    res.send("<h1>Welcome to Online Exam Portal</h1>");
}


/**************************************************************/
//    This will get the all the available exams(Admin + User)
/**************************************************************/
export const getExams = (req, res) => {
    
    res.send(exams);
}


/**************************************************************/
//    This will create the exam (Admin)
/**************************************************************/
export const createExam = (req, res) => {

    const exam = req.body;
    var exam_id = uuid() // random examId will be generated

    exams[exam_id] = exam

    fs.writeFile('./db/Exams.json', JSON.stringify(exams), function (err) {
        if (err) throw err;
        console.log('Saved!');
    });

    res.send("Exam Created Successfully")
}

/**************************************************************/
//    This will delete the exam (Admin)
/**************************************************************/
export const deleteExam = (req, res) => {

    var exam_id = req.params.exam_id;
    console.log(exam_id)

    delete exams[exam_id]
    console.log('Deleted!!');

    if (exam_id in questions) {
        delete questions[exam_id]
    }

    fs.writeFile('./db/Exams.json', JSON.stringify(exams), function (err) {
        if (err) throw err;
        console.log('Deleted!!');
    });
    fs.writeFile('./db/Questions.json', JSON.stringify(questions), function (err) {
        if (err) throw err;
        console.log('Deleted!!');
    });

    res.send("Exam Deleted Succesfully")
}

/**************************************************************/
//    This will update the exam (Admin)
/**************************************************************/
export const updateExam = (req, res) => {

    var exam_id = req.params.exam_id;
    
    exams[exam_id] = req.body

    fs.writeFile('./db/Exams.json', JSON.stringify(exams), function (err) {
        if (err) throw err;
        console.log('Updated!!');
    });

    res.send("Exam Updated Succesfully")
}

/**************************************************************/
//    This will get all the questions for a exam (Admin)
/**************************************************************/
export const getExamQuestions = (req, res) => {

    var exam_id = req.params.exam_id;
    res.send(questions[exam_id]);
}

/**************************************************************/
//    This will create the  question for a exam (Admin)
/**************************************************************/
export const createExamQuestion = (req, res) => {

    var exam_id = req.params.exam_id;
    var question_id = uuid()

    const question = req.body;

    if (exam_id in questions) {
        questions[exam_id][question_id] = question
    }
    else {
        questions[exam_id] = {}
        questions[exam_id][question_id] = question
    }

    fs.writeFile('./db/Questions.json', JSON.stringify(questions), function (err) {
        if (err) throw err;
        console.log('Question Saved!!!');
    });

    res.send("Question Created Successfully")
};


/**************************************************************/
//    This will delete the  question for a exam (Admin)
/**************************************************************/
export const deleteExamQuestion = (req, res) => {

    var exam_id = req.params.exam_id;
    var question_id = req.params.question_id;

    delete questions[exam_id][question_id]

    fs.writeFile('./db/Questions.json', JSON.stringify(questions), function (err) {
        if (err) throw err;
        console.log('Question Deleted!!!');
    });

    res.send("Question Deleted Successfully!!")
};


/**************************************************************/
//    This will update the  question for a exam (Admin)
/**************************************************************/
export const updateExamQuestion = (req, res) => {

    var exam_id = req.params.exam_id;
    var question_id = req.params.question_id;

    const question = req.body;

    questions[exam_id][question_id] = question

    fs.writeFile('./db/Questions.json', JSON.stringify(questions), function (err) {
        if (err) throw err;
        console.log('Saved!');
    });

    res.send("Question Updated Successfully!!")

};

/**************************************************************/
//    This will get  the  questions for a exam (User)
/**************************************************************/

export const getUserExamQuestions = (req, res) => {

    var exam_id = req.params.exam_id;
    var user_exam = {...questions[exam_id]}
    for (const exam_id in user_exam) {
        delete user_exam[exam_id]["Correct Answer"]
    }
    res.send(user_exam);

};

/**************************************************************/
//    This will post the result  for a exam (User)
/**************************************************************/

export const postTestResult = (req, res) => {

    var exam_id = req.params.exam_id;

    const answers = req.body;

    let score = 0;

    for (const answer_id in answers) {
        for (const question_id in questions[exam_id]) {
            if (answer_id === question_id) {
                if (questions[exam_id][question_id]["Correct Answer"] === answers[answer_id]["Answer"]) {
                    score = score + 4;
                }
                else {
                    score = score - 1;
                }
            }
        }
    }

    res.send({ "message": score })

};
