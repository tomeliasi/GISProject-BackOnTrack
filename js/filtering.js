// ✅ הגדרת הפילטרים
var Filters = {
  business: "int",
  business_type: "str",
  parking: "bool", 
  child_friendly: "bool", 
  shipping: "bool",
};

// ✅ יצירת ה-Checkbox ב-JavaScript
var selectedRating = null; 

// ✅ פונקציית הסינון הראשית
function filteringFunction() {
  console.log("🚀 Running filteringFunction...");

  map.eachLayer(function (lyr) {
    if ("options" in lyr && "dataVar" in lyr["options"]) {
      let features = window[lyr["options"]["dataVar"]].features.slice(0);

      try {
        // ✅ בדיקה האם הפילטרים פעילים
        let parkingFilterActive =
          document.getElementById("parking_checkbox").checked;
        let childFriendlyFilterActive = document.getElementById(
          "child_friendly_checkbox"
        ).checked;
        let deliveryFilterActive =
          document.getElementById("shipping_checkbox").checked;

        // ✅ סינון לפי Parking (חניה)
        if (parkingFilterActive) {
          console.log("🚗 Parking filter is ON");
          features = features.filter((feature) => {
            let value = feature.properties.parking;
            if (typeof value === "string") {
              value = value.trim().toLowerCase() === "true";
            }
            return value === true;
          });
          console.log(
            "✅ Remaining features after Parking filter:",
            features.length
          );
        }

        // ✅ סינון לפי Child Friendly (ידידותי לילדים)
        if (childFriendlyFilterActive) {
          console.log("👶 Child Friendly filter is ON");
          features = features.filter((feature) => {
            let value = feature.properties.child_friendly;
            if (typeof value === "string") {
              value = value.trim().toLowerCase() === "true";
            }
            return value === true;
          });
          console.log(
            "✅ Remaining features after Child Friendly filter:",
            features.length
          );
        }

        // ✅ סינון לפי משלוחים (Delivery)
        if (deliveryFilterActive) {
          console.log("📦 Delivery filter is ON");
          features = features.filter((feature) => {
            let value = feature.properties.shipping;
            if (typeof value === "string") {
              value = value.trim().toLowerCase() === "true";
            }
            return value === true;
          });
          console.log(
            "✅ Remaining features after Delivery filter:",
            features.length
          );
        }

        // ✅ סינון לפי דירוג (משתמש בשדה `business`)
        if (selectedRating !== null) {
          console.log("🔍 Filtering by rating:", selectedRating);

          features = features.filter((feature) => {
            let rating = feature.properties.business; 

            // אם אין דירוג, נסיר את העסק מהתצוגה
            if (rating === undefined || rating === null || isNaN(rating)) {
              console.warn(`⚠️ Business without rating:`, feature);
              return false; // עסקים בלי דירוג לא יוצגו
            }

            console.log(
              `🏢 ${
                feature.properties.Name || "Unknown"
              } - Business Rating: ${rating}`
            );

            return (rating >= selectedRating && rating< selectedRating +1); // רק עסקים עם דירוג תואם יוצגו
          });

          console.log("📊 Features AFTER rating filter:", features.length);
        }

        // ✅ עדכון המפה עם הנתונים המסוננים
        console.log(
          "🗺️ Updating map with",
          features.length,
          "filtered features"
        );
        lyr.clearLayers();
        lyr.addData(features);
        console.log("✅ Map updated successfully");
      } catch (err) {
        console.error("❌ Error in filteringFunction:", err);
      }
    }
  });
}

var ratingWrapper = document.createElement("div");
ratingWrapper.style.display = "flex";
ratingWrapper.style.flexDirection = "column";
ratingWrapper.style.alignItems = "center";
ratingWrapper.style.marginTop = "25px";

// הוספת כותרת לדירוג
var ratingTitle = document.createElement("div");
ratingTitle.innerHTML =
  '<span style="font-size: 25px; font-weight: bold;">Rating</span>';
