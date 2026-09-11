let students = JSON.parse(localStorage.getItem("students_data")) || [];

const form = document.getElementById("studentForm");
const tableBody = document.getElementById("studentTableBody");
const searchInput = document.getElementById("searchInput");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const rollNo = document.getElementById("rollNo").value.trim();
  const name = document.getElementById("name").value.trim();
  const branch = document.getElementById("branch").value.trim();
  const apaarId = document.getElementById("apaarId").value.trim();
  const studentMobile = document.getElementById("studentMobile").value.trim();
  const fatherMobile = document.getElementById("fatherMobile").value.trim();

  const isDuplicate = students.some(s => s.rollNo.toLowerCase() === rollNo.toLowerCase());
  if (isDuplicate) {
    alert("A student with this Roll Number is already registered!");
    return;
  }

  const newRecord = {
    rollNo,
    name,
    branch,
    apaarId,
    studentMobile,
    fatherMobile
  };

  students.push(newRecord);
  localStorage.setItem("students_data", JSON.stringify(students));
  
  form.reset();
  renderTable(students);
});

function renderTable(data) {
  tableBody.innerHTML = "";

  if (data.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="7" class="empty-state">No student records found.</td>
      </tr>
    `;
    return;
  }

  data.forEach((st) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong>${st.rollNo}</strong></td>
      <td>${st.name}</td>
      <td>${st.branch}</td>
      <td>${st.apaarId}</td>
      <td>${st.studentMobile}</td>
      <td>${st.fatherMobile}</td>
      <td>
        <button class="btn-delete" onclick="deleteRecord('${st.rollNo}')">Delete</button>
      </td>
    `;
    tableBody.appendChild(tr);
  });
}

function deleteRecord(rollNo) {
  if (confirm(`Are you sure you want to remove Roll No: ${rollNo}?`)) {
    students = students.filter(s => s.rollNo !== rollNo);
    localStorage.setItem("students_data", JSON.stringify(students));
    renderTable(students);
  }
}

function searchStudentRecords() {
  const query = searchInput.value.toLowerCase().trim();
  const filtered = students.filter(st => 
    st.rollNo.toLowerCase().includes(query) ||
    st.name.toLowerCase().includes(query) ||
    st.apaarId.toLowerCase().includes(query)
  );
  renderTable(filtered);
}

renderTable(students);
