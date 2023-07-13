fetch('/api/routes')
  .then(r => r.json())
  .then(r => {
    for (let s of r.stops) {
      let opt = document.createElement('option');
      opt.innerHTML = s.name;
      opt.value = s.stopId;
      document.getElementById('from').append(opt);
    }

    for (let s of r.stops) {
      let opt = document.createElement('option');
      opt.innerHTML = s.name;
      opt.value = s.stopId;
      document.getElementById('to').append(opt);
    }
  })
document.getElementById('search').onclick = () => {
  fetch(`/api/quote/${document.getElementById("from").value}/${document.getElementById("to").value}/${document.getElementById('whn').value}`)
    .then(r => r.json())
    .then(r => {
      // var fromSelect = document.getElementById("from");
      // var toSelect = document.getElementById("to");
      // var fromText = fromSelect.options[fromSelect.selectedIndex].text;
      // var toText = toSelect.options[toSelect.selectedIndex].text;

      // document.getElementById('quotes').innerHTML = "From " + fromText + " to " + toText;
      document.getElementById('quotes').innerHTML = `<h4>From ${document.getElementById("from").options[document.getElementById("from").selectedIndex].text} to ${document.getElementById("to").options[document.getElementById('to').selectedIndex].text}</h4>`;
      for (let s of r.services) {
        var adultCount = parseInt(document.getElementById("adult").value);
        var childCount = parseInt(document.getElementById("child").value);
        var totalAmount = (adultCount * s.prices.adult) + (childCount * s.prices.child);
        let div = document.createElement('div');
        if (s.availability.seat > 0) {
          const div = document.createElement("div");
          div.innerHTML = `<b>Available</b> Adult: ${adultCount} Child: ${childCount}<br>
                            Departs: ${s.depart} Arrives: ${s.arrive} Seats free: ${s.availability.seat}<br>
                            Price: ${totalAmount}£-<br>
                            <button class="book-button">Book</button>
                            <div class="popup" style="display: none;">
                              <div class="popup-content">
                                <h2>Details of Booking</h2>
                               <b> <center>From ${document.getElementById("from").options[document.getElementById("from").selectedIndex].text}
                                to ${document.getElementById("to").options[document.getElementById('to').selectedIndex].text}</center></b><br>
                                Departs: ${s.depart}<br>
                                Arrives: ${s.arrive}<br>
                                Adult: ${adultCount} Child: ${childCount}<br>
                                Price: ${totalAmount}£-<br>
                                <button class="close-button" type="submit" class="btn btn-primary">Cancel</button>
                                <button class="confirm-button" type="submit" class="btn btn-primary">Confirm</button>
                              </div>
                            </div>`;

          document.getElementById('quotes').appendChild(div);

          document.getElementById('quotes').onclick=()=>{
            if (event.target.classList.contains('book-button')) {
              const popup = event.target.nextElementSibling;
              popup.style.display = 'block';
            } else if (event.target.classList.contains('close-button')) {
              const popup = event.target.closest('.popup');
              popup.style.display = 'none';
            } else if (event.target.classList.contains('confirm-button')) {
              alert('Thank you for booking!');
            }
          };
        }
        else {
          div.innerHTML = `<b>unavaliable</b><br>Departs: ${s.depart} Arrives:${s.arrive} Seats free:${s.availability.seat}`;
          document.getElementById('quotes-di').append(div);
        }
      }

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

function incrementW(id) {
  var input = document.getElementById(id);
  var value = parseInt(input.value);
  if (value < 1) {
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
var current_date = new Date();
current_date.setDate(current_date.getDate() + 1);
var format = current_date.toISOString().substr(0, 10);
document.getElementById("whn").value = format;
