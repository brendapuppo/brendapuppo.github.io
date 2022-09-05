function validacion() {
    let usuario = document.getElementById('usuario').value;
    let clave = document.getElementById('clave').value;

    if (usuario==='') {
        document.getElementById('usuario').classList.add('error');
        Swal.fire({
            icon: 'error',
            text: 'Ingrese su usuario',
            timer: 1500,
            showConfirmButton: false
        });
        } else if (clave==='') {
        document.getElementById('clave').classList.add('error');
        Swal.fire({
            icon: 'error',
            text: 'Ingrese su contraseña',
            timer: 1500,
            showConfirmButton: false
        });
    } else{
        localStorage.setItem('storeUsuario', usuario);
        location.href = 'index.html';
    }
}

document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('autBtn').addEventListener('click', ()=>{
        validacion();
    })
})