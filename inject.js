function codeToInject() {
    var propagateToExtension = () => {
        document.dispatchEvent(new CustomEvent('ErrorToExtension', {}));
    }

    window.addEventListener('error', propagateToExtension, false);    
    window.addEventListener('unhandledrejection', propagateToExtension, false);

    var consoleErrorFunc = window.console.error;
    window.console.error = function() {
        consoleErrorFunc.apply(console, arguments);
        propagateToExtension();
    }
}

// Ce code s'exécute dans le contexte de l'extension
(function() {
    var eci_error_count = 0;
    
    // Injecter le script dans la page de manière compatible avec Manifest V3
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL('content_script.js');
    script.onload = function() {
        // Nettoyer après chargement pour éviter des fuites de mémoire
        this.remove();
    };
    (document.head || document.documentElement).appendChild(script);

    // Écouter les événements d'erreur envoyés depuis la page
    document.addEventListener('ErrorToExtension', function(e) {
        eci_error_count++;
        chrome.runtime.sendMessage({error: eci_error_count.toString()});
    });
})();