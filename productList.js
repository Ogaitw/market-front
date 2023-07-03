
function getProducts() {
  axios.get('http://localhost:8080/product')
    .then(response => {
      const products = response.data;
      displayProducts(products);
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
      <td>${product.id}</td>
      <td>${product.name}</td>
      <td>${product.preco}</td>
      <td>${formatDate(product.validade)}</td>
      <td>${product.quantidade}</td>
      <td>
        <button class="btn btn-danger" onclick="deleteProduct(${product.id})">Deletar</button>
        <button class="btn btn-primary" onclick="openModal(); editProduct(${product.id})">Editar</button>
      </td>
    `;
    productList.appendChild(row);
  });
}
function formatDate(dateString) {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString();
  return formattedDate;
}
function deleteProduct(id) {
  axios.delete(`http://localhost:8080/product/id/${id}`)
    .then(response => {
      getProducts();
    })
    .catch(error => {
      console.error('Ocorreu um erro ao excluir o produto:', error);
    });
}

function editProduct(id) {
  axios.get(`http://localhost:8080/product/id/${id}`)
    .then(response => {
      const product = response.data;
      document.getElementById('editProductId').value = product.id;
      document.getElementById('editProductName').value = product.name;
      document.getElementById('editProductPrice').value = product.preco;
      document.getElementById('editProductExpiration').value = product.validade;
      document.getElementById('editProductQuantity').value = product.quantidade;

      openModal();
      
    })
    .catch(error => {
      console.error('Erro ao obter os dados do produto:', error);
    });
}




function saveProductChanges() {
  const productId = document.getElementById('editProductId').value;
  const productName = document.getElementById('editProductName').value;
  const productPrice = document.getElementById('editProductPrice').value;
  const productExpiration = document.getElementById('editProductExpiration').value;
  const productQuantity = document.getElementById('editProductQuantity').value;

  axios.patch(`http://localhost:8080/product/edit/${productId}`,{
    id: productId,
    name: productName,
    preco: productPrice,
    validade: productExpiration,
    quantidade: productQuantity
  })
    .then(response => {
      getProducts();
      closeModal();
    })
    .catch(error => {
      console.error('Erro ao salvar as alterações do produto:', error);
    });
}


function openModal() {
  var modal = document.getElementById('editProductModal');
  modal.classList.add('show');
  modal.style.display = 'block';
  modal.removeAttribute('aria-hidden');
  modal.setAttribute('aria-modal', 'true');
  var modalBackdrop = document.createElement('div');
  modalBackdrop.classList.add('modal-backdrop', 'fade', 'show');
  document.body.appendChild(modalBackdrop);
}

function closeModal() {
  var modal = document.getElementById('editProductModal');
  modal.classList.remove('show');
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
  modal.removeAttribute('aria-modal');
  var modalBackdrop = document.querySelector('.modal-backdrop');
  document.body.removeChild(modalBackdrop);
}

function searchProducts() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const productList = document.querySelector('#productList');
  const rows = productList.querySelectorAll('tr');

  rows.forEach(row => {
    const productName = row.querySelector('td:nth-child(2)').textContent.toLowerCase();

    if (productName.includes(searchTerm)) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}



function goToIndex() {
  window.location.href = 'index.html';
}



window.addEventListener('DOMContentLoaded', () => {
  getProducts();
});