const form = document.getElementById('submit');

form.addEventListener('click', async (e) => {
    Swal.fire({title: "Procesando...",html: "Espere por favor"});
    Swal.showLoading();
});


