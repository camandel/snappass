(function(){

    var copyError = function(e) {
        function restoreTitle() {
            tooltip.hide();
            tooltipButton.setAttribute('data-bs-original-title', 'Copy URL to clipboard');
            tooltipButton.removeEventListener('mouseleave', restoreTitle);
        }

        var key;
        if (/Mac/i.test(navigator.userAgent)) {
          key = '&#8984;';
        } else {
          key = 'Ctrl';
        }

        tooltipShareButton.setAttribute('data-bs-original-title', "Error, press " + key + "-C to copy");
        tooltipShare.update();
        tooltipShare.show();
        tooltipShareButton.addEventListener('mouseleave', restoreTitle);
    };

    var copySuccess = function(e) {
        function restoreTitle() {
            tooltip.hide();
            msg = (tooltipButton.id.includes("mail") ? "Copy email message to clipboard" : "Copy link to clipboard" );
            tooltipButton.setAttribute('data-bs-original-title', msg);
            tooltipButton.removeEventListener('mouseleave', restoreTitle);
        }

        tooltipButton = e.trigger
        tooltip = bootstrap.Tooltip.getInstance(tooltipButton);
        tooltipButton.setAttribute('data-bs-original-title', 'Copied!');
        tooltip.update();
        tooltip.show();
        tooltipButton.addEventListener('mouseleave', restoreTitle);
    };

    var btns = document.querySelectorAll('.copy-btn');
    var clipboard = new ClipboardJS(btns);

    clipboard.on('success', copySuccess);
    clipboard.on('error', copyError);

    btns = document.querySelectorAll('button');

    var tooltipTriggerList = [].slice.call(btns);
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });

})();

function createMailText(id) {
    const n = id.split("-")[2];
    const password_link = document.querySelector("#password-link-" + n);
  
    var mailText = document.querySelector("#mail-clipboard-" + n);
    const msg = `Il seguente link ed il suo contenuto saranno rimossi dopo essere stati letti o dopo il ${mailText.dataset.expires}:

    ${password_link.value}

Se la pagina non è disponibile, non è scaduta e non vi hai acceduto prima, il segreto potrebbe essere stato compromesso.
Sei pregato di contattare il mittente di questa mail per far invalidare il vecchio segreto e crearne uno nuovo.

---

The following link and its content will be deleted after being read or after the ${mailText.dataset.expires}:

    ${password_link.value}

if the page is not available, the expiration time is not over and you didn't access the link before, the secret could be compromised.
Please inform the sender of this mail to invalidate the old secret and regenerate a new one.

`
    mailText.setAttribute("data-clipboard-text", msg);
}

function deleteSecret(id) {
    const n = id.split("-")[2];
    const password_link = document.querySelector("#password-link-" + n);
    var password_row = document.querySelector("#row-" + n);
    fetch(password_link.value, { method: 'DELETE' })
      .then(res => {
        if (!res.ok) {
          throw new Error('network problem or secret no more available');
        }
        password_row.style.display = "none";
      })
      .catch(error => {
        console.error('Error deleting secret:', error);
      });
}
