
async function loadZipData() {
    const response = await fetch('js/zipSlovenia.csv');
    const csvText = await response.text();
    const postnaStevilkaMesta = {};
    const mestoPostnaStevilka = {};

    csvText.split('\n').forEach(line => {
        const [mesto, postanskaStevilka] = line.split(';');
        if (mesto && postanskaStevilka) {
            postnaStevilkaMesta[postanskaStevilka.trim()] = mesto.trim();
            mestoPostnaStevilka[mesto.trim().toLowerCase()] = postanskaStevilka.trim();
        }
    });

    return { postnaStevilkaMesta, mestoPostnaStevilka };
}


document.addEventListener("DOMContentLoaded", async () => {
    const { postnaStevilkaMesta, mestoPostnaStevilka } = await loadZipData();


    const zipInput = document.querySelector("#zip");
    const cityInput = document.getElementById("city");

    zipInput.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/\D/g, "").substring(0, 4);
        
        const zipCode = zipInput.value.trim();
        if (postnaStevilkaMesta[zipCode]) {
            cityInput.value = postnaStevilkaMesta[zipCode];
        } else {
            cityInput.value = "";
        }
    });

    zipInput.addEventListener("keydown", (e) => {
        if (!/^\d$/.test(e.key) && !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key)) {
            e.preventDefault();
        }
    });


    cityInput.addEventListener("input", () => {
        const city = cityInput.value.trim().toLowerCase();
        if (mestoPostnaStevilka[city]) {
            zipInput.value = mestoPostnaStevilka[city];
        } else {
            zipInput.value = "";
        }
    });
});
