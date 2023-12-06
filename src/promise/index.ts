export const allPromiseFinish = <T>(
  promiseList: Promise<T>[]
): Promise<T[]> => {
  let hasError = false;
  let count = promiseList.length;

  const results: T[] = [];
  if (!count) {
    return Promise.resolve([]);
  }

  return new Promise((resolve, reject) => {
    promiseList.forEach((promise, index) => {
      // promise.catch(() => {}).then(() => {});
      // promise 为rejected时，catch要走，then也会走
      // promise 为fulfilled时，只会走then
      promise
        .catch((e) => {
          hasError = true;
          return e as T;
        })
        .then((result) => {
          count -= 1;
          results[index] = result;

          if (count > 0) {
            return;
          }
          if (hasError) {
            reject(results);
          }
          resolve(results);
        });
    });
  });
};

export const finshOnAllFailed = <T>(rulePromise: T[]): Promise<T[]> => {
  return Promise.all(rulePromise).then((errorList) => {
    const errors = [...errorList].concat([]);
    return errors;
  });
};

export const finshOnFirstFailed = <T extends { errors?: string[] }>(
  rulePromise: Promise<T>[]
): Promise<T[]> => {
  let count = 0;
  return new Promise((resolve, reject) => {
    rulePromise.forEach((promise) => {
      promise.then((ruleError) => {
        if (ruleError.errors?.length) {
          resolve([ruleError]);
        }
        count += 1;
        if (count === rulePromise.length) {
          resolve([]);
        }
      });
    });
  });
};
