import Datepicker from '@/js/datepicker';
import './styles/main.less';

const datepickerInputEls = document.querySelectorAll('.datepicker-input');
const dtContainerEl = document.querySelector('.dt-container');
const activatedDatepickers = [];

const closeDatepickers = () => {
  activatedDatepickers.forEach((activated) => {
    if (activated.classList.contains('u-div-show')) {
      activated.classList.remove('u-div-show');
    }
  });
};

datepickerInputEls.forEach((inputEl) => {
  const id = inputEl.getAttribute('id');

  inputEl.addEventListener('focus', () => {
    closeDatepickers();
    let datepickerEl = document.querySelector(`#datepicker-${id}`);

    if (!datepickerEl) {
      const datepicker = new Datepicker({
        id,
        startDate: '2019-11-30',
        endDate: '2023-04-29',
        defaultYearAndMonth: '2020-10',
      });
      datepicker.addHTML();

      datepickerEl = document.querySelector(`#datepicker-${id}`);

      activatedDatepickers.push(datepickerEl);

      datepickerEl.parentElement.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    } else {
      datepickerEl.classList.add('u-div-show');
    }
  });
});

dtContainerEl.addEventListener('click', () => {
  closeDatepickers();
});
