function employee(id, name, email, password, date, salary, position, hour) {
  this.id = id;
  this.name = name;
  this.email = email;
  this.password = password;
  this.date = date;
  this.salary = salary;
  this.position = position;
  this.hour = hour;

  this.calcSalary = function () {
    if (this.position === "Sếp") {
      return this.salary * 3;
    } else if (this.position === "Trưởng phòng") {
      return this.salary * 2;
    } else if (this.position === "Nhân viên") {
      return this.salary;
    }
  };

  this.classifyEmployee = function () {
    if (this.hour >= 192) {
      return "Nhân viên xuất sắc";
    } else if (this.hour >= 176) {
      return "Nhân viên giỏi";
    } else if (this.hour >= 160) {
      return "Nhân viên khá";
    } else {
      return "Nhân viên trung bình";
    }
  };
}
