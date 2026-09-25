document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.publication-details button[aria-controls]').forEach(function (button) {
    button.addEventListener('click', function () {
      var row = button.closest('.publication-row');
      var panel = document.getElementById(button.getAttribute('aria-controls'));
      if (!panel) return;
      var opening = button.getAttribute('aria-expanded') !== 'true';
      row.querySelectorAll('button[aria-controls]').forEach(function (other) {
        other.setAttribute('aria-expanded', 'false');
      });
      row.querySelectorAll('[data-publication-panel]').forEach(function (other) {
        other.classList.remove('open');
        other.setAttribute('aria-hidden', 'true');
        other.hidden = true;
      });
      button.setAttribute('aria-expanded', String(opening));
      panel.classList.toggle('open', opening);
      panel.setAttribute('aria-hidden', String(!opening));
      panel.hidden = !opening;
    });
  });
  document.querySelectorAll('a').forEach(function (link) {
    link.classList.remove('waves-effect', 'waves-light');
  });
});
