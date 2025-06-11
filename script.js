// OPEN & CLOSE for popups for sticky notes and contact
function openBox(id) {
  const el = document.getElementById(id);
  if (el.classList.contains('popup') || el.classList.contains('contact-box')) {
    el.classList.add('show');
  } else {
    el.style.display = 'block';
    if (id === 'note1') renderTasks('tasks1', 'input1', 'data1', 'clear1');
    if (id === 'note2') renderTasks('tasks2', 'input2', 'data2', 'clear2');
    if (id === 'note3') renderTasks('tasks3', 'input3', 'data3', 'clear3');
  }
}

function closeBox(id) {
  const el = document.getElementById(id);
  if (el.classList.contains('popup') || el.classList.contains('contact-box')) {
    el.classList.remove('show');
  } else {
    el.style.display = 'none';
  }
}

// notes:  localStorage
function renderTasks(listId, inputId, storageKey, clearBtnId) {
  const list = document.getElementById(listId);
  const input = document.getElementById(inputId);
  const clearBtn = document.getElementById(clearBtnId);
  const data = JSON.parse(localStorage.getItem(storageKey)) || [];

  list.innerHTML = '';

  data.forEach((item, i) => {
    const li = document.createElement('li');
    li.textContent = item.text;
    if (item.done) li.classList.add('done');
    li.addEventListener('click', () => {
      data[i].done = !data[i].done;
      localStorage.setItem(storageKey, JSON.stringify(data));
      renderTasks(listId, inputId, storageKey, clearBtnId);
    });
    list.appendChild(li);
  });

  input.onkeypress = (e) => {
    if (e.key === 'Enter') {
      const val = input.value.trim();
      if (val) {
        data.push({ text: val, done: false });
        localStorage.setItem(storageKey, JSON.stringify(data));
        input.value = '';
        renderTasks(listId, inputId, storageKey, clearBtnId);
      }
    }
  };

  if (clearBtn) {
    clearBtn.onclick = () => {
      localStorage.removeItem(storageKey);
      renderTasks(listId, inputId, storageKey, clearBtnId);
    };
  }
}

// here there
function makeDraggable(el) {
  let isDragging = false;
  let offsetX, offsetY;

  el.addEventListener('mousedown', function (e) {
    isDragging = true;
    offsetX = e.clientX - el.getBoundingClientRect().left;
    offsetY = e.clientY - el.getBoundingClientRect().top;
    el.style.zIndex = 1001;
    el.style.transition = 'none';
  });

  document.addEventListener('mousemove', function (e) {
    if (isDragging) {
      el.style.left = `${e.clientX - offsetX}px`;
      el.style.top = `${e.clientY - offsetY}px`;
      el.style.position = 'absolute';
    }
  });

  document.addEventListener('mouseup', function () {
    isDragging = false;
  });
}

// --
document.addEventListener('DOMContentLoaded', () => {
  renderTasks('tasks1', 'input1', 'data1', 'clear1');
  renderTasks('tasks2', 'input2', 'data2', 'clear2');
  renderTasks('tasks3', 'input3', 'data3', 'clear3');

  document.querySelectorAll('.stickynote').forEach(makeDraggable);
});



// CONTACT FORM 

document.addEventListener("DOMContentLoaded", () => {
  const messageBox = document.getElementById("messageBox");
  const charCount = document.getElementById("charCount");

  messageBox.addEventListener("input", () => {
    charCount.textContent = `(${messageBox.value.length} / 400)`;
  });
});

function sendMessage() {
  const message = document.getElementById("messageBox").value.trim();
  if (message === "") {
    alert("Please write something first! ‼️");
  } else {
    alert("Message sent to Shrutika! ╰┈➤");
    document.getElementById("messageBox").value = "";
    document.getElementById("charCount").textContent = "(0 / 400)";
  }
}

function clearMessage() {
  document.getElementById("messageBox").value = "";
  document.getElementById("charCount").textContent = "(0 / 400)";
}

function openInbox() {
  document.getElementById("inbox").classList.add("show");
}
function closeInbox() {
  document.getElementById("inbox").classList.remove("show");
}


// ----------------------------------------------------

// 📦 Developer Toolbox Logic
let allProducts = [];
let filteredProducts = [];

// fetch('products.json')
//   .then(res => res.json())
//   .then(data => {
//     allProducts = data;
//     filteredProducts = [...allProducts];
//     displayProducts(filteredProducts);
//   });

function displayProducts(products) {
  const grid = document.getElementById('productGrid');
  if (!grid) return;
  grid.innerHTML = "";
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="card-content">
        <h3>${product.name}</h3>
        <p><strong>Category:</strong> ${product.category}</p>
        <p class="price">₹${product.price === 0 ? 'Free' : product.price}</p>
        <p>⭐ ${product.rating}</p>
      </div>
    `;
    grid.appendChild(card);
  });
}

function filterProducts(category) {
  filteredProducts = allProducts.filter(p =>
    category === 'All' || p.category === category
  );
  sortProducts();
}

function sortProducts() {
  const sortValue = document.getElementById('sortSelect').value;
  let sorted = [...filteredProducts];
  if (sortValue === 'priceLow') {
    sorted.sort((a, b) => a.price - b.price);
  } else if (sortValue === 'priceHigh') {
    sorted.sort((a, b) => b.price - a.price);
  } else if (sortValue === 'ratingHigh') {
    sorted.sort((a, b) => b.rating - a.rating);
  }
  displayProducts(sorted);
}

allProducts = [  
  {
    "name": "JavaScript: The Good Parts",
    "category": "Book",
    "price": 499,
    "rating": 4.5,
    "image": "items/js_good_parts.jpg"
  },
  {
    "name": "Eloquent JavaScript",
    "category": "Book",
    "price": 699,
    "rating": 4.7,
    "image": "items/eloquent_js.jpg"
  },
  {
    "name": "Don't Make Me Think",
    "category": "Book",
    "price": 799,
    "rating": 4.6,
    "image": "items/dont_make_me_think.jpg"
  },
  {
    "name": "Figma Wireframe Kit",
    "category": "Design Kit",
    "price": 0,
    "rating": 4.7,
    "image": "items/figma_wireframe.jpg"
  },
  {
    "name": "UI Icon Pack - 2024",
    "category": "Design Kit",
    "price": 350,
    "rating": 4.5,
    "image": "items/ui_icons.jpg"
  },
  
  {
    "name": "Typography Bundle",
    "category": "Design Kit",
    "price": 499,
    "rating": 4.6,
    "image": "items/typography_kit.jpg"
  }


  ,

  {
    "name": "Frontend Developer Roadmap",
    "category": "Learning",
    "price": 0,
    "rating": 4.8,
    "image": "items/frontend_roadmap.jpg"
  },
  {
    "name": "freeCodeCamp JavaScript Course",
    "category": "Learning",
    "price": 0,
    "rating": 4.9,
    "image": "items/fcc_js.jpg"
  },
  {
    "name": "Coursera HTML & CSS Course",
    "category": "Learning",
    "price": 1000,
    "rating": 4.4,
    "image": "items/coursera_course.jpg"
  }
  
];

filteredProducts = [...allProducts];
displayProducts(filteredProducts);


