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

(function() {
    var eci_error_count = 0;

    var script = document.createElement('script');
    script.textContent = '(' + codeToInject + '())';
    (document.head || document.documentElement).appendChild(script);
    script.parentNode.removeChild(script);

    document.addEventListener('ErrorToExtension', function(e) {
        eci_error_count++;
        chrome.runtime.sendMessage({error: eci_error_count.toString()});
    });
})()