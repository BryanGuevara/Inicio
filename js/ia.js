document.addEventListener("DOMContentLoaded", function() {
    fetch('../json/ia.json')
        .then(response => response.json())
        .then(data => {
            const iaContainer = document.getElementById('IA');

            function createGameCard(item) {
                const card = document.createElement('a');
                card.href = item.enlace;
                card.className = 'web-card';

                const cardImg = document.createElement('div');
                cardImg.className = 'card-img';
                const img = document.createElement('img');
                img.src = item.img;
                img.alt = 'Necesita conexion a internet';
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

            data.IA.forEach(item => {
                const card = createGameCard(item);
                iaContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error));
});
