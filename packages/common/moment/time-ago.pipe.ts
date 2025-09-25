import { ChangeDetectorRef, NgZone, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'timeAgo',
  standalone: true,
  pure:false
})
export class TimeAgoPipe implements PipeTransform,OnDestroy {
  private _currentTimer: number | null = null;
  private _lastValue: moment.MomentInput;
  private _lastTime!: Number;
  private _lastLocale: string | null = null;
  private _lastText:string='';

  constructor(private ngZone:NgZone,private cdRef:ChangeDetectorRef){}

  format(m:moment.Moment){
    return m.from(moment())
  }

  transform(value: moment.MomentInput): string {
    if (this._hasChanged(value)) {
      this._lastTime = this._getTime(value);
      this._lastValue = this._getTime(value);
      this._lastLocale = this._getLocale(value);
      this._removeTimer();
      this._createTimer()
      this._lastText=this.format(moment(value))
    } else {
      this._createTimer();
    }

    return this._lastText;
  }

  ngOnDestroy(): void {
    this._removeTimer()
  }


  private _createTimer(){
    if(this._currentTimer){
      return;
    }
    const momentInstance=moment(this._lastValue)
    const timeToUpdate=this._getSecondsUntilUpdate(momentInstance)*1000

    this._currentTimer=this.ngZone.runOutsideAngular(()=>{
      if(typeof window !=='undefined'){
        return window.setTimeout(()=>{
          this._lastText=this.format(moment(this._lastValue))
          this._currentTimer=null
          this.ngZone.run(()=>this.cdRef.markForCheck())
        },timeToUpdate)
      }else{
        return null;
      }
    })
  }

  private _removeTimer(){
    if(this._currentTimer){
      window.clearTimeout(this._currentTimer)
      this._currentTimer=null;
    }
  }

  private _hasChanged(value: moment.MomentInput) {
    return this._getTime(value) !== this._lastTime || this._getLocale(value) !== this._lastLocale;
  }

  private _getTime(value: moment.MomentInput): number {
    if (moment.isDate(value)) {
      return value.getTime();
    } else if (moment.isMoment(value)) {
      return value.valueOf();
    } else {
      return moment(value).valueOf();
    }
  }

  private _getLocale(value: moment.MomentInput): string | null {
    return moment.isMoment(value) ? value.locale() : moment.locale();
  }

  private _getSecondsUntilUpdate(momentInstance:moment.Moment){
    const howOld=Math.abs(moment().diff(momentInstance,'minute'))
    if(howOld<1){
      return 1;
    }else if(howOld<60){
      return 30
    }else if(howOld<180){
      return 300
    }else{
      return 3600
    }
  }
}
