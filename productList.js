window.addEventListener('DOMContentLoaded', () => {
    getProducts();
  });
  
  function getProducts() {
    axios.get('http://localhost:8080/Product')
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
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.preco}</td>
        <td>${product.validade}</td>
        <td>${product.quantidade}</td>
      `;
      productList.appendChild(row);
    });
  }
 
  function goToIndex() {
    window.location.href = 'index.html';
  }
  