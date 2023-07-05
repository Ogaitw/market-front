function displayEmployees(employees) {
  const tbody = document.querySelector('#employeeList');
  tbody.innerHTML = '';

  employees.forEach(employee => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${employee.Id}</td>
      <td>${employee.name}</td>
      <td>${employee.email}</td>
      <td>${formatCPF(employee.cpf)}</td>
      <td>${employee.shift}</td>
      <td>${employee.phone}</td>
      <td>
        <button class="btn btn-danger" onclick="deleteEmployee(${employee.Id})">Deletar</button>
        <button class="btn btn-primary" data-toggle="modal" data-target="#editProductModal" onclick="editEmployeeModal(${employee.Id})">Editar</button>
      </td>`
    ;
    tbody.appendChild(row);
  });
}

function formatCPF(cpf) {
  const cpfString = String(cpf);
  const cpfRegex = /^(\d{3})(\d{3})(\d{3})(\d{2})$/;
  return cpfString.replace(cpfRegex, '$1.$2.$3-$4');
}

function saveEmployeeChanges() {
  const employeeId = document.getElementById('editEmployeeId').value;
  const employeeName = document.getElementById('editEmployeeName').value;
  const employeeEmail = document.getElementById('editEmployeeEmail').value;
  const employeeCpf = formatCPF(document.getElementById('editEmployeeCPF').value);
  const employeeShift = document.getElementById('editEmployeeShift').value;
  const employeePhone = document.getElementById('editEmployeePhone').value;

  const updatedEmployee = {
    id: employeeId,
    name: employeeName,
    email: employeeEmail,
    cpf: employeeCpf,
    shift: employeeShift,
    phone: employeePhone
  };

  axios.patch(`http://localhost:8080/employee/edit/${employeeId}`, updatedEmployee)
    .then(response => {
      loadEmployees();
      closeModal();
      reloadPagina();
    })
    .catch(error => {
      console.error('Erro ao salvar as alterações:', error);
    });
}

function searchEmployee() {
  const searchValue = document.getElementById('searchInput').value.toLowerCase();
  const employeeList = document.querySelector('#employeeList');
  const rows = employeeList.querySelectorAll('tr');

  rows.forEach(row => {
    const employeeId = row.querySelector('td:nth-child(1)').textContent.toLowerCase();
    const employeeName = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
    const employeeEmail = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
    const employeeCPF = row.querySelector('td:nth-child(4)').textContent.toLowerCase();
    const employeeShift = row.querySelector('td:nth-child(5)').textContent.toLowerCase();

    if (
      employeeId.includes(searchValue) ||
      employeeName.includes(searchValue) ||
      employeeEmail.includes(searchValue) ||
      employeeCPF.includes(searchValue) ||
      employeeShift.includes(searchValue)
    ) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}

function loadEmployees() {
  axios.get('http://localhost:8080/employee')
    .then(response => {
      const employees = response.data;
      displayEmployees(employees);
    })
    .catch(error => {
      console.error('Erro ao carregar os funcionários:', error);
    });
}

function deleteEmployee(id) {
  axios.delete(`http://localhost:8080/employee/id/${id}`)
    .then(response => {
      loadEmployees();
    })
    .catch(error => {
      console.error('Ocorreu um erro ao excluir o funcionário:', error);
    });
}

function editEmployeeModal(id) {
  axios.get(`http://localhost:8080/employee/id/${id}`)
  .then(response => {
    const employee = response.data;
    document.getElementById('editEmployeeId').value = employee.id;
    document.getElementById('editEmployeeName').value = employee.name;
    document.getElementById('editEmployeeEmail').value = employee.email;
    document.getElementById('editEmployeeCPF').value = employee.cpf;
    document.getElementById('editEmployeeShift').value = employee.shift;
    document.getElementById('editEmployeePhone').value = employee.phone;

    openModal();
  })
  .catch(error => {
    console.error('Erro ao obter os dados do Employee:', error);
  });
}

function closeModal() {
  var modal = document.getElementById('editEmployeeModal');
  modal.classList.remove('show');
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
  modal.removeAttribute('aria-modal');
  var modalBackdrop = document.querySelector('.modal-backdrop');
  document.body.removeChild(modalBackdrop);
}

function addCloseModalEvent() {
  var closeModalButton = document.querySelector('.close');
  closeModalButton.addEventListener('click', closeModal);
}

function openModal() {
  var modal = document.getElementById('editEmployeeModal');
  modal.classList.add('show');
  modal.style.display = 'block';
  modal.setAttribute('aria-hidden', 'false');
  modal.setAttribute('aria-modal', 'true');
  var modalBackdrop = document.createElement('div');
  modalBackdrop.classList.add('modal-backdrop', 'fade', 'show');
  document.body.appendChild(modalBackdrop);

  addCloseModalEvent(); 
}

function reloadPagina() {
  location.reload();
}

function goToIndex() {
  window.location.href = 'index.html';
}

window.addEventListener('DOMContentLoaded', () => {
  loadEmployees();
});
