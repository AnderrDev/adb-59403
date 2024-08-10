document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('productForm');
    const deleteForm = document.getElementById('deleteForm');
    const messageDiv = document.getElementById('message');
    const codTipoSelect = document.getElementById('CodTipo');

    const apiUrl = 'http://3.12.107.253:3000/api';

    // Cargar tipos de producto
    fetch(`${apiUrl}/tipo_producto`)
        .then(response => response.json())
        .then(data => {
            data.forEach(tipo => {
                const option = document.createElement('option');
                option.value = tipo.codTipo;
                option.textContent = tipo.nombreTipo;
                codTipoSelect.appendChild(option);
            });
        });

    productForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const productId = document.getElementById('productId').value;
        const descripcion = document.getElementById('descripcion').value;
        const productoComprado = document.getElementById('productoComprado').value;
        const precioVenta = document.getElementById('precioVenta').value;
        const CodTipo = document.getElementById('CodTipo').value;

        const product = {
            descripcion,
            productoComprado: productoComprado === 'true',
            precioVenta: parseFloat(precioVenta),
            CodTipo: parseInt(CodTipo)
        };

        const method = productId ? 'PUT' : 'POST';
        const url = productId ? `${apiUrl}/productos/${productId}` : `${apiUrl}/productos`;

        fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })
            .then(response => response.json())
            .then(data => {
                messageDiv.textContent = 'Producto guardado exitosamente';
                messageDiv.className = 'message';
                productForm.reset();
            })
            .catch(error => {
                messageDiv.textContent = 'Error al guardar el producto';
                messageDiv.className = 'message error';
            });
    });

    deleteForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const deleteProductId = document.getElementById('deleteProductId').value;

        fetch(`${apiUrl}/productos/${deleteProductId}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    messageDiv.textContent = 'Producto eliminado exitosamente';
                    messageDiv.className = 'message';
                    deleteForm.reset();
                } else {
                    throw new Error('Error al eliminar el producto');
                }
            })
            .catch(error => {
                messageDiv.textContent = error.message;
                messageDiv.className = 'message error';
            });
    });
});