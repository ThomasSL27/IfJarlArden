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
// Wordpress API
// 

// Udvalg til kontakt

// Konstatere "domain" som api linket. Pr. default henter den kun 10, så tilføj ?_embed&acf_format=standard&per_page=100 til at sikre den henter ALT.
const domain = "https://mmd.tobiasvraa.dk/wp-json/wp/v2/posts?_embed&acf_format=standard&per_page=100";
const getRealImageUrls = "&acf_format=standard";
// hent nu domain ned med fetch
fetch(domain)
// Når den har fetched, konverteres det i Json format som kan læses i konsollen
.then(response => response.json())
.then (data =>{
  console.log(data);
// Find HTML element med klassen "bestyrelsen" hvor vi vil indsætte dataen
const bestyrelsen = document.querySelector('.bestyrelsen');
// Kig igennem hver oplæg i data-arrayet som findes i konsollen
data.forEach(post => {
  // Hent ACF-felterne fra indlæget / forblive tomt hvis det ikke findes. || betyder hvis ikke den kan finde / eller
  const acf = post.acf || {};
// Tjekker om "udvalg" findes og er lig med "bestyrelse" i acf data array
if (acf.udvalg === "bestyrelse") {
  const bestyrelseDiv = document.createElement('div');

  // Tilføj billede hvis der findes et i acf data array
  if (acf.billede?.url) {
    const img = document.createElement('img');
    img.src = acf.billede.url;
    img.alt = acf.billede.alt || 'Billede af bestyrelsesmedlem';
    // Smid billedet ind nu
    bestyrelseDiv.appendChild(img);
  }

  // Så tilføj tekst bagefter og her er lavet så, at hvis den ikke kan finde en af acf'erne eller de ikke findes, så vises "Kommer snart"
  bestyrelseDiv.innerHTML += `
    <p><strong>Navn:</strong> ${acf.Navn || 'Kommer snart'}</p>
    <p><strong>Rolle:</strong> ${acf.titel || 'Kommer snart'}</p>
    <p><strong>Email:</strong> ${acf.Email || 'Kommer snart'}</p>
    <p><strong>Tlf:</strong> ${acf.tlf || 'Kommer snart'}</p>
  `;

  bestyrelsen.appendChild(bestyrelseDiv);
}

const svomning = document.querySelector('.svomning');

data.forEach(post => {
  const acf = post.acf || {};

  if (acf.udvalg === "svømning") {
    if (acf.billede?.url) {
      const img = document.createElement('img');
      img.src = acf.billede.url;
      img.alt = acf.billede.alt || 'Billede af svømmeudvalg';
      svomning.appendChild(img);
    }

    svomning.innerHTML += `
      <p><strong>Navn:</strong> ${acf.Navn || 'Kommer snart'}</p>
      <p><strong>Rolle:</strong> ${acf.titel || 'Kommer snart'}</p>
      <p><strong>Email:</strong> ${acf.Email || 'Kommer snart'}</p>
      <p><strong>Tlf:</strong> ${acf.tlf || 'Kommer snart'}</p>
    `;
  }
});


})
// Fejlkode hvis noget går galt ift. hentning af data
})
.catch(error => {
  console.error('Error', error);
});


// Hold
const hold = document.querySelector('.hold');
const sportFilter = document.getElementById('sport-filter');
let allPosts = []; // Gemmer alle data til brug ved filtrering

// Hent data fra API
// Bruger fetch til at hente data fra vores Wordpress API
fetch(domain)
// Når vi får et svar fra API, konvertere det til JSON format
  .then(response => response.json())
  .then(data => {
    // Gem den hentede data i let allPosts
    allPosts = data;
    // Vis alle hold som default
    renderHold("Alle");
  })
  // Vis fejl i konsol OG i HTML vis der sker fejl ved at hente data
  .catch(error => {
    console.error("Fejl ved hentning af data:", error);
    hold.innerHTML = "<p>Kunne ikke hente hold-data.</p>";
  });

// Funktion til at vise hold baseret på den valgte sportsgren
function renderHold(valgtSport) {
  // Ryd det tidligere indhold i hold div for at gøre plads til det filtreret indhold
  hold.innerHTML = ''; 
// gå gennem hold (posts) i vores let allPosts
  allPosts.forEach((post) => {
    // Tag acf data fra post
    const acf = post.acf || {};

    // Filtrér ud fra valgt sport
    if (acf.sport && (valgtSport === "Alle" || acf.sport === valgtSport)) {
      // Opretter en ny div til hvert hold
      const holdDiv = document.createElement('div');
      // class for styling
      holdDiv.classList.add('holdcard');
      // Indsæt HTML indhold i div'en (uden modal-relateret kode)
      holdDiv.innerHTML = `
        <h3>${acf.titel || 'Kommer snart'}</h3>
        <p>${acf.pris || 'Kommer snart'}</p>
        <p>${acf.alder || 'Kommer snart'}</p>
        <p>${acf.information || 'Ingen beskrivelse'}</p>
      `;
      // Tilføj diven til .hold
      hold.appendChild(holdDiv);
    }
  });
}


// Lyt til ændring i dropdown og filtrér
sportFilter.addEventListener('change', (e) => {
  // hent valgt færdi fra filtermenuen
  const valgt = e.target.value;
  // Kald nu på renderHold med den valgte sportsgren
  renderHold(valgt);
});


// Stævner
// Find HTML element .staevner
const staevner = document.querySelector('.staevner');
// Vores stævner
const sportstaevner = ["Svømmestævner", "Armwrestlingstævner", "Løbestævner"];

// hent data fra API
fetch(domain)
// konvertere til JSON
  .then(response => response.json())
  .then(data => {
    data.forEach(post => {
      // Hent ACF dataen
      const acf = post.acf || {};
      // Vis kun hvis sportstaevne matcher en af de defineret i vores array
      if (sportstaevner.includes(acf.sportstaevne)) {
        // ny div for hver stævne
        const staevneDiv = document.createElement('div');
        // tilføjer klasse
        staevneDiv.classList.add('staevnecard');
        staevneDiv.innerHTML = `
        <p><strong>${acf.titel || 'Kommer snart'}</strong></p>
          <p><strong>Sport:</strong> ${acf.sportstaevne || 'Kommer snart'}</p>
          <p><strong>Pris:</strong> ${acf.pris || 'Kommer snart'}</p>
          <p><strong>Alder:</strong> ${acf.alder || 'Kommer snart'}</p>
        `;

        staevner.appendChild(staevneDiv);
      }
    });
  })
  .catch(error => {
    console.error("Fejl ved hentning af data:", error);
    staevner.innerHTML = "<p>Kunne ikke hente stævne-data.</p>";
  });







