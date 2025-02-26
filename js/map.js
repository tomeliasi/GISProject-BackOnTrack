var map = L.map('map', {
    zoomControl: true,
    maxZoom: 28,
    minZoom: 1
});
map.setView([31.8, 34.65], 9); // מרכז את המפה על אשדוד ברמת זום
    var hash = new L.Hash(map);
    map.attributionControl.setPrefix('<a href="https://github.com/tomchadwin/qgis2web" target="_blank">qgis2web</a> &middot; <a href="https://leafletjs.com" title="A JS library for interactive maps">Leaflet</a> &middot; <a href="https://qgis.org">QGIS</a>');
    var autolinker = new Autolinker({truncate: {length: 30, location: 'smart'}});
    var bounds_group = new L.featureGroup([]);
    function setBounds() {
    }
    map.createPane('pane_OSMStandard_0');
    map.getPane('pane_OSMStandard_0').style.zIndex = 400;
    var layer_OSMStandard_0 = L.tileLayer('http://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        pane: 'pane_OSMStandard_0',
        opacity: 1.0,
        attribution: '<a href="https://www.openstreetmap.org/copyright">© OpenStreetMap contributors, CC-BY-SA</a>',
        minZoom: 1,
        maxZoom: 28,
        minNativeZoom: 0,
        maxNativeZoom: 19
    });
    layer_OSMStandard_0;
    map.addLayer(layer_OSMStandard_0);

    var mapControlsContainer = document.getElementsByClassName("leaflet-control")[0];
    var logoContainer = document.getElementById("logoContainer");
    mapControlsContainer.appendChild(logoContainer);

    //set popup contents: image + table with attributes values
    function pop_Stores_1(feature, layer) {
        var popupContent =
      '<div style="max-height: 1000px; overflow-y: auto; width: 250px; text-align: center; padding: 10px;">' +
      // תמונה בראש הפופאפ
      '<img src="' +
      feature.properties["Image"] +
      '" style="max-width: 70%; max-height: 150px; display: block; margin-left: 20px; border-radius: 8px;">' +
      // טבלה של נתונים
      '<table dir="ltr" lang="en" style="font-size:14px; text-align:right; width: 100%;">' + 
      // שורה: שם המקום
      "<tr>" +
      '<td colspan="2" style="font-size:18px; font-weight:bold; text-align:center;">' + 
      (feature.properties["Name"] !== null
        ? autolinker.link(feature.properties["Name"].toLocaleString())
        : "") +
      "</td>" +
      "</tr>" +
      // שורה: כתובת
      "<tr>" +
      '<td colspan="2" style="padding-top: 5px; text-align:center;">' +
      '<img src="images/LocationPin.png" height="13">' +
      " " +
      (feature.properties["Address"] !== null
        ? autolinker.link(feature.properties["Address"].toLocaleString())
        : "") +
      "</td>" +
      "</tr>" +
          // כותרת "שעות פתיחה"
          "<tr>" +
          '<td colspan="2" style="font-weight:bold; text-align:right; padding-top: 10px;">Opening Hours:</td>' +
          "</tr>" +
          // שעות פתיחה לכל יום והשעה באותה שורה
          (feature.properties["sunday"] !== null
            ? "<tr><td style='padding: 5px 5px 5px 0;'>Sunday:</td><td style='padding: 5px 0;'>"
              + autolinker.link(feature.properties["sunday"].toLocaleString()) + "</td></tr>"
            : "") +
          (feature.properties["monday"] !== null
            ? "<tr><td style='padding: 5px 5px 5px 0;'>Monday:</td><td style='padding: 5px 0;'>"
              + autolinker.link(feature.properties["monday"].toLocaleString()) + "</td></tr>"
            : "") +
          (feature.properties["tuesday"] !== null
            ? "<tr><td style='padding: 5px 5px 5px 0;'>Tuesday:</td><td style='padding: 5px 0;'>"
              + autolinker.link(feature.properties["tuesday"].toLocaleString()) + "</td></tr>"
            : "") +
          (feature.properties["wednesday"] !== null
            ? "<tr><td style='padding: 5px 5px 5px 0;'>Wednesday:</td><td style='padding: 5px 0;'>"
              + autolinker.link(feature.properties["wednesday"].toLocaleString()) + "</td></tr>"
            : "") +
          (feature.properties["thursday"] !== null
            ? "<tr><td style='padding: 5px 5px 5px 0;'>Thursday:</td><td style='padding: 5px 0;'>"
              + autolinker.link(feature.properties["thursday"].toLocaleString()) + "</td></tr>"
            : "") +
          (feature.properties["friday"] !== null
            ? "<tr><td style='padding: 5px 5px 5px 0;'>Friday:</td><td style='padding: 5px 0;'>"
              + autolinker.link(feature.properties["friday"].toLocaleString()) + "</td></tr>"
            : "") +
          (feature.properties["saturday"] !== null
            ? "<tr><td style='padding: 5px 5px 5px 0;'>Saturday:</td><td style='padding: 5px 0;'>"
              + autolinker.link(feature.properties["saturday"].toLocaleString()) + "</td></tr>"
            : "") +
          // טלפון
          "<tr>" +
          '<td colspan="2" style="white-space: nowrap; text-align:right; padding-top: 10px;">' +
          '<img src="images/Telephone.png" height="14" style="vertical-align:middle;"> ' +
          (feature.properties["telephone"] !== null
            ? autolinker.link(feature.properties["telephone"].toLocaleString())
            : "") +
          "</td>" +
          "</tr>" +
          // דירוג)
          "<tr>" +
          '<td colspan="2" style="text-align:right; padding-top: 10px;">✔ Rating: ' +
          paint_business(feature.properties["business"]) +
          "</td>" +
          "</tr>" +
     // Delivery Option
    (feature.properties["shipping"] === "yes"
    ? "<tr><td colspan='2' style='text-align:right;'>✔ Delivery Option</td></tr>"
    : "") +

    // Child Friendly
    (feature.properties["child_friendly"] === "yes"
    ? "<tr><td colspan='2' style='text-align:right;'>✔ Child Friendly</td></tr>"
    : "") +

    // Special Offer
    (feature.properties["special_offer"] !== null && feature.properties["special_offer"] !== ""
    ? "<tr><td colspan='2' style='text-align:right; padding-top: 10px; color: red; font-weight: bold;'>Special Offer:</td></tr>" +
    "<tr><td colspan='2' style='text-align:right; color: red;'>" + feature.properties["special_offer"] + "</td></tr>"
    : "") +
          // אתר אינטרנט
          "<tr>" +
          '<td colspan="2" style="text-align:right; padding-top: 10px;">' +
          '<img src="images/WebSite.png" height="14" style="vertical-align:middle;"> ' +
          (feature.properties["link"] !== null && feature.properties["link"] !== ""
            ? '<a href="' +
              feature.properties["link"].toLocaleString() +
              '" target="_blank">' +
              autolinker.link(feature.properties["link"].toLocaleString())
            : "No Website Available") +
          "</td>" +
          "</tr>" +
          "</table>" +
          "</div>";
      
        layer.bindPopup(popupContent, { maxWidth: 250 });
    }
    
    
    
    

    //center popup and marker when pressed
    map.on('popupopen', function(e) {
        //find the pixel location on the map where the popup anchor is
        var px = map.project(e.popup._latlng);
        //find the height of the popup container, divide by 2, subtract from the Y axis of marker location
        px.y -= e.popup._container.clientHeight/2;
        //pan to new center
        map.panTo(map.unproject(px),{animate: true});
    });

    function check_x_mark(option){
        if(option == "yes")
            return "<img src=\"images/CheckSymbol.png\" height=20>"
        else
            return "<img src=\"images/xmark.png\" height=20>"

    }

    function paint_business(rank) {
      rank = Math.floor(rank);
      let text = "";
      
      // תחילה מציירים את המלאים
      for (let i = 0; i < rank; i++) {
          text += '<img src="images/FullBusiness.png" height="30">';
      }
      
      // לאחר מכן מציירים את הריקים
      for (let i = rank; i < 5; i++) {
          text += '<img src="images/EmptyBusiness.png" height="26">';
      }
  
      return text;
    }


    function style_Stores_1_0() {
        return {
            pane: 'pane_Stores_1',
    rotationAngle: 0.0,
    rotationOrigin: 'center center',
    icon: L.icon({
        iconUrl: 'images/marker.svg',
        iconSize: [34.199999999999996, 34.199999999999996]
    }),
            interactive: true,
        }
    }

    function style_Stores_1_0() {
        return {
            pane: 'pane_Stores_1',
            radius: 8.0,
            opacity: 1,
            color: 'rgba(50,87,128,1.0)',
            dashArray: '',
            lineCap: 'butt',
            lineJoin: 'miter',
            weight: 2.0,
            fill: true,
            fillOpacity: 1,
            fillColor: 'rgba(43,46,182,1.0)',
            interactive: true,
        }
    }

    map.createPane('pane_Stores_1');
    map.getPane('pane_Stores_1').style.zIndex = 401;
    map.getPane('pane_Stores_1').style['mix-blend-mode'] = 'normal';



    var layer_Stores_1 = new L.geoJson(json_Stores_1, {
        attribution: '',
        interactive: true,
        dataVar: 'json_Stores_1',
        layerName: 'layer_Stores_1',
        pane: 'pane_Stores_1',
        onEachFeature: pop_Stores_1,
        pointToLayer: function (feature, latlng) {
            var context = {
                feature: feature,
                variables: {}
            };
            return L.marker(latlng, style_Stores_1_0(feature));
        },
    });
    bounds_group.addLayer(layer_Stores_1);
    map.addLayer(layer_Stores_1);
    map.on("zoomend", function(){

            if (map.hasLayer(layer_Stores_1)) {
                if (map.getZoom() <= 12 && map.getZoom() >= 19) {
                    layer_Stores_1.eachLayer(function (layer) {
                        layer.openTooltip();
                    });
                } else {
                    layer_Stores_1.eachLayer(function (layer) {
                        layer.closeTooltip();
                    });
                }
            }
    });
    setBounds();
    var i = 0;
    layer_Stores_1.eachLayer(function(layer) {
        var context = {
            feature: layer.feature,
            variables: {}
        };
    layer.bindTooltip((exp_label_Stores_1_eval_expression(context) !== null?String('<div style="color: #0000e4; font-size: 12pt; font-weight: bold; font-family: \'Lato Black\', sans-serif;">' + exp_label_Stores_1_eval_expression(context)) + '</div>':''), {permanent: true, offset: [-0, -16], className: 'css_Stores_1'});
        labels.push(layer);
        totalMarkers += 1;
        layer.added = true;
        addLabel(layer, i);
        i++;
    });
            if (map.hasLayer(layer_Stores_1)) {
                if (map.getZoom() <= 12 && map.getZoom() >= 19) {
                    layer_Stores_1.eachLayer(function (layer) {
                        layer.openTooltip();
                    });
                } else {
                    layer_Stores_1.eachLayer(function (layer) {
                        layer.closeTooltip();
                    });
                }
            }

    //show tooltip on certain zoom levels
    map.on('zoomend', function() {
        var i = 0;
        if (map.getZoom() >= 16) { //close-up zoom -> show tooltip with name & price
            layer_Stores_1.eachLayer(function(layer) {
                var context = {
                    feature: layer.feature,
                    variables: {}
                };
                
                layer.bindTooltip((exp_label_Stores_1_eval_expression(context) !== null?String('<div style="color: #0000e4; font-size: 11pt; font-weight: bold; text-align:center; font-family: \'Lato Black\', sans-serif;">' + exp_label_Stores_1_eval_expression(context)) + '</div>':''), {permanent: true, offset: [40, -30], className: 'css_Stores_1'});
                labels.push(layer);
                totalMarkers += 1;
                layer.added = true;
                addLabel(layer, i);
                i++;
            });
        }
        else { //distanced zoom -> remove tooltip
            layer.unbindTooltip();
        }
    });
    
            
    // create menu side bar
    var mapDiv = document.getElementById('map');
    var row = document.createElement('div');
    row.className="row";
    row.id="all";
    row.style.height = "100%";
    var col1 = document.createElement('div');
    col1.className="col9";
    col1.id = "mapWindow";
    col1.style.height = "100%";
    col1.style.width = "80%";
    col1.style.display = "inline-block";		
    col1.style.float="left";
    var col2 = document.createElement('div');
    col2.className="col3";
    col2.id = "menu";
    col2.style.float="left";
    col2.width="90%";
    mapDiv.parentNode.insertBefore(row, mapDiv);
    document.getElementById("all").appendChild(col1);
    document.getElementById("all").appendChild(col2);
    col1.appendChild(mapDiv)

    ///// --- Label - filter --- ////
    document.getElementById("menu").appendChild(document.createElement("div"));
    var filter_label =  document.createElement('div');
    filter_label.innerHTML = "Search Filter Panel";
    filter_label.style.fontSize="35px";
    filter_label.style.fontWeight="bold";
    filter_label.style.color = "#191970";
    filter_label.style.margin="30px 10px";
    filter_label.style.textAlign = "center";
    document.getElementById("menu").appendChild(filter_label);

