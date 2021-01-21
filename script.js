// fetch api
function getUsers() {
   fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(function (data) {
            //build row for each index
            data.forEach(function (row) {
                insertRow(row)
            });
        });
}

function insertRow(row) {
    //create tr
    let tr = document.createElement('tr');

    //create th value = id
    let th = document.createElement('th')
    let text = document.createTextNode(row.id);
    th.appendChild(text);

    //create td value = name
    let nameTd = document.createElement('td')
    let nameText = document.createTextNode(row.name);
    nameTd.appendChild(nameText);

    //create td value = adress
    let addressTd = document.createElement('td')
    let addressText = document.createTextNode(extractAddress(row.address));
    addressTd.appendChild(addressText);

    //create td value = phone
    let phoneTd = document.createElement('td')
    let phoneText = document.createTextNode(row.phone);
    phoneTd.appendChild(phoneText);

    tr.appendChild(th);
    tr.appendChild(nameTd);
    tr.appendChild(addressTd);
    tr.appendChild(phoneTd);
    tr.setAttribute('data-toggle', 'modal');
    tr.setAttribute('data-target', '#exampleModalCenter');
    tr.addEventListener('click', onClickRow.bind(null, row));

    // tr.addEventListener('click', function(){ alert('Hello World!'); });
    const table = document.getElementById('usersTable');
    const tBody = table.querySelector('tbody')
        .appendChild(tr)
}

function extractAddress(address) {
    let addressAsString = ` ${address.city}, ${address.street}, ${address.zipcode}`
    return addressAsString;
}

function onClickRow(row) {
    //name title
    let nameText = document.createTextNode(row.name);
    document.getElementById('exampleModalCenterTitle').innerText = row.name;

    //address
    let addressTd = Object.values(row.address).reduce(function (prev, next) {
    let nextString = next;
    if (typeof next === 'object') {
        nextString = `Geo: ${Object.values(next).reduce((innerPrev, innerNext) => `${innerPrev}, ${innerNext}`)}`;
    }
    return `${prev}, ${nextString}`
    });
    document.getElementById('user-address').innerHTML = `Address: ${addressTd}`;

    //company
    let companyText = Object.values(row.company);
    document.getElementById('user-company').innerHTML = `Company: ${companyText}`;

    //email
    let emailText = document.createTextNode(row.email);
    document.getElementById('user-email').innerText = `Email: ${row.email}`;

    //phone
    let phoneTd = document.createTextNode(row.phone);
    document.getElementById('user-phone').innerText = `Phone Number: ${row.phone}`;

    //username
    let usernameText = document.createTextNode(row.userName);
    document.getElementById('username').innerText = `Username: ${row.username}`;

    //website
    let websiteText = document.createTextNode(row.website);
    document.getElementById('user-website').innerText = `Website: ${row.website}`;
}