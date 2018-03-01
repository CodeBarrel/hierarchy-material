import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { trigger,state,style,transition,animate,group } from '@angular/animations';
import {NgxSmartModalService} from 'ngx-smart-modal';

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
    /*trigger('collapse',[
      state('in', style({
        backgroundColor: 'transparent',
        opacity: '1',
      })),
      state('out', style({
        opacity: '0',
      })),
      transition('in => out', animate('300ms ease-in')),
    ]),*/
    trigger('slideInOut', [
      state('in', style({
        'max-height': '500px', 'opacity': '1', 'visibility': 'visible'
      })),
      state('out', style({
        'max-height': '0px', 'opacity': '0', 'visibility': 'hidden'
      })),
      transition('in => out', [group([
          animate('400ms ease-in-out', style({
            'opacity': '0'
          })),
          animate('600ms ease-in-out', style({
            'max-height': '0px'
          })),
          animate('700ms ease-in-out', style({
            'visibility': 'hidden'
          }))
        ]
      )]),
      transition('out => in', [group([
          animate('1ms ease-in-out', style({
            'visibility': 'visible'
          })),
          animate('600ms ease-in-out', style({
            'max-height': '500px'
          })),
          animate('800ms ease-in-out', style({
            'opacity': '1'
          }))
        ]
      )])
    ]),
  ]
})
export class NodeComponent implements OnInit {

  @Input() node: Node;
  wasClicked = false;
  state: string = 'in';
  option: boolean = false;
  animationState = 'in';

  editNodeVar: Node;
  @Output() nodeEvent = new EventEmitter<Node>();

  constructor(public ngxSmartModalService: NgxSmartModalService) { }

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
  activeOptions(option: any){
    (option == true) ? this.option = false : this.option = true
  }
  editNode(node){
    this.editNodeVar = node;
    this.nodeEvent.emit(this.editNodeVar);
    // console.log(this.editNodeVar);
    this.ngxSmartModalService.getModal('nodeEditModal').open();
    //this.ngxSmartModalService.getModal('nodeEditModal').open(node);
  }

  toggleShowDiv(divName: string) {
    this.animationState = this.animationState === 'out' ? 'in' : 'out';
  }

  openModal() {
    this.ngxSmartModalService.getModal('nodeEditModal').onOpen.subscribe((event: Event) => {
      console.log('Rickroll modal opened!', event);
    });
  }

  /*ngAfterViewInit() {
    this.ngxSmartModalService.getModal('nodeEditModal').onOpen.subscribe((event: Event) => {
      console.log('Rickroll modal opened!', event);
    });
  }*/

}
