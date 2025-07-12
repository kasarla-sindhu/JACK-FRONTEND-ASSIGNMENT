let employees = JSON.parse(localStorage.getItem('employees') || '[]');

function renderPaginatedEmployees(list, page = 1, perPage = 10) {
  const container = document.getElementById('employeeList');
  container.innerHTML = '';
  const start = (page - 1) * perPage;
  const paginated = list.slice(start, start + perPage);
  paginated.forEach(emp => {
    const card = document.createElement('div');
    card.className = 'employee-card';
    card.innerHTML = `
      <h3>${emp.firstName} ${emp.lastName}</h3>
      <p>Email: ${emp.email}</p>
      <p>Department: ${emp.department}</p>
      <p>Role: ${emp.role}</p>
      <button onclick="editEmployee(${emp.id})">Edit</button>
      <button onclick="deleteEmployee(${emp.id})">Delete</button>
    `;
    container.appendChild(card);
  });

  const totalPages = Math.ceil(list.length / perPage);
  let paginationControls = '<div style="margin-top: 20px;">';
  for (let i = 1; i <= totalPages; i++) {
    paginationControls += `<button onclick="renderPaginatedEmployees(list, ${i})">${i}</button>`;
  }
  paginationControls += '</div>';
  container.innerHTML += paginationControls;
}

function deleteEmployee(id) {
  employees = employees.filter(emp => emp.id !== id);
  localStorage.setItem('employees', JSON.stringify(employees));
  applyAllFilters();
}

function editEmployee(id) {
  localStorage.setItem('editEmployeeId', id);
  location.href = 'add-edit.html';
}

function applyAllFilters() {
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  const departmentFilter = document.getElementById('departmentFilter').value.toLowerCase();
  const roleFilter = document.getElementById('roleFilter').value.toLowerCase();
  const filtered = employees.filter(emp =>
    (emp.firstName.toLowerCase().includes(searchInput) ||
     emp.email.toLowerCase().includes(searchInput)) &&
    (departmentFilter ? emp.department.toLowerCase().includes(departmentFilter) : true) &&
    (roleFilter ? emp.role.toLowerCase().includes(roleFilter) : true)
  );
  renderPaginatedEmployees(filtered, 1);
}

function sortEmployees() {
  const sortBy = document.getElementById('sortSelect').value;
  employees.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
  applyAllFilters();
}

applyAllFilters();
