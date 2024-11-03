
document.getElementById('card').addEventListener('change', function() {
    const cardInputs = document.querySelectorAll('.card-details input');
    //Obvezna polja če je card selected
    cardInputs.forEach(input => {
        input.required = this.checked;
    });
});

//Sprememba načina plačila
document.querySelectorAll('input[name="payment"]').forEach(radio => {
    radio.addEventListener('change', function() {
        if (this.id !== 'card') {
            const cardInputs = document.querySelectorAll('.card-details input');
            cardInputs.forEach(input => {
                input.required = false;
            });
        }
    });
});

//Potek kartice
const expiryInput = document.querySelector('.card-expiry-cvv input[placeholder="MM/YY"]');

//Preverjanje poteka
expiryInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    //Poševnica
    if (value.length >= 2) {
        value = value.slice(0,2) + '/' + value.slice(2,4);
    }
    
    e.target.value = value;
    
    //Preverjanje mesca
    if (value.length >= 2) {
        let month = parseInt(value.slice(0,2));
        if (month < 1 || month > 12) {
            e.target.value = '';
        }
    }
    
    //Preverjanje leta
    if (value.length >= 5) {
        let year = parseInt(value.slice(3,5));
        let currentYear = new Date().getFullYear() % 100;
        if (year < currentYear) {
            e.target.value = '';
        }
    }
});

// Preprečevanje vnosa znakov
expiryInput.addEventListener('keydown', function(e) {
    if (e.target.value.length >= 5 && e.key !== 'Backspace') {
        e.preventDefault();
    }
});


const cardNumberInput = document.querySelector('.card-details input[placeholder="Številka kartice"]');

//Maska za kartico
const formatCardNumber = value => {
    return value
        .replace(/\D/g, '')
        .substring(0, 16)
        .replace(/(\d{4})(?=\d)/g, '$1 ');
};

const isValidKey = key => {
    const validKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
    return /^\d$/.test(key) || validKeys.includes(key);
};

// Dogodek za formatiranje številke kartice med vnosom
cardNumberInput.addEventListener('input', e => {
    e.target.value = formatCardNumber(e.target.value);
});

//Največ 16 number znakov
cardNumberInput.addEventListener('keydown', e => {
    const digitsOnly = e.target.value.replace(/\s/g, '');
    if (!isValidKey(e.key) || (digitsOnly.length >= 16 && !isValidKey(e.key))) {
        e.preventDefault();
    }
});

const cvvInput = document.querySelector('.card-expiry-cvv input[placeholder="CVV"]');

//Omejitev CVV
cvvInput.addEventListener('input', e => {
    e.target.value = e.target.value.replace(/\D/g, '').substring(0, 3);
});

//Samo številke
cvvInput.addEventListener('keydown', e => {
    if (!/^\d$/.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)) {
        e.preventDefault();
    }
});
