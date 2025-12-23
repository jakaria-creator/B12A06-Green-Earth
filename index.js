// Global cart array
let cart = [];

// Load categories dynamically
const loadCategories = async () => {
  try {
    const res = await fetch("https://openapi.programming-hero.com/api/categories");
    const { categories } = await res.json();

    const categoryList = document.getElementById("category-list");
    categoryList.innerHTML = "";

    // Add "All Trees" manually
    const allTrees = document.createElement("li");
    allTrees.textContent = "All Trees";
    allTrees.classList.add("active");
    allTrees.addEventListener("click", () => {
      setActiveCategory(allTrees);
      loadAllPlants();
    });
    categoryList.appendChild(allTrees);

    // Render categories from API
    categories.forEach(({ id, category_name, small_description }) => {
      const li = document.createElement("li");
      li.textContent = category_name;
      li.title = small_description;
      li.addEventListener("click", () => {
        setActiveCategory(li);
        loadPlantsByCategory(id); // works for Fruit Tree (id=1), Flowering Tree (id=2), etc.
      });
      categoryList.appendChild(li);
    });
  } catch (error) {
    console.error("Error loading categories:", error);
  }
};

// Highlight active category
const setActiveCategory = (selectedLi) => {
  document.querySelectorAll("#category-list li").forEach(li => li.classList.remove("active"));
  selectedLi.classList.add("active");
};

// Load all plants
const loadAllPlants = async () => {
  try {
    const res = await fetch("https://openapi.programming-hero.com/api/plants");
    const { plants } = await res.json();
    renderPlants(plants);
  } catch (error) {
    console.error("Error loading all plants:", error);
  }
};

// Load plants by category (Fruit Tree = 1, Flowering Tree = 2, etc.)
const loadPlantsByCategory = async (id) => {
  try {
    const res = await fetch(`https://openapi.programming-hero.com/api/category/${id}`);
    const { plants } = await res.json();
    renderPlants(plants);
  } catch (error) {
    console.error(`Error loading category ${id} plants:`, error);
  }
};

// Render plant cards
const renderPlants = (plants) => {
  const grid = document.getElementById("tree-grid");
  grid.innerHTML = "";

  plants.forEach(({ id, image, name, description, category, price }) => {
    const card = document.createElement("div");
    card.classList.add("tree-card");

    card.innerHTML = `
      <img src="${image}" alt="${name}" style="width:100%; border-radius:8px; margin-bottom:15px;">
      <h4>${name}</h4>
      <p>${description}</p>
      <span class="tag">${category}</span>
      <div class="price-cart">
        <span class="price">৳${price}</span>
        <button onclick="addToCart('${name}', ${price})">Add to Cart</button>
      </div>
    `;

    grid.appendChild(card);
  });
};

// Add to cart with quantity support
const addToCart = (name, price) => {
  const existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  renderCart();
};

// Render cart as a styled card
const renderCart = () => {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach(({ name, price, quantity }) => {
    total += price * quantity;

    const li = document.createElement("li");
    li.innerHTML = `
      <span class="item-name">${name}</span>
      <span class="item-meta">৳${price} × ${quantity}</span>
    `;
    cartItems.appendChild(li);
  });

  cartTotal.textContent = `Total: ৳${total}`;
};


// Initialize everything once
document.addEventListener("DOMContentLoaded", () => {
  loadCategories();
  loadAllPlants(); // default view shows all trees
});
