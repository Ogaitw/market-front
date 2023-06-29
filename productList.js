window.addEventListener('DOMContentLoaded', () => {
    getProducts();
  });
  
  function getProducts() {
    axios.get('https://9cce-2804-14c-4183-4a46-b4e9-aa9e-5a9-ff34.ngrok-free.app/product')
      .then(response => {
        displayProducts(response.data);
      })
      .catch(error => {
        console.error('Erro ao obter os produtos:', error);
      });
  }
  
  function displayProducts(products) {
    const productList = document.querySelector('#productList');
    productList.innerHTML = '';
  
    products.forEach(product => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${product.Id}</td>
        <td>${product.name}</td>
        <td>${product.preco}</td>
        <td>${product.validade}</td>
        <td>${product.quantidade}</td>
      `;
      productList.appendChild(row);
    });
  }
  function deleteEmployee(id) {
    axios.delete('https://9cce-2804-14c-4183-4a46-b4e9-aa9e-5a9-ff34.ngrok-free.app/product/' + id)
      .then(response => {
        alert('Produto excluído com sucesso!');
       
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
  