document.getElementById('card').addEventListener('change', function() {
    const cardInputs = document.querySelectorAll('.card-details input');
    cardInputs.forEach(input => {
        input.required = this.checked;
    });
});

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

const expiryInput = document.querySelector('.card-expiry-cvv input[placeholder="MM/YY"]');

expiryInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length >= 2) {
        value = value.slice(0,2) + '/' + value.slice(2,4);
    }
    
    e.target.value = value;
    
    // Validate month
    if (value.length >= 2) {
        let month = parseInt(value.slice(0,2));
        if (month < 1 || month > 12) {
            e.target.value = '';
        }
    }
    
    // Validate year
    if (value.length >= 5) {
        let year = parseInt(value.slice(3,5));
        let currentYear = new Date().getFullYear() % 100;
        if (year < currentYear) {
            e.target.value = '';
        }
    }
});

expiryInput.addEventListener('keydown', function(e) {
    if (e.target.value.length >= 5 && e.key !== 'Backspace') {
        e.preventDefault();
    }
});

const cardNumberInput = document.querySelector('.card-details input[placeholder="Številka kartice"]');

// Single function to format card number
const formatCardNumber = value => {
    return value
        .replace(/\D/g, '')
        .substring(0, 16)
        .replace(/(\d{4})(?=\d)/g, '$1 ');
};

// Single function to validate key input
const isValidKey = key => {
    const validKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
    return /^\d$/.test(key) || validKeys.includes(key);
};

cardNumberInput.addEventListener('input', e => {
    e.target.value = formatCardNumber(e.target.value);
});

cardNumberInput.addEventListener('keydown', e => {
    const digitsOnly = e.target.value.replace(/\s/g, '');
    if (!isValidKey(e.key) || (digitsOnly.length >= 16 && !isValidKey(e.key))) {
        e.preventDefault();
    }
});

const cvvInput = document.querySelector('.card-expiry-cvv input[placeholder="CVV"]');

cvvInput.addEventListener('input', e => {
    e.target.value = e.target.value.replace(/\D/g, '').substring(0, 3);
});

cvvInput.addEventListener('keydown', e => {
    if (!/^\d$/.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)) {
        e.preventDefault();
    }
});







