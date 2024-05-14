document.getElementById('youtubeForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var query = this.querySelector('.busquedaInput').value;
    window.location.href = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(query);
});

document.getElementById('youtubeForm2').addEventListener('submit', function (e) {
    e.preventDefault();
    var query = this.querySelector('.busquedaInput').value;
    window.location.href = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(query);
});

document.getElementById('youtubeForm3').addEventListener('submit', function (e) {
    e.preventDefault();
    var query = this.querySelector('.busquedaInput').value;
    window.location.href = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(query);
});