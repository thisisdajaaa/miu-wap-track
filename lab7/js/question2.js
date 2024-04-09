let group = {
  title: "Our Group",
  students: ["John", "Pete", "Alice"],
  showList: function () {
    const logger = (student) => console.log(this.title + ": " + student);
    this.students.forEach(logger.bind(this));
  },
};

group.showList();
