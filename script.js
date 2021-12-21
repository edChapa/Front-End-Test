$.ajax({
    url: "https://restcountries.com/v3.1/all",
    dataType: "json"
})
.done(function( data ) {
      loadTable(data);
});


function loadTable(data) {
    var tc = document.getElementById('table-contents');

    data.sort((a,b)=> (a.name.official > b.name.official ? 1 : -1))

    $.each(data, function(i, val) {
        var tr = document.createElement("tr");
        var columns = [document.createElement("td"), document.createElement("td"), document.createElement("td"), document.createElement("td"), document.createElement("td"), document.createElement("td")];
        var languages = document.createElement("a");
        var flag = document.createElement("img");
        
        languages.text = "View Langages";
        languages.href = "#";
        flag.src = val.flags.png;

        columns[0].textContent = val.name.official;
        columns[1].textContent = val.capital;
        columns[2].textContent = val.region;
        columns[3].appendChild(languages);
        columns[4].textContent = val.population + " people";
        columns[5].appendChild(flag);

        columns.forEach(function(col, i) {
            tr.appendChild(col);
        });

        tr.onclick = function() {
            onRowClick(val.name.common);
        };

        languages.onclick = function() {
            languageOnClick(val);
        }

        tc.appendChild(tr);
    }); 
}

function languageOnClick(val) {
    var languages = "";

    for(var l in val.languages) {
        languages += "<li>" + val.languages[l] + "</li>" + "<br>";
    }

    if (languages)
        bootbox.alert({
            title: "Languages",
            message: languages
        });
    else
    bootbox.alert({
        title: "Languages",
        message: "No languages found"
    });

    //Cancel event propagation
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
}

function onRowClick(country) {
    $.ajax({
        url: "https://en.wikipedia.org/api/rest_v1/page/summary/" + country,
        dataType: "json"
    })
    .done(function(data) {
        bootbox.alert({
            title: country,
            message: data.extract_html
        });
    }); 
}