// api key
const API_KEY = 'fc54498209mshd69ef9d0175df8ep131b4fjsn73d54f3dc65e';

// variabel-variabel
const form_search = document.querySelector("#form_search");
const input_country = document.querySelector("#input_country");
const input_date = document.querySelector("#input_date");

const content_section = document.querySelector("#content_section");
const loading_section = document.querySelector("#loading_section");
const error_section = document.querySelector("#error_section");

const content_active_cases = document.querySelector("#content_active_cases");
const content_new_cases = document.querySelector("#content_new_cases");
const content_recovered_cases = document.querySelector("#content_recovered_cases");
const content_total_cases = document.querySelector("#content_total_cases");
const content_total_deaths = document.querySelector("#content_total_deaths");
const content_total_test = document.querySelector("#content_total_test");

// action
form_search.addEventListener("submit", (e) => {
    e.preventDefault();
    const country = input_country.value;
    const date = input_date.value;
    // tampilkan loading screen 
    showLoadingScreen();
    // hilangkan error screen jika ada
    hiddenErrorScreen();
    // hilangkan content screen jika ada
    hiddenContentScreen();
    // ambil data 
    fetchDataAPI(country, date);
})



// function -function
function fetchDataAPI(country, date) {
    // buat options
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
        }
    };
    // generate url by inputan user
    const url = `https://covid-193.p.rapidapi.com/history?country=${country}&day=${date}`
    fetch(url, options)
        // saat sudah terload data maka hidden loading screennnya
        .finally(hiddenLoadingScreen)
        // jika success ambil data
        .then(response => response.json())
        .then(response => {
            // console.log(response)
            // cek apakah ada data atau tdk
            if(response.results == 0) {
                showErrorScreen();
            } else {
                // ambil data pertama
                showContentScreen(response.response[0]);
            }
        })
        // jika gagal ambil data
        .catch(err => alert(err));
}

function showLoadingScreen() {
    loading_section.classList.remove("d-none");
}
function hiddenLoadingScreen() {
    loading_section.classList.add("d-none");
}
function showErrorScreen() {
    error_section.classList.remove("d-none");
}
function hiddenErrorScreen() {
    error_section.classList.add("d-none");
}
function showContentScreen(data) {
    content_section.classList.remove("d-none");
    // console.log(data);

    // isi semua field contentnya
    content_active_cases.innerHTML = data.cases.active;
    content_new_cases.innerHTML = (data.cases.new == null) ? 0 : data.cases.new;
    content_recovered_cases.innerHTML = data.cases.recovered;
    content_total_cases.innerHTML = data.cases.total;
    content_total_deaths.innerHTML = data.deaths.total;
    content_total_test.innerHTML = data.tests.total;
}
function hiddenContentScreen() {
    content_section.classList.add("d-none");
}