var ratingRow = document.createElement("div");
ratingRow.style.display = "flex";
ratingRow.style.flexDirection = "row-reverse";

ratingRow.style.alignItems = "center";
ratingRow.style.gap = "10px";
ratingWrapper.appendChild(ratingRow);
ratingRow.appendChild(ratingTitle);

// יצירת אלמנט לדירוג בתוך ה- FILTERPANEL
var ratingContainer = document.createElement("div");
ratingContainer.id = "ratingContainer";
ratingContainer.style.display = "flex";
ratingContainer.style.gap = "10px";
ratingContainer.style.marginTop = "10px";
ratingRow.appendChild(ratingContainer);

// יצירת כוכבים לדירוג
for (var i = 5; i >= 1; i--) {
  var star = document.createElement("img");
  star.src = "images/EmptyBusiness.png"; // תמונה ריקה כברירת מחדל
  star.style.width = "35px"; // גודל התמונה
  star.style.cursor = "pointer";
  star.style.margin = "2px";
  star.id = i + "one";
  
  star.onclick = function () {
    buisnessmark(this);
  };

  ratingContainer.appendChild(star);
}

// הוספת דירוג לתפריט מבלי לפגוע בכפתורים אחרים
var menu = document.getElementById("menu");
menu.appendChild(ratingWrapper);
// ------------------------------------- //

function filteringFunctionByNameOrLocation(searchValue) {
  map.eachLayer(function (lyr) {
    if ("options" in lyr && "dataVar" in lyr["options"]) {
      let features = this[lyr["options"]["dataVar"]].features.slice(0);

      if (searchValue.trim() !== "") {
        features = features.filter(
          (feature) =>
            (feature.properties["Name"] &&
              feature.properties["Name"].toLowerCase().includes(searchValue)) ||
            (feature.properties["Address"] &&
              feature.properties["Address"].toLowerCase().includes(searchValue))
        );
      }

      this[lyr["options"]["layerName"]].clearLayers();
      this[lyr["options"]["layerName"]].addData(features);
    }
  });
}

function filterStores() {
  var locationInput = document
    .getElementById("locationSearch")
    .value.toLowerCase();
  var businessTypeInput = document.getElementById("businessTypeSelect").value;
  var openingDayInput = document.getElementById("openingHoursSelect").value; // יום נבחר

  map.eachLayer(function (lyr) {
    if ("options" in lyr && "dataVar" in lyr["options"]) {
      let features = this[lyr["options"]["dataVar"]].features.slice(0);

      features = features.filter((feature) => {
        let matchesLocation =
          locationInput === "" ||
          (feature.properties["Address"] &&
            feature.properties["Address"]
              .toLowerCase()
              .includes(locationInput));
        let matchesBusinessType =
          businessTypeInput === "" ||
          (feature.properties["business_type"] &&
            feature.properties["business_type"] === businessTypeInput);

        // בדיקה אם היום שנבחר נמצא בדאטה ואם הוא לא "סגור"
        let matchesOpeningHours =
          openingDayInput === "" ||
          (feature.properties[openingDayInput] &&
            feature.properties[openingDayInput].toLowerCase() !== "close");

        return matchesLocation && matchesBusinessType && matchesOpeningHours;
      });

      this[lyr["options"]["layerName"]].clearLayers();
      this[lyr["options"]["layerName"]].addData(features);
    }
  });
}

// הוספת אירועים לפילטרים
document
  .getElementById("locationSearch")
  .addEventListener("input", filterStores);
document
  .getElementById("businessTypeSelect")
  .addEventListener("change", filterStores);
document
  .getElementById("openingHoursSelect")
  .addEventListener("change", filterStores);

//// --- businesss - filter --- ////
var count;

