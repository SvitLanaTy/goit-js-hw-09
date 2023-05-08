import Notiflix from 'notiflix';
const form = document.querySelector('.form');

const { delay, step, amount } = form.elements;

form.addEventListener(`submit`, onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  const stepSelect = Number(step.value);
  let newDelay = delay.value - stepSelect;
  for (let i = 1; i <= amount.value; i += 1) {
    newDelay += stepSelect;
    createPromise(i, newDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}

function createPromise(position, delay) {
  const promise = new Promise((resolve, regect) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      setTimeout(() => {
        resolve({ position, delay });
      }, delay);
    } else {
      setTimeout(() => {
        regect({ position, delay });
      }, delay);
    }
  });
  return promise;
}
