const submitForm = document.querySelector('.form');

submitForm.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();
  const firstDelay = parseInt(submitForm.delay.value);
  const step = parseInt(submitForm.step.value);
  const amount = parseInt(submitForm.amount.value);
  let delay = firstDelay;

  for (let position = 0; position < amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;

  }
}

function createPromise(position, delay) {
  const result = { position, delay };

  const promise = new Promise((res, rej) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        res(result);
      } else {
        rej(result);
      }
    }, delay)
  });

  return promise;
}

