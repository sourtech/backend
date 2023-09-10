const form = document.getElementById('registerForm');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => (obj[key] = value));
    const response = await fetch('/api/sessions/register', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const responseData = await response.json();
    console.log(responseData);
    if (responseData.status === 'success') {
        //por el momento lo mando a login sin mucho aviso
        window.location.replace("/login");
    } else {
        //console.log(responseData);
        //alert("aca");
        Swal.fire({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 2500,
            title: responseData.error,
            icon: "error",
        });
    }
});