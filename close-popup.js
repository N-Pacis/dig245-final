console.log("HERE")

document.getElementById('closePopup').addEventListener('click', function() {
    document.getElementById('popup').style.backgroundColor = 'red'
    const popup = document.getElementById('popup');
    if (popup) {
        popup.classList.remove('show');
    }
});
