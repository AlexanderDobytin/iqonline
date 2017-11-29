class Calendar {
    constructor(){
        this.itemHeight();
        this.getData().then((data)=>this.insertData(data),(error)=>this.getItems(error));
    }
    itemHeight(){
        $('.b-calendar-item').css({'height':$('.b-calendar-item').width()})
    }
    getData(){
        let promise = new Promise(function(resolve,reject){
            let data = JSON.parse(localStorage.getItem("calendar"))
            data !== null ? resolve(data) : reject('her')
           
        })
        return promise;
    }
    insertData(data){
        console.log(data);
    }
    getItems(error){
        let callendar = "";
        let today = new Date();
        let day = today.getDate();
        let month = today.getMonth();
        let dayNumber = today.getDay()
        let year = today.getFullYear();
        let weekday = this.translateDay(dayNumber);
        let firstDayCounter=0
        let firstDayDate =new Date(year,month,1);
        
        let firstDay = firstDayDate.getDay()
        console.log(this.translateDay(firstDay))
        let lastMonth = firstDayDate;
        lastMonth.setDate(0);
        let lastday = lastMonth.getDate();
        
        while(firstDay>=firstDayCounter){
           
           

           let currentDay = lastday+firstDayCounter-firstDay;
           lastMonth.setDate(currentDay)
            console.log(lastMonth)
            
           // let lastWeekday = this.translateDay(lastday;)
            
            
            
            callendar+= this.itemTemplate(this.translateDay(lastMonth.getDay()),currentDay,'','');
            firstDayCounter++;
        }
        
        $('.b-calendar__list').html(callendar)
        this.itemHeight();
    }
    itemTemplate(weekday,day,title,subtitle){
            weekday ==undefined ? weekday = '':''
            day ==undefined ? day = '':''
            title ==undefined ? title = '':''
            subtitle ==undefined ? subtitle = '':''
            let item = 
            `<div class="b-calendar-item">
            <div class="b-calendar-item__header">
                <div class="b-calendar-item__weekday">`+weekday+`,</div>
                 <div class="b-calendar__day">`+day+`</div> 
                 </div>
                <div class="b-calendar-item__title">`+title+`</div> 
                <div class="b-calendar-item__subtitle">`+subtitle+`</div>
            
          </div>
            `
        return item
    }
    translateDay(day){
        
        switch (day){
            case 0 : return 'Воскресенье';
            break;
            case 1 : return 'Понедельник';
            break;
            case 2 : return 'Вторник';
            break;
            case 3 : return 'Среда';
            break;
            case 4 : return 'Четверг';
            break;
            case 5 : return 'Пятница';
            break;
            case 6 : return 'Суббота';
            break;
        }

    }
}

$(document).ready(function(){
    new Calendar()
})