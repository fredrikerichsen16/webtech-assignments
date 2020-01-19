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
$(document).ready(function(){
  $(".reset").click(function(){
    $.get("https://wt.ops.labs.vu.nl/api20/78c5681b/reset", function(){
    });
  });
});

function addRow(obj){
  var table = "<tr><td>" + obj.brand + "</td> <td>" + obj.model + "</td> <td>" + obj.os + "</td> <td><img src=" + obj.image + "></td> <td>" + obj.screensize + "</td></tr>";
  document.getElementById("bodyTable").innerHTML += table;
}

function getData(){
    $.get("https://wt.ops.labs.vu.nl/api20/78c5681b", function(data){
      for(i = 0; i< data.lenght; i++){
        addRow(data[i]);
      }
    }, "json");


}
