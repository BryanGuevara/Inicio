document.addEventListener("DOMContentLoaded", function() {
    fetch('../json/jugar.json')
        .then(response => response.json())
        .then(data => {
            const onlineContainer = document.getElementById('Online');
            const offlineContainer = document.getElementById('Offline'); 
            const descargarContainer = document.getElementById('Descargar');
            const romsContainer = document.getElementById('Roms');
            const tempSrc = '../img/iconos/cargando.png'; 

            function createGameCard(item, tempSrc) {
                const card = document.createElement('a');
                card.href = item.enlace;
                card.className = 'web-card';

                const cardImg = document.createElement('div');
                cardImg.className = 'card-img';
                const img = document.createElement('img');
                img.src = tempSrc; 
                img.alt = 'Imagen de la pagina';
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

                return { card, img }; 
            }

            function loadImage(src) {
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.onload = () => resolve(src);
                    img.onerror = () => reject(src);
                    img.src = src;
                });
            }

            function loadCards(container, items) {
                const cards = items.map(item => createGameCard(item, tempSrc));
                cards.forEach(({ card }) => container.appendChild(card));

                const imagePromises = items.map(item => loadImage(item.img).catch(() => '../img/iconos/error.png'));

                Promise.all(imagePromises).then(images => {
                    items.forEach((item, index) => {
                        const imgElement = cards[index].img;
                        imgElement.src = images[index]; 
                    });
                })
                .catch(error => console.error('Error al cargar las imágenes:', error));
            }

            loadCards(onlineContainer, data.Online);
            loadCards(offlineContainer, data.Offline);
            loadCards(descargarContainer, data.Descargar);
            loadCards(romsContainer, data.Roms);
        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error));
});
