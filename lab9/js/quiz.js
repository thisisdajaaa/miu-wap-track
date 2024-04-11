"use strict";

class Student {
  #studentId;
  #answers = [];

  constructor(studentId) {
    this.#studentId = studentId;
  }

  getStudentId() {
    return this.#studentId;
  }

  getAnswers() {
    return this.#answers;
  }

  addAnswer(question) {
    this.#answers.push(question);
  }
}

class Question {
  #qid;
  #answer;

  constructor(qid, answer) {
    this.#qid = qid;
    this.#answer = answer;
  }

  getQID() {
    return this.#qid;
  }

  getAnswer() {
    return this.#answer;
  }

  checkAnswer(answer) {
    return this.#answer === answer;
  }
}

class Quiz {
  #questions = new Map();
  #students = [];

  constructor(questions, students) {
    this.#students = students;
    this.#transformQuestionsToMap(questions);
  }

  #transformQuestionsToMap(questions) {
    questions?.forEach((item) => this.#questions.set(item.getQID(), item));
  }

  scoreStudentBySid(sid) {
    let score = 0;

    const student = this.#students?.find((item) => item.getStudentId() === sid);

    student?.getAnswers()?.forEach((item) => {
      const studentQuestionID = item?.getQID();
      const studentAnswer = item?.getAnswer();
      const foundQuestion = this.#questions?.get(studentQuestionID);
      const isCorrect = foundQuestion?.checkAnswer(studentAnswer);

      if (isCorrect) score++;
    });

    return score;
  }

  getAverageScore() {
    const studentScores = [];

    this.#students.forEach((item) => {
      const score = this.scoreStudentBySid(item.getStudentId());
      studentScores.push(score);
    });

    return (
      studentScores.reduce((acc, curr) => (acc += curr), 0) /
      studentScores.length
    );
  }
}

const student1 = new Student(10);
student1.addAnswer(new Question(1, "b"));
student1.addAnswer(new Question(2, "a"));
student1.addAnswer(new Question(3, "b"));
console.log(student1);
const student2 = new Student(11);
student2.addAnswer(new Question(1, "d"));
student2.addAnswer(new Question(2, "a"));
student2.addAnswer(new Question(3, "b"));
const students = [student1, student2];
const questions = [
  new Question(1, "b"),
  new Question(2, "a"),
  new Question(3, "b"),
];
const quiz = new Quiz(questions, students);
let scoreforStudent10 = quiz.scoreStudentBySid(10);
console.log(scoreforStudent10); //Expected Result: 3
let scoreforStudent11 = quiz.scoreStudentBySid(11);
console.log(scoreforStudent11); //Expected Result: 2
let average = quiz.getAverageScore();
console.log(average); //Expected Reuslt: 2.5
