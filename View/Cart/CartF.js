//these functions change the total sum in the database
function callIncrease(id) {
    $.ajax({
      type: "GET",
      url: "/cart/increaseTotalPrice/"+id,
      success: function(data) {
        console.log(data);
      },
      error: function(error) {
        console.log(error);
      }
    });
}

function callDecrease(id) {
    $.ajax({
      type: "GET",
      url: "/cart/decreaseTotalPrice/"+id,
      success: function(data) {
        console.log(data);
      },
      error: function(error) {
        console.log(error);
      }
    });
}

//increasing the total on the page
function increase(event,map){
  //getting different ids
  const ids = event.target.dataset.id.split(" ");

  //handling and increasing the quantity
  let quantity = document.getElementById( ids[0] );
  let currentValue = parseInt(quantity.value);
  currentValue = currentValue + 1;
  quantity.value = currentValue;

  //handling the price
  var price = document.getElementById( ids[1] );
  var crValue = parseInt(price.value);

  //updating the total sum v1
  var totalPrice=document.getElementById("total");
  totalPrice.value=parseInt(totalPrice.value)-crValue

  //updating the price
  crValue = crValue + (crValue/(currentValue-1));
  price.value = crValue;

  //updating the total sum v2
  totalPrice.value=parseInt(totalPrice.value)+crValue

  //database total sum
  callIncrease(ids[2])
}

//decreasing the total on the page
function decrease(event){
  //getting different ids
  const ids = event.target.dataset.id.split(" ");

  //handling and decreasing the quantity
  var textField = document.getElementById( ids[0] );
  var currentValue = parseInt(textField.value);

  //handling the price
  var price = document.getElementById( ids[1] );
  var crValue = parseInt(price.value);

  //updating the total sum v1
  var totalPrice=document.getElementById("total");
  totalPrice.value=parseInt(totalPrice.value)-crValue

  //updating quantity
  if(currentValue>1){
    crValue = crValue - (crValue/(currentValue));
    currentValue = currentValue - 1;
    //database total price
    callDecrease(ids[2])
  }
  textField.value = currentValue;

  //updating total and original price
  price.value = crValue;
  totalPrice.value=parseInt(totalPrice.value)+crValue
}

function removeFromCart(event){
    const ids = event.target.dataset.id.split(" ");
    const prod=document.getElementById(ids[0]);
    const check=document.getElementById(ids[3]);


    var totalPrice=document.getElementById("total");
    if(check.value==1){
        totalPrice.value-=document.getElementById(ids[1]).value
    }

    prod.classList.add("hide");
    
}

function remove(event){
    const ids = event.target.dataset.id.split(" ");
    const prod=document.getElementById(ids[0]);

    var totalPrice=document.getElementById("total");
    const check=document.getElementById(ids[2]);
    const but1=document.getElementById(ids[3]);
    const but2=document.getElementById(ids[4]);
    if(check.value==1){
        totalPrice.value=parseInt(totalPrice.value)-parseInt(document.getElementById(ids[1]).value)
        check.value=0
        but1.classList.add("remove")
        but2.classList.add("remove")
        prod.classList.add("table-active")
    }
    else{
        check.value=1
        prod.classList.remove("table-active")
        but1.classList.remove("remove")
        but2.classList.remove("remove")
        totalPrice.value=parseInt(totalPrice.value)+parseInt(document.getElementById(ids[1]).value)
    }
}