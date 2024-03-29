const selectRol = document.getElementById('selectRol');
const RoleActual = document.getElementById("role");
const update = document.getElementById("update");

//dejo seleccionado el rol del usuario
for (var i=0; i<selectRol.options.length; i++) {
    let opt = selectRol.options[i];
    if(opt.value === RoleActual.value)  opt.setAttribute('selected', true);
}
//actualizo el rol
update.addEventListener("click", async (event) => {
    event.preventDefault();
    const obj = {'role':selectRol.value};
    const response = await fetch("/api/sessions/premium", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
            "content-type": "application/json",
        },
    });    
    const resposeData = await response.json();
    if (resposeData.status === "success") {
        Swal.fire({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 2500,
            title: resposeData.message,
            icon: "success",
        });
        setTimeout(() => {  window.location.replace("/api/sessions/logout"); }, 3000);
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
}); 