import { getConfig } from '~/config';

export class InjectService {
  isDev = getConfig().ALLOW_DEV_MODE;

  injectPlausible() {
    const isInjected = document.querySelector('#plausible-script');

    if (!isInjected) {
      const url = 'https://plausible.io/js/script.js';
      const dataDomain = this.isDev ? 'dev.oracles.rip' : 'oracles.rip';
      const body = document.querySelector('body');
      const script = document.createElement('script');

      script.setAttribute('data-domain', dataDomain);
      script.setAttribute('id', 'plausible-script');
      script.setAttribute('src', url);

      body?.appendChild(script);
    }
  }
}
