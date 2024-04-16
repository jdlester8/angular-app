import { Injectable } from '@angular/core';
import { Router, Switch } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  routers: Router[];
  switch: Switch[];

  constructor() { }
}
