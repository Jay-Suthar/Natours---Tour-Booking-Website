const hideAlert2 = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
};

// type is 'success' or 'error'
const showAlert2 = (type, msg) => {
  hideAlert2();
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideAlert1, 5000);
};

const stripe = Stripe(
  'pk_test_51NGI9CSCT4ehctZxPs0Hnf8dnMdIR1I6w7ZDFCGfK55XHKVI0mLJy0Ia3gVPLYyzRrHqoTT0g9675Y5G4ZyoH4pY00u6DgOn9m'
);

const bookTour = async (tourId) => {
  try {
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    console.log(session);

    //await stripe.redirectToCheckout({
    //  sessionId: session.data.session.id,
    //});

    //works as expected
    window.location.replace(session.data.session.url);
  } catch (err) {
    console.log(err);
    showAlert2('error', err);
  }
};

const bookBtn = document.getElementById('book-tour');
if (bookBtn)
  bookBtn.addEventListener('click', (e) => {
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });
