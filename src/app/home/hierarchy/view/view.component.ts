import { Component, OnInit } from '@angular/core';
import {HierarchyService} from '../../../services/hierarchy.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  node: Node;
  event;
  isDataAvailable: boolean = false;
  title = 'Welcome to Tree Hierarchy View';
  mouseWheelDir: string = '';

  constructor(private hierarchyService: HierarchyService) {
  }

  ngOnInit() {
    this.hierarchyService.getCompanyTree({'companyID': 1}).subscribe(data => {
      let req = data;
      console.log(req[0]);
      this.node = req[0];
      this.isDataAvailable = true;
    });
  }

  mouseWheelUpFunc(event) {
    this.mouseWheelDir = 'upward direction';
  }

  mouseWheelDownFunc(event) {
    this.mouseWheelDir = 'downward direction';
  }
}