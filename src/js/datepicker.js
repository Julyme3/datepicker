class Datepicker {
  constructor({ id, startDate, endDate }) {
    this.uid = id;
    this.startDate = startDate;
    this.endDate = endDate;
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
              <select class="datepicker-select datepicker-select-year">
                <option value="2019" class="calendar-option">2019</option>
                <option value="2020" class="calendar-option">2020</option>
                <option value="2021" class="calendar-option">2021</option>
                <option value="2022" class="calendar-option">2022</option>
              </select>
              <select class="datepicker-select datepicker-select-month">
                <option value="January" class="calendar-option">January</option>
                <option value="February" class="calendar-option">
                  February
                </option>
                <option value="March" class="calendar-option">March</option>
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
            <div class="datepicker-calendar-days-row">
              <div class="datepicker-day-unit">1</div>
              <div class="datepicker-day-unit">2</div>
              <div class="datepicker-day-unit">3</div>
              <div class="datepicker-day-unit">4</div>
              <div class="datepicker-day-unit">5</div>
              <div class="datepicker-day-unit">6</div>
              <div class="datepicker-day-unit">7</div>
            </div>

            <div class="datepicker-calendar-days-row">
              <div class="datepicker-day-unit">8</div>
              <div class="datepicker-day-unit">9</div>
              <div class="datepicker-day-unit">10</div>
              <div class="datepicker-day-unit">11</div>
              <div class="datepicker-day-unit">12</div>
              <div class="datepicker-day-unit">13</div>
              <div class="datepicker-day-unit">14</div>
            </div>
          </div>
        </div>
    `;

    if (this.inputEl) {
      this.inputEl.parentElement.insertAdjacentHTML('beforeend', html);
      this.datepickerEl = document.querySelector(`#datepicker-${this.uid}`);
    }
  }
}

export default Datepicker;
