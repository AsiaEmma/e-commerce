// Ajoute un écouteur d'événement pour le DOMContentLoaded (l'événement est déclenché lorsque le document HTML initial est complètement chargé et analysé)
e.target.dataset = undefined;
document.addEventListener("DOMContentLoaded", () => {
    // Récupère le contenu du panier à partir du localStorage ou initialise un tableau vide si le panier est vide
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItems = document.getElementById('cart-items'); // Récupère l'élément où les articles du panier seront affichés
    const totalPriceElement = document.getElementById('total-price'); // Récupère l'élément où le prix total sera affiché
    let totalPrice = 0; // Initialise le prix total à 0.

    // Fonction pour mettre à jour l'affichage du prix total
    const updateTotalPrice = () => {
        totalPriceElement.textContent = (totalPrice / 100).toFixed(2);
    };

    // Fonction pour retirer un article du panier
    const removeItemFromCart = (index) => {
        cart.splice(index, 1); // Retire l'article à l'index donné//
        localStorage.setItem('cart', JSON.stringify(cart)); // Met à jour le panier dans le localStorage//
        renderCartItems(); // Réaffiche les articles du panier.//
    };

    // Fonction pour afficher les articles du panier//
    const renderCartItems = () => {
        cartItems.innerHTML = ''; // Vide le contenu actuel des articles du panier
        totalPrice = 0; // Réinitialise le prix total

        // Parcourt chaque article dans le panier
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div'); // Crée un nouvel élément div pour chaque article
            cartItem.className = 'cart-item'; // Assigne une classe CSS pour le style
            cartItem.innerHTML = `
                <h2>${item.name}</h2>
                <p>Objectif: ${item.lens}</p>
                <p>Prix: ${(item.price / 100).toFixed(2)} €</p>
                <button class="remove-item" data-index="${index}">Supprimer</button>
            `; // Définit le contenu HTML de l'article du panier
            cartItems.appendChild(cartItem); // Ajoute l'article du panier à l'élément parent
            totalPrice += item.price; // Ajoute le prix de l'article au prix total
        });

        // Ajoute un écouteur d'événement de clic pour chaque bouton "Supprimer"
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.dataset.index; // Récupère l'index de l'article à supprimer
                removeItemFromCart(index); // Appelle la fonction pour retirer l'article du panier
            });
        });

        updateTotalPrice(); // Met à jour l'affichage du prix total
    };

    renderCartItems(); // Affiche les articles du panier à l'initialisation

    // Ajoute un écouteur d'événement pour la soumission du formulaire de commande
    document.getElementById('order-form').addEventListener('submit', (e) => {
        e.preventDefault(); // Empêche le comportement par défaut de soumission du formulaire
        const formData = new FormData(e.target); // Récupère les données du formulaire
        const contact = Object.fromEntries(formData.entries()); // Convertit les données du formulaire en objet

        // Crée un tableau de produits à partir du panier
        const products = cart.map(item => ({ id: item.id, name: item.name, price: item.price, quantity: 1, lens: item.lens }));

        const orderId = Date.now().toString(); // Génère un ID de commande unique

        // Crée un objet de commande contenant l'ID de commande, les informations de contact, les produits et le montant total
        const order = {
            orderId,
            contact,
            products,
            totalAmount: totalPrice
        };

        localStorage.setItem('order', JSON.stringify(order)); // Stocke la commande dans le localStorage

        alert('Commande passée avec succès!'); // Affiche une alerte de succès

        localStorage.removeItem('cart'); // Vide le panier du localStorage

        window.location.href = `confirmation.html`; // Redirige vers la page de confirmation
    });
});