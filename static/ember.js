fetch("/api/routes")
  .then((r) => r.json())
  .then((r) => {
    for (let s of r.stops) {
      let opt = document.createElement("option");
      opt.innerHTML = s.name;
      opt.value = s.stopId;
      document.getElementById("from").append(opt);
    }

    for (let s of r.stops) {
      let opt = document.createElement("option");
      opt.innerHTML = s.name;
      opt.value = s.stopId;
      document.getElementById("to").append(opt);
    }
  });

document.getElementById("search").onclick = () => {
  fetch(
    `/api/quote/${document.getElementById("from").value}/${
      document.getElementById("to").value
    }/${document.getElementById("whn").value}`
  )
    .then((r) => r.json())
    .then((r) => {
      for (let s of r.services) {
        let div = document.createElement("div");
        div.innerHTML = `Departs: ${s.depart}`;
        document.getElementById("quotes").append(div);
      }
    });
};