// יצירת קונטיינר לחיפוש
var searchContainer = document.createElement("div");
searchContainer.style.margin = "10px 10px";
searchContainer.style.display = "flex";
searchContainer.style.gap = "7px";
searchContainer.style.direction = "ltr";

// יצירת שדה חיפוש
var searchInput = document.createElement("input");
searchInput.type = "text";
searchInput.id = "searchInput";
searchInput.placeholder = "Search by Name or Location";
searchInput.style.width = "80%";
searchInput.style.padding = "8px";
searchInput.style.fontSize = "16px";
searchInput.style.border = "1px solid #ccc";
searchInput.style.borderRadius = "5px";

// יצירת כפתור חיפוש
var searchButton = document.createElement("button");
searchButton.innerHTML = "Search";
searchButton.style.padding = "8px";
searchButton.style.marginLeft = "10px";
searchButton.style.fontSize = "16px";
searchButton.style.backgroundColor = "#87CEFA";
searchButton.style.color = "black";
searchButton.style.border = "none";
searchButton.style.borderRadius = "5px";
searchButton.style.cursor = "pointer";


// פונקציה שתופעל בלחיצה על החיפוש
searchButton.onclick = function() {
    var searchValue = document.getElementById("searchInput").value.toLowerCase();
    filteringFunctionByNameOrLocation(searchValue);
};

