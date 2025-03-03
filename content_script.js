// Ce code sera exécuté dans le contexte de la page web
(function() {
    var propagateToExtension = function() {
        document.dispatchEvent(new CustomEvent('ErrorToExtension', {}));
    };

    window.addEventListener('error', propagateToExtension, false);    
    window.addEventListener('unhandledrejection', propagateToExtension, false);

    var consoleErrorFunc = window.console.error;
    window.console.error = function() {
        consoleErrorFunc.apply(console, arguments);
        propagateToExtension();
    };
})();
