import { Component, Input, OnInit } from '@angular/core';
import { trigger,state,style,transition,animate } from '@angular/animations';

class Node {
  public header: string;
  public nodes: Node[]; // recursive data structure
  public content: string;
  public style: string;
  public type: string;
}

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss'],
  animations: [
    trigger('collapse',[
      state('in', style({
        backgroundColor: 'transparent',
        opacity: '1',
      })),
      state('out', style({
        opacity: '0',
      })),
      transition('in => out', animate('300ms ease-in')),
    ]),
  ]
})
export class NodeComponent implements OnInit {

  @Input() node: Node;
  wasClicked = false;
  state: string = 'in';
  constructor() { }

  ngOnInit() {
  }

  public isLeaf(node): boolean {
    return this.node.nodes.length === 0;
  }

  onClick($event) {
    var targets = event.target;
    let parent = ( <HTMLElement>event.target ).parentElement.parentElement.parentElement;
    //console.log(parent);
    this.state = (this.state === 'in' ? 'out' : 'in');
    this.wasClicked= !this.wasClicked;
  }

}
