const form = document.getElementById('nuevoProducto');
const productID = document.getElementById('idProduct');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form); 
    //console.log(Array.from(data));
    //console.log(productID.value);
    const response = await fetch("/api/products/"+productID.value, {
        method: "PUT",
        body: data,
    });
    const resposeData = await response.json();
    if (resposeData.status === "success") {
        Swal.fire({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 2500,
            title: 'Producto actualizado correctamente!',
            icon: "success",
        });
        setTimeout(() => {  window.location.replace("/admin/products"); }, 1500);
    } else {
        Swal.fire({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 2500,
            title: resposeData.error,
            icon: "error",
        });
    }
})
