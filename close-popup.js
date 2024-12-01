console.log("HERE")

document.getElementById('closePopup').addEventListener('click', function() {
    const popup = document.getElementById('popup');
    if (popup) {
        popup.classList.remove('show');
    }
});
