import { Notify } from 'notiflix/build/notiflix-notify-aio';

const delay = document.querySelector("[name=delay]")
const delayStep = document.querySelector("[name=step]")
const amount = document.querySelector("[name=amount]")
const form = document.querySelector(".form")

function createPromise(position, delay) {
  
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay })
      } else {
        reject({ position, delay })
      }
    }, delay)
  })
};

function onSubmit(evt) {
  evt.preventDefault();
  
  let delayValue = Number(delay.value);
  const delayStepValue = Number(delayStep.value);
  const amountValue = Number(amount.value);

  for (let i = 1; i <= amountValue; i++ ) {
    createPromise(i, delayValue)
    .then(({ position, delay }) => {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
    delayValue += delayStepValue;
    }
};

form.addEventListener("submit", onSubmit)