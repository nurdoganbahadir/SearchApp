const formWrapper = document.querySelector(".form-wrapper");
const form = document.querySelector("#form");
const searchInput = document.querySelector("#searchInput");
const buttons = document.querySelector(".buttons");
const searchBtn = document.querySelector("#search");
const clearBtn = document.querySelector("#clear");
const imageList = document.querySelector(".imageList");

runEventLisener();

function runEventLisener() {
  form.addEventListener("submit", search);
  clearBtn.addEventListener("click", clear);
}

function clear() {
  searchInput.value = "";
  imageList.innerHTML = "";
}

function search(e) {
  const value = searchInput.value.trim();

  fetch(`https://api.unsplash.com/search/photos?query=${value}`, {
    method: "GET",
    headers: {
      Authorization: "Client-ID ueL7TNBc9WGsNrcsva3bslopp_tSZ3cKfkiZNKbqG2k",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      Array.from(data.results).forEach((image) => {
        addImageToUI(image.urls.small);
      });
    })
    .catch((err) => console.log(err));

  e.preventDefault();
}

function addImageToUI(url) {
  const div = document.createElement("div");
  div.className = "card";

  const img = document.createElement("img");
  img.setAttribute("src", url);
  img.height = "400";
  img.width = "400";

  div.append(img);
  imageList.append(div);
}
