document.getElementById('googleForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var query = this.querySelector('.busquedaInput').value;
    window.location.href = 'https://www.google.com/search?q=' + encodeURIComponent(query);
});