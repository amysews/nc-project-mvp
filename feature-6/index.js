fetch('http://localhost:3000/RDS/people')
    .then(buffer => buffer.json())
    .then(({people}) => {
        people.forEach(person => addRow(person))
    })
    .catch(err => console.log(err))


const tbody = document.getElementById('peopledata');

function addRow (person) {

    const cell1 = document.createElement('td');
    cell1.innerText = person.first_name;
    const cell2 = document.createElement('td');
    cell2.innerText = person.surname;
    const cell3 = document.createElement('td');
    cell3.innerText = person.region;


    const newRow = document.createElement('tr');
    newRow.appendChild(cell1)
    newRow.appendChild(cell2)
    newRow.appendChild(cell3)


    tbody.appendChild(newRow)
}