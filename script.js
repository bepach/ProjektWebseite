function

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

fetch("https://github.com/bepach/ProjektWebseite/blob/ee4f862fad8b86f1fc7f12f261d3f71161d00320/company.json")
    .then(response => response.json())
    .then(jsonData => convertJSONTOTable(jsonData));

function change(){
    document.getElementById("demo").innerHTML = "Hello JavaScript!";
}
