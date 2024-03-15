document.getElementById('busquedaInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        var query = this.value;
        window.location.href = 'https://www.google.com/search?q=' + encodeURIComponent(query);
    }
});