// הוספת השדה והכפתור ל-container
searchContainer.appendChild(searchInput);
searchContainer.appendChild(searchButton);

// הוספת ה-container ל-"menu"
document.getElementById("menu").appendChild(searchContainer);
// יצירת כפתור קריסה לפילטר Location
var locationButton = document.createElement("button");
locationButton.innerHTML = "Location ▼";
locationButton.className = "collapsible";
locationButton.style.width = "100%";
locationButton.style.padding = "10px";
locationButton.style.fontSize = "18px";
locationButton.style.marginTop = "10px";
locationButton.style.border = "1px solid #ccc";
locationButton.style.cursor = "pointer";
locationButton.style.backgroundColor = "#f8f8f8";

// יצירת תוכן נסתר עבור אפשרויות מיקום
var locationContent = document.createElement("div");
locationContent.className = "content";
locationContent.style.display = "none";
locationContent.style.padding = "10px";
locationContent.innerHTML = `
    <input type="text" id="locationSearch" placeholder="Enter Location" style="width: 90%; padding: 8px; margin: 5px 0; text-align: left;">
    <button onclick="filterStores()" style="width: 100%; padding: 8px; margin-top: 5px; background-color: #007bff; color: white; border: none;">Apply</button>
`;

// יצירת כפתור קריסה לפילטר Business Type
var businessTypeButton = document.createElement("button");
businessTypeButton.innerHTML = "Business Type ▼";
businessTypeButton.className = "collapsible";
businessTypeButton.style.width = "100%";
businessTypeButton.style.padding = "10px";
businessTypeButton.style.fontSize = "18px";
businessTypeButton.style.marginTop = "10px";
businessTypeButton.style.border = "1px solid #ccc";
businessTypeButton.style.cursor = "pointer";
businessTypeButton.style.backgroundColor = "#f8f8f8";

