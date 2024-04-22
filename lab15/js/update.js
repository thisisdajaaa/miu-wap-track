window.onload = loadDataToDropdown;

function loadDataToDropdown() {
  let data = getStudents();
  const dropdown = document.getElementById("ddlStudent");
  dropdown.innerHTML = "";
  addItemToDropdown("", "Select...", "");
  data.then((result) => {
    for (let e of result) {
      addItemToDropdown(e.id, e.id, e.program);
    }
  });
}

async function getStudents() {
  const response = await fetch("http://localhost:8000/students");
  if (response.ok) {
    const jsonData = await response.json();
    return jsonData;
  } else {
    return response.statusText;
  }
}

async function getStudentById(id) {
  const response = await fetch(`http://localhost:8000/students/${id}`);
  if (response.ok) {
    const jsonData = await response.json();
    return jsonData;
  } else {
    return response.statusText;
  }
}

async function updateStudent(id) {
  let setting = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: +document.getElementById("id").value,
      name: document.getElementById("name").value,
      program: document.getElementById("program").value,
    }),
  };

  const response = await fetch(`http://localhost:8000/students/${id}`, setting);
  // const jsonData = await response.json();
  if (response.ok) alert("updated successfully");
  else alert(response.statusText);
}

function addItemToDropdown(id, name, program) {
  const dropdown = document.getElementById("ddlStudent");
  let item = document.createElement("option");
  item.setAttribute("id", "student" + id);
  item.setAttribute("value", id);
  item.appendChild(document.createTextNode(name));
  dropdown.appendChild(item);
}

document
  .getElementById("ddlStudent")
  .addEventListener("change", async (event) => {
    const id = event.target.value;

    if (!id) return;

    const student = await getStudentById(id);

    const updateForm = document.getElementById("form-update");
    updateForm.style.display = "block";

    document.getElementById("id").value = student.id;
    document.getElementById("name").value = student.name;
    document.getElementById("program").value = student.program;
  });

document.getElementById("btnUpdate").addEventListener("click", async () => {
  const id = document.getElementById("ddlStudent").value;
  await updateStudent(id);
  document.getElementById("myform").reset();
  loadDataToDropdown();
  const updateForm = document.getElementById("form-update");
  updateForm.style.display = "none";
});
