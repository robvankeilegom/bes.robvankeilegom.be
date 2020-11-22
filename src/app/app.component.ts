import { Component, OnInit } from '@angular/core';
import { ISetting, IVersnelling } from './shared/setting.model';
import { IPlot, IData } from './shared/plot.model';

import Chart from 'chart.js';
import * as $ from 'jquery';
import { IList, IListItem } from './shared/list.model';

declare let toastr;

@Component( {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
} )
export class AppComponent implements OnInit {

  currentSetting: ISetting;
  plots: IPlot[] = [];
  lists: IList[] = [];
  maxPlots = 6;
  chart: any;

  colors = [
    '#5481E6',
    '#F15F74',
    '#98CB4A',
    '#F7D842',
    '#F76D3C',
    '#913CCD',
  ];

  ngOnInit () {
    this.currentSetting = this.defaultValue();
    this.updateGraph();
  }

  updateCurrentSetting ( setting: ISetting ) {
    this.currentSetting = setting;
    this.updateGraph();
  }

  saveAsNew ( setting: ISetting ) {
    if ( this.plots.length < this.maxPlots ) {
      toastr.success( setting.naam + ' opgeslagen.' );
      this.currentSetting = this.defaultValue();
      this.updateGraph( true );
    } else {
      toastr.error( 'Maximum ' + this.maxPlots + '!' );
    }
  }

  updateGraph ( addNew?) {
    addNew = addNew || false;

    if ( this.chart && typeof this.chart.destroy === 'function' ) {
      this.chart.destroy();
    }

    if ( this.plots.length !== 0 && addNew === false ) {
      this.plots.pop();
    } else if ( this.lists.length !== 0 && addNew === false ) {
      this.lists.pop();
    } else if ( this.plots.length ) {
      this.plots[ this.plots.length - 1 ][ 'borderDash' ] = undefined;
    }



    const dataset: IPlot = {
      label: this.currentSetting.naam,
      backgroundColor: 'rgba(0, 0, 0, 0)',
      borderWidth: 4,
      borderColor: this.colors[ this.plots.length % this.maxPlots ],
      showLine: true,
      lineTension: 0,
      tension: 0,
      data: [],
      borderDash: [ 10, 5 ],
    };


    dataset.data.push( {
      x: 0,
      y: 0
    } );

    let dataElement: IData;
    let lastSpeed: number;
    let x: number;
    let vi = 1;
    const list: IList = {
      naam: this.currentSetting.naam,
      color: dataset.borderColor,
      items: []
    };
    let listItem: IListItem;

    this.currentSetting.versnellingen.forEach( versnelling => {
      if ( versnelling.waarde === 0 ) {
        return;
      }
      x = (
        ( this.currentSetting.toerental / this.currentSetting.diffVerhouding / versnelling.waarde )
        * ( this.currentSetting.bandOmtrek * 60 )
      ) / 1000;
      if ( dataElement !== undefined ) {
        dataElement.y = Math.round( ( 1000 * lastSpeed * versnelling.waarde * this.currentSetting.diffVerhouding )
          / ( 60 * this.currentSetting.bandOmtrek ) );
        listItem.terugVal = dataElement.y;
        dataset.data.push( dataElement );
        list.items.push( listItem );
        vi++;
      }

      lastSpeed = x;
      x = Math.round( x );

      dataset.data.push( {
        x: x,
        y: this.currentSetting.toerental
      } );

      dataElement = {
        x: x,
        y: 0
      };

      listItem = {
        versnelling: vi,
        snelheid: x,
        terugVal: 0
      };


    } );
    list.items.push( listItem );
    this.plots.push( dataset );
    this.lists.push( list );

    const canvas = <HTMLCanvasElement>$( '#chart' ).get( 0 );
    const ctx = canvas.getContext( '2d' );


    this.chart = new Chart( ctx, {
      type: 'scatter',
      data: {
        datasets: this.plots
      },
      options: {
        responsive: true,
        hoverMode: 'single',
        scales: {
          yAxes: [ {
            scaleLabel: {
              display: true,
              labelString: 'RPM'
            }
          } ],
          xAxes: [ {
            gridLines: {
              zeroLineColor: 'rgba(0, 0, 0, 1)'
            },
            scaleLabel: {
              display: true,
              labelString: 'KM/U'
            }
          } ]
        },
        animation: {
          duration: 0
        }
      }

    } );
  }

  defaultValue () {
    return {
      naam: 'Setting ' + ( this.plots.length + 1 ),
      toerental: 7700,
      diffVerhouding: 4.428,
      bandOmtrek: 1.79,
      versnellingen: [
        <IVersnelling>{
          nummer: 1,
          waarde: 2.923,
          stringWaarde: '2.923'
        },
        <IVersnelling>{
          nummer: 2,
          waarde: 1.882,
          stringWaarde: '1.882',
        },
        <IVersnelling>{
          nummer: 3,
          waarde: 1.36,
          stringWaarde: '1.36',
        },
        <IVersnelling>{
          nummer: 4,
          waarde: 1.068,
          stringWaarde: '1.068',
        },
        <IVersnelling>{
          nummer: 5,
          waarde: 0.864,
          stringWaarde: '0.864',
        }
      ]
    };
  }
}
