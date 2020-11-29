$(document).on('click',"#addIngredient", function () {
    var html = '';
    html += '<div class="input-group row">';
    html += '<input name="ingredient[].quantity" type="text" class="" placeholder="1"/>';
    html += '<input name="ingredient[].unit" type="text" class="" placeholder="unit"/>';
    html += '<input name="ingredient[].description" type="text" class="" placeholder="ingredient"/>';
    html += '<button type="button" class="btn" id="removeIngredient">x</button>';
    html += '</div>';
    
    $('#newIngredient').append(html);
});

//remove row
$(document).on('click', '#removeIngredient', function () {
    $(this).closest('.input-group').remove();
});

$(document).ready(function(){
    $("#addIngredient").trigger("click");
    $('#addNewRecipe').on("submit",function(event){
       var result = $('#addNewRecipe').serialize(); 
       console.log(result);
        event.preventDefault();
    })
})

// html += '<div class="input-group row">';
//     html += '<div class="col-6>';
//     html += '<input type="text" class="" placeholder="1"/>';
//     html += '</div>';
//     html += '<div class="col-6>';
//     html += '<input type="text" class="" placeholder="unit"/>';
//     html += '</div>';
//     html += '<div class="col-6>';
//     html += '<input type="text" class="" placeholder="ingredient"/>';
//     html += '</div>';
//     html += '<button type="button" class="btn" id="removeIngredient">x</button>';
//     html += '</div>';

// {
//     ...
//     ingredients: [ {...}, {...}, {...} ]
//    }
//    <input name="ingredient[][quantity]"/>
//    <input name="ingredient[][unit]"/>
//    <input name="ingredient[][description]"/>