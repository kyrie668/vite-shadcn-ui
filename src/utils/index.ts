/**
 * @description 函数防抖
 * @param func 需要进行防抖的函数
 * @param delay 时间间隔（毫秒）
 * @returns 返回一个防抖后的函数
 */
export function debounce<T extends (...args: any[]) => void>(func: T, delay: number): T {
  let timer: NodeJS.Timeout | null = null;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  } as T;
}

/**
 * @description 函数节流
 * @param func 需要进行节流的函数
 * @param delay 时间间隔（毫秒）
 * @returns 返回一个节流后的函数
 */
export function throttle<T extends (...args: any[]) => void>(func: T, delay: number): T {
  let lastExecTime = 0;
  let timer: NodeJS.Timeout | null = null;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    const currentTime = Date.now();
    const elapsedTime = currentTime - lastExecTime;

    if (!timer || elapsedTime >= delay) {
      func.apply(this, args);
      lastExecTime = currentTime;
    } else {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
        lastExecTime = Date.now();
      }, delay - elapsedTime);
    }
  } as T;
}
