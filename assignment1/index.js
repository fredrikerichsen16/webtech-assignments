$('table.sortable th').on('click', function() {
    let column = $(this).data('column');

    console.log(column);
});
