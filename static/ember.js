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
      document.getElementById('quotes').innerHTML = `From ${document.getElementById("from").value} to ${document.getElementById("to").value}`;
      for (let s of r.services){
        let div = document.createElement('div');
        div.innerHTML = `Departs: ${s.depart} Arrives:${s.arrive} Seats free:${s.availability.seat}`;
        document.getElementById('quotes').append(div);
      }
    })
}
function increment(category) {
  var input = document.getElementById(category);
  var value = parseInt(input.value);
  
  if (value === 0) {
    input.value = 1;
  } else {
    input.value = value + 1;
  }
}
function decrement(category) {
  var input = document.getElementById(category);
  var value = parseInt(input.value);
  
  if (value <= 1) {
    alert("Quantity cannot be zero.");
  } else {
    input.value = value - 1;
  }
}
function increment1(id) {
  var input = document.getElementById(id);
  var value = parseInt(input.value);
  if (value < 2) {
    input.value = value + 1;
  }
}

function decrement1(id) {
  var input = document.getElementById(id);
  var value = parseInt(input.value);
  if (value > 0) {
    input.value = value - 1;
  }
}
function swapBoxes() {
  var from = document.getElementById("from");
  var to = document.getElementById("to");

  var tempValue = from.value;

  from.value = to.value;
  to.value = tempValue;
}

