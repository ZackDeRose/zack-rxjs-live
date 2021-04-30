import { TestScheduler } from 'rxjs/testing';
import { windowedCount } from './windowed-count.operator';

describe('count', () => {
  let testScheduler: TestScheduler;
  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  test('test 1', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const clicks = cold('1s a 7s a 2s a', { a: {} });
      expectObservable(clicks.pipe(windowedCount(5000))).toBe(
        '0 999ms 1 4999ms 0 2s 1 2s 2 2998ms 1 2s 0',
        {
          0: 0,
          1: 1,
          2: 2,
        }
      );
    });
  });

  test('test 2', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const clicks = cold('--a------a--a----', { a: {} });
      expectObservable(
        clicks.pipe(windowedCount(5))
      ).toBe('0-1----0-1--2-1--0--', [0, 1, 2]);
    });
  });
});
