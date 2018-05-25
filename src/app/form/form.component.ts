import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ISetting, IVersnelling } from '../shared/setting.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Input() setting: ISetting
  @Output() updateCurrentSetting = new EventEmitter()
  @Output() saveAsNew = new EventEmitter()

  constructor() { }

  ngOnInit() { }

  updateGraph(event: any) {
    if (this.setting.hasOwnProperty(event.target.id)) {
      this.setting[event.target.id] = event.target.value
    }

    if (event.target.name === 'versnelling') {
      this.setting.versnellingen[event.target.id - 1].waarde = <number>event.target.value
    }
    console.log(this.setting)
    this.updateCurrentSetting.emit(this.setting)
  }

  saveAsNewClick(event: any) {
    this.saveAsNew.emit(this.setting)
  }

  addVersnelling() {
    console.log(this.setting.versnellingen.length)
    this.setting.versnellingen.push(<IVersnelling>{
      nummer: this.setting.versnellingen.length + 1,
      waarde: this.setting.versnellingen[this.setting.versnellingen.length - 1].waarde
    })
    console.log(this.setting.versnellingen.length)
  }

}
