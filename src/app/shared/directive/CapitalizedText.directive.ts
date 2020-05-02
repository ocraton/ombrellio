import { Directive, ElementRef, HostListener } from '@angular/core';
@Directive({
  selector: '[appCapitalizeCase]',
  host: {
    '(input)': '$event'
  }
})
export class CapitalizedTextDirective {

  lastValue: string;

  constructor(public ref: ElementRef) { }

  @HostListener('input', ['$event']) onInput($event) {
    var start = $event.target.selectionStart;
    var end = $event.target.selectionEnd;
    const termcapitalized = $event.target.value.charAt(0).toUpperCase() + $event.target.value.slice(1);
    $event.target.value = termcapitalized;
    $event.target.setSelectionRange(start, end);
    $event.preventDefault();

    if (!this.lastValue || (this.lastValue && $event.target.value.length > 0 && this.lastValue !== $event.target.value)) {
      this.lastValue = this.ref.nativeElement.value = $event.target.value;
      // Propagation
      const evt = document.createEvent('HTMLEvents');
      evt.initEvent('input', false, true);
      event.target.dispatchEvent(evt);
    }
  }

}
