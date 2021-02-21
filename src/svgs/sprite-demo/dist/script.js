document.querySelector("#sprite");
const symbols = sprite.querySelectorAll("symbol");

console.log("pute");
symbols.forEach((symbol) => {
    console.log(symbol.id);
    document.body.insertAdjacentHTML(
        "beforeend",
        `
  <div class="container">
     <div class="name">"#${symbol.id}"</div>
     <svg class="svgs" width="50" height="50">
         <use xlink:href="#${symbol.id}" />
      </svg> 
  </div>
`
    );
});

/* `<p class="name">"#${symbol.id}"</p>`*/

/*const sprite = document.querySelector("#sprite");
const symbols = sprite.querySelectorAll("symbol"); 

symbols.forEach(symbol => {
  document.body.insertAdjacentHTML("beforeend", `
  <svg width="50" height="50">
     <use xlink:href="#${symbol.id}" />
  <svg> 
`)
  document.body.insertAdjacentHTML("beforeend", 
  `<p class="name">"#${symbol.id}"</p>` 
)
});

/* `<p class="name">"#${symbol.id}"</p>`*/
