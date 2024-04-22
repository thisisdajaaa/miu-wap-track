const Student = require("../model/student");

const sortArray = (array, sortQuery) => {
  const sortFields = sortQuery.split(",").map((field) => {
    let [key, order] = field.split(":");
    return { key, order: order === "desc" ? -1 : 1 };
  });

  return array.sort((a, b) => {
    for (let i = 0; i < sortFields.length; i++) {
      let { key, order } = sortFields[i];
      if (a[key] < b[key]) return -1 * order;
      if (a[key] > b[key]) return 1 * order;
    }
    return 0;
  });
};

let studentController = {
  getStudentByID: (req, res) => {
    let id = req.params.id;
    if (id) {
      let student = Student.getStudentById(id);
      if (student) {
        res.json(200, student);
      } else {
        res.json(404, { message: "Not found" });
      }
    } else {
      res.json({ message: "Provide ID" });
    }
  },
  getAllStudents: (req, res) => {
    const students = Student.getAllStudents();
    let result = [...students];

    if (req.query.select) {
      const selectedFields = req.query.select.split(",");
      result = result.map((student) => {
        return selectedFields.reduce((obj, field) => {
          if (student.hasOwnProperty(field)) {
            obj[field] = student[field];
          }
          return obj;
        }, {});
      });
    }

    console.log("result: ", result);

    if (req.query.filter) {
      const filterFields = req.query.filter.split(",");
      result = result
        .map((student) => {
          let obj = {};

          filterFields.forEach((item) => {
            const [key, value] = item.split(":");

            if (student[key].toString().includes(value.toString()))
              obj = student;
          });

          return obj;
        })
        .filter((item) => !!Object.keys(item).length);
    }

    if (req.query.sort) {
      result = sortArray(result, req.query.sort);
    }

    res.status(200).json(result);
  },
  deleteStudentById: (req, res) => {
    let id = req.params.id;
    if (id) {
      let student = Student.deleteById(id);
      if (student) {
        res.json(200, { message: "deleted a student with id" + student.id });
      } else {
        res.json(404, { message: "not found student" });
      }
    } else {
      res.json({ message: "Provide ID" });
    }
  },
  createStudent: (req, res) => {
    console.log(req.body);
    let { id, name, program } = req.body;
    if (id && name && program) {
      let student = new Student(id, name, program);
      let stu = student.create();
      if (stu) {
        res.json({ message: "student is already registered" });
      } else {
        res.json(200, { message: "student is just registered" });
      }
    } else {
      res.json({ message: "Pleaase provide all information" });
    }
  },
  updateStudent: (req, res) => {
    const { id } = req.params;

    const updatedStudent = Student.update(id, req.body);
    console.log("updatedStudent: ", updatedStudent);

    res.status(200).json({ data: updatedStudent });
  },
};

module.exports = studentController;
