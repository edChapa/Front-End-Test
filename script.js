$.ajax({
    url: "https://restcountries.com/v3.1/all",
    dataType: "json"
})
.done(function( data ) {
    console.log(data[0]);
      loadTable(data);
});


function loadTable(data) {
    var tc = document.getElementById('table-contents');

    data.sort((a,b)=> (a.name.official > b.name.official ? 1 : -1))

    $.each(data, function(i, val) {
        var tr = document.createElement("tr");
        var columns = [document.createElement("td"), document.createElement("td"), document.createElement("td"), document.createElement("td"), document.createElement("td"), document.createElement("td")];
        var flag = document.createElement("img");
        flag.src = val.flags.png;
        var languages = ""
        for(var l in val.languages) {
            languages += val.languages[l] + "<br>";
        }

        columns[0].textContent = val.name.official;
        columns[1].textContent = val.capital;
        columns[2].textContent = val.region;
        columns[3].innerHTML = languages;
        columns[4].textContent = val.population + " people";
        columns[5].appendChild(flag);

        columns.forEach(function(col, i, array) {
            tr.appendChild(col);
        });


        tr.onclick = function() {
            onRowClick(val.name.common);
        };

        tc.appendChild(tr);

    }); 
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