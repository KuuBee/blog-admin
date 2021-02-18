import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { hmrBootstrap } from './hmr';

declare const module: any;

if (environment.production) {
  enableProdMode();
}

const bootstrap = () => platformBrowserDynamic().bootstrapModule(AppModule);

if (environment.hmr) {
  if (module.hot) {
    hmrBootstrap(module, bootstrap);
  } else {
    console.error('HMR is not enabled for webpack-dev-server!');
    console.log('Are you using the --hmr flag for ng serve?');
  }
} else {
  bootstrap().catch(err => console.log(err));
}
/*


    {
      "route": "sessions",
      "name": "sessions",
      "type": "sub",
      "icon": "question_answer",
      "children": [
        {
          "route": "403",
          "name": "403",
          "type": "link"
        },
        {
          "route": "404",
          "name": "404",
          "type": "link"
        },
        {
          "route": "500",
          "name": "500",
          "type": "link"
        }
      ]
    }

*/
