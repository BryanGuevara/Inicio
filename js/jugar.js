document.addEventListener("DOMContentLoaded", function() {
    fetch('../json/jugar.json')
        .then(response => response.json())
        .then(data => {
            // Obtener los contenedores de cada categoría
            const onlineContainer = document.getElementById('Online');
            const offlineContainer = document.getElementById('Offline'); 
            const descargarContainer = document.getElementById('Descargar');
            const romsContainer = document.getElementById('Roms');

            function createGameCard(item) {
                const card = document.createElement('a');
                card.href = item.enlace;
                card.className = 'web-card';

                const cardImg = document.createElement('div');
                cardImg.className = 'card-img';
                const img = document.createElement('img');
                img.src = item.img;
                img.alt = 'Vista previa de la página web';
                cardImg.appendChild(img);

                const cardInfo = document.createElement('div');
                cardInfo.className = 'card-info';
                const title = document.createElement('h3');
                title.textContent = item.title;
                cardInfo.appendChild(title);

                const cardTypes = document.createElement('div');
                cardTypes.className = 'card-types';
                item.tipos.forEach(tipo => {
                    const span = document.createElement('span');
                    span.className = tipo.color;
                    span.textContent = tipo.tipo;
                    cardTypes.appendChild(span);
                });

                cardInfo.appendChild(cardTypes);
                card.appendChild(cardImg);
                card.appendChild(cardInfo);

                return card;
            }

            data.Online.forEach(item => {
                const card = createGameCard(item);
                onlineContainer.appendChild(card);
            });

            data.Offline.forEach(item => {
                const card = createGameCard(item);
                offlineContainer.appendChild(card);
            });

            data.Descargar.forEach(item => {
                const card = createGameCard(item);
                descargarContainer.appendChild(card);
            });

            data.Roms.forEach(item => {
                const card = createGameCard(item);
                romsContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error));
});
