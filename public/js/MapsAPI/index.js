function initMap() {
  let map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 40.416775, lng: -3.70379 },
    zoom: 13,
  });
  let input = document.getElementById("searchInput");
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  let autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo("bounds", map);

  let infowindow = new google.maps.InfoWindow();
  let marker = new google.maps.Marker({
    map: map,
    anchorPoint: new google.maps.Point(0, -29),
  });

  autocomplete.addListener("place_changed", function () {
    infowindow.close();
    marker.setVisible(false);
    let place = autocomplete.getPlace();
    if (!place.geometry) {
      window.alert("Autocomplete's returned place contains no geometry");
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);
    let address = "";
    if (place.address_components) {
      address = [
        (place.address_components[0] &&
          place.address_components[0].short_name) ||
          "",
        (place.address_components[1] &&
          place.address_components[1].short_name) ||
          "",
        (place.address_components[2] &&
          place.address_components[2].short_name) ||
          "",
      ].join(" ");
    }

    infowindow.setContent(
      "<div><strong>" + place.name + "</strong><br>" + address
    );
    infowindow.open(map, marker);
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    const lats = document.querySelector("#lat");
    lats.value = lat;

    const long = document.querySelector("#log");
    long.value = lng;
  });
}

function indexMap() {
  const ironhackMAD = {
    lat: 40.3977381,
    lng: -3.690471916,
  };
  const mapIndex = new google.maps.Map(document.getElementById("mapIndex"), {
    zoom: 14,
    center: ironhackMAD,
  });

  // Markers
  getCybers()
    .then((cybers) => {
      const markers = placeMarkers(mapIndex, cybers);
    })
    .catch((error) => console.log(error));
}

function getCybers() {
  return axios.get("/cyber/api").then((response) => response.data.cybers);
}

function placeMarkers(mapIndex, cybers) {
  const markers = [];
  cybers.forEach((cyber) => {
    let infowindow = new google.maps.InfoWindow();

    infowindow.setContent(
      "<div><strong>" +
        "<a href=/cyber/details-cyber?id=" +
        cyber._id +
        ">" +
        cyber.name +
        "</a>" +
        "</strong><br>" +
        "<br>" +
        cyber.location_name +
        "<br>" +
        "<br>" +
        cyber.description
    );
    const center = {
      lat: cyber.location.coordinates[0],
      lng: cyber.location.coordinates[1],
    };
    const newMarker = new google.maps.Marker({
      position: center,
      map: mapIndex,
      title: cyber.name,
      icon: {
        url: "/images/GeneralMarker.svg",
        scaledSize: new google.maps.Size(55, 45),
      },
    });

    newMarker.addListener("click", () => {
      infowindow.open(mapIndex, newMarker);
      setTimeout(() => {
        infowindow.close();
      }, 4000);
    });
    markers.push(newMarker);
  });

  return markers;
}

function BunisessMap() {
  const ironhackMAD = {
    lat: 40.3977381,
    lng: -3.690471916,
  };
  const mapProfile = new google.maps.Map(
    document.getElementById("MapBusiness"),
    {
      zoom: 14,
      center: ironhackMAD,
    }
  );

  // Markers
  getCybersBusiness()
    .then((cybers) => {
      const markers = cyberProfileMarkers(mapProfile, cybers);
      console.log(markers);
    })
    .catch((error) => console.log(error));
}

function ProfileMap() {
  const ironhackMAD = {
    lat: 40.3977381,
    lng: -3.690471916,
  };
  const mapProfile = new google.maps.Map(
    document.getElementById("MapProfile"),
    {
      zoom: 14,
      center: ironhackMAD,
    }
  );

  // Markers
  getCybersBusiness()
    .then((cybers) => {
      const markers = cyberProfileMarkers(mapProfile, cybers);
      console.log(markers);
    })
    .catch((error) => console.log(error));
}

function getCybersBusiness() {
  const id = document.querySelector("#userID").value;
  console.log("------->", id);
  return axios
    .get(`/cyber/api/${id}/owner`)
    .then((response) => response.data.cybers);
}

function cyberProfileMarkers(mapProfile, cybers) {
  const markers = [];
  cybers.forEach((cyber) => {
    let infowindow = new google.maps.InfoWindow();

    infowindow.setContent(
      "<div><strong>" +
        "<a href=/cyber/details-cyber?id=" +
        cyber._id +
        ">" +
        cyber.name +
        "</a>" +
        "</strong><br>" +
        "<br>" +
        cyber.location_name +
        "<br>" +
        "<br>" +
        cyber.description
    );
    const center = {
      lat: cyber.location.coordinates[0],
      lng: cyber.location.coordinates[1],
    };

    const newMarker = new google.maps.Marker({
      position: center,
      map: mapProfile,
      title: cyber.name,
      icon: {
        url: "/images/MarkerPersonal.svg",
        scaledSize: new google.maps.Size(55, 45),
      },
    });
    newMarker.addListener("click", () => {
      infowindow.open(mapProfile, newMarker);
      setTimeout(() => {
        infowindow.close();
      }, 4000);
    });
    markers.push(newMarker);
  });
  return markers;
}



function DetailsMap() {
  const mapLatitude = Number(document.querySelector("#latitude").value);
  const mapLongitude = Number(document.querySelector("#longitude").value);
  const Cyber = {
    lat: mapLatitude,
    lng: mapLongitude,
  };
  const mapDetails = new google.maps.Map(
    document.getElementById("mapDetails"),
    {
      zoom: 14,
      center: Cyber,
    }
  );

  //Markers

  cyberMarkers(mapDetails, mapLatitude, mapLongitude);
}

function getCyber() {
  axios.get("/cyber/api/:id").then((response) => {
    coordinates = response.data.coordinates;
  });
}

function cyberMarkers(mapDetails, lat, lng) {
  const center = {
    lat: lat,
    lng: lng,
  };
  const newMarker = new google.maps.Marker({
    position: center,
    map: mapDetails,
    icon: {
      url: "/images/GeneralMarker.svg",
      scaledSize: new google.maps.Size(55, 45),
    },
  });
  return newMarker;
}
