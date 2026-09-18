(function () {
  var el = document.getElementById("project-map");
  if (!el || typeof L === "undefined" || !window.mapSites) return;

  var map = L.map(el);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  var currentIcon = L.divIcon({ className: "project-map__marker project-map__marker--current", iconSize: [16, 16] });
  var pastIcon = L.divIcon({ className: "project-map__marker project-map__marker--past", iconSize: [14, 14] });

  var bounds = [];

  (window.mapSites.current || []).forEach(function (site) {
    L.marker([site.lat, site.lng], { icon: currentIcon })
      .addTo(map)
      .bindPopup("<strong>" + site.name + "</strong><br>Current research site");
    bounds.push([site.lat, site.lng]);
  });

  (window.mapSites.past || []).forEach(function (site) {
    L.marker([site.lat, site.lng], { icon: pastIcon })
      .addTo(map)
      .bindPopup("<strong>" + site.name + "</strong><br>Past project");
    bounds.push([site.lat, site.lng]);
  });

  if (bounds.length) {
    map.fitBounds(bounds, { padding: [30, 30] });
  } else {
    map.setView([20, 0], 2);
  }
})();
