/* ============================================================
   COUNTRY EXPLORER — script.js
   ------------------------------------------------------------
   THE PATTERN (this is the whole lab):
     1. Get user input
     2. Fetch data from an API
     3. Convert the response to JSON
     4. Pull the piece of data you need off the response
     5. Drop it into the page with .textContent / .src
   Steps 1-6 below are built together as an instructor demo.
   Steps 7-10 are your team's mission — they reuse the exact
   same pattern shown in Step 6, just with different data.
   ============================================================ */
// --- Element references (grab everything once, up front) -----

//ALL ARE DOM ELEMENTS
const searchBtn = document.getElementById("searchBtn");
const countryInput = document.getElementById("countryInput");
const loadingEl = document.getElementById("loading");
const errorEl = document.getElementById("errorMessage");
const resultCard = document.getElementById("resultCard");

const flagImg = document.getElementById("flagImg");
const countryNameEl = document.getElementById("countryName");
const capitalEl = document.getElementById("capitalValue");
const regionEl = document.getElementById("regionValue");
const populationEl = document.getElementById("populationValue");
const languagesEl = document.getElementById("languagesValue");


//////////////////////////////////////////////////////////////////
// CODE ALONG WITH INSTRUCTOR STARTS HERE
//ADD
//everytime somebody clicks, reference function fetchCountry and do it
searchBtn.addEventListener('click', fetchCountry)

function fetchCountry()
{
  //CHECK IF FUNCTION WORKS -> console.log('Fetching country');

  //check what user typed in (using variable form HTML -> countryInput)
  //.value -> what user actually typed in
  //.trim() -> Do cleanup to remove whitespace user might add
  const countryName = countryInput.Value.trim();  //console.log(countryName) to check if works in console (inspect)

  //user can click "EXPLORE" infinity amount of times
  //if they don't give us country name, don't do anything
  if(!countryName)
  {
    return; //dont do anything -> DOESNT MAKE API CALL -> doesnt show loading message
  }

  //CALL
  showLoading();


  //CONTACT API
  //its not guaranteed successful (might fail)
  //cound be us or service problem
  //not always available (sometimes stuff breakes)
  //antifipate with try and catch
  try
  {
    //create constant API
    //put in environment variable, NOT LIKE THE FOLLOWING (dangerous)
    const API_KEY = 'rc_live_ce04df5787824c2ba26ad9f616fda9f0 '
    const url = 'https://api.restcountries.com/countries/v5?q=${countryName}'; //cite we are using

    //USE FETCH TO GET DATA
    ////async (asynchronous), tells we are waiting for smt
    //fetch() -> could take a minute, returns a promise (type of data eventually there will be a ressponse, might be an error or not)
    //bearer -> how its structured
    const response = await fetch(url, {
      headers: {Authorization: 'Bearer s{API_KEY}'}; //hold on until we get some info back // Javascript that waits for something to finish (the request so that it can do smt with that data)

    //console.log(response) -> to see info about request (404 ->not successful)

    //NOW THAT WE HAVE OUR REPSONSE< PARSE JSON INTO AN OBJECT WE CAN LOOK AT
    //make sure to add ${countryName} instead of = Canada.
    //go to console, and click explore and console data, objects (array), 0 (index), to see data
    const data = await response.json();
    console.log(data);
    const actualData = data.data.objects[0];
    console.log(actualData);
    //result card is removed, 
    resultCard.classList.remove('hidden');
    flagImg.src = actualData.flag.url_png;
    countryNameEl.innerText = actualData.names.common; //.names.common can be found in console


  } catch(error) { //if there is an issue, error stored as 'error'
    console.error(error); //or .log
  }


}









/* ============================================================
       TEAM BUILD STARTS HERE
       The instructor demo stops at Step 6. Steps 7-10 are your
       team's mission. Use the exact pattern from Step 6 above.
       ============================================================ */

/* ------------------------------------------------------------
       STEP 7: Display the Flag
       ------------------------------------------------------------
       TODO:
       - The image URL lives at:  country.flags.png
       - Set flagImg.src to that URL
       - Set flagImg.alt to something descriptive, e.g.
         `Flag of ${country.name.common}`

       flagImg.src = ???
       flagImg.alt = ???
       ------------------------------------------------------------ */

/* ------------------------------------------------------------
       STEP 8: Display Capital, Region, Population
       ------------------------------------------------------------
       TODO:
       - Capital:    country.capital[0]     <-- careful, it's an ARRAY
       - Region:     country.region
       - Population: country.population      <-- a raw number

       Hint: number.toLocaleString() formats 129000000 as
       "129,000,000" — much easier to read.

       capitalEl.textContent    = ???
       regionEl.textContent     = ???
       populationEl.textContent = ???
       ------------------------------------------------------------ */

/* ------------------------------------------------------------
       STEP 9: Display Languages
       ------------------------------------------------------------
       TODO:
       - country.languages is an OBJECT, not an array, e.g.:
             { fra: "French", eng: "English" }
       - Object.values(country.languages) turns that into an
         array of names: ["French", "English"]
       - .join(", ") turns that array into one readable string:
             "French, English"

       languagesEl.textContent = ???
       ------------------------------------------------------------ */

/* ------------------------------------------------------------
       STEP 10a: Improve the experience — clean up on SUCCESS
       ------------------------------------------------------------
       TODO:
       - Hide the loading state:      hideLoading();
       - Reveal the result card:      resultCard.classList.remove('hidden');
       - Make sure old errors are gone: errorEl.classList.add('hidden');
       ------------------------------------------------------------ */

// } catch (error) {

/* ------------------------------------------------------------
       STEP 10b: Improve the experience — error handling
       ------------------------------------------------------------
       TODO:
       - Hide the loading state
       - Hide the result card (a previous search may have shown one)
       - Show a friendly message in errorEl, e.g.:
           errorEl.textContent =
             `We couldn't find "${countryName}". Check the spelling and try again.`;
           errorEl.classList.remove('hidden');
       ------------------------------------------------------------ */
//     console.error(error);

//   }
// }

/* ------------------------------------------------------------
   Helper functions — already built for you.
   ------------------------------------------------------------ */

   //constants already declared at beginning from HTML
   //there is a class called "hidden"
   //removes that class from it
function showLoading() {
  loadingEl.classList.remove("hidden");
  errorEl.classList.add("hidden");
  resultCard.classList.add("hidden");
}

function hideLoading() {
  loadingEl.classList.add("hidden");
}

