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

// Definerer vores API enpoint som "domain"
// Inkludere billeder med (_embed) og formatere acf-felterne (acf_format=standard)
const domain = "https://mmd.tobiasvraa.dk/wp-json/wp/v2/posts?_embed&acf_format=standard&per_page=100";
// Henter data fra det definerede API-endepunkt. Fetch bruges til at hente data fra ekstern server
fetch(domain)
// Når data bliver hentet, så konverteres det til JSON, så vi kan arbejde med det som JS objekter. Then bruges til at håndtere der som sker efter noget bliver hentet
  .then(response => response.json())
  .then(data => {
    // Logger det hele i konsollen
    console.log(data);
    // Definerer en funktion som viser medlemmer baseret på deres udvalg
    // Funktion der håndterer indsættelse af medlemmer i den korrekte div
    // udvalgNavn er fx "bestyrelse" og containerSelector fx ".bestyrelsen"
    function renderUdvalg(udvalgNavn, containerSelector) {
      // Finder HTML containeren i DOM'en hvor det indsættes
      const container = document.querySelector(containerSelector);
      // Alle indlæg i det hentede data array køres i gennem
      data.forEach(post => {
        // tager fat i vores ACF felter for hvert indlæg og hvis ikke ACF findes, bliver det et tomt objekt med ||
        const acf = post.acf || {};
        // Hvis der findes et billede i ACF felterne oprettes et img
        if (acf.udvalg === udvalgNavn) {
          const memberDiv = document.createElement('div');

          if (acf.billede?.url) {
            // opretter billede element
            const img = document.createElement('img');
            // sætter billedets kilde til den rigtige URL
            img.src = acf.billede.url;
            // Alt teksten vises og hvis der ingen alt tekst er, så bliver det til "Billede af (deres navn)""
            img.alt = acf.billede.alt || `Billede af ${udvalgNavn}`;
            // Tilføjer billedet til diven
            memberDiv.appendChild(img);
          }
          // Tilføjer HTML elementer med navn, titel, email og tlf
          memberDiv.innerHTML += `
            <p><strong>Navn:</strong> ${acf.Navn || 'Kommer snart'}</p>
            <p><strong>Rolle:</strong> ${acf.titel || 'Kommer snart'}</p>
            <p><strong>Email:</strong> ${acf.Email || 'Kommer snart'}</p>
            <p><strong>Tlf:</strong> ${acf.tlf || 'Kommer snart'}</p>
          `;
          // tilføjer hele medlems diven til containeren i HTML
          container.appendChild(memberDiv);
        }
      });
    }

    // Kalder funktionen for hvert udvalg med den tilsvarende class i HTML
    renderUdvalg("bestyrelse", ".bestyrelsen");
    renderUdvalg("svømning", ".svomning");
    renderUdvalg("løb", ".lob");
    renderUdvalg("armwrestling", ".armwrestling");
  })
  // fejlkode hvis data ikke kan hentes
  .catch(error => {
    console.error('Error', error);
  });

  //fanger details 
function toggleDetails() {
  const open = window.innerWidth >= 1440;
  // Vælger alle details elementer og sætter deres open attribute til true eller false efter vw

  // Hvis skærmen er 1440 eller mere, så åbnes alle details elementer
  document.querySelectorAll('details').forEach(details => {
    details.open = open;
  });
}
//holder den åben når wv er 1440px+
window.addEventListener('DOMContentLoaded', toggleDetails);

//hvis nu mark skulle ændre størelsen på skærmen(all times)(alle tiders på dansk)
window.addEventListener('resize', toggleDetails);



