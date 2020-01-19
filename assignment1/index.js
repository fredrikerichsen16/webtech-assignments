$('table.sortable th').on('click', function() {
    let column = $('table.sortable th').index(this);
    if (column === 0) return; // don't allow sorting on image column

    $rows = [];
    $('table.sortable tbody tr').each(function() {
        $rows.push($(this));
    });

    // console.log($rows);

    $rows.sort(function($a, $b) {
        let a = $a.children().eq(column).text();
        let b = $b.children().eq(column).text();

        // console.log(a, b);

        return a.localeCompare(b);
    });

    let $tbody = $('table.sortable tbody');

    $tbody.empty();
    for (let i = 0; i < $rows.length; i++) {
        $tbody.append($rows[i]);
    }

    // console.log($rows);
});

// get all: https://wt.ops.labs.vu.nl/api20/78c5681b
//

$('form.add-phone-form').on('submit', function(e) {
    e.preventDefault();

    let data = $(this).serializeArray();

    console.log(data);

    $.post({
        url: 'https://wt.ops.labs.vu.nl/api20/78c5681b',
        type: 'post',
        data: data,
        // dataType: 'json',
        // contentType: 'application/json',
        success: function(data) {
            console.log(data.URI);
        }
    });
});

$(".reset").click(function() {
    $.get("https://wt.ops.labs.vu.nl/api20/78c5681b/reset", function() {

    });
});

function addRow(obj) {
    var table = "<tr><td><img src=" + obj.image + "></td> <td>" + obj.brand + "</td> <td>" + obj.model + "</td> <td>" + obj.os + "</td> <td>" + obj.screensize + "</td></tr>";
    document.getElementById("bodyTable").innerHTML += table;
}

function getData() {
    $.get("https://wt.ops.labs.vu.nl/api20/78c5681b", function(data) {
        console.log(data);
        for (i = 0; i < data.length; i++) {
            addRow(data[i]);
        }
        console.log(document.getElementById("bodyTable").innerHTML);
    }, "json");
}

getData();
