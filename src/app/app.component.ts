import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

interface ICoOridinates {
  x: number;
  y: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('target') target;
  annotations: any[] = [];
  annotationCount: number = 0;

  ngOnInit() {
    const down$ = Observable.fromEvent(this.target.nativeElement, "mousedown");
    const up$ = Observable.fromEvent(this.target.nativeElement, "mouseup")
      .do(() => {
        this.annotationCount++;
      });


    const move$ = Observable.fromEvent(document, 'mousemove');

    down$
      .switchMap((event: MouseEvent) => {
        var drag = move$.takeUntil(up$);
        return drag
          .scan(function (acc, v) {
            return {
              prev: acc.curt,
              curt: v
            };
          }, { prev: null, curt: null }).skip(1);
      })
      .map(positions => {
        const p1 = positions.prev;
        const p2 = positions.curt;
        return { x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y }
      })
      .subscribe((line) => {
        // console.log(this.annotationCount);
        if (this.annotations[this.annotationCount]) {
          this.annotations[this.annotationCount] = [...this.annotations[this.annotationCount], line];
        } else {
          this.annotations[this.annotationCount] = [line];
        }
      });
  }

  clear() {
    this.annotations = [];
    this.annotationCount = 0;
    localStorage.removeItem("annotations");
  }

  save() {
    localStorage.setItem("annotations", JSON.stringify(this.annotations));
  }

  retrieve() {
    let annotations = localStorage.getItem("annotations");
    if (annotations) {
      this.annotations = JSON.parse(annotations);
      this.annotationCount = this.annotations.length - 1;
    }
  }
}
