class Calendar {
    constructor(){
        this.itemHeight();
        
        $('.b-calendar-header__button__next').on('click',()=>{
            this.nextMonth();
        })
        $('.b-calendar-header__button__prev').on('click',()=>{
            this.prevMonth();
        })
        this.start();
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
    start(){
        this.getData().then((data)=>this.insertData(data),(error)=>this.getItems(error));
    }
    insertData(data){
        console.log(data);
    }
    setMenuDate(month,year){
    $('.i-calendar__monthName').text(this.translateMonth(month)+' '+year);
    }
    nextMonth(){
        
        this.today.setMonth(this.today.getMonth()+1);
        this.today == this.absoluteToday? this.today.setDate(this.absoluteToday.getDate()):this.today.setDate(1)
        this.start()
    }
    prevMonth(){
        
        this.today.setMonth(this.today.getMonth()-1);
        this.today == this.absoluteToday? this.today.setDate(this.absoluteToday.getDate()):this.today.setDate(1)
        
        this.start()
    }
    getItems(error){
        this.renderCounter=1;
        this.calendarString="";
        this.absoluteToday  = new Date();
        let today;
        if(this.today == undefined){today = new Date(); this.today = today} else {today = this.today;}
      
        let day = today.getDate();
        let month = today.getMonth();
        let dayNumber = today.getDay()
        let year = today.getFullYear();
        let weekday = this.translateDay(dayNumber);
        this.setMenuDate(month,year);
        let firstDayCounter=1
        let firstDayDate =new Date(year,month,1);
        let firstDay = firstDayDate.getDay()
        firstDay = firstDay-1
        let lastMonth = firstDayDate;
        lastMonth.setDate(0);
        
        let lastday = lastMonth.getDate();
    
        while(firstDay>=firstDayCounter){
           let currentDay = lastday+firstDayCounter-firstDay;
           lastMonth.setDate(currentDay)    
           this.calendarString+= this.itemTemplate(this.translateDay(lastMonth.getDay()),lastMonth.getDate(),'','','');
            firstDayCounter++;
        }
        let allCellsCounter = 35;
        while(allCellsCounter >=  firstDayCounter){
            let isCurrent='';
            lastMonth.setDate(lastMonth.getDate()+1);
            
              lastMonth.getDate() == this.absoluteToday.getDate() && lastMonth.getMonth() == this.absoluteToday.getMonth() && lastMonth.getFullYear()==this.absoluteToday.getFullYear() ?  isCurrent = true:  isCurrent = false
       
            this.calendarString+= this.itemTemplate(this.translateDay(lastMonth.getDay()),lastMonth.getDate(),'','',isCurrent);
            firstDayCounter++
        }
        
         this.renderCallendar();
    }

    renderCallendar(){ 
        $('.b-calendar__list').html( this.calendarString)
        this.itemHeight();
       
    }
    itemTemplate(weekday,day,title,subtitle,isCurrent){
        
            weekday ==undefined || this.renderCounter > 7 ? weekday = '':'';
            day ==undefined ? day = '':'';
            title ==undefined ? title = '':'';
            subtitle ==undefined ? subtitle = '':'';
 
            isCurrent ==true ? isCurrent = 'b-calendar-item--active' : isCurrent = '';
            let item = 
            `<div class="b-calendar-item `+isCurrent+`">
            <div class="b-calendar-item__header">
                <div class="b-calendar-item__weekday">`+weekday+`</div>
                 <div class="b-calendar__day">`+day+`</div> 
                 </div>
                <div class="b-calendar-item__title">`+title+`</div> 
                <div class="b-calendar-item__subtitle">`+subtitle+`</div>
            
          </div>
            `;
            this.renderCounter++
            
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
    translateMonth(day){
        
        switch (day){
            case 0 : return 'Январь';
            break;
            case 1 : return 'Февраль';
            break;
            case 2 : return 'Март';
            break;
            case 3 : return 'Апрель';
            break;
            case 4 : return 'Май';
            break;
            case 5 : return 'Июнь';
            break;
            case 6 : return 'Июль';
            break;
             case 7 : return 'Август';
            break;
            case 8 : return 'Сентябрь';
            break;
            case 9 : return 'Октябрь';
            break;
            case 10 : return 'Ноябрь';
            break;
            case 11 : return 'Декабрь';
            break;
            
        }

    }
}

$(document).ready(function(){
    new Calendar()
})