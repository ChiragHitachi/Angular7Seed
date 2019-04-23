import {
  Directive,
  ElementRef,
  Input
} from '@angular/core';
import {
  GridComponent
} from './grid.component';

@Directive({
  selector: 'eag-grid-column, [eag-grid-column]'
})
export class GridColumnDirective {
  @Input() header: string;
  @Input() field: string;
  @Input() type: string;
  @Input() url: string;
  @Input() itemClick ? : Function;
  @Input() colWidth ? : string;
  @Input() sortable ? : boolean;

  constructor(private gridComponent: GridComponent) {
    this.gridComponent.addColumn(this);
  }

  /**
   * on column click
   */
 
}
