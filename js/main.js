const theme = "theme";
const dataTheme = "data-theme";
const themeTab = ".theme-tab";
const switcherBtn = ".switcher-btn";
const dark = "dark";
const light = "light";
const open = "open";
const active = "active";

const modalOpen = "[data-open]";
const modalClose = "[data-close]";
const isVisible = "is-visible";

// const newPortfolioCardData = [
//   {
//     item: "ui",
//     imageSrc: "./assets/images/portfolio-7.jpg",
//     category: "UI Design",
//     projectTitle: "Quirky Design",
//   },
//   {
//     item: "app",
//     imageSrc: "./assets/images/portfolio-8.jpg",
//     category: "App Development",
//     projectTitle: "Sports App",
//   },
//   {
//     item: "web",
//     imageSrc: "./assets/images/portfolio-2.jpg",
//     category: "Web Development",
//     projectTitle: "Racing Website",
//   },
//   {
//     item: "ui",
//     imageSrc: "./assets/images/portfolio-3.jpg",
//     category: "UI Design",
//     projectTitle: "Fast Design",
//   },
// ];

const dataFilter = "[data-filter]";
const portfolioData = "[data-item]";

const root = document.documentElement;

// Theme
const toggleTheme = document.querySelector(themeTab);
const switcher = document.querySelectorAll(switcherBtn);
const currentTheme = localStorage.getItem(theme);

// Portfolio
const filterLink = document.querySelectorAll(dataFilter);
const portfolioItems = document.querySelectorAll(portfolioData);
const searchBox = document.querySelector("#search");
const portfolioContainer = document.querySelector(".portfolio-container");

// Modal
const openModal = document.querySelectorAll(modalOpen);
const closeModal = document.querySelectorAll(modalClose);

const setActive = (elm, selector) => {
  if (document.querySelector(`${selector}.${active}`) !== null) {
    document.querySelector(`${selector}.${active}`).classList.remove(active);
  }
  elm.classList.add(active);
};

const setTheme = (val) => {
  if (val === dark) {
    root.setAttribute(dataTheme, dark);
    localStorage.setItem(theme, dark);
  } else {
    root.setAttribute(dataTheme, light);
    localStorage.setItem(theme, light);
  }
};

if (currentTheme) {
  root.setAttribute(dataTheme, currentTheme);
  switcher.forEach((btn) => {
    btn.classList.remove(active);
  });
  if (currentTheme === dark) {
    switcher[1].classList.add(active);
  } else {
    switcher[0].classList.add(active);
  }
}

toggleTheme.addEventListener("click", function () {
  const tab = this.parentElement.parentElement;
  if (!tab.className.includes(open)) {
    tab.classList.add(open);
  } else {
    tab.classList.remove(open);
  }
});

for (const elm of switcher) {
  elm.addEventListener("click", function () {
    const toggle = this.dataset.toggle;
    setActive(elm, switcherBtn);
    setTheme(toggle);
  });
}

searchBox.addEventListener("keyup", (e) => {
  const searchInput = e.target.value.toLowerCase().trim();
  portfolioItems.forEach((card) => {
    if (card.dataset.item.includes(searchInput)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

for (const link of filterLink) {
  link.addEventListener("click", function () {
    setActive(link, ".filter-link");
    const filter = this.dataset.filter;
    portfolioItems.forEach((card) => {
      if (filter === "all") {
        card.style.display = "block";
      } else if (card.dataset.item === filter) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
}

// newPortfolioCardData.forEach((data) => {
//   const portfolioCard = document.createElement("div");
//   portfolioCard.classList.add("portfolio-card");
//   portfolioCard.setAttribute("data-item", data.item);

//   const cardBody = document.createElement("div");
//   cardBody.classList.add("card-body");

//   const img = document.createElement("img");
//   img.src = data.imageSrc;
//   img.alt = "portfolio icon";

//   const anchor = document.createElement("a");
//   anchor.href = "#";
//   anchor.classList.add("card-popup-box");

//   const categoryDiv = document.createElement("div");
//   categoryDiv.textContent = data.category;

//   const titleH3 = document.createElement("h3");
//   titleH3.textContent = data.projectTitle;

//   anchor.appendChild(categoryDiv);
//   anchor.appendChild(titleH3);
//   cardBody.appendChild(img);
//   cardBody.appendChild(anchor);
//   portfolioCard.appendChild(cardBody);
//   portfolioContainer.appendChild(portfolioCard);
// });

// Modal/Full Site Modal "open buttons"
for (const elm of openModal) {
  elm.addEventListener("click", function () {
    const modalId = this.dataset.open;
    document.getElementById(modalId).classList.add(isVisible);
  });
}

// full site modal "close buttons"
for (const elm of closeModal) {
  elm.addEventListener("click", function () {
    this.parentElement.parentElement.parentElement.classList.remove(isVisible);
  });
}

// Modal
document.addEventListener("click", (e) => {
  if (e.target === document.querySelector(".modal.is-visible")) {
    document.querySelector(".modal.is-visible").classList.remove(isVisible);
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key === "Escape") {
    document.querySelector(".modal.is-visible").classList.remove(isVisible);
  }
});

const elmsDisplayed = getComputedStyle(root).getPropertyValue(
  "--marquee-elms-displayed"
);
const marqueeContent = document.querySelector("ul.marquee-content");

root.style.setProperty("--marquee-elms", marqueeContent.children.length);

for (let i = 0; i < elmsDisplayed; i += 1) {
  marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
}
