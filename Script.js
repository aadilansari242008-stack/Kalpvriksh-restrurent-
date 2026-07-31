// ===============================
// KALPVRIKSHA RESTAURANT
// SCRIPT.JS PART 1
// ===============================

// Cart Variables

let cart = [];

let total = 0;

// HTML Elements

const cartCount = document.getElementById("cartCount");

const totalPrice = document.getElementById("totalPrice");

const cartItems = document.getElementById("cartItems");

// ===============================
// ADD TO CART
// ===============================

const cartButtons = document.querySelectorAll(".food-card button");

cartButtons.forEach((button)=>{

button.addEventListener("click",()=>{

const card = button.parentElement;

const foodName = card.querySelector("h3").innerText;

const foodPrice = parseInt(

card.querySelector("p")

.innerText.replace("₹","")

);

cart.push({

name:foodName,

price:foodPrice

});

total += foodPrice;

updateCart();

});

});

// ===============================
// UPDATE CART
// ===============================

function updateCart(){

cartCount.innerText = cart.length;

totalPrice.innerText = total;

cartItems.innerHTML = "";

if(cart.length===0){

cartItems.innerHTML="<p>Your Cart is Empty</p>";

return;

}

cart.forEach((item,index)=>{

cartItems.innerHTML += `

<div class="cart-item">

<h4>${item.name}</h4>

<p>₹${item.price}</p>

<button onclick="removeItem(${index})">

Remove

</button>

</div>

`;

});

}

// ===============================
// REMOVE ITEM
// ===============================

function removeItem(index){

total -= cart[index].price;

cart.splice(index,1);

updateCart();

}

// ===============================
// CHECKOUT
// ===============================

const checkoutBtn=document.getElementById("checkoutBtn");

if(checkoutBtn){

checkoutBtn.addEventListener("click",()=>{

if(cart.length===0){

alert("Your cart is empty.");

return;

}

alert("Proceeding to Checkout...");

});

  }// ===============================
// SCRIPT.JS PART 2
// Search, Category, Call & WhatsApp
// ===============================

// ---------- SEARCH MENU ----------

const searchInput = document.getElementById("searchInput");

if (searchInput) {

searchInput.addEventListener("keyup", function () {

const value = this.value.toLowerCase();

const cards = document.querySelectorAll(".food-card");

cards.forEach(card => {

const name = card.querySelector("h3").innerText.toLowerCase();

if (name.includes(value)) {

card.style.display = "block";

} else {

card.style.display = "none";

}

});

});

}

// ---------- CATEGORY FILTER ----------

const categoryButtons = document.querySelectorAll(".category button");

categoryButtons.forEach(button => {

button.addEventListener("click", () => {

categoryButtons.forEach(btn => btn.classList.remove("active"));

button.classList.add("active");

const category = button.innerText.toLowerCase();

const cards = document.querySelectorAll(".food-card");

cards.forEach(card => {

const text = card.innerText.toLowerCase();

if (category === "all") {

card.style.display = "block";

} else {

if (text.includes(category)) {

card.style.display = "block";

} else {

card.style.display = "none";

}

}

});

});

});

// ---------- CALL BUTTON ----------

const callButton = document.getElementById("callBtn");

if (callButton) {

callButton.addEventListener("click", () => {

window.location.href = "tel:7352585780";

});

}

// ---------- WHATSAPP BUTTON ----------

const whatsappButton = document.getElementById("whatsappButton");

if (whatsappButton) {

whatsappButton.addEventListener("click", () => {

let message = "Hello Kalpvriksha Restaurant,%0A%0AI want to order:%0A";

cart.forEach(item => {

message += "• " + item.name + " - ₹" + item.price + "%0A";

});

message += "%0ATotal = ₹" + total;

window.open(

"https://wa.me/917352585780?text=" + message,

"_blank"

);

});

                   }// ===============================
// SCRIPT.JS PART 3
// Delivery Check & Order System
// ===============================

// Restaurant Location (Update if needed)
const restaurantLocation = {
    lat: 25.9730,
    lng: 85.0000
};

// Maximum Delivery Distance
const MAX_DISTANCE = 10;

// Haversine Formula
function getDistance(lat1, lon1, lat2, lon2) {

    const R = 6371;

    const dLat = (lat2 - lat1) * Math.PI / 180;

    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}

// Delivery Check Button

const deliveryButton = document.getElementById("deliveryCheck");

if (deliveryButton) {

    deliveryButton.addEventListener("click", () => {

        if (!navigator.geolocation) {

            alert("Geolocation is not supported.");

            return;

        }

        navigator.geolocation.getCurrentPosition(

            (position) => {

                const userLat = position.coords.latitude;

                const userLng = position.coords.longitude;

                const distance = getDistance(

                    restaurantLocation.lat,
                    restaurantLocation.lng,
                    userLat,
                    userLng

                );

                if (distance <= MAX_DISTANCE) {

                    alert(
                        "✅ Delivery Available\nDistance: " +
                        distance.toFixed(1) +
                        " KM"
                    );

                } else {

                    alert(
                        "❌ Sorry!\nHome Delivery is available only within 10 KM."
                    );

                }

            },

            () => {

                alert("Location permission denied.");

            }

        );

    });

}

// Checkout Success

if (checkoutBtn) {

    checkoutBtn.addEventListener("click", () => {

        if (cart.length === 0) return;

        alert("🎉 Order Placed Successfully!");

    });

}

// Smooth Scroll

document.querySelectorAll("nav a").forEach(link => {

    link.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});
