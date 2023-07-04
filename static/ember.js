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
//Adult
document.getElementById('adult-minus').onclick = ()=>{
  document.getElementById('adult').value = parseInt(document.getElementById('adult').value)-1;
}
document.getElementById('adult-plus').onclick = ()=>{
  document.getElementById('adult').value = parseInt(document.getElementById('adult').value)+1;
}
//concession 
document.getElementById('cc-minus').onclick = ()=>{
  document.getElementById('cc').value = parseInt(document.getElementById('cc').value)-1;
}
document.getElementById('cc-plus').onclick = ()=>{
  document.getElementById('cc').value = parseInt(document.getElementById('cc').value)+1;
}

//child
document.getElementById('child-minus').onclick = ()=>{
  document.getElementById('child').value = parseInt(document.getElementById('child').value)-1;
}
document.getElementById('child-plus').onclick = ()=>{
  document.getElementById('child').value = parseInt(document.getElementById('child').value)+1;
}

//young child
document.getElementById('young-minus').onclick = ()=>{
  document.getElementById('young').value = parseInt(document.getElementById('young').value)-1;
}
document.getElementById('young-plus').onclick = ()=>{
  document.getElementById('young').value = parseInt(document.getElementById('young').value)+1;
}

//Bicycle
document.getElementById('bi-minus').onclick = ()=>{
  document.getElementById('bi').value = parseInt(document.getElementById('bi').value)-1;
}
document.getElementById('bi-plus').onclick = ()=>{
  document.getElementById('bi').value = parseInt(document.getElementById('bi').value)+1;
}

//Wheelchairs
document.getElementById('w-minus').onclick = ()=>{
  document.getElementById('w').value = parseInt(document.getElementById('w').value)-1;
}
document.getElementById('w-plus').onclick = ()=>{
  document.getElementById('w').value = parseInt(document.getElementById('w').value)+1;
}
function swapBoxes() {
  var from = document.getElementById("from");
  var to = document.getElementById("to");

  var tempValue = from.value;

  from.value = to.value;
  to.value = tempValue;
}

