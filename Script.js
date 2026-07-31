// =====================================
// KALPVRIKSHA RESTAURANT
// SCRIPT.JS PART 1
// =====================================

// ---------- CART ----------

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const totalPrice = document.getElementById("totalPrice");

// ---------- SAVE CART ----------

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// ---------- UPDATE CART ----------

function updateCart() {

    if (!cartItems) return;

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

        total += item.price;

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

    if (cart.length === 0) {

        cartItems.innerHTML = "<p>Your Cart is Empty</p>";

    }

    cartCount.innerText = cart.length;

    totalPrice.innerText = total;

    saveCart();

}

// ---------- ADD TO CART ----------

document.querySelectorAll(".addCart").forEach(button => {

    button.addEventListener("click", () => {

        const card = button.closest(".food-card");

        const item = {

            name: card.querySelector("h3").innerText,

            price: parseInt(
                card.querySelector(".price")
                .innerText.replace("₹","")
            )

        };

        cart.push(item);

        updateCart();

        alert(item.name + " added to cart.");

    });

});

// ---------- REMOVE ITEM ----------

function removeItem(index){

    cart.splice(index,1);

    updateCart();

}

window.removeItem = removeItem;

// ---------- LOAD CART ----------

updateCart();  // =====================================
// KALPVRIKSHA RESTAURANT
// SCRIPT.JS PART 2
// =====================================

// ---------- SEARCH MENU ----------

const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        const value = this.value.toLowerCase();

        document.querySelectorAll(".food-card").forEach(card => {

            const foodName = card.querySelector("h3")
                .innerText
                .toLowerCase();

            if (foodName.includes(value)) {

                card.style.display = "";

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

        categoryButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        const category = button.dataset.category;

        document.querySelectorAll(".food-card").forEach(card => {

            if (
                category === "all" ||
                card.dataset.category === category
            ) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });

    });

});

// ---------- CALL BUTTON ----------

const callBtn = document.getElementById("callBtn");

if (callBtn) {

    callBtn.addEventListener("click", () => {

        window.location.href = "  // =====================================
// KALPVRIKSHA RESTAURANT
// SCRIPT.JS PART 3
// =====================================

// ---------- RESTAURANT LOCATION ----------

const restaurantLocation = {
    lat: 25.6734,
    lng: 85.1666
};

const MAX_DISTANCE = 10;

// ---------- DISTANCE CALCULATION ----------

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

    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ---------- DELIVERY CHECK ----------

const deliveryBtn = document.getElementById("deliveryCheck");
const deliveryStatus = document.getElementById("deliveryStatus");

if (deliveryBtn) {

    deliveryBtn.addEventListener("click", () => {

        if (!navigator.geolocation) {

            alert("Geolocation is not supported.");

            return;

        }

        navigator.geolocation.getCurrentPosition(

            (position) => {

                const distance = getDistance(

                    restaurantLocation.lat,
                    restaurantLocation.lng,

                    position.coords.latitude,
                    position.coords.longitude

                );

                if (distance <= MAX_DISTANCE) {

                    deliveryStatus.innerHTML =
                    "✅ Delivery Available (" +
                    distance.toFixed(1) +
                    " KM)";

                } else {

                    deliveryStatus.innerHTML =
                    "❌ Delivery is available only within 10 KM.";

                }

            },

            () => {

                alert("Location permission denied.");

            }

        );

    });

}

// ---------- PLACE ORDER ----------

const placeOrderBtn = document.getElementById("placeOrderBtn");

if (placeOrderBtn) {

    placeOrderBtn.addEventListener("click", () => {

        const name =
            document.getElementById("customerName").value.trim    
