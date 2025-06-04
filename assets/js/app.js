// 
// Burgermenu
// 

// Rammer vores burger SVG
const burger = document.getElementById('burger');
// Rammer vores nav med id=Menu
const menu = document.getElementById('menu');
// Rammer vores lukke-ikon SVG (X)
const close = document.getElementById('close');

// Definere en function som kan open og lukke
function burgerMenu(open) {
    // Hvis "open" === true så tilføjer den klassen toggle.
    // Hvis den er lukket fjerner den klassen og tilføjer menu.close
  menu.classList.toggle('open', open);;
}
// Når burgermenuen trykket på, kald så toggleMenu(true)
burger.addEventListener('click', () => burgerMenu(true));
// Når lukke ikonet trykkes på, kald så toggleMenu(false)
close.addEventListener('click', () => burgerMenu(false));

// 
// Wordpress
// 

// Konstatere "domain" som api linket, så 
const domain = "https://mmd.tobiasvraa.dk/wp-json/wp/v2/posts?per_page=100";
fetch(domain)
.then(response => response.json())
.then (data =>{
  console.log(data);
})
.catch(error => {
  console.error('Error', error);
});

