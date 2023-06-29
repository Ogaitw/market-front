function addEmployee() {
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const cpf = document.querySelector('#cpf').value;
    const shift = document.querySelector('#shift').value;
    const phone = document.querySelector('#phone').value;
  
    const employeeData = {
      name,
      email,
      cpf,
      shift,
      phone
    };
  
    axios.post('https://9cce-2804-14c-4183-4a46-b4e9-aa9e-5a9-ff34.ngrok-free.app/employee', employeeData)
      .then(response => {
        alert('Funcionário adicionado com sucesso:', response.data);
        document.querySelector('#addEmployeeForm').reset();
      })
      .catch(error => {
        console.error('Erro ao adicionar o funcionário:', error);
      });
  }
  
  function goToIndex() {
    window.location.href = 'index.html';
  }
  