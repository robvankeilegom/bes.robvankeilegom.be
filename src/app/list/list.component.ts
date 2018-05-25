import { Component, OnInit, Input } from '@angular/core';
import { IList } from '../shared/list.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() lists:IList[]
  
  constructor() { }

  ngOnInit() {
  }

}
