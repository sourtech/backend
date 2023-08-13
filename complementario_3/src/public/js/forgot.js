const form = document.getElementById("loginForm");

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => (obj[key] = value));

    const response = await fetch("/api/sessions/forgot", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
            "content-type": "application/json",
        },
    });

    const resposeData = await response.json();
    //console.log(resposeData)
    if (resposeData.status === "success") {
        Swal.fire({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 2500,
            title: resposeData.message,
            icon: "info",
        });
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