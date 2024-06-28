// Ajoute un écouteur d'événement pour le DOMContentLoaded (l'événement est déclenché lorsque le document HTML initial est complètement chargé et analysé)
document.addEventListener("DOMContentLoaded", () => {
    // Récupère les paramètres de l'URL
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id'); // Récupère la valeur de l'ID du produit depuis les paramètres de l'URL

    // Fait une requête pour récupérer les détails d'un produit spécifique à partir de l'API locale en utilisant l'ID du produit
    fetch(`http://localhost:3000/api/cameras/${productId}`)
        .then(response => response.json()) // Convertit la réponse en format JSON
        .then(product => {
            const productDetails = document.getElementById('product-details'); // Récupère l'élément où les détails du produit seront affichés

            // Vérifie si l'URL de l'image commence par "http" (URL absolue) ou non (URL relative), puis construit l'URL de l'image en conséquence
            const imageUrl = product.imageUrl.startsWith('http')
                ? product.imageUrl
                : `http://localhost:3000/images/${product.imageUrl}`;

            // Définit le contenu HTML pour afficher les détails du produit, y compris le nom, l'image, la description, le prix et une liste déroulante pour choisir l'objectif
            productDetails.innerHTML = `
                <h2>${product.name}</h2>
                <img class="product-image" src="${imageUrl}" alt="${product.name}">
                <p>${product.description}</p>
                <p>${product.price / 100} €</p>
                <label for="lens">Choix de l'objectif:</label>
                <select id="lens">
                    ${product.lenses.map(lens => `<option value="${lens}">${lens}</option>`).join('')}
                </select>
            `;

            // Ajoute un écouteur d'événement pour le bouton "Ajouter au panier"
            document.getElementById('add-to-cart').addEventListener('click', () => {
                const selectedLens = document.getElementById('lens').value; // Récupère l'objectif sélectionné
                const cartItem = {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    lens: selectedLens,
                };

                // Récupère le panier depuis le localStorage ou initialise un tableau vide si le panier est vide
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                cart.push(cartItem); // Ajoute l'article au panier
                localStorage.setItem('cart', JSON.stringify(cart)); // Met à jour le panier dans le localStorage
                alert('Produit ajouté au panier'); // Affiche une alerte pour indiquer que le produit a été ajouté au panier
            });

            // Ajoute un écouteur d'événement pour le bouton "Voir le panier"
            document.getElementById('view-cart').addEventListener('click', () => {
                window.location.href = 'cart.html'; // Redirige vers la page du panier
            });
        })
        .catch(error => console.error('Error fetching product:', error)); // Gère les erreurs éventuelles lors de la récupération du produit
});
