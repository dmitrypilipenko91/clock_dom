const mainCircle = document.getElementById('mainCircle');
mainCircle.style.display = 'none';
const clockButton = document.getElementById('clockButton');
const clockStarterGroup = document.getElementById('clockStarterGroup');
const showClock = () => {
    const clockInput = document.getElementById('clockInput');
    const userDiameter = parseInt(clockInput.value);
    if (userDiameter >= 200 && userDiameter <= 800) {
        mainCircle.style.display = 'block';
        clockStarterGroup.style.display = 'none';
        createClock(userDiameter)
    }
    else {
        alert('The diameter should be not less than 200px and not bigger than 800px!');
        return
    }
}
clockButton.addEventListener('click', showClock);

function createClock(diameter) {
    const MAIN_CIRCLE_RADIUS = diameter / 2;
    const SMALL_CIRCLE_RADIUS = MAIN_CIRCLE_RADIUS / 8; // соотношение циферблата к маленьким "кружочкам" 1:8, вычислено эмпирически
    const SMALL_CIRCLE_COUNT = 12;

    mainCircle.style.width = MAIN_CIRCLE_RADIUS * 2 + 'px';
    mainCircle.style.height = MAIN_CIRCLE_RADIUS * 2 + 'px';
    mainCircle.style.backgroundColor = 'yellow';
    mainCircle.style.borderRadius = '50%';
    mainCircle.style.margin = '50px auto';
    mainCircle.style.position = 'relative';

    function createSmallCircles() {
        for (i = 1; i <= 12; i++) {
            const smallCircle = document.createElement('div');
            // определяем угол в рад, "i - 3" для расположения первого "кружка" циферблата на позиции "1 час"
            const angle = ((i - 3) * (360 / SMALL_CIRCLE_COUNT)) * (Math.PI / 180); 
            // определяем положение "кружка" циферблата по горизонтали
            const x = Math.round((MAIN_CIRCLE_RADIUS - SMALL_CIRCLE_RADIUS) * Math.cos(angle));
            // определяем положение "кружка" циферблата по вертикали
            const y = Math.round((MAIN_CIRCLE_RADIUS - SMALL_CIRCLE_RADIUS) * Math.sin(angle));
            smallCircle.style.left = `${x + (MAIN_CIRCLE_RADIUS - SMALL_CIRCLE_RADIUS)}px`;
            smallCircle.style.top = `${y + (MAIN_CIRCLE_RADIUS - SMALL_CIRCLE_RADIUS)}px`;
            smallCircle.style.width = `${SMALL_CIRCLE_RADIUS * 2}px`;
            smallCircle.style.height = `${SMALL_CIRCLE_RADIUS * 2}px`;
            smallCircle.style.backgroundColor = 'lightgreen';
            smallCircle.style.borderRadius = '50%';
            smallCircle.style.position = 'absolute';
            const number = document.createElement('span');
            number.textContent = i;
            number.style.fontSize = `${MAIN_CIRCLE_RADIUS / 7.14}px`; // размер цифр циферблата (коэф. 7.14) вычислен эмпирически
            number.style.position = 'absolute';
            number.style.top = '50%';
            number.style.left = '50%';
            number.style.transform = 'translate(-50%, -50%)';
            smallCircle.appendChild(number);
            mainCircle.appendChild(smallCircle);
        }
    }
    createSmallCircles();

    function updateClock() {
        const now = new Date();
        const hour = now.getHours();
        const minute = now.getMinutes();
        const second = now.getSeconds();

        const hourHand = document.getElementById('hourHand');
        hourHand.style.width = `${MAIN_CIRCLE_RADIUS / 25}px`; // ширина и длина стрелок (здесь и далее, коэффициенты 25 для ширины и 1.7 и 1.25 для высоты) вычислены эмпирически
        hourHand.style.height = `${MAIN_CIRCLE_RADIUS / 1.7}px`;
        hourHand.style.bottom = `${MAIN_CIRCLE_RADIUS}px`;
        hourHand.style.left = `${MAIN_CIRCLE_RADIUS}px`;
        
        const minuteHand = document.getElementById('minuteHand');
        minuteHand.style.width = `${MAIN_CIRCLE_RADIUS / 25}px`;
        minuteHand.style.height = `${MAIN_CIRCLE_RADIUS / 1.25}px`;
        minuteHand.style.bottom = `${MAIN_CIRCLE_RADIUS}px`;
        minuteHand.style.left = `${MAIN_CIRCLE_RADIUS}px`;
        
        const secondHand = document.getElementById('secondHand');
        secondHand.style.width = `${MAIN_CIRCLE_RADIUS / 50}px`;
        secondHand.style.height = `${MAIN_CIRCLE_RADIUS / 1.25}px`;
        secondHand.style.bottom = `${MAIN_CIRCLE_RADIUS}px`;
        secondHand.style.left = `${MAIN_CIRCLE_RADIUS}px`;

        const hourAngle = ((hour % 12) * 30) + (minute * 0.5); // расчет градуса для часовой стрелки: 1 час = 30 градусов, 1 минута = 0.5 градуса
        const minuteAngle = minute * 6; // расчет градуса для минутной стрелки: 1 минута = 6 градусов
        const secondAngle = second * 6; // расчет градуса для секундной стрелки: 1 секунда = 6 градусов

        hourHand.style.transform = `rotate(${hourAngle}deg)`;
        minuteHand.style.transform = `rotate(${minuteAngle}deg)`;
        secondHand.style.transform = `rotate(${secondAngle}deg)`;

        setTimeout(updateClock, 1000)
    }
    updateClock();

    function updateDigitalClock() {
        const now = new Date();
        const digitalClock = document.getElementById('digitalClock');
        digitalClock.style.top = `${MAIN_CIRCLE_RADIUS / 2}px`;
        digitalClock.style.left = `${MAIN_CIRCLE_RADIUS / 2 + MAIN_CIRCLE_RADIUS / 4}px`;
        digitalClock.style.fontSize = `${MAIN_CIRCLE_RADIUS / 7.14}px`; // размер элементов цифровых часов (коэффициент 7.14) вычислен эмпирически
        const digitalTime = now.toLocaleTimeString();
        digitalClock.textContent = digitalTime;
        console.log(digitalTime);
        setTimeout(updateDigitalClock, 1000)
    }
    updateDigitalClock();
}
