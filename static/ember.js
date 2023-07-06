fetch('/api/routes')
  .then(r=>r.json())
  .then(r=>{
    for(let s of r.stops){
      let opt = document.createElement('option');
      opt.innerHTML = s.name;
      opt.value = s.stopId;
      document.getElementById('from').append(opt);
    }

    for(let s of r.stops){
      let opt = document.createElement('option');
      opt.innerHTML = s.name;
      opt.value = s.stopId;
      document.getElementById('to').append(opt);
    }
})
document.getElementById('search').onclick = ()=>{
  fetch(`/api/quote/${document.getElementById("from").value}/${document.getElementById("to").value}/${document.getElementById('whn').value}`)
    .then(r=>r.json())
    .then(r=>{
      // var fromSelect = document.getElementById("from");
      // var toSelect = document.getElementById("to");
      // var fromText = fromSelect.options[fromSelect.selectedIndex].text;
      // var toText = toSelect.options[toSelect.selectedIndex].text;

      // document.getElementById('quotes').innerHTML = "From " + fromText + " to " + toText;
      document.getElementById('quotes').innerHTML = `From ${document.getElementById("from").options[document.getElementById("from").selectedIndex].text} to ${document.getElementById("to").options[document.getElementById('to').selectedIndex].text}`;
      for (let s of r.services){
        let div = document.createElement('div');
        div.innerHTML = `Departs: ${s.depart} Arrives:${s.arrive} Seats free:${s.availability.seat} Price:Adult:${s.prices.adult} Child:${s.prices.child} Concession:${s.prices.concession}`;
        document.getElementById('quotes').append(div);
      }
      console.log(r);
    })
}
function increment(category) {
  var input = document.getElementById(category);
  var value = parseInt(input.value);
  
  if (value === 0) {
    input.value = 1;
    updateDisplay();
  } else {
    input.value = value + 1;
    updateDisplay();
  }
}
function decrement(category) {
  var input = document.getElementById(category);
  var value = parseInt(input.value);
  
  if (value <= 1) {
    alert("Quantity cannot be zero.");
  } else {
    input.value = value - 1;
    updateDisplay();
  }
}

function increment2(category) {
  var input = document.getElementById(category);
  var value = parseInt(input.value);
  
  if (value === 0) {
    input.value = 1;
    updateDisplay();
  } else {
    input.value = value + 1;
    updateDisplay();
  }
}
function decrement2(category) {
  var input = document.getElementById(category);
  var value = parseInt(input.value);
  
  if (value <= 1) {
    input.value = 0;
    updateDisplay();
  } else {
    input.value = value - 1;
    updateDisplay();
  }
}
function increment1(id) {
  var input = document.getElementById(id);
  var value = parseInt(input.value);
  if (value < 2) {
    input.value = value + 1;
    updateDisplay();
  }
}

function decrement1(id) {
  var input = document.getElementById(id);
  var value = parseInt(input.value);
  if (value > 0) {
    input.value = value - 1;
    updateDisplay();

  }
}
function swapBoxes() {
  var from = document.getElementById("from");
  var to = document.getElementById("to");

  var tempValue = from.value;

  from.value = to.value;
  to.value = tempValue;
}

function updateDisplay() {
  var adultCount = parseInt(document.getElementById("adult").value);
  var concessionCount = parseInt(document.getElementById("cc").value);
  var childrenCount = parseInt(document.getElementById("child").value);
  var youngChildrenCount = parseInt(document.getElementById("young").value);
  var bicycleCount = parseInt(document.getElementById("bi").value);
  var wheelchairCount = parseInt(document.getElementById("w").value);

  var totalCount = adultCount + concessionCount + childrenCount + youngChildrenCount + bicycleCount + wheelchairCount;
  var totalAmount = totalCount*20;

  var displayDiv = document.getElementById("display");
  displayDiv.innerHTML = "Totals: " + totalCount +"("+ totalAmount + "$)" 
    "<br><br>Adults: " + adultCount +
    "<br>Concession: " + concessionCount +
    "<br>Children: " + childrenCount +
    "<br>Young Children: " + youngChildrenCount +
    "<br>Bicycles: " + bicycleCount +
    "<br>Wheelchairs: " + wheelchairCount;
    
}
