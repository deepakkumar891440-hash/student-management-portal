// LocalStorage se data read karna
let students = JSON.parse(localStorage.getItem("students")) || [];

const studentForm = document.getElementById("studentForm");
const studentTableBody = document.getElementById("studentTableBody");

// Form submit handle karna
studentForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const rollNo = document.getElementById("rollNo").value.trim();
  const name = document.getElementById("name").value.trim();
  const branch = document.getElementById("branch").value.trim();
  const marks = document.getElementById("marks").value.trim();

  // Duplicate Roll Check
  if (students.some((s) => s.rollNo === rollNo)) {
    alert("This Roll Number already exists!");
    return;
  }

  const newStudent = { rollNo, name, branch, marks };
  students.push(newStudent);

  // LocalStorage update aur table render
  localStorage.setItem("students", JSON.stringify(students));
  studentForm.reset();
  renderStudents(students);
});

// Records ko Table me print karna
function renderStudents(data) {
  studentTableBody.innerHTML = "";

  if (data.length === 0) {
    studentTableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:#64748b;">No records found.</td></tr>`;
    return;
  }

  data.forEach((student, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${student.rollNo}</td>
      <td>${student.name}</td>
      <td>${student.branch}</td>
      <td>${student.marks}%</td>
      <td><button class="delete-btn" onclick="deleteStudent('${student.rollNo}')">Delete</button></td>
    `;
    studentTableBody.appendChild(row);
  });
}

// Student Delete karna
function deleteStudent(rollNo) {
  students = students.filter((s) => s.rollNo !== rollNo);
  localStorage.setItem("students", JSON.stringify(students));
  renderStudents(students);
}

// Live Search Filter
function filterStudents() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const filtered = students.filter(
    (s) => s.rollNo.toLowerCase().includes(query) || s.name.toLowerCase().includes(query)
  );
  renderStudents(filtered);
}

// Initial Render
renderStudents(students);
