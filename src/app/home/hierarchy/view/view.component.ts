import { Component, OnInit } from '@angular/core';
import {HierarchyService} from '../../../services/hierarchy.service';
import {NgxSmartModalService} from 'ngx-smart-modal';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  node: Node;
  event;
  isDataAvailable: boolean = false;
  mouseWheelDir: string = '';
  public loading = false;

  constructor(private hierarchyService: HierarchyService,public ngxSmartModalService: NgxSmartModalService) {
  }

  ngOnInit() {
    this.hierarchyService.getCompanyTree({'companyID': 1}).subscribe(data => {
      let req = data;
      //console.log(req[0]);
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

  ngAfterViewInit() {
    this.ngxSmartModalService.getModal('nodeEditModal').onCloseFinished.subscribe((event: Event) => {
      this.ngxSmartModalService.resetModalData('nodeEditModal');
    });
  }

  onStart(event) {
    //console.log('started output:', event);
  }

  onStop(event) {
    //console.log('stopped output:', event);
  }
  closeEditNodeModal(){
    this.ngxSmartModalService.resetModalData('nodeEditModal');
  }
}