var businessTypeContent = document.createElement("div");
businessTypeContent.className = "content";
businessTypeContent.style.display = "none";
businessTypeContent.style.padding = "10px";

// יצירת ה- select עם ID מתאים
var businessTypeSelect = document.createElement("select");
businessTypeSelect.id = "businessTypeSelect";
businessTypeSelect.style.width = "100%";
businessTypeSelect.style.padding = "8px";
businessTypeSelect.style.textAlign = "left";


// ניקוי האפשרויות הקודמות והוספת אפשרות "All Business Types"
businessTypeSelect.innerHTML = "";
var defaultOption = document.createElement("option");
defaultOption.value = "";
defaultOption.text = "All Business Types";
businessTypeSelect.appendChild(defaultOption);

// מציאת כל הערכים הייחודיים של business_type
var businessTypesSet = new Set();
json_Stores_1.features.forEach(feature => {
    if (feature.properties["business_type"]) {
        businessTypesSet.add(feature.properties["business_type"]);
    }
});

// המרת הסט למערך ומיון האלפביתי
var businessTypesArray = Array.from(businessTypesSet).sort();

// הוספת כל סוגי העסקים שנמצאו בנתונים
businessTypesArray.forEach(type => {
    var option = document.createElement("option");
    option.value = type;
    option.text = type;
    businessTypeSelect.appendChild(option);
});