document.getElementById("menu").appendChild(document.createElement("div"));
var div_business = document.createElement("div");
div_business.id = "div_business";
div_business.className = "slider";
document.getElementById("menu").appendChild(div_business);
div_business.hidden = true;
var lab_business = document.createElement("div");
lab_business.innerHTML = 'כוסות: <span id="val_business"></span>';
document.getElementById("menu").appendChild(lab_business);
lab_business.hidden = true;
var sel_business = document.getElementById("div_business");
noUiSlider.create(sel_business, {
  connect: true,
  start: [1, 5],
  step: 1,
  format: wNumb({ decimals: 0 }),
  range: { min: 1, max: 5 },
});


function buisnessmark(item) {
  selectedRating = parseInt(item.id[0]); // שמירת הדירוג שנבחר
  console.log("⭐ Selected rating:", selectedRating);

  // שינוי צבע הכוכבים בהתאם לדירוג שנבחר
  for (var i = 1; i <= 5; i++) {
    let star = document.getElementById(i + "one");
    if (i <= selectedRating) {
      star.src = "images/FullBusiness.png"; // שינוי לתמונה המלאה
    } else {
      star.src = "images/EmptyBusiness.png"; // שינוי לתמונה הריקה
    }

  }
  sel_business.noUiSlider.set([selectedRating, "5"]); // עדכון הסליידר

  // הפעלת פונקציה לסינון
  filteringFunction();
}

sel_business.noUiSlider.on("update", function (values) {
  filterVals = [];
  for (value in values) {
    filterVals.push(parseInt(value));
  }
  val_business = document.getElementById("val_business");
  val_business.innerHTML = values.join(" - ");
  filteringFunction();
});

function ratingreset() {
  for (var i = 0; i < 5; i++) {
    document.getElementById(i + 1 + "one").src = "images/EmptyBusiness.png";
  }
}
// ------------------------------------- //

////---- order pickup - filter ---- /////
document.getElementById("menu").appendChild(document.createElement("div"));
var div_pickup = document.createElement("div");
div_pickup.id = "div_pickup";
div_pickup.className = "filterselect";
document.getElementById("menu").appendChild(div_pickup);
div_pickup.hidden = true;
sel_pickup = document.createElement("select");
sel_pickup.multiple = true;
sel_pickup.size = 2;
sel_pickup.id = "sel_pickup";
var pickup_options_str = "<option value='' unselected></option>";
sel_pickup.onchange = function () {
  filteringFunction();
};
pickup_options_str += '<option value="yes">yes</option>';
pickup_options_str += '<option value="no">no</option>';
sel_pickup.innerHTML = pickup_options_str;
div_pickup.appendChild(sel_pickup);
////////////////////////
let parkingContainer = document.createElement("div");
parkingContainer.style.display = "flex";
parkingContainer.style.flexDirection = "row";
parkingContainer.style.alignItems = "center";
parkingContainer.dir = "ltr";
parkingContainer.style.marginLeft = "30px"; // הזזה לימין
parkingContainer.style.marginTop = "30px";
parkingContainer.style.marginBottom = "10px";
let parkingCheckbox = document.createElement("input");
parkingCheckbox.type = "checkbox";
parkingCheckbox.id = "parking_checkbox";
parkingCheckbox.style.marginRight = "5px";

let parkingLabel = document.createElement("label");
parkingLabel.innerText = "Parking Available";
parkingLabel.setAttribute("for", "parking_checkbox");

parkingContainer.appendChild(parkingCheckbox);
parkingContainer.appendChild(parkingLabel);

document.getElementById("menu").appendChild(parkingContainer);

parkingCheckbox.onchange = function () {
  console.log("✅ Parking checkbox clicked! Value:", this.checked);
  filteringFunction();
};

var spacerBetweenFilters = document.createElement("div");
spacerBetweenFilters.style.height = "10px"; // רווח של 10 פיקסלים
menu.appendChild(spacerBetweenFilters);

