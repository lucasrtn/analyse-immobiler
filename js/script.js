// Script pour les onglets
document.addEventListener('DOMContentLoaded', function() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Désactiver tous les onglets
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                
                // Activer l'onglet cliqué
                this.classList.add('active');
                const tabId = this.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
    
    // Initialiser les graphiques si présents
    initializeCharts();
});

// Fonction pour initialiser les graphiques
function initializeCharts() {
    // Cette fonction sera appelée si des graphiques sont présents sur la page
    // Le code pour le graphique radar est déjà inclus dans la page resultats.html
}

// Animation au défilement
window.addEventListener('scroll', function() {
    const cards = document.querySelectorAll('.card');
    const windowHeight = window.innerHeight;
    
    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        
        if (cardTop < windowHeight - 100) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
});

// Fonction pour filtrer les tableaux
function filterTable(inputId, tableId, columnIndex) {
    const input = document.getElementById(inputId);
    if (input) {
        input.addEventListener('keyup', function() {
            const filter = input.value.toUpperCase();
            const table = document.getElementById(tableId);
            const rows = table.getElementsByTagName('tr');
            
            for (let i = 1; i < rows.length; i++) {
                const cell = rows[i].getElementsByTagName('td')[columnIndex];
                if (cell) {
                    const txtValue = cell.textContent || cell.innerText;
                    if (txtValue.toUpperCase().indexOf(filter) > -1) {
                        rows[i].style.display = '';
                    } else {
                        rows[i].style.display = 'none';
                    }
                }
            }
        });
    }
}

// Fonction pour trier les tableaux
function sortTable(tableId, columnIndex) {
    const table = document.getElementById(tableId);
    if (!table) return;
    
    let switching = true;
    let direction = 'asc';
    let switchcount = 0;
    
    while (switching) {
        switching = false;
        const rows = table.rows;
        
        for (let i = 1; i < rows.length - 1; i++) {
            let shouldSwitch = false;
            const x = rows[i].getElementsByTagName('td')[columnIndex];
            const y = rows[i + 1].getElementsByTagName('td')[columnIndex];
            
            if (direction === 'asc') {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (direction === 'desc') {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
            
            if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                switchcount++;
            }
        }
        
        if (switchcount === 0 && direction === 'asc') {
            direction = 'desc';
            switching = true;
        }
    }
}

// Fonction pour imprimer la page
function printPage() {
    window.print();
}

// Fonction pour partager la page
function sharePage() {
    if (navigator.share) {
        navigator.share({
            title: document.title,
            url: window.location.href
        })
        .catch(error => console.log('Erreur de partage:', error));
    } else {
        alert('Le partage n\'est pas pris en charge par votre navigateur.');
    }
}
