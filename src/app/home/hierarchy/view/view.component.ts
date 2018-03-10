import {Component, ElementRef, OnInit} from '@angular/core';
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
  fullscreenStatus: boolean = false;
  public loading = false;

  constructor(
    private hierarchyService: HierarchyService,
    public ngxSmartModalService: NgxSmartModalService,
    public element: ElementRef,
  ) {
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
  fullscreen() {
    if(!this.fullscreenStatus){
      this.launchIntoFullscreen(this.element.nativeElement.querySelector('#hierarchy-tree'));
    }else{
      this.exitFullscreen();
    }
  }

  launchIntoFullscreen(element) {
    this.fullscreenStatus = true;
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if(element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if(element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  }
  exitFullscreen() {
    this.fullscreenStatus = false;
    if(document.exitFullscreen) {
      document.exitFullscreen();
    } else if(document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
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
