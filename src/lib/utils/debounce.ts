export class Debounce {
  private readonly _delay: number;
  private _timer: NodeJS.Timeout | string | number | undefined;

  constructor(delay: number) {
    this._delay = delay;
  }

  call(fn: () => void) {
    clearTimeout(this._timer);
    this._timer = setTimeout(fn, this._delay);
  }
}
