let employeeList = [];
// DOM info
let DOMid = document.getElementById("tknv");
let DOMname = document.getElementById("name");
let DOMemail = document.getElementById("email");
let DOMpassword = document.getElementById("password");
let DOMdate = document.getElementById("date");
let DOMsalary = document.getElementById("luongCB");
let DOMposition = document.getElementById("chucvu");
let DOMhour = document.getElementById("gioLam");

// DOM thông báo
let DOMspanid = document.getElementById("tbTKNV");
let DOMspanname = document.getElementById("tbTen");
let DOMspanemail = document.getElementById("tbEmail");
let DOMspanpassword = document.getElementById("tbMatKhau");
let DOMspandate = document.getElementById("tbNgay");
let DOMspansalary = document.getElementById("tbLuongCB");
let DOMspanposition = document.getElementById("tbChucVu");
let DOMspanhour = document.getElementById("tbGiolam");

// Tạo Nhân viên
function createEmployee() {
  // Lấy input
  let id = DOMid.value;
  let name = DOMname.value;
  let email = DOMemail.value;
  let password = DOMpassword.value;
  let date = DOMdate.value;
  let salary = +DOMsalary.value;
  let position = DOMposition.value;
  let hour = +DOMhour.value;

  // validate nhân viên
  validate();
  let checked = validate();
  if (checked === 0) {
    return alert("Form không hợp lệ");
  }

  // Kiểm tra ID nhân viên
  var foundIndex = findById(id);

  if (foundIndex !== -1) {
    return alert("ID nhân viên bị trùng");
  }
  // Tạo nhân viên mới

  var newEmployee = new employee(
    id,
    name,
    email,
    password,
    date,
    salary,
    position,
    hour
  );
  // push student mới vào danh sách
  employeeList.push(newEmployee);

  // render giao diện để chạy
  renderTable();

  // save data
  saveData();
}

function findById(id) {
  for (var i = 0; i < employeeList.length; i++) {
    if (employeeList[i].id === id) {
      return i;
    }
  }
  return -1;
}
// In ra table danh sách nhân viên
function renderTable(data) {
  if (!data) {
    data = employeeList;
  }

  var html = "";
  for (var i = 0; i < data.length; i++) {
    var currentEmployee = data[i];
    html += `<tr>
      <td>${currentEmployee.id}</td>
      <td>${currentEmployee.name}</td>
      <td>${currentEmployee.email}</td>
      <td>${dayjs(currentEmployee.date).format("DD/MM/YYYY")}</td>
      <td>${currentEmployee.position}</td>
      <td>${currentEmployee.calcSalary()}</td>
      <td>${currentEmployee.classifyEmployee()}</td>
      <td>
        <button class="btn btn-danger" onclick="deleteEmployee('${
          currentEmployee.id
        }')">Xoá
        </button>
      </td>
      <td>
      <button class="btn btn-info" onclick="getEmployeeInfo('${
        currentEmployee.id
      }')">
            Cập Nhật
          </button>
        </td>
     </tr>`;
  }
  document.getElementById("tableDanhSach").innerHTML = html;
}

// Data nhân viên
function saveData() {
  localStorage.setItem("list", JSON.stringify(employeeList));
}

function getData() {
  var employeeListStr = localStorage.getItem("list");

  if (!employeeListStr) return;

  employeeList = mapData(JSON.parse(employeeListStr));

  renderTable();
}

function mapData(dataFromLocal) {
  var mappedData = [];
  for (i = 0; i < dataFromLocal.length; i++) {
    var item = dataFromLocal[i];

    mappedData.push(
      new employee(
        item.id,
        item.name,
        item.email,
        item.password,
        item.date,
        item.salary,
        item.position,
        item.hour
      )
    );
  }
  return mappedData;
}

getData();

// Update nhân viên

// Hiển thị thông tin nhân viên lên table
function getEmployeeInfo(id) {
  let index = findById(id);
  if (index === -1) {
    return alert("không tìm thấy nhân viên");
  }
  document.getElementById("btnThem").click();
  document.getElementById("btnThemNV").style.display = "none";
  document.getElementById("btnCapNhat").style.display = "block";

  let foundEmployee = employeeList[index];
  DOMid.value = foundEmployee.id;
  DOMname.value = foundEmployee.name;
  DOMemail.value = foundEmployee.email;
  DOMpassword.value = foundEmployee.password;
  DOMdate.value = foundEmployee.date;
  DOMsalary.value = foundEmployee.salary;
  DOMposition.value = foundEmployee.position;
  DOMhour.value = foundEmployee.hour;

  // disable id nhân viên
  DOMid.disabled = true;
}

// Chỉnh sửa và update thông tin nhân viên
function updateEmployee() {
  let id = DOMid.value;
  let name = DOMname.value;
  let email = DOMemail.value;
  let password = DOMpassword.value;
  let date = DOMdate.value;
  let salary = +DOMsalary.value;
  let position = DOMposition.value;
  let hour = +DOMhour.value;

  let index = findById(id);

  let foundEmployee = employeeList[index];

  foundEmployee.id = id;
  foundEmployee.name = name;
  foundEmployee.email = email;
  foundEmployee.password = password;
  foundEmployee.date = date;
  foundEmployee.salary = salary;
  foundEmployee.position = position;
  foundEmployee.hour = hour;

  renderTable();

  saveData();

  alert("đã cập nhật thành công");

  resetForm();

  resetSpan();

  document.getElementById("btnDong").click();

  DOMid.disabled = false;
}

