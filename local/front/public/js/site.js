class Calendar {
    constructor() {
        this.itemHeight();
        // this.initFastForm();
        this.initAddForm();
        $('.b-calendar-header__button__next').on('click', () => {
            this.nextMonth();
        })
        $('.b-calendar-header__button__prev').on('click', () => {
            this.prevMonth();
        })
        this.start();
    }

    initAddForm() {
        let self = this;
        let request = {};
       
        $(document).on('submit', '.b-tooltip__form', function (event) {
            event.preventDefault();
            let bigData = localStorage.getItem("calendar")
            bigData !== undefined ? bigData = JSON.parse(bigData) : bigData = {};
            let formdate = $(this).serializeArray();
            let dataContainer = {};
            let dataType = {};
            formdate.forEach((item, index) => {
                dataContainer[item.name] = item.value
            })
            dataType[dataContainer.id] = {
                title: dataContainer.title,
                subtitle: dataContainer.subtitle,
                text: dataContainer.text
            }
            
            if(bigData == null){
                request = dataType
            }else{
            request = Object.assign(bigData, dataType)
            }
            

             
            self.setData(request);




        })
    }
    initTooltip() {
        let self = this
        $('.b-calendar-item').tooltipster({
            trigger: 'click',
            animation: 'fade',
            theme: 'tooltipster-light',
            delay: 200,
            side: 'right',
            contentAsHTML: true,
            interactive: true,
            functionBefore: function (instance, helper) {

                instance.content(self.getAddForm(instance, helper));
            }
        });
    }
    getAddForm(instance, helper) {

        let request = `<form  class="b-tooltip__form">
        <h4>Новое событие</h4>
        <input type="hidden" name="id" value="`+ $(helper.origin).data('id') + `">
        <div class="b-tooltip__line">
          <input type="text" name="title" placeholder="Событие" class="b-tooltip__input form-control">
        </div>
        <div class="b-tooltip__line">
          <input type="text" name="subtitle" placeholder="Имена участников" class="b-tooltip__input form-control">
        </div>
        <div class="b-tooltip__line">
          <textarea placeholder="Описание" name="text" row="3" class="b-tooltip__textarea form-control"></textarea>
        </div>
        
        <div class="b-tooltip__line">
        <input type="submit" value="Добавить" class="btn btn-success">
      </div>
      </form>`;
        return request;

    }
    setData(data) {
       
        localStorage.setItem('calendar', JSON.stringify(data));
   
        this.start()
    }
    itemHeight() {
        $('.b-calendar-item').css({ 'height': $('.b-calendar-item').width() })
    }
    getData() {
        let promise = new Promise(function (resolve, reject) {
            let data = JSON.parse(localStorage.getItem("calendar"))
            data !== null ? resolve(data) : reject('her')

        })
        return promise;
    }
    start() {
        this.getData().then((data) => this.insertData(data), (error) => this.getItems(error));
    }
    insertData(data) {
        this.bigData = data;
        this.getItems()
    }
    setMenuDate(month, year) {
        $('.i-calendar__monthName').text(this.translateMonth(month) + ' ' + year);
    }
    nextMonth() {

        this.today.setMonth(this.today.getMonth() + 1);
        this.today == this.absoluteToday ? this.today.setDate(this.absoluteToday.getDate()) : this.today.setDate(1)

        this.start()
    }
    prevMonth() {

        this.today.setMonth(this.today.getMonth() - 1);
        this.today == this.absoluteToday ? this.today.setDate(this.absoluteToday.getDate()) : this.today.setDate(1)

        this.start()
    }
    getItems(error) {
        this.renderCounter = 1;
        this.calendarString = "";
        this.absoluteToday = new Date();
        let today;
        if (this.today == undefined) { today = new Date(); this.today = today } else { today = this.today; }
        let day = today.getDate();
        let weekday = this.translateDay(today.getDay());
        this.setMenuDate(today.getMonth(), today.getFullYear());
        let firstDayCounter = 1
        let firstDayDate = new Date(today.getFullYear(), today.getMonth(), 1);
        let firstDay = firstDayDate.getDay()
        firstDay = firstDay - 1
        let lastMonth = firstDayDate;

        lastMonth.setDate(0);
        let lastday = lastMonth.getDate();

        while (firstDay >= firstDayCounter) {
            let currentDay = lastday + firstDayCounter - firstDay;
            lastMonth.setDate(currentDay)


            this.calendarString += this.itemTemplate(lastMonth);
            firstDayCounter++;

        }
        let allCellsCounter = 35;
        while (allCellsCounter >= firstDayCounter) {

            lastMonth.setDate(lastMonth.getDate() + 1);
            this.calendarString += this.itemTemplate(lastMonth);
            firstDayCounter++
        }

        this.renderCallendar();
    }

    renderCallendar() {
        $('.b-calendar__list').html(this.calendarString)
        this.itemHeight();
        this.initTooltip()

    }
    //getCurrentData()
    itemTemplate(date) {
        let isCurrent, title, subtitle;
        let currentData = {};
        date.getDate() == this.absoluteToday.getDate() && date.getMonth() == this.absoluteToday.getMonth() && date.getFullYear() == this.absoluteToday.getFullYear() ? isCurrent = true : isCurrent = false;
        let weekday = this.translateDay(date.getDay());
        let id = 'x' + date.getDate() + 'x' + date.getMonth() + 'x' + date.getFullYear();
        if (this.bigData !== undefined) {
            if (this.bigData[id] !== undefined) {
                title = this.bigData[id].title;
                subtitle = this.bigData[id].subtitle;
            }
        }



        isCurrent == true ? isCurrent = 'b-calendar-item--active' : isCurrent = '';
        let item =
            `<div data-tooltip-content="#tltp" data-id="` + id + `" class="b-calendar-item ` + isCurrent + `">
            <div class="b-calendar-item__header">`;
        weekday == undefined || this.renderCounter > 7 ? weekday = '' : item += `<div class="b-calendar-item__weekday">` + weekday + `</div>`;
        item += `<div class="b-calendar__day">` + date.getDate() + `</div></div><div class="b-calendar-item__textblock">`;
        title !== undefined ? item += `<div class="b-calendar-item__title">` + title + `</div> ` : '';
        subtitle !== undefined ? item += `<div class="b-calendar-item__subtitle">` + subtitle + `</div> ` : '';
        item += `</div></div>`;



        this.renderCounter++

        return item
    }
    translateDay(day) {

        switch (day) {
            case 0: return 'Воскресенье';
                break;
            case 1: return 'Понедельник';
                break;
            case 2: return 'Вторник';
                break;
            case 3: return 'Среда';
                break;
            case 4: return 'Четверг';
                break;
            case 5: return 'Пятница';
                break;
            case 6: return 'Суббота';
                break;
        }

    }
    translateMonth(day) {

        switch (day) {
            case 0: return 'Январь';
                break;
            case 1: return 'Февраль';
                break;
            case 2: return 'Март';
                break;
            case 3: return 'Апрель';
                break;
            case 4: return 'Май';
                break;
            case 5: return 'Июнь';
                break;
            case 6: return 'Июль';
                break;
            case 7: return 'Август';
                break;
            case 8: return 'Сентябрь';
                break;
            case 9: return 'Октябрь';
                break;
            case 10: return 'Ноябрь';
                break;
            case 11: return 'Декабрь';
                break;

        }

    }
}

$(document).ready(function () {
    new Calendar()
})







