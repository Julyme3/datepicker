import moment from 'moment';
import { createOptionEl } from './utils';

class Datepicker {
  constructor({ id, startDate, endDate, defaultYearAndMonth }) {
    this.uid = id;
    this.startDate = startDate;
    this.endDate = endDate;
    this.defaultYearAndMonth = defaultYearAndMonth;
    this.currentYearAndMonth = defaultYearAndMonth;
    this.inputEl = document.querySelector(`#${this.uid}`);
    this.datepickerEl = null;
  }

  addHTML() {
    const html = `
        <div class="datepicker-calendar u-div-show" id="datepicker-${this.uid}">
          <div class="datepicker-calendar-header">
            <div class="datepicker-calendar-header-dates">
              <button
                type="button"
                class="datepicker-prev-btn datepicker-header-btn"
              >
                &#8592;
              </button>
              <select class="datepicker-select datepicker-select-year" id="datepicker-select-year-${this.uid}">
              </select>
              <select class="datepicker-select datepicker-select-month" id="datepicker-select-month-${this.uid}">
              </select>
              <button
                type="button"
                class="datepicker-next-btn datepicker-header-btn"
              >
                &#8594;
              </button>
            </div>
            <div class="datepicker-calendar-days-row">
              <div class="datepicker-day-unit">M</div>
              <div class="datepicker-day-unit">T</div>
              <div class="datepicker-day-unit">W</div>
              <div class="datepicker-day-unit">T</div>
              <div class="datepicker-day-unit">F</div>
              <div class="datepicker-day-unit">S</div>
              <div class="datepicker-day-unit">S</div>
            </div>
          </div>

          <div class="datepicker-calendar-body">
          </div>
        </div>
    `;

    if (this.inputEl) {
      this.inputEl.parentElement.insertAdjacentHTML('beforeend', html);
      this.datepickerEl = document.querySelector(`#datepicker-${this.uid}`);
      this.setHeaderYearAndMonthRange();
      this.rendersDays();
    }
  }

  setHeaderYearAndMonthRange() {
    this.setHeaderYear();
    this.setHeaderMonth();
  }

  setHeaderYear() {
    const startYear = Number(this.startDate.substring(0, 4));
    const endYear = Number(this.endDate.substring(0, 4));
    const selectYearEl = document.querySelector(
      `#datepicker-select-year-${this.uid}`
    );
    const fragmentYears = document.createDocumentFragment();

    for (let i = startYear; i < endYear; i++) {
      const optionEl = createOptionEl(i, i);
      fragmentYears.appendChild(optionEl);
    }

    if (selectYearEl) {
      selectYearEl.appendChild(fragmentYears);
    }
  }

  setHeaderMonth() {
    const currentYear = Number(this.currentYearAndMonth.substring(0, 4));
    let iterationDate = moment(this.startDate);
    let iterationDateYYYMM = moment(iterationDate).format('YYYY-MM');
    const endDateYYYYMM = moment(this.endDate).format('YYYY-MM');
    const selectMonthEl = document.querySelector(
      `#datepicker-select-month-${this.uid}`
    );
    const fragmentMonths = document.createDocumentFragment();

    while (iterationDateYYYMM <= endDateYYYYMM) {
      if (Number(iterationDate.format('YYYY')) === currentYear) {
        const optionEl = createOptionEl(
          iterationDate.format('MM'),
          iterationDate.format('MMMM')
        );
        fragmentMonths.appendChild(optionEl);
      }

      iterationDate = iterationDate.add(1, 'months');
      iterationDateYYYMM = moment(iterationDate).format('YYYY-MM');
    }

    if (selectMonthEl) {
      selectMonthEl.appendChild(fragmentMonths);
    }
  }

  rendersDays() {
    const monthArray = this.populateMonthOfDays();
    const datepickerBodyEl = document.querySelector(
      `#datepicker-${this.uid} .datepicker-calendar-body`
    );
    const rowTmpl = '<div class="datepicker-calendar-days-row"></div>';
    let rowEls = null;

    monthArray.forEach((day, index) => {
      if (index % 7 === 0) {
        datepickerBodyEl.insertAdjacentHTML('beforeend', rowTmpl);
        rowEls = document.querySelectorAll(
          `#datepicker-${this.uid} .datepicker-calendar-body .datepicker-calendar-days-row`
        );
      }

      const rowsCount = rowEls?.length ?? 0;
      const dayTmpl = `<div class="datepicker-day-unit">${day}</div>`;

      if (rowsCount) {
        rowEls[rowsCount - 1].insertAdjacentHTML('beforeend', dayTmpl);
      }
    });
  }

  populateMonthOfDays() {
    const firstDayOfWeek = this.getFirstDayOfWeek();
    const daysOfMonth = this.getDaysOfMonth();
    const monthArray = [];

    for (let i = 1; i < firstDayOfWeek; i++) {
      monthArray.push('');
    }

    for (let i = 1; i <= daysOfMonth; i++) {
      monthArray.push(i);
    }

    return monthArray;
  }

  getFirstDayOfWeek() {
    return moment(new Date(this.currentYearAndMonth)).isoWeekday();
  }

  getDaysOfMonth() {
    return moment(new Date(this.currentYearAndMonth)).daysInMonth();
  }
}

export default Datepicker;
