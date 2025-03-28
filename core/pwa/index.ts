let deferredPrompt: any;

export function listenToInstallPrompt() {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    // You could store `deferredPrompt` in a context for triggering the prompt later
  });
}

export function triggerInstallPrompt() {
  if (!deferredPrompt) return;

  deferredPrompt.prompt();
  deferredPrompt.userChoice.then((choiceResult: any) => {
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    deferredPrompt = null;
  });
}