///////////////////////
//create checkbox
// ✅ יצירת ה-Checkbox ל-Child Friendly
let childFriendlyContainer = document.createElement("div");
childFriendlyContainer.style.display = "flex";
childFriendlyContainer.style.flexDirection = "row";
childFriendlyContainer.style.alignItems = "center";
childFriendlyContainer.dir = "ltr";
childFriendlyContainer.style.marginLeft = "30px"; // הזזה לימין
childFriendlyContainer.style.marginBottom = "10px";
var childFriendlyCheckbox = document.createElement("input");
childFriendlyCheckbox.type = "checkbox";
childFriendlyCheckbox.id = "child_friendly_checkbox";
childFriendlyCheckbox.style.marginRight = "5px";

var childFriendlyLabel = document.createElement("label");
childFriendlyLabel.innerText = "Child - Friendly";
childFriendlyLabel.setAttribute("for", "child_friendly_checkbox");

childFriendlyContainer.appendChild(childFriendlyCheckbox);
childFriendlyContainer.appendChild(childFriendlyLabel);

document.getElementById("menu").appendChild(childFriendlyContainer);

// ✅ האזנה לשינוי ב-Checkbox
childFriendlyCheckbox.onchange = function () {
  console.log(
    "✅ Child-friendly checkbox clicked! Value:",
    childFriendlyCheckbox.checked
  );
  filteringFunction();
};

// ✅ הוספת רווח קטן בין Child Friendly ל- Delivery
var spacerBetweenFilters = document.createElement("div");
spacerBetweenFilters.style.height = "10px"; // רווח של 10 פיקסלים
menu.appendChild(spacerBetweenFilters);

////---- shipping - filter ---- /////
// ✅ יצירת Checkbox למשלוחים (Shipping)
let shippingContainer = document.createElement("div");
shippingContainer.style.display = "flex";
shippingContainer.style.flexDirection = "row";
shippingContainer.style.alignItems = "center";
shippingContainer.dir = "ltr";
shippingContainer.style.marginLeft = "30px"; // הזזה לימין
shippingContainer.style.marginBottom = "10px";
var shippingCheckbox = document.createElement("input");
shippingCheckbox.type = "checkbox";
shippingCheckbox.id = "shipping_checkbox";
shippingCheckbox.style.marginRight = "5px";

var shippingLabel = document.createElement("label");
shippingLabel.innerText = "Delivery Option";
shippingLabel.setAttribute("for", "shipping_checkbox");

shippingContainer.appendChild(shippingCheckbox);
shippingContainer.appendChild(shippingLabel);

menu.appendChild(shippingContainer);

// ✅ האזנה ללחיצה על Checkbox
shippingCheckbox.onchange = function () {
  console.log("🚚 Shipping checkbox clicked! Value:", this.checked);
  filteringFunction();
};

// ------------------------------------- //

// General - design
document.getElementById("menu").style.fontSize = "25px";
document.getElementById("menu").style.fontFamily = "Calibri Light";

// Reset filters
container = document
  .getElementById("menu")
  .appendChild(document.createElement("div"));
  var btnResetFilters = document.createElement("BUTTON");
  btnResetFilters.innerHTML = "Clear Filters";
  btnResetFilters.style.borderRadius = "12px";
  btnResetFilters.style.color = "black"; 
  btnResetFilters.style.backgroundColor = "#87CEFA"; 
  btnResetFilters.style.height = "50px"; 
  btnResetFilters.style.width = "60%"; 
  btnResetFilters.style.display = "block";
  btnResetFilters.style.margin = "0 auto"; 
  btnResetFilters.style.fontSize = "18px"; 
  btnResetFilters.style.fontWeight = "bold";
  btnResetFilters.style.borderColor = "transparent";
