
$(document).on('click',"#addIngredient", function () {
    var html = '';
    html += '<div class="input-group row">';
    html += '<input type="text" class="" placeholder="1"/>';
    html += '<input type="text" class="" placeholder="unit"/>';
    html += '<input type="text" class="" placeholder="ingredient"/>';
    html += '<button class="btn" id="removeIngredient">x</button>';
    html += '</div>';
    

    $('#newIngredient').append(html);
});

// remove row
// $(document).on('click', '#removeIngredient', function () {
//     $(this).closest('#input-group').remove();
// });