window.addEventListener('error', function (event) {
    event.preventDefault();
    console.log(event.error);
    console.warn('Some error occured');
})