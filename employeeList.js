function displayEmployees(employees) {
    const tbody = document.querySelector('#employeeList');
    tbody.innerHTML = '';
  
    employees.forEach(employee => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${employee.Id}</td>
        <td>${employee.name}</td>
        <td>${employee.email}</td>
        <td>${employee.cpf}</td>
        <td>${employee.shift}</td>
        <td>${employee.phone}</td>
      `;
      tbody.appendChild(row);
    });
  }
  
  function loadEmployees() {
    axios.get('http://localhost:8080/Employee')
      .then(response => {
        const employees = response.data;
        displayEmployees(employees);
      })
      .catch(error => {
        console.error('Erro ao carregar os funcionários:', error);
      });
  }
  function deleteEmployee(id) {
    axios.delete('http://localhost:8080/Employee/' + id)
      .then(response => {
        alert('Funcionário excluído com sucesso!');
       
      })
      .catch(error => {
        console.error('Ocorreu um erro ao excluir o funcionário:', error);
      });
  }

  function openModal() {
    var modal = document.getElementById('exampleModalCenter');
    modal.classList.add('show');
    modal.style.display = 'block';
    modal.removeAttribute('aria-hidden');
    modal.setAttribute('aria-modal', 'true');
    var modalBackdrop = document.createElement('div');
    modalBackdrop.classList.add('modal-backdrop', 'fade', 'show');
    document.body.appendChild(modalBackdrop);
  }

  function closeModal() {
    var modal = document.getElementById('exampleModalCenter');
    modal.classList.remove('show');
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal');
    var modalBackdrop = document.querySelector('.modal-backdrop');
    document.body.removeChild(modalBackdrop);
  }

  function goToIndex() {
    window.location.href = 'index.html';
  }
  

  document.addEventListener('DOMContentLoaded', loadEmployees);

  
  