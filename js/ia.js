document.addEventListener("DOMContentLoaded", function() {
    fetch('../json/ia.json')
        .then(response => response.json())
        .then(data => {
            const iaContainer = document.getElementById('IA');
            const placeholderSrc = '../img/iconos/cargando.png'; 

            function createGameCard(item, tempSrc) {
                const card = document.createElement('a');
                card.href = item.enlace;
                card.className = 'web-card';

                const cardImg = document.createElement('div');
                cardImg.className = 'card-img';
                const img = document.createElement('img');
                img.src = tempSrc; 
                img.alt = 'logo de pagina';
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

            const cards = data.IA.map(item => createGameCard(item, placeholderSrc));
            cards.forEach(({ card }) => iaContainer.appendChild(card));

            function loadImage(src) {
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.onload = () => resolve(src);
                    img.onerror = () => reject(src);
                    img.src = src;
                });
            }

            const imagePromises = data.IA.map(item => loadImage(item.img).catch(() => '../img/iconos/error.png'));

            Promise.all(imagePromises).then(images => {
                images.forEach((src, index) => {
                    const imgElement = cards[index].img;
                    imgElement.src = src; 
                });
            })
            .catch(error => console.error('Error al cargar las imágenes:', error));
        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error));
});
