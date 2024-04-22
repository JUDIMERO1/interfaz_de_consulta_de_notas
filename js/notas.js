const user = JSON.parse(localStorage.getItem('user'));
constnameSpan = document.getElementById('name');
const promedioSpan = document.getElementById('promedio');
const notasBody = document.getElementById('notas');
const logoutButton = document.getElementById('logout');

if (!user) {
    window.location.href = 'index.html';
}

nameSpan.textContent = user.name;

fetch(`https://api-parcial.crangarita.repl.co/students/[codigo]/notas`)
    .then(response => response.json())
    .then(data => {
        let promedio = 0;
        data.forEach(notas => {
            const { asignatura, creditos, p1, p2, p3, ef } = notas;
            const definitiva = (p1 + p2 + p3) / 3 * 0.7 + ef * 0.3;
            promedio += definitiva * creditos;
            notasBody.innerHTML += `
                    <tr>
                        <td>${user.code}</td>
                        <td>${asignatura}</td>
                        <td>${creditos}</td>
                        <td>${p1}</td>
                        <td>${p2}</td>
                        <td>${p3}</td>
                        <td>${ef}</td>
                        <td>${definitiva.toFixed(2)}</td>
                    </tr>
                `;
        });
        promedio /= data.reduce((total, notas) => total + notas.creditos, 0);
        promedioSpan.textContent = promedio.toFixed(2);
    })
    .catch(error => {
        console.error('Error:', error);
        notasBody.innerHTML = '<tr><td colspan="8">Error al obtener las notas. Por favor, inténtelo más tarde.</td></tr>';
    });

logoutButton.addEventListener('click', () => {
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}); 