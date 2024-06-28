// Ajoute un écouteur d'événement pour le DOMContentLoaded (l'événement est déclenché lorsque le document HTML initial est complètement chargé et analysé)
document.addEventListener('DOMContentLoaded', () => {
    // Récupère la commande stockée dans le localStorage ou renvoie null s'il n'y a pas de commande
    const order = JSON.parse(localStorage.getItem('order'));

    // Si une commande est trouvée dans le localStorage
    if (order) {
        const orderIdElement = document.getElementById('order-id'); // Récupère l'élément où l'ID de la commande sera affiché
        const totalPriceElement = document.getElementById('total-price'); // Récupère l'élément où le prix total sera affiché
        const confirmationDetails = document.createElement('div'); // Crée un nouvel élément div pour les détails de confirmation

        // Affiche l'ID de la commande
        orderIdElement.textContent = order.orderId;
        // Affiche le prix total de la commande
        totalPriceElement.textContent = (order.totalAmount / 100).toFixed(2);

        // Crée un nouvel élément div pour les détails de contact et les remplit avec les informations de contact de la commande
        const contactDetails = document.createElement('div');
        contactDetails.innerHTML = `
            <h3>Détails de contact :</h3>
            <p><strong>Nom :</strong> ${order.contact.lastName}</p>
            <p><strong>Prénom :</strong> ${order.contact.firstName}</p>
            <p><strong>Adresse :</strong> ${order.contact.address}</p>
            <p><strong>Ville :</strong> ${order.contact.city}</p>
            <p><strong>Email :</strong> ${order.contact.email}</p>
        `;

        // Crée un nouvel élément div pour la liste des produits commandés et les remplit avec les informations des produits
        const productsList = document.createElement('div');
        productsList.innerHTML = `
            <h3>Produits commandés :</h3>
            <ul>
                ${order.products.map(product => `
                    <li>
                        <strong>${product.name}</strong> - Objectif: ${product.lens} - Prix unitaire: ${(product.price / 100).toFixed(2)} €
                    </li>
                `).join('')}
            </ul>
        `;

        // Ajoute les détails de contact et la liste des produits commandés au div de confirmation
        confirmationDetails.appendChild(contactDetails);
        confirmationDetails.appendChild(productsList);
        // Ajoute le div de confirmation au corps du document
        document.body.appendChild(confirmationDetails);

        // Supprime la commande du localStorage après l'affichage
        localStorage.removeItem('order');
    } else {
        // Si aucune commande n'est trouvée dans le localStorage, affiche une erreur dans la console et redirige vers la page d'accueil
        console.error('Aucune commande trouvée.');
        window.location.href = '/';
    }
});