// הוספת אירוע שינוי שיגרום להפעלת סינון מחדש כאשר המשתמש משנה את הבחירה
businessTypeSelect.addEventListener("change", function() {
    filterStores();
});

// הוספת ה-select ל-div של הפילטר
businessTypeContent.appendChild(businessTypeSelect);

// יצירת כפתור Apply להפעלת הפילטר
var applyButton = document.createElement("button");
applyButton.innerHTML = "Apply";
applyButton.style.width = "100%";
applyButton.style.padding = "8px";
applyButton.style.marginTop = "5px";
applyButton.style.backgroundColor = "#007bff";
applyButton.style.color = "white";
applyButton.style.border = "none";
applyButton.style.cursor = "pointer";
applyButton.addEventListener("click", function() {
    filterStores();
});

// הוספת הכפתור ל-div
businessTypeContent.appendChild(applyButton);


// יצירת כפתור קריסה לפילטר Opening Hours
var openingHoursButton = document.createElement("button");
openingHoursButton.innerHTML = "Opening Days ▼";
openingHoursButton.className = "collapsible";
openingHoursButton.style.width = "100%";
openingHoursButton.style.padding = "10px";
openingHoursButton.style.fontSize = "18px";
openingHoursButton.style.marginTop = "10px";
openingHoursButton.style.border = "1px solid #ccc";
openingHoursButton.style.cursor = "pointer";
openingHoursButton.style.backgroundColor = "#f8f8f8";

// יצירת תוכן נסתר עבור שעות פתיחה
var openingHoursContent = document.createElement("div");
openingHoursContent.className = "content";
openingHoursContent.style.display = "none";
openingHoursContent.style.padding = "10px";

// יצירת ה- select עם ID מתאים
var openingHoursSelect = document.createElement("select");
openingHoursSelect.id = "openingHoursSelect";
openingHoursSelect.style.width = "100%";
openingHoursSelect.style.padding = "8px";
openingHoursSelect.style.textAlign = "left";

// ניקוי האפשרויות הקודמות והוספת אפשרות "All Days"
openingHoursSelect.innerHTML = "";
var defaultOption = document.createElement("option");
defaultOption.value = "";
defaultOption.text = "All Days";
openingHoursSelect.appendChild(defaultOption);

// מציאת כל הימים הקיימים בפועל בדאטה
var availableDays = new Set();
json_Stores_1.features.forEach(feature => {
    Object.keys(feature.properties).forEach(key => {
        if (key.toLowerCase().includes("sunday") || 
            key.toLowerCase().includes("monday") || 
            key.toLowerCase().includes("tuesday") || 
            key.toLowerCase().includes("wednesday") || 
            key.toLowerCase().includes("thursday") || 
            key.toLowerCase().includes("friday") || 
            key.toLowerCase().includes("saturday")) {
            availableDays.add(key);
        }
    });
});

