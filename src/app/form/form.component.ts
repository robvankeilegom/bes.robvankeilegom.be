import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ISetting, IVersnelling } from '../shared/setting.model';

declare let toastr;

@Component( {
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: [ './form.component.scss' ]
} )
export class FormComponent implements OnInit {

  @Input() setting: ISetting;
  @Output() updateCurrentSetting = new EventEmitter();
  @Output() saveAsNew = new EventEmitter();

  constructor () { }

  public ngOnInit () { }

  public preventCharacters ( event: any ) {
    if ( event && event.target.id !== 'naam' ) {
      if ( ( event.which < 48 || event.which > 57 )
        && event.which !== 0
        && event.which !== 8
        && event.which !== 44
        && event.which !== 46
        && !event.ctrlKey ) {
        event.preventDefault();
      }
    }
  }

  public updateGraph ( event: any ) {
    if ( this.setting.hasOwnProperty( event.target.id ) ) {
      this.setting[ event.target.id ] = event.target.value;
    }

    if ( event.target.name === 'versnelling' ) {
      this.setting.versnellingen[ event.target.id - 1 ].waarde = <number>event.target.value;
    }

    this.updateCurrentSetting.emit( this.setting );
  }

  public saveAsNewClick ( event: any ) {
    this.saveAsNew.emit( this.setting );
  }

  public addVersnelling () {
    if ( this.setting.versnellingen.length < 8 ) {
      this.setting.versnellingen.push( <IVersnelling>{
        nummer: this.setting.versnellingen.length + 1,
        waarde: this.setting.versnellingen[ this.setting.versnellingen.length - 1 ].waarde
      } );
    } else {
      toastr.error( 'Dat zal wel genoeg zijn hé' );
    }
  }

}
