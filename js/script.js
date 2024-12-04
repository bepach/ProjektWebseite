// globale Variablen
let companyData;
let countryData;
let sortOrder = 1;

// Main Funktion. Liest JSON aus, setzt Optionen für Selektoren
function main(){
    // Spracheinstellungen des Browsers auslesen und entsprechend rtl/ltr setzen
    const html = document.documentElement;
    const language = navigator.language;
    // Array mit Sprachcodes, bei welchen das Design RTL angezeigt werden soll
    const rtlLanguages = ['ar', 'he'];
    if(rtlLanguages.includes( language.split('-')[0])) {
        html.setAttribute('dir', 'rtl')
    } else {
        html.setAttribute('dir', 'ltr')
    }
    // Json Files fetchen und Inhalt speichern
    fetch('corporations.json')
        .then(response => response.json())
        .then(data => {
            companyData = data;
        }).catch(error => {
            console.error('JSON konnte nicht geladen werden:', error);
        });
        fetch('country.json')
        .then(response => response.json())
        .then(data => {
            countryData = data;
        }).catch(error => {
            console.error('JSON konnte nicht geladen werden:', error);
        });
    
    // Selektoren mit Auswahl füllen
    let options ='<option value="">Bitte auswählen</option>';
    let years =['2015','2016','2017','2018','2019','2020','2021','2022','2023','2024'];
    for(var year in years){
        options += '<option>'+years[year]+'</option>';
    }
    var yearSelector = document.getElementById('year');
    yearSelector.innerHTML = options;
}

// Funktion zum Laden neuer Daten nach Auswahl durch Selektoren
function newSelection(){
    const headerOne = document.getElementById('headerOne');
    const headerTwo = document.getElementById('headerTwo');
    const selectionYear = document.getElementById('year').value;
    const selectionContent = document.getElementById('content').value;
    // Nur wenn beide Selektoren eine Auswahl haben
    if(selectionYear != "" && selectionContent != ""){
        //Kopfzeile der Tabelle anpassen
        headerOne.innerHTML = selectionContent;
        headerTwo.innerHTML = 'C0² in Mio.t';        
        if(selectionContent=='Land'){
            populateTable(countryData,selectionYear);
        } 
        if(selectionContent=='Unternehmen') {
            populateTable(companyData,selectionYear);
        }
    }
    
}
// Funktion um die Tabelle mit Daten zu füllen
// @param data - welcher Datensatz, year - Ausgesuchte Jahreszahl
function populateTable(data,year){
    // Tabellenkörper bestimmen
    const tableBody = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    // Tabelleninhalt leeren
    tableBody.innerHTML='';
    // Suchfeld leeren
    document.getElementById("filter").value="";
    // Daten vom selektierten Jahr
    const yearData = data.find(item => item.year == year);
    if(yearData){
        // für jeden Eintrag eine neue Zeile in der Tabelle anlegen
        yearData.data.forEach(record => {
                const row = tableBody.insertRow();
                const columnOne = row.insertCell(0);
                const columnTwo = row.insertCell(1);
                columnOne.textContent = record.object;
                columnTwo.textContent = record.c02;
        });
    }
    // Sortierreihenfolge wieder auf 1 setzen
    sortOrder = 1;
    // Nach Namen Sortieren
    sortTable(0);
}

// Funktion zum sortieren der Tabelle
// @param column - Nach welcher Spalte soll sortiert werden
function sortTable(column){
    // Tabelleneinträge auslesen
    const tableBody = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    const rows = Array.from(tableBody.rows);

    // Sortiere Array mit eigener Funktion
    rows.sort((a,b)=>{
        const aText = a.cells[column].textContent;
        const bText = b.cells[column].textContent;
        // Nummern vergeleichen
        if(!isNaN(aText) && !isNaN(bText)){
            return (parseFloat(aText) - parseFloat(bText))*sortOrder;
        }
        // Strings vergleichen
        return aText.localeCompare(bText) * sortOrder;
    })
    rows.forEach(row => tableBody.appendChild(row));
    // Nächster Aufruf hat andere Sortierreihenfolge
    sortOrder = -sortOrder;
}

// Funktion um die Eingabe zu bereinigen
function readInput(){
    // Filter auslesen
    var input = document.getElementById("filter").value.toUpperCase();
    // Die Eingabe nur verarbeiten, wenn sie aus Buchstaben besteht
    if (/^[a-zA-Z]*$/.test(input)){
        filterTable(input);
    }
}

// Funktion zum Filtern von Tabelleneinträgen
function filterTable(filter){
    // keine Case-Sensitivity
    // Tabelleninhalt auslesen
    var tr = document.getElementById("dataTable").getElementsByTagName("tr");
    // Alle Reihen ausblenden, welche nicht der Suche entsprechen
    var td, txtValue;
    for(i=0; i < tr.length; i++){
        td = tr[i].getElementsByTagName("td")[0];
        if(td){
            txtValue = td.innerText;
            if(txtValue.toUpperCase().indexOf(filter) > -1){
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }

}
// Funktion zum Testen von RTL/LTR Design
function changeDirection(){
    const html = document.documentElement;
    if(html.dir=='ltr'){
        html.setAttribute('dir', 'rtl')
    } else {
        html.setAttribute('dir', 'ltr')
    }
}

// Auszuführen beim Laden der Webseite
main();
