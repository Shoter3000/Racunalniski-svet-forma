document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('orderForm');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); 

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('number').value.trim();
        const address = document.getElementById('address').value.trim();
        const city = document.getElementById('city').value.trim();
        const zip = document.getElementById('zip').value.trim();
        const subscription = document.querySelector('input[name="radio"]:checked');
        const payment = document.querySelector('input[name="payment"]:checked');

        if (!name) {
            Swal.fire({
                title: 'Napaka!',
                text: 'Prosimo, vnesite vaše ime.',
                icon: 'error',
                confirmButtonText: 'Zapri'
            });
            return;
        }

        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
            Swal.fire({
                title: 'Napaka!',
                text: 'Prosimo, vnesite veljaven e-poštni naslov.',
                icon: 'error',
                confirmButtonText: 'Zapri'
            });
            return;
        }

        if (!phone || phone.length !== 11) {
            Swal.fire({
                title: 'Napaka!',
                text: 'Prosimo, vnesite veljavno telefonsko številko.',
                icon: 'error',
                confirmButtonText: 'Zapri',
            });
            return;
        }

        if (!address) {
            Swal.fire({
                title: 'Napaka!',
                text: 'Prosimo, vnesite vaš naslov.',
                icon: 'error',
                confirmButtonText: 'Zapri'
            });
            return;
        }

        if (!city) {
            Swal.fire({
                title: 'Napaka!',
                text: 'Prosimo, vnesite vaše mesto.',
                icon: 'error',
                confirmButtonText: 'Zapri'
            });
            return;
        }

        if (!zip || !/^\d+$/.test(zip)) {
            Swal.fire({
                title: 'Napaka!',
                text: 'Prosimo, vnesite veljavno poštno številko.',
                icon: 'error',
                confirmButtonText: 'Zapri'
            });
            return;
        }

        if (!subscription) {
            Swal.fire({
                title: 'Napaka!',
                text: 'Prosimo, izberite vrsto naročnine.',
                icon: 'error',
                confirmButtonText: 'Zapri'
            });
            return;
        }
        
        if (payment && payment.value === 'card') {
            const cardName = document.querySelector('.card-details input[placeholder="Ime na kartici"]').value.trim();
            const cardNumber = document.querySelector('.card-details input[placeholder="Številka kartice"]').value.trim();
            const cardExpiry = document.querySelector('.card-details input[placeholder="MM/YY"]').value.trim();
            const cardCVV = document.querySelector('.card-details input[placeholder="CVV"]').value.trim();

            if (!cardName) {
                Swal.fire({
                    title: 'Napaka!',
                    text: 'Prosimo, vnesite ime na kartici.',
                    icon: 'error',
                    confirmButtonText: 'Zapri'
                });
                return;
            }

            if (!cardNumber || cardNumber.replace(/\s/g, '').length !== 16) {
                Swal.fire({
                    title: 'Napaka!',
                    text: 'Prosimo, vnesite veljavno številko kartice.',
                    icon: 'error',
                    confirmButtonText: 'Zapri'
                });
                return;
            }

            if (!cardExpiry || cardExpiry.length !== 5) {
                Swal.fire({
                    title: 'Napaka!',
                    text: 'Prosimo, vnesite veljaven datum poteka kartice.',
                    icon: 'error',
                    confirmButtonText: 'Zapri'
                });
                return;
            }

            if (!cardCVV || cardCVV.length !== 3) {
                Swal.fire({
                    title: 'Napaka!',
                    text: 'Prosimo, vnesite veljaven CVV.',
                    icon: 'error',
                    confirmButtonText: 'Zapri'
                });
                return;
            }
        }

        if (!payment) {
                    Swal.fire({
                        title: 'Napaka!',
                        text: 'Prosimo, izberite način plačila.',
                        icon: 'error',
                        confirmButtonText: 'Zapri'
                    });
                    return;
        }

        Swal.fire({
            title: 'Naročilo je bilo uspešno!',
            text: 'Vaše naročilo je bilo uspešno oddano. Hvala!',
            icon: 'success',
            confirmButtonText: 'Zapri'
        }).then(() => {
            window.location.href = 'index.html';
        });
    });
});
