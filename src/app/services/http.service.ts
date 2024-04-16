import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import * as Yang from 'yang-js';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
    const req = this.http.get("https://raw.githubusercontent.com/YangModels/yang/main/standard/ietf/DRAFT/network-topology%402013-10-21.yang", 
    {
      headers: { 
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT'
      },
      responseType: 'text'
    });
    
    req.subscribe(res => {
      console.log(res);
    });
  }
}
