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

  function goToIndex() {
    window.location.href = 'index.html';
  }
  

  document.addEventListener('DOMContentLoaded', loadEmployees);

  
  