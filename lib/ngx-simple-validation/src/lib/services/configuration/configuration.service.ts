import { Injectable } from '@angular/core';

import { IConfiguration } from '../../models/configuration';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  private configuration: IConfiguration;

  constructor() {}

  public setConfig(configuration: IConfiguration) {
    this.configuration = configuration;
  }

  public get Configuration() {
    return this.configuration;
  }
}
