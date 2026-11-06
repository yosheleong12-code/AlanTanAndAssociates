// Alan Tan & Associates — shared behaviour

document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.main-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        toggle.setAttribute('aria-expanded', 'false');
        links.classList.remove('open');
      });
    });
  }

  // Contact form -> mailto fallback (static hosting has no backend)
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var phone = form.phone.value.trim();
      var office = form.office.value;
      var message = form.message.value.trim();
      var status = document.getElementById('form-status');

      if (!name || !email || !message) {
        status.textContent = 'Please fill in your name, email, and message.';
        status.className = 'form-status show';
        return;
      }

      var recipients = {
        'Muar': 'gnlmua@alantan.com.my',
        'Batu Pahat': 'gnlbp@alantan.com.my',
        'Johor Bahru': 'gnljb@alantan.com.my'
      };
      var to = recipients[office] || 'gnlmua@alantan.com.my';
      var subject = encodeURIComponent('Website Enquiry from ' + name);
      var body = encodeURIComponent(
        'Name: ' + name + '\n' +
        'Email: ' + email + '\n' +
        'Phone: ' + phone + '\n' +
        'Preferred office: ' + office + '\n\n' +
        'Message:\n' + message
      );

      status.textContent = 'Opening your email app to send this enquiry…';
      status.className = 'form-status show ok';
      window.location.href = 'mailto:' + to + '?subject=' + subject + '&body=' + body;
    });
  }

});

// Service carousel
function scrollServices(direction) {

    const slider = document.querySelector(".services-grid");

    slider.scrollBy({
        left: direction * 340,
        behavior: "smooth"
    });

}