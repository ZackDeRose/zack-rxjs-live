import { TestScheduler } from 'rxjs/testing';
import { count } from './count.operator';

describe('count', () => {
  let testScheduler: TestScheduler;
  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  test('test 0', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const clicks$ = cold('--a---a-a---', { a: {} });
      expectObservable(clicks$.pipe(count)).toBe('0-1---2-3---', [0, 1, 2, 3]);
    });
  });

  test('test 1', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const clicks = cold('----a----a---a---a--a---', { a: {} });
      expectObservable(clicks.pipe(count)).toBe('0---1----2---3---4--5---', {
        0: 0,
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
      });
    });
  });

  test('test 2', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const clicks = cold('-aaaa-a--a-a------a-', { a: {} });
      expectObservable(clicks.pipe(count)).toBe('01234-5--6-7------8-', {
        0: 0,
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
      });
    });
  });
});
