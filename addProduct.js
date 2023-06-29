function addProduct() {
  const name = document.querySelector('#name').value;
  const preco = document.querySelector('#preco').value;
  const validade = document.querySelector('#validade').value;
  const quantidade = document.querySelector('#quantidade').value;

  if (name === '' || preco === '' || validade === '' || quantidade === '') {
    document.getElementById('alertMessage').style.display = 'block';
  } else {
    document.getElementById('alertMessage').style.display = 'none';

    const data = {
      name: name,
      preco: preco,
      validade: validade,
      quantidade: quantidade
    };

    axios.post('https://9cce-2804-14c-4183-4a46-b4e9-aa9e-5a9-ff34.ngrok-free.app/product', data)
      .then(response => {
        alert('Produto cadastrado com sucesso!');
        resetForm();
      })
      .catch(error => {
        console.error('Ocorreu um erro:', error);
      });
  }
}

function resetForm() {
  document.querySelector('#name').value = '';
  document.querySelector('#preco').value = '';
  document.querySelector('#validade').value = '';
  document.querySelector('#quantidade').value = '';
}

function closeAlert() {
  document.getElementById('alertMessage').style.display = 'none';
}

$(document).ready(function() {
  $('.alert').alert();

  $('.alert .close').on('click', function() {
    $(this).parent().hide();
  });
});

function goToIndex() {
  window.location.href = 'index.html';
}