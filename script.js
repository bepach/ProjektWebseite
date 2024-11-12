/*function convertJSONTOTable(jsonData){
    let headers= Object.keys(jsonData[0]);
    let table ='<table><thead><tr>';
    headers.forEach(header => table += '<th>${header}</th>');
    table += '</tr></thead><tbody>';

    jsonData.forEach(row => {
        table += '<tr>';
        headers.forEach(header => table += '<td>${row[header]}</td>');
        table += '</tr>';
    });
    table += '</tbody></table>';
    document.getElementById('table-container').innerHTML = table;
}

fetch("").then(response => response.json()).then(jsonData => convertJSONTOTable(jsonData));
*/

fetch("test.json")
.then(response => response.json())
.then(data => showInfo(data));

function showInfo(data) {
console.table(data.countries);
}