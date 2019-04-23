import { Component, OnInit, Input } from '@angular/core';
import { GridColumnDirective } from './grid-column.directive';

@Component({
  selector: 'eag-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
    @Input() data: any[];
    @Input() dataKey: string;
    @Input() ValueSelectFunction?: Function;
    @Input() gridId: string;
    @Input() paginator?: boolean;
    @Input() editable?: boolean;
    @Input() lazy?: boolean;
    @Input() lazyFunction?: Function;
    @Input() pageSize?: number  = 2;
    @Input() totalRecords?: number;
    public columns : GridColumnDirective[] = [];

  ngOnInit() {
  }

  public addColumn(column : GridColumnDirective){
      this.columns.push(column);
  }
  public onColClick(item, row) {
    if (item.itemClick) {
      item.itemClick(row);
    }
  }
}
