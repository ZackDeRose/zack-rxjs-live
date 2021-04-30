import { Observable, timer } from 'rxjs';
import { take, map, mergeMap, scan, startWith } from 'rxjs/operators';

function window(length: number): Observable<-1 | 1> {
  return timer(0, length).pipe(
    take(2),
    map((_, i) => (i ? -1 : 1))
  );
}

export function windowedCount<T>(windowLength: number) {
  return function (incoming: Observable<T>): Observable<number> {
    return incoming.pipe(
      mergeMap(() => window(windowLength)),
      scan((acc, curr) => acc + curr, 0),
      startWith(0)
    );
  };
}
