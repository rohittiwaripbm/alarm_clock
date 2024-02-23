let currentTimeElement = document.getElementById('currentTime');

let alarmButtonElement = document.getElementById('setAlarmButton');

let hourElement = document.getElementById('hourInput');

let minuteElement = document.getElementById('minuteInput');

let secondsElement = document.getElementById('secondInput');

let am_pmElement = document.getElementById('am_pm');

let displayAlarmParentElement = document.getElementById('displayAlarmParent');
let pointerElement = document.getElementById('pointer');
let alarms = [];

let now = new Date();
let currentTime = now.toLocaleTimeString();

currentTimeElement.textContent = currentTime;

let audio = document.getElementById("myAudio");
// setting up hours
for (let i = 1; i <= 12; i++) {
    let hourOptionElement = document.createElement('option');
    if (i < 10) {
        hourOptionElement.innerHTML = '0' + i;
        hourOptionElement.value = '0' + i;
    }
    else {
        hourOptionElement.setAttribute('value', `${i}`);
        hourOptionElement.innerHTML = i;
    }
    hourElement.append(hourOptionElement);
}

// setting up minutes and seconds
for (let i = 0; i < 60; i++) {
    let minuteOptionElement = document.createElement('option');
    let secondOptionElement = document.createElement('option');

    if (i < 10) {
        minuteOptionElement.innerHTML = '0' + i;
        secondOptionElement.innerHTML = '0'+i;
        secondOptionElement.value = '0'+i;
        minuteOptionElement.value = '0'+i;
    }
    else {
        minuteOptionElement.innerHTML = i;
        secondOptionElement.innerHTML = i;
        secondOptionElement.setAttribute('value', `${i}`);
        minuteOptionElement.setAttribute('value', `${i}`);
    }
    minuteElement.append(minuteOptionElement);
    secondsElement.append(secondOptionElement);
}

//setting interval for updating current time every second
setInterval(() => {
    currentTime = new Date().toLocaleTimeString();
    currentTimeElement.textContent = currentTime;
    now = new Date();
    checkTime(now);
}, 1000);


//on set alarm button this event will run
alarmButtonElement.addEventListener('click', function () {
    let divElement = document.createElement('div');
    divElement.className = 'displayAlarm';
    let headingElement = document.createElement('h4');
    try {
        // Checking if hours minutes and seconds are valid or not
        if ( isNaN(Number(hourElement.value)) ||isNaN(Number(minuteElement.value)) || isNaN(Number(secondsElement.value)) ) {
            // console.log( typeof Number(minuteElement.value))
            throw new Error;
        }
        // pushing values in alarms array
        alarms.push(hourElement.value + " " + minuteElement.value + " " + secondsElement.value + " " + am_pmElement.value);

        // displaying element
        headingElement.textContent = hourElement.value + ":" + minuteElement.value + ":" + secondsElement.value+":" + am_pmElement.value;

        // delete Button element
        let deleteButtonElement = document.createElement('button');
        deleteButtonElement.textContent = 'Delete';
        deleteButtonElement.classList = 'buttonElement';
        divElement.append(headingElement, deleteButtonElement);
        deleteButtonElement.addEventListener('click',deleteButton);
        displayAlarmParentElement.append(divElement);
        // console.log(alarms);
        
    } catch (error) {
        alert("Please select valid option");
    }
});


//delete button
function deleteButton(e){
    // console.log(e.target.offsetParent.querySelector('h4').innerHTML);
    let sendTime = e.target.offsetParent.querySelector('h4').innerHTML;
    removeTime(sendTime);
    e.target.offsetParent.remove();
}



// show alert when any time present in array equal to current time

function checkTime(currenttime)
{
    for(let i of alarms)
    {
        let str = i.split(' ');
        let currentHour = currenttime.getHours();
        let currentMinute = currenttime.getMinutes();
        let currentSecond = currenttime.getSeconds();
        //converting in 12 hour format
        let currentAMPM = currentHour >= 12 ? 'PM' : 'AM';
        currentHour = (currentHour % 12) || 12;
        // console.log(str[0] + " " + str[1] + " " + str[2] + " "+ str[3] );
        // console.log(currentHour+ " " + currentMinute + " " + currentSecond + " " + currentAMPM);
        if(str[0]==currentHour && str[1]==currentMinute && str[2] == currentSecond && str[3]==currentAMPM)
        {
            audio.play();
            alert('alarm rings at : ' + currenttime.toLocaleTimeString());
        }
    }
}


//on delete button removing time from array

function removeTime(strTime)
{
    let str = strTime.split(':');
    let realtime = '';
    for(let i of str)
    {
        realtime = realtime+i;
    }
    // console.log(realtime);
    let localarr = [];
    for(let i of alarms)
    {
        let realtime1 = '';
        str = i.split(' ');
        for(let j of str)
        {
           realtime1 = realtime1+j;

        }
        // console.log(realtime1 +"==" + realtime);

        // console.log(realtime1 == realtime);
        if(realtime1 == realtime)
        {
            continue;
        }
        localarr.push(i);

    }
    alarms = localarr;
    // console.log(alarms);
}

window.addEventListener('mousemove',(pos)=>{
    pointerElement.style.top = pos.y+'px';
    pointerElement.style.left = pos.x+'px';
})