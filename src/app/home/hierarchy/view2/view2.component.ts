import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-view2',
  templateUrl: './view2.component.html',
  styleUrls: ['./view2.component.scss']
})
export class View2Component implements OnInit {
  public items: Observable<any[]>;
  public dataItem = [];
  public tree = [];
  constructor(afs: AngularFirestore) {

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
   /* console.log(this.dataItem)*/
  }

  getTree() {
    this.dataItem.map(node => {
      // console.log(node);
      if(node.data.type == 'parent') {
        this.tree['header'] = node.data.name;
        this.tree['type'] = node.data.type;
        this.tree['nodes'] = this.recursiveTree(node.id);
      }
    });
    // console.log(this.tree);
  }

  recursiveTree(id) {
    let treeInner = [];
    console.log(id);
    this.dataItem.map(node => {
      if(node.data.type != 'parent'){
        // console.log(node.data.parent , id);
        if(node.data.parent == id) {
          treeInner['header'] = node.data.name;
          treeInner['type'] = node.data.type;
          treeInner['nodes'] = this.recursiveTree(node.id);
        }
      }
      return treeInner;
    });
    // console.log(treeInner);
  }

}
