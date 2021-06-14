import express from 'express';

import { getExamQuestions, getExams, createExam, createExamQuestion , deleteExamQuestion, updateExamQuestion, postTestResult, updateExam , deleteExam, getRoutes, getUserExamQuestions} from '../controllers/OnlineExam.js';

const router = express.Router();

/********************************************************/
//           Home Page Route
/********************************************************/

router.get('/', getRoutes);


/********************************************************/
//           Exams Route
/********************************************************/

router.get('/exams', getExams);

router.post('/admin/exams', createExam);

router.delete('/admin/exams/:exam_id', deleteExam);

router.patch('/admin/exams/:exam_id', updateExam);



/********************************************************/
//           Questions Route
/********************************************************/

router.get('/admin/questions/:exam_id/', getExamQuestions);

router.post('/admin/questions/:exam_id', createExamQuestion);

router.delete('/admin/questions/:exam_id/:question_id', deleteExamQuestion);

router.patch('/admin/questions/:exam_id/:question_id', updateExamQuestion);


/********************************************************/
//           Test Route
/********************************************************/

router.get('/user/exams/:exam_id', getUserExamQuestions);
router.post('/user/exams/:exam_id', postTestResult);


export default router;