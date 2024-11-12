function convertJSONTOTable(jsonData){
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

fetch("company.json").then(response => response.json()).then(jsonData => convertJSONTOTable(jsonData));
