import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class HierarchyService {

  //TODO:
  // make node behaviourSubject for tree data tobe
  // globally modified on all components
  constructor(private httpClient: HttpClient) {

  }

  getCompanyTree(req: Object){
    return this.httpClient.post(  environment.tree_backend +'/api/getCompanyTree', req);
  }
  getData(req : Object){
    return this.httpClient.post(environment.tree_backend +'/api/getData',req);
  }
  newNode(req : Object){
    return this.httpClient.post(environment.tree_backend +'/api/newNode',req);
  }
}
