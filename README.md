# Online-Examination-Portal

## Overview
Online Examination Portal is designed to provide the several routes to client application for creating an exam and their required questions, so that user can give those exams ,and get their results.

Following are the examples of various route used:

1)  Home Page Route  -{GET}
    
        <IP>:<Port>/
      
### Admin Routes
1) To get all the exams available  -{GET}

        <IP>:<Port>/exams
        
2) To create new exam   -{POST}

        <IP>:<Port>/admin/exams      
3) To update the exam  -{PATCH}

        '<IP>:<Port>/admin/exams/:exam_id     
4) To delete the exam   -{DELETE}

        <IP>:<Port>/admin/exams/:exam_id     
5) To create a question for a exam -{POST}

        <IP>:<Port>/admin/questions/:exam_id
6) To get all question for a exam -{GET}

        <IP>:<Port>/admin/questions/:exam_id
7) To create a question for a exam -{POST}

        <IP>:<Port>/admin/questions/:exam_id
8) To update a question for a exam -{PATCH}

        <IP>:<Port>/admin/questions/:exam_id/:question_id
9) To delete a question for a exam -{DELTE}

        <IP>:<Port>/admin/questions/:exam_id/:question_id
    
### User Routes
1) To get all the exams -{GET}
    
        <IP>:<Port>/exams
3) To get the question for a exam -{GET}

        <IP>:<Port>/user/exams/:exam_id/
  
3) To give the test for exam -{POST}
      
        <IP>:<Port>/user/exams/:exam_id/
 
## Set Up

1) Clone the Repository
2) Move to the directory location 
           
        Run npm install
3) Go to the browser at localhost:8000
4) For testing the routes, you can VS code editor or PostMan

## Why to use Onlin Examination Portal

The portal provides all the necessary routes required to create any exam, and takes the result. This makesit easier to integrate with Client Aplication.

## Limitations

1) No Database is used for now( File System si used to store information) , But soon Mongodb will be used
2) No Client side Example Application is provided, but soon React Js will be used
3) Missing some level of Error Handling Optimisations
4) Authentication needs to be added
5) Some more routes need to be added

## Help in accessing the Routes

Testcase file is added in the Repository, from which user can take reference. The testcases provided were used in Postman to test all vaild routes. -[ ./TestCases/TestCase ]