// Reset form
function resetForm() {
  DOMid.value = "";
  DOMname.value = "";
  DOMemail.value = "";
  DOMpassword.value = "";
  DOMdate.value = "";
  DOMsalary.value = "";
  DOMposition.value = "Chọn chức vụ";
  DOMhour.value = "";
}

function resetSpan() {
  DOMspanid.style.display = "none";
  DOMspanname.style.display = "none";
  DOMspanpassword.style.display = "none";
  DOMspanemail.style.display = "none";
  DOMspandate.style.display = "none";
  DOMspansalary.style.display = "none";
  DOMspanposition.style.display = "none";
  DOMspanhour.style.display = "none";
  document.getElementById("btnCapNhat").style.display = "none";
  document.getElementById("btnThemNV").style.display = "block";
  DOMid.disabled = false;
}
// Xóa nhân viên
function deleteEmployee(id) {
  let index = findById(id);

  employeeList.splice(index, 1);

  renderTable();

  saveData();
}

// Validate nhân viên
function validate() {
  // debugger
  let isValid = document.getElementById("formEmployee").checkValidity();
  if (!isValid) {
    // valdate id
    if (DOMid.validity.valueMissing) {
      DOMspanid.style.display = "block";
      DOMspanid.innerHTML = "Tài khoản không được để trống";
    } else if (DOMid.validity.patternMismatch) {
      DOMspanid.style.display = "block";
      DOMspanid.innerHTML = "Tài khoản phải là số và có 4-6 số";
    } else {
      DOMspanid.style.display = "none";
    }

    // validate name
    if (DOMname.validity.valueMissing) {
      DOMspanname.style.display = "block";
      DOMspanname.innerHTML = "Tên không được để trống";
    } else if (DOMname.validity.patternMismatch) {
      DOMspanname.style.display = "block";
      DOMspanname.innerHTML = "Tên không được co so hoac ki tu dac biet";
    } else {
      DOMspanname.style.display = "none";
    }

    // validate email
    if (DOMemail.validity.valueMissing) {
      DOMspanemail.style.display = "block";
      DOMspanemail.innerHTML = "Email không được để trống";
    } else if (DOMemail.validity.patternMismatch) {
      DOMspanemail.style.display = "block";
      DOMspanemail.innerHTML = "Email không hợp lệ";
    } else {
      DOMspanemail.style.display = "none";
    }

    // validate mật khẩu
    if (DOMpassword.validity.valueMissing) {
      DOMspanpassword.style.display = "block";
      DOMspanpassword.innerHTML = "Mật khẩu không được để trống";
    } else if (DOMpassword.validity.patternMismatch) {
      DOMspanpassword.style.display = "block";
      DOMspanpassword.innerHTML =
        "Mật khẩu chứa ít nhất 1 kí tự số, 1 kí tự in hoa, 1 kí tự đặt biệt";
    } else {
      DOMspanpassword.style.display = "none";
    }

    // validate ngày làm
    if (DOMdate.validity.valueMissing) {
      DOMspandate.style.display = "block";
      DOMspandate.innerHTML = "Ngày làm không được để trống";
    } else if (DOMdate.validity.typeMissmatch) {
      DOMspandate.style.display = "block";
      DOMspandate.innerHTML = "Ngày làm không đúng định dạng MM/DD/YYYY";
    } else {
      DOMspandate.style.display = "none";
    }

    // validate lương cơ bản
    if (DOMsalary.validity.valueMissing) {
      DOMspansalary.style.display = "block";
      DOMspansalary.innerHTML = "Lương cơ bản không được để trống";
    } else if (DOMsalary < 1000000 && DOMsalary > 20000000) {
      DOMspansalary.style.display = "block";
      DOMspansalary.innerHTML = "Lương cơ bản không hop le";
    } else {
      DOMspansalary.style.display = "none";
    }

    // validate chức vụ
    if ((DOMposition.value = "Chọn chức vụ")) {
      DOMspanposition.style.display = "block";
      DOMspanposition.innerHTML = "Chức vụ không được để trống";
    } else {
      DOMspanposition.style.display = "none";
    }

    // validate giờ làm
    if (DOMhour.validity.valueMissing) {
      DOMspanhour.style.display = "block";
      DOMspanhour.innerHTML = "Tổng giờ làm không được để trống";
    } else if (DOMhour < 80 && DOMhour > 200) {
      DOMspanhour.style.display = "block";
      DOMspanhour.innerHTML = "Tổng giờ làm không hop le";
    } else {
      DOMspanhour.style.display = "none";
    }

    return 0;
  }
}

// Tìm nhân viên
function findEmploye() {
  //   debugger;
  let result = [];
  let keyword = document
    .getElementById("searchName")
    .value.toLowerCase()
    .trim();

  for (let i = 0; i < employeeList.length; i++) {
    let currentEmployee = employeeList[i];
    let searchKey = "";
    if (currentEmployee.hour >= 192) {
      searchKey = "Nhân viên xuất sắc";
    } else if (currentEmployee.hour >= 176) {
      searchKey = "Nhân viên giỏi";
    } else if (currentEmployee.hour >= 160) {
      searchKey = "Nhân viên khá";
    } else {
      searchKey = "Nhân viên trung bình";
    }

    if (searchKey.toLowerCase().includes(keyword)) {
      result.push(currentEmployee);
    }
  }

  renderTable(result);
}