document.getElementById("menu").appendChild(btnResetFilters);
// כפתור Business Owner Sign Up / Login
var btnRegister = document.createElement("BUTTON");
btnRegister.innerHTML = "Business Owner Sign Up / Login";
btnRegister.style.borderRadius = "12px";
btnRegister.style.color = "white"; 
btnRegister.style.backgroundColor = "#d3d3d3"; 
btnRegister.style.height = "80px"; 
btnRegister.style.width = "80%"; 
btnRegister.style.margin = "10px auto"; 
btnRegister.style.fontWeight = "bold";
btnRegister.style.borderColor = "transparent";
btnRegister.style.fontSize = "20px"; 
btnRegister.style.fontFamily = "Calibri Light";
btnRegister.onclick = function () {};
btnRegister.onmouseover = function () {
  btnRegister.style.backgroundColor = "#e0e0e0"; 
};
btnRegister.onmouseleave = function () {
  btnRegister.style.backgroundColor = "#d3d3d3"; 
};

// הוספת הכפתור ל-"menu" מתחת ל-Clear Filters
document.getElementById("menu").appendChild(btnRegister);

// יצירת מרווח בין הכפתורים
var spacer2 = document.createElement("div");
spacer2.style.height = "10px";
document.getElementById("menu").appendChild(spacer2);

// כפתור Users Sign Up / Login
var btnSignIn = document.createElement("BUTTON");
btnSignIn.innerHTML = "Users Sign Up / Login";
btnSignIn.style.borderRadius = "12px";
btnSignIn.style.color = "white"; 
btnSignIn.style.backgroundColor = "#d3d3d3"; 
btnSignIn.style.height = "80px"; 
btnSignIn.style.width = "80%"; 
btnSignIn.style.margin = "10px auto"; 
btnSignIn.style.fontWeight = "bold";
btnSignIn.style.borderColor = "transparent";
btnSignIn.style.fontSize = "20px"; 
btnSignIn.style.fontFamily = "Calibri Light";
btnSignIn.onmouseover = function () {
  btnSignIn.style.backgroundColor = "#e0e0e0"; 
};
btnSignIn.onmouseleave = function () {
  btnSignIn.style.backgroundColor = "#d3d3d3"; 
};

// הוספת הכפתור ל-"menu" מתחת ל-Business Owner Sign Up / Login
document.getElementById("menu").appendChild(btnSignIn);
btnResetFilters.onclick = function () {
  console.log("🔄 Resetting all filters...");

  document.getElementById("parking_checkbox").checked = false;
  document.getElementById("child_friendly_checkbox").checked = false;
  document.getElementById("shipping_checkbox").checked = false;

  document.getElementById("locationSearch").value = "";

  document.getElementById("businessTypeSelect").value = "";
  document.getElementById("openingHoursSelect").value = "";

  sel_business.noUiSlider.set(["1", "5"]);
  ratingreset();

  selectedRating = null;
  filteringFunction(); 
};

document.getElementById("menu").appendChild(btnResetFilters);
var wrapperContainer = document.createElement("div");
wrapperContainer.style.border = "2px solid black"; 
wrapperContainer.style.borderRadius = "10px"; 
wrapperContainer.style.padding = "2px 20px"; 
wrapperContainer.style.margin = "15px auto"; 
wrapperContainer.style.width = "80%"; 
wrapperContainer.style.maxWidth = "300px"; 
wrapperContainer.style.height = "auto"; 
wrapperContainer.style.boxSizing = "border-box"; 
wrapperContainer.style.display = "flex";
wrapperContainer.style.flexDirection = "column"; 
wrapperContainer.style.alignItems = "center"; 
wrapperContainer.style.justifyContent = "flex-start"; 
// הכנסת האלמנטים לתוך המעטפת
wrapperContainer.appendChild(div_business); 
wrapperContainer.appendChild(lab_business); 
// מרווח בין כפתורים
var spacer = document.createElement("div");
spacer.style.height = "20px";
wrapperContainer.appendChild(spacer);

wrapperContainer.appendChild(btnRegister); 
wrapperContainer.appendChild(btnSignIn); 

// לבסוף, הוספת המעטפת כולה לתפריט "menu"
document.getElementById("menu").appendChild(wrapperContainer);
