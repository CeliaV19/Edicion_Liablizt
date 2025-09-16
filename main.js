// Esperamos a que el documento se cargue por completo
document.addEventListener('DOMContentLoaded', () => {
    
    // Seleccionamos los elementos de la página
    const showPricingButton = document.getElementById('showPricingButton');
    const pricingMenu = document.getElementById('pricingMenu');
    const freeTrialSection = document.getElementById('freeTrialSection');
    const form = document.getElementById('contactForm');
    
    // --- Lógica del contador para la prueba gratuita ---
    // ADVERTENCIA: Este contador es solo para demostración.
    // Es muy fácil de manipular y no es seguro para una página web real.
    // Para un sitio profesional, necesitarías un servidor y una base de datos.
    const MAX_FREE_TRIALS = 2;
    let trialsUsed = localStorage.getItem('trialsUsed') ? parseInt(localStorage.getItem('trialsUsed')) : 0;

    // Si ya se usaron las pruebas gratuitas, ocultamos el botón
    if (trialsUsed >= MAX_FREE_TRIALS) {
        showPricingButton.textContent = 'Las pruebas gratuitas han terminado';
        showPricingButton.disabled = true;
    }
    
    // Al hacer clic en el botón "Ver tarifas"
    showPricingButton.addEventListener('click', () => {
        // Ocultamos la sección de la prueba gratuita
        freeTrialSection.classList.add('hidden');
        
        // Mostramos el menú de tarifas
        pricingMenu.classList.remove('hidden');
        pricingMenu.classList.add('visible');
    });

    // --- Lógica del formulario de contacto ---
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        
        // Verificamos si la prueba gratuita está disponible
        if (trialsUsed < MAX_FREE_TRIALS) {
            // Si lo está, aumentamos el contador y lo guardamos
            trialsUsed++;
            localStorage.setItem('trialsUsed', trialsUsed);
            
            alert(`¡Felicidades, ${name}! Has reclamado una de las pruebas gratuitas disponibles. Revisa tu email, te escribiré pronto.`);
            
            // Ocultamos el botón si ya se agotaron las pruebas
            if (trialsUsed >= MAX_FREE_TRIALS) {
                showPricingButton.textContent = 'Las pruebas gratuitas han terminado';
                showPricingButton.disabled = true;
            }
        } else {
            alert(`¡Gracias por tu mensaje, ${name}! Te responderé pronto a ${email}.`);
        }

        form.reset();
    });
});