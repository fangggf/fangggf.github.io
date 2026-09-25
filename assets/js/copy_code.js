// create element for copy button in code blocks
var codeBlocks = document.querySelectorAll('pre');
codeBlocks.forEach(function (codeBlock) {
  if (codeBlock.closest('.citation-panel')) return;
  if (codeBlock.querySelector('pre:not(.lineno)') || codeBlock.querySelector('code')) {
    var copyButton = document.createElement('button');
    copyButton.className = 'copy';
    copyButton.type = 'button';
    copyButton.ariaLabel = 'Copy code to clipboard';
    copyButton.innerText = 'Copy';
    copyButton.innerHTML = '<i class="fas fa-clipboard"></i>';
    codeBlock.append(copyButton);

    // get code from code block and copy to clipboard
    copyButton.addEventListener('click', function () {
      // check if code block has line numbers
      // i.e. `kramdown.syntax_highlighter_opts.block.line_numbers` set to true in _config.yml
      // or using `jekyll highlight` liquid tag with `linenos` option
      if (codeBlock.querySelector('pre:not(.lineno)')) {
        // get code from code block ignoring line numbers
        var code = codeBlock.querySelector('pre:not(.lineno)').innerText.trim();
      } else { // if (codeBlock.querySelector('code')) {
        // get code from code block when line numbers are not displayed
        var code = codeBlock.querySelector('code').innerText.trim();
      }
      window.navigator.clipboard.writeText(code);
      copyButton.innerText = 'Copied';
      copyButton.innerHTML = '<i class="fas fa-clipboard-check"></i>';
      var waitFor = 3000;

      setTimeout(function () {
        copyButton.innerText = 'Copy';
        copyButton.innerHTML = '<i class="fas fa-clipboard"></i>';
      }, waitFor);
    });
  }
});

// Citation panels have a visible toolbar, separate from the code itself.
document.querySelectorAll('.citation-copy').forEach(function (button) {
  var resetTimer;
  button.addEventListener('click', async function () {
    var panel = button.closest('.citation-panel');
    var code = panel.querySelector('code');
    var status = panel.querySelector('.citation-status');
    clearTimeout(resetTimer);
    try {
      await navigator.clipboard.writeText(code.textContent.trim());
      button.textContent = 'Copied';
      button.classList.add('is-copied');
      status.textContent = 'BibTeX citation copied to clipboard.';
    } catch (error) {
      var selection = window.getSelection();
      var range = document.createRange();
      range.selectNodeContents(code);
      selection.removeAllRanges();
      selection.addRange(range);
      button.textContent = 'Copy manually';
      button.classList.remove('is-copied');
      status.textContent = 'Clipboard unavailable. The citation is selected; use your keyboard to copy it.';
    }
    resetTimer = setTimeout(function () {
      button.textContent = 'Copy';
      button.classList.remove('is-copied');
      status.textContent = '';
    }, 3000);
  });
});
