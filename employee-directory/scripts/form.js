document.getElementById('employeeForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const editId = localStorage.getItem('editEmployeeId');
  const employees = JSON.parse(localStorage.getItem('employees') || '[]');

  const newEmployee = {
    id: editId ? Number(editId) : Date.now(),
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    email: document.getElementById('email').value,
    department: document.getElementById('department').value,
    role: document.getElementById('role').value
  };

  if (editId) {
    const index = employees.findIndex(emp => emp.id == editId);
    employees[index] = newEmployee;
    localStorage.removeItem('editEmployeeId');
  } else {
    employees.push(newEmployee);
  }

  localStorage.setItem('employees', JSON.stringify(employees));
  location.href = 'index.html';
});

window.onload = () => {
  const editId = localStorage.getItem('editEmployeeId');
  if (editId) {
    const employees = JSON.parse(localStorage.getItem('employees') || '[]');
    const emp = employees.find(e => e.id == editId);
    if (emp) {
      document.getElementById('firstName').value = emp.firstName;
      document.getElementById('lastName').value = emp.lastName;
      document.getElementById('email').value = emp.email;
      document.getElementById('department').value = emp.department;
      document.getElementById('role').value = emp.role;
    }
  }
};
