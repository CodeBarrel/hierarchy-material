import {Component, ElementRef, Input, OnInit} from '@angular/core';
import { trigger,state,style,transition,animate,group } from '@angular/animations';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { HierarchyService } from '../../../services/hierarchy.service';

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

  loader: boolean = true;

  constructor(
    public ngxSmartModalService: NgxSmartModalService,
    public HierarchyService: HierarchyService,
    private elRef:ElementRef
  ) { }

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

  activeOptions($event){
    let otherNodeOptions = this.elRef.nativeElement.querySelectorAll('.single-node');
    let element = $event.currentTarget;
    let pElement = element.parentElement;
    otherNodeOptions.forEach(eachObj => {
      if(eachObj.classList.contains('active-options') && eachObj != pElement){
        eachObj.classList.remove('active-options');
      }
      if(eachObj == pElement){
        pElement.classList.toggle('active-options');
      }
    });
  }

  editNode(node){
    let nodeEditData;
    let allNodes = [];
    let selectedChildNodes = [];
    this.HierarchyService.getTree().subscribe(
      (data) => {
        for (let key in data) {
          let value = data[key];
          allNodes.push({
            id: value.id,
            text: value.name
          });
          node.nodes.forEach((singleNode)=>{
            if(value.name == singleNode.header) {
              selectedChildNodes.push(String(value.id));
            }
          });
        }
        nodeEditData = {
          nodeName:node.header,
          nodes: allNodes,
          selectedNodes: selectedChildNodes,
          options: {
            multiple: true
          }
        };
        console.log(nodeEditData);
        this.ngxSmartModalService.setModalData(nodeEditData, 'nodeEditModal');
        this.ngxSmartModalService.getModal('nodeEditModal').open();

      },
      (err) => {
        console.log(err);
        this.ngxSmartModalService.resetModalData('nodeEditModal');
      }
    );
    /*node.nodes.forEach((node)=>{
      selectedChildNodes.push({
        id: node.header,
        text: node.header
      });
    });*/
  }

  toggleShowDiv(divName: string) {
    this.animationState = this.animationState === 'out' ? 'in' : 'out';
  }

}
