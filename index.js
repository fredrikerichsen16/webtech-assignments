$('table.sortable th').on('click', function() {
    let column = $('table.sortable th').index(this);
    if (column === 0) return; // don't allow sorting on image column

    let sortingScreensize = 0;
    if(column === 4) {
        sortingScreensize = 1;
    }

    $rows = [];
    $('table.sortable tbody tr').each(function() {
        $rows.push($(this));
    });

    $rows.sort(function($a, $b) {
        let a = $a.children().eq(column).text();
        let b = $b.children().eq(column).text();

        if(sortingScreensize) {
            return parseInt(a) > parseInt(b);
        }

        return a.localeCompare(b);
    });

    let $tbody = $('table.sortable tbody');

    $tbody.empty();
    for (let i = 0; i < $rows.length; i++) {
        $tbody.append($rows[i]);
    }
});

$('form.add-phone-form').on('submit', function(e) {
    e.preventDefault();

    let data = $(this).serializeArray();

    console.log(data);

    $.post({
        url: 'https://wt.ops.labs.vu.nl/api20/78c5681b',
        type: 'post',
        data: data,
        success: function() {
            addRow({ brand: $("input[name='brand']").val(),
                     model: $("input[name='model']").val(),
                     os: $("input[name='os']").val(),
                     screensize: $("input[name='screensize']").val(),
                     image: $("input[name='image']").val() });

            $('form.add-phone-form input').val('');
        }
    });
});

$("button.reset").on('click', function(e) {
    e.preventDefault();

    $.get("https://wt.ops.labs.vu.nl/api20/78c5681b/reset", function() {
        document.getElementById("bodyTable").innerHTML = '';
        getData();
    });
});

function addRow(obj) {
    let row = "<tr><td><img alt='Picture of " + obj.model + "' src='" + obj.image + "'></td> <td>" + obj.brand + "</td> <td>" + obj.model + "</td> <td>" + obj.os + "</td> <td>" + obj.screensize + "</td></tr>";
    document.getElementById("bodyTable").innerHTML += row;
}

function getData() {
    $.get("https://wt.ops.labs.vu.nl/api20/78c5681b", function(data) {
        for (i = 0; i < data.length; i++) {
            addRow(data[i]);
        }
    }, "json");
}

getData();
