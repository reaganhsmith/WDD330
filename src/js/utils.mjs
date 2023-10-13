
// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}


export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.insertAdjacentHTML("afterbegin", template.innerHTML);
  if (callback) {
    callback(data);
  }
  
}

export function getParams(param){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export async function loadHeaderFooter() {
  const header = await loadTemplate("../partials/header.html")
  const footer = await loadTemplate("../partials/footer.html");
  const domHeader = document.getElementById("Header");
  const domFooter = document.getElementById("Footer");
  renderWithTemplate(header, domHeader);  
  renderWithTemplate(footer, domFooter);
}

export async function loadTemplate(path) {
  const response = await fetch(path);
  const html = await response.text()  

  const template = document.createElement('template');
  template.innerHTML = html;
  return template;
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  if (!Array.isArray(list)) {
    console.error("Provided list is not an array:", list);
    return;
}


  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}