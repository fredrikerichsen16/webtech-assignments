$('table.sortable th').on('click', function() {
    let column = $('table.sortable th').index(this);
    if(column === 0) return; // don't allow sorting on image column

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
    for(let i = 0; i < $rows.length; i++) {
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





$(document).ready(function(){
  $(".reset").click(function(){
    $.get("https://wt.ops.labs.vu.nl/api20/78c5681b/reset", function(){
    });
  });
});
