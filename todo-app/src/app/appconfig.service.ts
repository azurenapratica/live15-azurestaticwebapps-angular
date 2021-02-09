import { Inject, Injectable } from '@angular/core';
import { AppService } from './app.service';

@Injectable()
export class AppConfigService extends AppService {

    private envUrl = 'settings';
    private configSettings: any = null;

    get settings() {
        return this.configSettings;
    }

    public load(): Promise<any> {
        return new Promise((resolve, reject) => {
          console.log('response from the server:::', "");
          this.configSettings = "response";
          resolve(true);
      });
    }
}
