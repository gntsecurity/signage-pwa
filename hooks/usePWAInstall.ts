import { useEffect } from 'react';
import { triggerInstallPrompt } from '@/core/pwa';

export function usePWAInstall() {
  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      // Store the event and trigger the install prompt later
      triggerInstallPrompt();
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);
}
