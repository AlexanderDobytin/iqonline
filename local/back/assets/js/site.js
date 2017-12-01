'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Calendar = function () {
    function Calendar() {
        var _this = this;

        _classCallCheck(this, Calendar);

        this.itemHeight();
        // this.initFastForm();
        this.initAddForm();
        $('.b-calendar-header__button__next').on('click', function () {
            _this.nextMonth();
        });
        $('.b-calendar-header__button__prev').on('click', function () {
            _this.prevMonth();
        });
        this.start();
    }

    _createClass(Calendar, [{
        key: 'initAddForm',
        value: function initAddForm() {
            var self = this;
            var request = {};

            $(document).on('submit', '.b-tooltip__form', function (event) {
                event.preventDefault();
                var bigData = localStorage.getItem("calendar");
                bigData !== undefined ? bigData = JSON.parse(bigData) : bigData = {};
                var formdate = $(this).serializeArray();
                var dataContainer = {};
                var dataType = {};
                formdate.forEach(function (item, index) {
                    dataContainer[item.name] = item.value;
                });
                dataType[dataContainer.id] = {
                    title: dataContainer.title,
                    subtitle: dataContainer.subtitle,
                    text: dataContainer.text
                };

                if (bigData == null) {
                    request = dataType;
                } else {
                    request = Object.assign(bigData, dataType);
                }

                self.setData(request);
            });
        }
    }, {
        key: 'initTooltip',
        value: function initTooltip() {
            var self = this;
            $('.b-calendar-item').tooltipster({
                trigger: 'click',
                animation: 'fade',
                theme: 'tooltipster-light',
                delay: 200,
                side: 'right',
                contentAsHTML: true,
                interactive: true,
                functionBefore: function functionBefore(instance, helper) {

                    instance.content(self.getAddForm(instance, helper));
                }
            });
        }
    }, {
        key: 'getAddForm',
        value: function getAddForm(instance, helper) {

            var request = '<form  class="b-tooltip__form">\n        <h4>\u041D\u043E\u0432\u043E\u0435 \u0441\u043E\u0431\u044B\u0442\u0438\u0435</h4>\n        <input type="hidden" name="id" value="' + $(helper.origin).data('id') + '">\n        <div class="b-tooltip__line">\n          <input type="text" name="title" placeholder="\u0421\u043E\u0431\u044B\u0442\u0438\u0435" class="b-tooltip__input form-control">\n        </div>\n        <div class="b-tooltip__line">\n          <input type="text" name="subtitle" placeholder="\u0418\u043C\u0435\u043D\u0430 \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u043E\u0432" class="b-tooltip__input form-control">\n        </div>\n        <div class="b-tooltip__line">\n          <textarea placeholder="\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435" name="text" row="3" class="b-tooltip__textarea form-control"></textarea>\n        </div>\n        \n        <div class="b-tooltip__line">\n        <input type="submit" value="\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C" class="btn btn-success">\n      </div>\n      </form>';
            return request;
        }
    }, {
        key: 'setData',
        value: function setData(data) {

            localStorage.setItem('calendar', JSON.stringify(data));

            this.start();
        }
    }, {
        key: 'itemHeight',
        value: function itemHeight() {
            $('.b-calendar-item').css({ 'height': $('.b-calendar-item').width() });
        }
    }, {
        key: 'getData',
        value: function getData() {
            var promise = new Promise(function (resolve, reject) {
                var data = JSON.parse(localStorage.getItem("calendar"));
                data !== null ? resolve(data) : reject('her');
            });
            return promise;
        }
    }, {
        key: 'start',
        value: function start() {
            var _this2 = this;

            this.getData().then(function (data) {
                return _this2.insertData(data);
            }, function (error) {
                return _this2.getItems(error);
            });
        }
    }, {
        key: 'insertData',
        value: function insertData(data) {
            this.bigData = data;
            this.getItems();
        }
    }, {
        key: 'setMenuDate',
        value: function setMenuDate(month, year) {
            $('.i-calendar__monthName').text(this.translateMonth(month) + ' ' + year);
        }
    }, {
        key: 'nextMonth',
        value: function nextMonth() {

            this.today.setMonth(this.today.getMonth() + 1);
            this.today == this.absoluteToday ? this.today.setDate(this.absoluteToday.getDate()) : this.today.setDate(1);

            this.start();
        }
    }, {
        key: 'prevMonth',
        value: function prevMonth() {

            this.today.setMonth(this.today.getMonth() - 1);
            this.today == this.absoluteToday ? this.today.setDate(this.absoluteToday.getDate()) : this.today.setDate(1);

            this.start();
        }
    }, {
        key: 'getItems',
        value: function getItems(error) {
            this.renderCounter = 1;
            this.calendarString = "";
            this.absoluteToday = new Date();
            var today = void 0;
            if (this.today == undefined) {
                today = new Date();this.today = today;
            } else {
                today = this.today;
            }
            var day = today.getDate();
            var weekday = this.translateDay(today.getDay());
            this.setMenuDate(today.getMonth(), today.getFullYear());
            var firstDayCounter = 1;
            var firstDayDate = new Date(today.getFullYear(), today.getMonth(), 1);
            var firstDay = firstDayDate.getDay();
            firstDay = firstDay - 1;
            var lastMonth = firstDayDate;

            lastMonth.setDate(0);
            var lastday = lastMonth.getDate();

            while (firstDay >= firstDayCounter) {
                var currentDay = lastday + firstDayCounter - firstDay;
                lastMonth.setDate(currentDay);

                this.calendarString += this.itemTemplate(lastMonth);
                firstDayCounter++;
            }
            var allCellsCounter = 35;
            while (allCellsCounter >= firstDayCounter) {

                lastMonth.setDate(lastMonth.getDate() + 1);
                this.calendarString += this.itemTemplate(lastMonth);
                firstDayCounter++;
            }

            this.renderCallendar();
        }
    }, {
        key: 'renderCallendar',
        value: function renderCallendar() {
            $('.b-calendar__list').html(this.calendarString);
            this.itemHeight();
            this.initTooltip();
        }
        //getCurrentData()

    }, {
        key: 'itemTemplate',
        value: function itemTemplate(date) {
            var isCurrent = void 0,
                title = void 0,
                subtitle = void 0;
            var currentData = {};
            date.getDate() == this.absoluteToday.getDate() && date.getMonth() == this.absoluteToday.getMonth() && date.getFullYear() == this.absoluteToday.getFullYear() ? isCurrent = true : isCurrent = false;
            var weekday = this.translateDay(date.getDay());
            var id = 'x' + date.getDate() + 'x' + date.getMonth() + 'x' + date.getFullYear();
            if (this.bigData !== undefined) {
                if (this.bigData[id] !== undefined) {
                    title = this.bigData[id].title;
                    subtitle = this.bigData[id].subtitle;
                }
            }

            isCurrent == true ? isCurrent = 'b-calendar-item--active' : isCurrent = '';
            var item = '<div data-tooltip-content="#tltp" data-id="' + id + '" class="b-calendar-item ' + isCurrent + '">\n            <div class="b-calendar-item__header">';
            weekday == undefined || this.renderCounter > 7 ? weekday = '' : item += '<div class="b-calendar-item__weekday">' + weekday + '</div>';
            item += '<div class="b-calendar__day">' + date.getDate() + '</div></div><div class="b-calendar-item__textblock">';
            title !== undefined ? item += '<div class="b-calendar-item__title">' + title + '</div> ' : '';
            subtitle !== undefined ? item += '<div class="b-calendar-item__subtitle">' + subtitle + '</div> ' : '';
            item += '</div></div>';

            this.renderCounter++;

            return item;
        }
    }, {
        key: 'translateDay',
        value: function translateDay(day) {

            switch (day) {
                case 0:
                    return 'Воскресенье';
                    break;
                case 1:
                    return 'Понедельник';
                    break;
                case 2:
                    return 'Вторник';
                    break;
                case 3:
                    return 'Среда';
                    break;
                case 4:
                    return 'Четверг';
                    break;
                case 5:
                    return 'Пятница';
                    break;
                case 6:
                    return 'Суббота';
                    break;
            }
        }
    }, {
        key: 'translateMonth',
        value: function translateMonth(day) {

            switch (day) {
                case 0:
                    return 'Январь';
                    break;
                case 1:
                    return 'Февраль';
                    break;
                case 2:
                    return 'Март';
                    break;
                case 3:
                    return 'Апрель';
                    break;
                case 4:
                    return 'Май';
                    break;
                case 5:
                    return 'Июнь';
                    break;
                case 6:
                    return 'Июль';
                    break;
                case 7:
                    return 'Август';
                    break;
                case 8:
                    return 'Сентябрь';
                    break;
                case 9:
                    return 'Октябрь';
                    break;
                case 10:
                    return 'Ноябрь';
                    break;
                case 11:
                    return 'Декабрь';
                    break;

            }
        }
    }]);

    return Calendar;
}();

$(document).ready(function () {
    new Calendar();
});