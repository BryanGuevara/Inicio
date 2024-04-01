document.getElementById('youtubeForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var query = this.querySelector('.busquedaInput').value;
    window.location.href = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(query);
});