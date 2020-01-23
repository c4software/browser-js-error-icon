var eci_error_count = 0;

function codeToInject() {
    window.addEventListener('error', function(e) {
        document.dispatchEvent(new CustomEvent('ErrorToExtension', {}));
    });    

    window.addEventListener('unhandledrejection', function(e) {
        document.dispatchEvent(new CustomEvent('ErrorToExtension', {}));
    });

    var consoleErrorFunc = window.console.error;
    window.console.error = function() {
        consoleErrorFunc.apply(console, arguments);
        document.dispatchEvent(new CustomEvent('ErrorToExtension', {}));
    }
}

(function() {
    chrome.runtime.sendMessage({error: eci_error_count.toString()});

    var script = document.createElement('script');
    script.textContent = '(' + codeToInject + '())';
    (document.head || document.documentElement).appendChild(script);
    script.parentNode.removeChild(script);

    document.addEventListener('ErrorToExtension', function(e) {
        eci_error_count++;
        chrome.runtime.sendMessage({error: eci_error_count.toString()});
    });
})()