// Hold
const hold = document.querySelector('.hold');
if (hold){

  const sportFilter = document.getElementById('sport-filter');
  const loader = document.getElementById('loader')
  // Gemmer alle data til brug ved filtrering
  let allPosts = []; 
  
  // Vis vores loader
  loader.style.display = 'block';
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

    loader.style.display = 'none';
  })
  // Vis fejl i konsol OG i HTML vis der sker fejl ved at hente data
  .catch(error => {
    console.error("Fejl ved hentning af data:", error);
    hold.innerHTML = "<p>Kunne ikke hente hold-data.</p>";
    loader.style.display = 'none';
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
      <p>Alder: ${acf.alder || 'Kommer snart'}</p>
      <p>${acf.information || 'Ingen beskrivelse'}</p>
     <a class="knap1" href="kontingent.html?id=${post.id}">Tilmeld dig</a>
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
}


// Stævner
// Find HTML element .staevner
const staevner = document.querySelector('.staevner');
if (staevner){

  // Vores stævner
  const sportstaevne = ["Svømmestævner", "Armwrestlingstævner", "Løbestævner"];

  // Dropdown element til filtrering
  const staevneFilter = document.getElementById('sport-filter');

  // Gem alle data til brug ved filtrering
  let allStaevner = [];

  // vis loader
  loader.style.display = 'block';

  // hent data fra API
  fetch(domain)
  // konvertere til JSON
  .then(response => response.json())
  .then(data => {
    // Gem alle posts til filtrering
    allStaevner = data;

    data.forEach(post => {
      // Hent ACF dataen
      const acf = post.acf || {};
      // Vis kun hvis sportstaevne matcher en af de defineret i vores array
      if (sportstaevne.includes(acf.sportstaevne)) {
        // ny div for hver stævne
        const staevneDiv = document.createElement('div');
        // tilføjer klasse
        staevneDiv.classList.add('holdcard');
        staevneDiv.innerHTML = `
        <p><strong>${acf.titel || 'Kommer snart'}</strong></p>
        <p><strong>Sport:</strong> ${acf.sportstaevne || 'Kommer snart'}</p>
        <p><strong>Pris:</strong> ${acf.pris || 'Kommer snart'}</p>
        <p><strong>Alder:</strong> ${acf.alder || 'Kommer snart'}</p>
        `;
        staevner.appendChild(staevneDiv);
      }
    });

    // skjul loader fordi data er hentet og smidt ind
    loader.style.display = 'none';
  })
  .catch(error => {
    console.error("Fejl ved hentning af data:", error);
    staevner.innerHTML = "<p>Kunne ikke hente stævne-data.</p>";
  });

  // Funktion til at vise filtrerede stævner baseret på dropdown
  function renderFilteredStaevner(valgtSport) {
    staevner.innerHTML = '';
    allStaevner.forEach(post => {
      const acf = post.acf || {};
      // Vis kun hvis sportstaevne er i listen OG matcher valgt
      if (
        sportstaevne.includes(acf.sportstaevne) &&
        (valgtSport === 'Alle' || acf.sportstaevne.includes(valgtSport))
      ) {
        const staevneDiv = document.createElement('div');
        staevneDiv.classList.add('holdcard');
        staevneDiv.innerHTML = `
        <p><strong>${acf.titel || 'Kommer snart'}</strong></p>
        <p><strong>Sport:</strong> ${acf.sportstaevne || 'Kommer snart'}</p>
        <p><strong>Pris:</strong> ${acf.pris || 'Kommer snart'}</p>
        <p><strong>Alder:</strong> ${acf.alder || 'Kommer snart'}</p>
        `;
        staevner.appendChild(staevneDiv);
      }
    });
  }

  // Eventlistener for dropdown-filtrering
  if (staevneFilter) {
    staevneFilter.addEventListener('change', (e) => {
      const valgt = e.target.value;
      renderFilteredStaevner(valgt);
    });
  }
}


// Kontingent side
// Henter URL-parametrene fra sideadresse
// URLSearchParams bruges til at hente query-parametre fra URLen som gør det muligt at finde den specifikke post, som vises baseret på det ID et post har.
const URLparams = new URLSearchParams(window.location.search);
// Finder værdien af id'et fra URLen
const postId = URLparams.get('id');
// Henter en specifik post fra Wordpress REST API baseret på ID
fetch(`https://mmd.tobiasvraa.dk/wp-json/wp/v2/posts/${postId}?_embed&acf_format=standard`)
.then(response => response.json())
.then(post => {
  const acf = post.acf || {};
  const kontingent = document.getElementById('kontingent');

  if (!kontingent) {
    console.error('fejl');
    return;
  }

  console.log('acf.billede:', acf.billede);

  // Først sætter vi titel
  kontingent.innerHTML = `<h1>${acf.titel || 'Ingen titel'}</h1>`;

  // Så tilføjer vi billedet lige efter titlen, hvis der findes et billede
  if (acf.billede?.url) {
    const img = document.createElement('img');
    img.src = acf.billede.url;
    img.alt = acf.billede.alt || 'Billede';
    console.log('Billedets URL:', img.src);

    kontingent.appendChild(img);
  } else {
    console.log('Ingen billede URL fundet i acf.billede');
  }

  // Tilføjer derefter alder, pris, sæson og information
  kontingent.innerHTML += `
    <p>Alder: ${acf.alder || 'Ingen aldersinfo'}</p>
    <p>Pris: ${acf.pris || 'Pris ikke angivet'}</p>
    <p>Sæson: ${acf.saeson || 'Sæson ikke angivet'}</p>
    <p>${acf.information || 'Ingen beskrivelse'}</p>
    <button class="tilmeldknap"><a href="#">Tilmeld</a></button>
  `;
})
.catch(err => {
  console.error('Fejl:', err);
});
