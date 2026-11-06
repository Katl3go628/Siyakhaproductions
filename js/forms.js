// Enquiry form: client-side validation + submission to a third-party form service.
// The endpoint lives in the form's data-endpoint attribute (no secrets in JS).
(function () {
  var form = document.getElementById('enquiry-form');
  if (!form) return;
  var status = document.getElementById('form-status');
  var btn = form.querySelector('button[type="submit"]');
  var params = new URLSearchParams(window.location.search);
  var pre = params.get('division');
  if (pre === 'sound' || pre === 'print') form.division.value = pre;

  var rules = {
    name: function (v) { return v.trim() ? '' : 'Enter your full name.'; },
    email: function (v) {
      if (!v.trim()) return 'Enter your email address.';
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Enter a valid email address, for example name@company.com.';
    },
    division: function (v) { return v ? '' : 'Choose Technical Sound or Printing.'; },
    message: function (v) { return v.trim().length >= 10 ? '' : 'Enter a message of at least 10 characters.'; }
  };

  function check(name) {
    var field = form.elements[name];
    var msg = rules[name](field.value);
    document.getElementById(name + '-err').textContent = msg;
    field.setAttribute('aria-invalid', msg ? 'true' : 'false');
    return msg === '';
  }
  Object.keys(rules).forEach(function (n) {
    form.elements[n].addEventListener('blur', function () { check(n); });
  });

  function say(text, ok) {
    status.textContent = text;
    status.className = 'status ' + (ok ? 'ok' : 'bad');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    status.textContent = '';
    var firstBad = null;
    Object.keys(rules).forEach(function (n) {
      if (!check(n) && !firstBad) firstBad = form.elements[n];
    });
    if (firstBad) { firstBad.focus(); return; }
    if (form._gotcha.value) return; // spam trap: bots fill this in

    var endpoint = form.getAttribute('data-endpoint');
    if (!endpoint || endpoint.indexOf('YOUR_FORM_ID') !== -1) {
      say('This form is not connected to a form service yet, so your message was not sent.', false);
      return;
    }
    btn.disabled = true; btn.textContent = 'Sending...';
    fetch(endpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
      .then(function (r) {
        if (!r.ok) throw new Error('bad response');
        form.reset();
        say('Thank you. Your enquiry has been sent.', true);
      })
      .catch(function () { say('Your message could not be sent. Check your connection and try again.', false); })
      .then(function () { btn.disabled = false; btn.textContent = 'Send enquiry'; });
  });
})();
