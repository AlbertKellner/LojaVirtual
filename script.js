const products = [
    { id: 1, name: 'Smartphone A', category: 'Celulares', condition: 'novo', price: 1500 },
    { id: 2, name: 'Tablet B', category: 'Tablets', condition: 'usado', price: 900 },
    { id: 3, name: 'Carregador XYZ', category: 'Acessórios', condition: 'novo', price: 50 },
    { id: 4, name: 'Capa Proteção', category: 'Acessórios', condition: 'novo', price: 30 },
    { id: 5, name: 'Smartphone C', category: 'Celulares', condition: 'usado', price: 700 }
];

let cart = [];

function formatCurrency(value) {
    return 'R$ ' + value.toFixed(2);
}

function renderProducts(filter = 'all') {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    const filtered = products.filter(p => filter === 'all' || p.condition === filter);

    filtered.forEach(prod => {
        const item = document.createElement('div');
        item.className = 'product';
        item.innerHTML = `
            <h3>${prod.name}</h3>
            <p>Categoria: ${prod.category}</p>
            <p>Condição: ${prod.condition}</p>
            <p>Preço: ${formatCurrency(prod.price)}</p>
            <button onclick="addToCart(${prod.id})">Adicionar ao carrinho</button>
        `;
        productList.appendChild(item);
    });
}

function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const totalEl = document.getElementById('total');
    cartItems.innerHTML = '';

    let total = 0;
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${formatCurrency(item.price)}`;
        cartItems.appendChild(li);
        total += item.price;
    });

    totalEl.textContent = 'Total: ' + formatCurrency(total);
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        cart.push(product);
        renderCart();
    }
}

// Event listeners
const conditionFilter = document.getElementById('conditionFilter');
conditionFilter.addEventListener('change', e => {
    renderProducts(e.target.value);
});

// Initial render
renderProducts();
renderCart();
