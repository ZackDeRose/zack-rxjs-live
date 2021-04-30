import { Observable } from 'rxjs';
import { scan, startWith } from 'rxjs/operators';

export function count(inc: Observable<any>): Observable<number> {
  return inc.pipe(
    scan((acc) => acc + 1, 0),
    startWith(0)
  );
}
