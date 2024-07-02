document.addEventListener("DOMContentLoaded", function() {
    fetch('../json/otros.json')
        .then(response => response.json())
        .then(data => {
            const paginasContainer = document.getElementById('paginas');
            const sugerenciaContainer = document.getElementById('sugerencia');

            function createPageCard(item) {
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

            data.Paginas.forEach(item => {
                const card = createPageCard(item);
                paginasContainer.appendChild(card);
            });

            data.Sugerencia.forEach(item => {
                const card = createPageCard(item);
                sugerenciaContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error));
});
