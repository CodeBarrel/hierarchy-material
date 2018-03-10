
import {Directive, ElementRef, Input, Renderer2} from '@angular/core';
import { Output, HostListener, EventEmitter } from '@angular/core';

@Directive({
  selector: '[mouseWheel]'
})
export class MousewheelDirective {
  scrollCount: number = 0;
  @Output() mouseWheelUp = new EventEmitter();
  @Output() mouseWheelDown = new EventEmitter();

  @Input() appShadow: string;
  @Input() appShadowX: string;
  @Input() appShadowY: string;
  @Input() appShadowBlur: string;

  constructor(private elem: ElementRef, private renderer: Renderer2) {
    //renderer.setStyle(elem.nativeElement, 'transform', 'scale(1)');
  }

  ngOnInit() {
     this.renderer.setStyle(this.elem.nativeElement, 'transform', 'scale(1)');
  }

  @HostListener('mousewheel', ['$event']) onMouseWheelChrome(event: any) {
    this.mouseWheelFunc(event);
  }

  @HostListener('DOMMouseScroll', ['$event']) onMouseWheelFirefox(event: any) {
    this.mouseWheelFunc(event);
  }

  @HostListener('onmousewheel', ['$event']) onMouseWheelIE(event: any) {
    this.mouseWheelFunc(event);
  }

  mouseWheelFunc(event: any) {
    var event = window.event || event; // old IE support
    var delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));

    if(delta > 0) {
      /*this.mouseWheelUp.emit(event);*/
      this.scrollCount += 1;
    } else if(delta < 0) {
      /*this.mouseWheelDown.emit(event);*/
      this.scrollCount -= 1;
    }
    if(this.scrollCount > 5){
      this.scrollCount = 5;
    }
    if(this.scrollCount < -6){
      this.scrollCount = -6;
    }

    if(this.scrollCount <= 5 && this.scrollCount >= -6){
      switch (this.scrollCount) {
        case -6:
          this.renderer.setStyle(this.elem.nativeElement, 'transform', 'scale(0.4)');
          break;
        case -5:
          this.renderer.setStyle(this.elem.nativeElement, 'transform', 'scale(0.5)');
          break;
        case -4:
          this.renderer.setStyle(this.elem.nativeElement, 'transform', 'scale(0.6)');
          break;
        case -3:
          this.renderer.setStyle(this.elem.nativeElement, 'transform', 'scale(0.7)');
          break;
        case -2:
          this.renderer.setStyle(this.elem.nativeElement, 'transform', 'scale(0.8)');
          break;
        case -1:
          this.renderer.setStyle(this.elem.nativeElement, 'transform', 'scale(0.9)');
          break;
        case 0:
          this.renderer.setStyle(this.elem.nativeElement, 'transform', 'scale(1)');
          break;
        case 1:
          this.renderer.setStyle(this.elem.nativeElement, 'transform', 'scale(1.1)');
          break;
        case 2:
          this.renderer.setStyle(this.elem.nativeElement, 'transform', 'scale(1.2)');
          break;
        case 3:
          this.renderer.setStyle(this.elem.nativeElement, 'transform', 'scale(1.3)');
          break;
        case 4:
          this.renderer.setStyle(this.elem.nativeElement, 'transform', 'scale(1.4)');
          break;
        case 5:
          this.renderer.setStyle(this.elem.nativeElement, 'transform', 'scale(1.5)');
          break;
        default:
          this.renderer.setStyle(this.elem.nativeElement, 'transform', 'scale(1)');
      }
    }


    //console.log(this.scrollCount);
    // for IE
    event.returnValue = true;
    // for Chrome and Firefox
    if(event.preventDefault) {
      event.preventDefault();
    }
  }

}