// המרת הסט למערך ומיון לפי סדר השבוע
var orderedDays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"].filter(day => availableDays.has(day));

// הוספת הימים הקיימים לתפריט הבחירה
orderedDays.forEach(day => {
    var option = document.createElement("option");
    option.value = day;
    option.text = day.charAt(0).toUpperCase() + day.slice(1); // הופך את האות הראשונה לאות גדולה
    openingHoursSelect.appendChild(option);
});

// הוספת אירוע שינוי שיפעיל את הפילטר כאשר המשתמש משנה בחירה
openingHoursSelect.addEventListener("change", function() {
    filterStores();
});

// הוספת ה-select ל-div של הפילטר
openingHoursContent.appendChild(openingHoursSelect);

// יצירת כפתור Apply להפעלת הפילטר
var applyButton = document.createElement("button");
applyButton.innerHTML = "Apply";
applyButton.style.width = "100%";
applyButton.style.padding = "8px";
applyButton.style.marginTop = "5px";
applyButton.style.backgroundColor = "#007bff";
applyButton.style.color = "white";
applyButton.style.border = "none";
applyButton.style.cursor = "pointer";
applyButton.addEventListener("click", function() {
    filterStores();
});

// הוספת הכפתור ל-div
openingHoursContent.appendChild(applyButton);

// הוספת הכפתורים לתפריט
document.getElementById("menu").appendChild(locationButton);
document.getElementById("menu").appendChild(locationContent);
document.getElementById("menu").appendChild(businessTypeButton);
document.getElementById("menu").appendChild(businessTypeContent);
document.getElementById("menu").appendChild(openingHoursButton);
document.getElementById("menu").appendChild(openingHoursContent);

// פונקציה לפתיחה/סגירה של הכפתורים
var collapsibles = document.getElementsByClassName("collapsible");
for (var i = 0; i < collapsibles.length; i++) {
    collapsibles[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
}

// ------------------------------------- //

    // add button for "registration" on menu
    //var btnRegister = document.createElement("BUTTON");
    //btnRegister.innerHTML = 'Business Owner Sign Up / Login';
    btnRegister.style.borderRadius = "12px";
    btnRegister.style.color = "White";
    btnRegister.style.backgroundColor="#82002e";
    btnRegister.style.height="80px";
    btnRegister.style.width = "70%";
    btnRegister.style.margin="30px 50px";
    btnRegister.style.fontWeight="bold";
    btnRegister.style.borderColor ="transparent";
    document.getElementById("menu").appendChild(btnRegister);
    btnRegister.style.fontSize="22px";
    btnRegister.style.fontFamily = "Calibri Light";
    btnRegister.onclick = function() {
    };
    btnRegister.onmouseover = function () {btnRegister.style.backgroundColor="#E24E4E";}
    btnRegister.onmouseleave = function () {btnRegister.style.backgroundColor="#82002e";}

    // add button for "signing in" on menu
    //var btnSignIn = document.createElement("BUTTON");
    //btnSignIn.innerHTML = "Users Sign Up / Login";
    btnSignIn.style.borderRadius = "12px";
    btnSignIn.style.color = "White";
    btnSignIn.style.backgroundColor="#82002e";
    btnSignIn.style.height="80px";
    btnSignIn.style.width="70%";
    btnSignIn.style.margin="0px 50px 20px 10px";
    btnSignIn.style.fontWeight="bold";
    btnSignIn.style.borderColor ="transparent";
    document.getElementById("menu").appendChild(btnSignIn);
    btnSignIn.style.fontSize="22px";
    btnSignIn.style.fontFamily = "Calibri Light";
    btnSignIn.onmouseover = function () {btnSignIn.style.backgroundColor="#E24E4E";}
    btnSignIn.onmouseleave = function () {btnSignIn.style.backgroundColor="#82002e";}

    