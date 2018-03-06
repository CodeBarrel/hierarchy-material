import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {NgxSmartModalService} from 'ngx-smart-modal';

@Component({
  selector: 'app-view2',
  templateUrl: './view2.component.html',
  styleUrls: ['./view2.component.scss']
})
export class View2Component implements OnInit {
  public items: Observable<any[]>;
  public dataItem = [];
  public tree = [];
  node;
  isDataAvailable: boolean = false;
  //Temp
  /*node;
  event;
  mouseWheelDir: string = '';
  public loading = false;*/

  constructor(
    private afs: AngularFirestore,
    private router: Router,
    public ngxSmartModalService: NgxSmartModalService
  ) {

    // .snapshotChanges() returns a DocumentChangeAction[], which contains
    // a lot of information about "what happened" with each change. If you want to
    // get the data and the id use the map operator.
    this.items = afs.collection('tree').snapshotChanges().map(actions => {
      this.dataItem = [];
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        this.dataItem.push({ id : id, data : data});
        return { id, ...data };
      });
    });
  }

  ngOnInit() {

  }

  testFunc() {
    /*this.router.navigateByUrl('/dashboard', { skipLocationChange: false });
    this.router.navigate(["dashboard/hierarchy"]);*/
    this.isDataAvailable = true;
    this.getTree();
    console.log(this.tree);
  }

  getTree() {
    this.dataItem.forEach(node => {
      // console.log(node);
      if(node.data.type == 'parent') {
        this.tree['header'] = node.data.name;
        this.tree['type'] = node.data.type;
        this.tree['nodes'] = this.recursiveTree(node.id);
      }
    });
    /*this.node = this.tree;
    console.log(this.tree);*/
  }

  recursiveTree(id): Array<any> {
    let treeInner = [];
    this.dataItem.forEach((node) => {
      if(node.data.type != 'parent'){
        if(node.data.parent == id) {
          treeInner.push({
            'header': node.data.name,
            'type': node.data.type,
            'nodes': this.recursiveTree(node.id)
          });
        }
      }
    });
    return treeInner;
  }

  ngAfterViewInit() {
    this.ngxSmartModalService.getModal('nodeEditModal').onCloseFinished.subscribe((event: Event) => {
      this.ngxSmartModalService.resetModalData('nodeEditModal');
    });
  }

  closeEditNodeModal(){
    this.ngxSmartModalService.resetModalData('nodeEditModal');
  }

  mouseWheelUpFunc(event) {
    //this.mouseWheelDir = 'upward direction';
  }

  mouseWheelDownFunc(event) {
    //this.mouseWheelDir = 'downward direction';
  }

}
