const zipInput = document.querySelector('#zip');

zipInput.addEventListener('input', e => {
    e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4);
});

zipInput.addEventListener('keydown', e => {
    if (!/^\d$/.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)) {
        e.preventDefault();
    }
});
