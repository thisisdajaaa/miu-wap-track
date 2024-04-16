"use strict";

const patientData = [
  {
    patientID: "EP-101-000001",
    firstName: "Ash",
    middleInitial: "A",
    lastName: "Ketchum",
    dob: "2001-12-05",
    department: "Cardiology",
    isOutPatient: "Yes",
  },
  {
    patientID: "P-201-000002",
    firstName: "Misty",
    middleInitial: "M",
    lastName: "Cerulean",
    dob: "2001-05-14",
    department: "Ophthalmology",
    isOutPatient: "Yes",
  },
  {
    patientID: "EP-301-000003",
    firstName: "Brock",
    middleInitial: "B",
    lastName: "Pewter",
    dob: "1941-03-16",
    department: "Neurology",
    isOutPatient: "No",
  },
];

const getFormattedRow = (patient, index) => {
  const row = document.createElement("tr");
  row.id = `patient-row-${index}`;

  Object.values(patient).forEach((item) => {
    const col = document.createElement("td");
    const colValue = document.createTextNode(item);
    col.appendChild(colValue);
    row.appendChild(col);
  });

  return row;
};

window.addEventListener("load", () => {
  const tableBody = document.getElementById("tbodyPatientsList");

  patientData.forEach((item, index) => {
    const formattedRow = getFormattedRow(item, index);
    tableBody.appendChild(formattedRow);
  });
});

const handleRegisterPatient = (patientForm) => (event) => {
  event.preventDefault();
  event.stopPropagation();

  const getRadioValue = () => {
    const radioElements = document.getElementsByName("radioIsOutPatient");

    for (let i = 0; i < radioElements.length; i++) {
      if (radioElements[i].checked) return radioElements[i].value;
    }
  };

  const newPatient = {
    patientID: document.getElementById("patientIdNumber").value,
    firstName: document.getElementById("firstName").value,
    middleInitial: document.getElementById("middleInitials").value,
    lastName: document.getElementById("lastName").value,
    dob: document.getElementById("dateOfBirth").value,
    department: document.getElementById("ddlDepartment").value,
    isOutPatient: getRadioValue(),
  };

  console.log("patientData: ", patientData);
  console.log("newPatient: ", newPatient);

  const isPatientExisting = patientData.some(
    (item) =>
      item.patientID === newPatient.patientID ||
      (item.firstName === newPatient.firstName &&
        item.lastName === newPatient.lastName)
  );

  console.log("isPatientExisting: ", isPatientExisting);

  if (isPatientExisting) {
    const errorMsg = "Patient is already existing!";
    alert(errorMsg);
    throw new Error(errorMsg);
  }

  const tableBody = document.getElementById("tbodyPatientsList");
  const formattedRow = getFormattedRow(newPatient, patientData.length);

  tableBody.appendChild(formattedRow);
  patientData.push(newPatient);
  patientForm.reset();
};

const patientForm = document.getElementById("patientForm");
patientForm.addEventListener("submit", handleRegisterPatient(patientForm));

const btnReset = document.getElementById("btnReset");
btnReset.addEventListener("click", () => patientForm.reset());

const chkElderlyPatients = document.getElementById("chkElderlyPatients");
const chkShowOutPatients = document.getElementById("chkShowOutPatients");

const getAge = (dob) => {
  const today = new Date();
  const birthDate = new Date(dob);
  const month = today.getMonth() - birthDate.getMonth();
  let age = today.getFullYear() - birthDate.getFullYear();

  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate()))
    age--;

  return age;
};

const handleFilterChange = () => {
  patientData.forEach((patient, index) => {
    const row = document.getElementById(`patient-row-${index}`);
    const isElderly = getAge(patient.dob) >= 65;
    const isOutPatient = patient.isOutPatient === "Yes";
    let shouldBeVisible = true;

    if (
      (chkElderlyPatients.checked && !isElderly) ||
      (chkShowOutPatients.checked && !isOutPatient)
    )
      shouldBeVisible = false;

    row.style.display = shouldBeVisible ? "" : "none";
  });
};

chkElderlyPatients.addEventListener("change", handleFilterChange);
chkShowOutPatients.addEventListener("change", handleFilterChange);
