document.addEventListener('DOMContentLoaded', function() {
    var selectedOption = document.getElementById('styleSelect').value;
    var body = document.querySelector('body');
    var imagePath = '../img/iconos/';

    switch(selectedOption) {
        case 'default':
            body.style.backgroundImage = "url('" + imagePath + "default.jpg')";
            break;
        case 'cute':
            body.style.backgroundImage = "url('" + imagePath + "cute.jpg')";
            break;
        case 'windows':
            body.style.backgroundImage = "url('" + imagePath + "windows.jpg')";
            break;
            case 'modernclean':
                body.style.backgroundImage = "url('" + imagePath + "modernclean.jpg')";
                break;
        default:
            body.style.backgroundImage = "none";
    }
});

document.getElementById('styleSelect').addEventListener('change', function() {
    var selectedOption = this.value;
    var body = document.querySelector('body');
    var imagePath = '../img/iconos/';

    switch(selectedOption) {
        case 'default':
            body.style.backgroundImage = "url('" + imagePath + "default.jpg')";
            break;
        case 'cute':
            body.style.backgroundImage = "url('" + imagePath + "cute.jpg')";
            break;
        case 'windows':
            body.style.backgroundImage = "url('" + imagePath + "windows.jpg')";
            break;
        case 'modernclean':
            body.style.backgroundImage = "url('" + imagePath + "modernclean.jpg')";
            break;
        default:
            body.style.backgroundImage = "none";
    }
});
