// Create a style element
const style = document.createElement('style');

// Add the CSS code as a string
style.innerHTML = `
    body {
        font-family: Arial, sans-serif;
        background-color: #141414;
        color: #00ff9d;
        margin: 0;
        padding: 0;
        display: flex;
        height: 100vh;
    }

    .sidebar {
        width: 200px;
        background-color: #1f1f1f;
        height: 100%;
        padding: 20px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
        transition: transform 0.3s ease;
    }

    .sidebar .tab-button {
        width: 100%;
        background-color: transparent;
        color: #00ff9d;
        border: none;
        padding: 15px;
        text-align: left;
        cursor: pointer;
        display: block;
        font-size: 18px;
        margin-bottom: 10px;
        transition: 0.3s;
    }

    .sidebar .tab-button:first-child {
        margin-top: 100px;
    }

    .sidebar .tab-button:hover {
        background-color: #00ff9d;
        color: #141414;
    }

    .sidebar .tab-button i {
        margin-right: 10px;
    }

    .content {
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
        box-sizing: border-box;
    }

    @media (max-width: 768px) {
        .content {
            padding: 15px;
        }
    }

    @media (max-width: 480px) {
        .content {
            padding: 10px;
            font-size: 14px;
        }
    }

    .tab-content {
        display: none;
    }

    .active {
        display: block;
    }

    .box {
        border: 2px solid #00ff9d;
        padding: 20px;
        border-radius: 15px;
        margin-bottom: 20px;
        background-color: #1f1f1f;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
    }

    #live-counter-box {
        display: flex;
        align-items: center;
    }

    .icon {
        background-color: #00ff9d;
        color: #141414;
        padding: 10px;
        border-radius: 50%;
        font-size: 16px;
        display: inline-block;
        margin-right: 10px;
        cursor: pointer;
        transition: transform 0.6s ease;
        transform-style: preserve-3d;
        perspective: 1000px;
    }

    .icon:hover {
        transform: rotateY(180deg);
    }

    .icon::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.1);
        border-radius: 50%;
        transform: translateZ(-20px);
    }

    #connection-time {
        display: flex;
    }

    .counter-section {
        margin-right: 5px;
    }

    #status-box {
        display: flex;
        align-items: center;
    }

    h1 {
        margin: 0;
        font-size: 24px;
    }

    #status {
        margin-left: 10px;
    }

    .counter-section {
        display: inline-block;
        font-size: 32px;
        font-weight: bold;
        margin: 0 5px;
    }

    canvas {
        max-width: 100%;
        height: 400px;
    }

    .badge {
        display: inline-block;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        margin-left: 10px;
    }

    .badge.green {
        background-color: green;
    }

    .badge.red {
        background-color: red;
    }

    .hidden {
        display: none;
    }

    .toggle-button {
        position: relative;
        width: 60px;
        height: 30px;
        background-color: #555;
        border-radius: 50px;
        cursor: pointer;
    }

    .toggle-button .toggle-switch {
        position: absolute;
        width: 25px;
        height: 25px;
        background-color: #00ff9d;
        border-radius: 50%;
        top: 2.5px;
        left: 2.5px;
        transition: all 0.3s;
    }

    .toggle-button.active {
        background-color: #00ff9d;
    }

    .toggle-button.active .toggle-switch {
        left: 32px;
        background-color: #141414;
    }

    .togglebtn {
        display: none;
        flex-direction: column;
        justify-content: space-between;
        width: 35px;
        height: 28px;
        cursor: pointer;
        z-index: 1000;
        position: fixed;
        top: 20px;
        left: 20px;
    }

    .togglebtn span {
        background-color: #00ff9d;
        height: 4px;
        width: 100%;
        border-radius: 5px;
        transition: all 0.3s ease-in-out;
        position: absolute;
        left: 0;
    }

    .togglebtn span:nth-child(1) {
        top: 0;
    }

    .togglebtn span:nth-child(2) {
        top: 12px;
    }

    .togglebtn span:nth-child(3) {
        top: 24px;
    }

    .togglebtn.active span:nth-child(1) {
        transform: rotate(45deg);
        top: 12px;
    }

    .togglebtn.active span:nth-child(2) {
        opacity: 0;
    }

    .togglebtn.active span:nth-child(3) {
        transform: rotate(-45deg);
        top: 12px;
    }

    @media (max-width: 768px) {
        body {
            flex-direction: column;
        }

        .content {
            margin-top: 50px;
            width: 100%;
        }

        .togglebtn {
            display: flex;
            z-index: 999;
        }

        .sidebar {
            position: fixed;
            left: -500px;
            transform: translateX(0);
            transition: left 0.3s ease;
            z-index: 99;
        }

        .sidebar.active {
            left: 0;
        }
    }

    body.dark-mode {
        background-color: #000;
        color: #ffffff;
    }

    .sidebar.dark-mode {
        background-color: #000000;
    }

    .box.dark-mode {
        background-color: #444;
        border-color: #00ff9d;
    }
`;

// Append the style element to the head
document.head.appendChild(style);

let connectionStart;
let connectionTimer;
let isConnected = navigator.onLine;
let lastDisconnectTime = null;
let lastConnectTime = null;

const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const totalConnectionPeriodElement = document.getElementById('total-connection-period');
const statusBadge = document.getElementById('status-badge');
const statusElement = document.getElementById('status');
const disconnectTimeElement = document.getElementById('disconnect-time');
const lastConnectionTimeElement = document.getElementById('last-connection-time');
const historyLog = document.getElementById('history-log');
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');

// Timer Functionality
function startConnectionTimer() {
    connectionStart = Date.now();
    connectionTimer = setInterval(updateConnectionTime, 1000);
}

function stopConnectionTimer() {
    clearInterval(connectionTimer);
}

function updateConnectionTime() {
    const elapsedTime = Math.floor((Date.now() - connectionStart) / 1000);
    const days = Math.floor(elapsedTime / 86400);
    const hours = Math.floor((elapsedTime % 86400) / 3600);
    const minutes = Math.floor((elapsedTime % 3600) / 60);
    const seconds = elapsedTime % 60;

    if (days > 0) {
        daysElement.innerText = `${days}d`;
        daysElement.classList.remove('hidden');
    } else {
        daysElement.classList.add('hidden');
    }
    if (hours > 0 || days > 0) {
        hoursElement.innerText = `${hours}h`;
        hoursElement.classList.remove('hidden');
    } else {
        hoursElement.classList.add('hidden');
    }
    if (minutes > 0 || hours > 0 || days > 0) {
        minutesElement.innerText = `${minutes}m`;
        minutesElement.classList.remove('hidden');
    } else {
        minutesElement.classList.add('hidden');
    }
    secondsElement.innerText = `${seconds}s`;
}

function showTotalConnectionPeriod() {
    const elapsedTime = Math.floor((Date.now() - connectionStart) / 1000);
    const days = Math.floor(elapsedTime / 86400);
    const hours = Math.floor((elapsedTime % 86400) / 3600);
    const minutes = Math.floor((elapsedTime % 3600) / 60);
    const seconds = elapsedTime % 60;

    const formattedTime = `${days > 0 ? days + 'd ' : ''}${hours > 0 ? hours + 'h ' : ''}${minutes > 0 ? minutes + 'm ' : ''}${seconds}s`;
    totalConnectionPeriodElement.innerText = `Total Connection Period: ${formattedTime}`;
    totalConnectionPeriodElement.classList.remove('hidden');
}

function logConnectionEvent(type) {
    const now = new Date().toLocaleString();
    const li = document.createElement('li');
    li.innerText = `${type}: ${now}`;
    historyLog.appendChild(li);
}

function checkConnection() {
    isConnected = navigator.onLine;
    statusElement.innerText = isConnected ? 'Connected🟢' : 'Disconnected🔴';
    statusElement.style.color = isConnected ? '#00ff9d' : '#ff6384';
    statusBadge.className = isConnected ? 'badge green' : 'badge red';

    if (isConnected) {
        logConnectionEvent('Connected');
        lastConnectTime = new Date().toLocaleString();
        lastConnectionTimeElement.innerText = `Last Connected: ${lastConnectTime}`;
        startConnectionTimer();
    } else {
        logConnectionEvent('Disconnected');
        lastDisconnectTime = new Date().toLocaleString();
        disconnectTimeElement.innerText = `Last Disconnected: ${lastDisconnectTime}`;
        stopConnectionTimer();
        showTotalConnectionPeriod();
    }
}

window.addEventListener('online', checkConnection);
window.addEventListener('offline', checkConnection);

// Load IP Address
fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
        document.getElementById('ip-box').innerHTML = `<i class="fas fa-network-wired"></i> IP Address: ${data.ip}`;
    });

// Initialize charts
const bandwidthChart = new Chart(document.getElementById('bandwidthChart'), {
    type: 'line',
    data: {
        labels: ['10:00', '10:10', '10:20', '10:30', '10:40'],
        datasets: [{
            label: 'Bandwidth (Mbps)',
            data: [12, 19, 3, 5, 2],
            borderColor: '#00ff9d',
            fill: false
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: true,
            },
        },
    }
});

const latencyChart = new Chart(document.getElementById('latencyChart'), {
    type: 'line',
    data: {
        labels: ['10:00', '10:10', '10:20', '10:30', '10:40'],
        datasets: [{
            label: 'Latency (ms)',
            data: [50, 60, 30, 40, 70],
            borderColor: '#ff6384',
            fill: false
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: true,
            },
        },
    }
});

function openTab(tabName) {
    const contents = document.getElementsByClassName('tab-content');
    for (let i = 0; i < contents.length; i++) {
        contents[i].classList.remove('active');
    }
    document.getElementById(tabName).classList.add('active');
}

hamburger.addEventListener('click', function () {
hamburger.classList.toggle('active');
sidebar.classList.toggle('active');

// Hide the sidebar when a menu button is clicked
const tabButtons = document.querySelectorAll('.tab-button');
tabButtons.forEach(button => {
button.addEventListener('click', function () {
sidebar.classList.remove('active');
hamburger.classList.remove('active');
});
});

// Hide the sidebar when clicking outside of it
document.addEventListener('click', function (event) {
if (!sidebar.contains(event.target) && !hamburger.contains(event.target)) {
sidebar.classList.remove('active');
hamburger.classList.remove('active');
}
});
});

// Dark mode toggle functionality
const toggleButton = document.getElementById('dark-mode-toggle');
toggleButton.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    sidebar.classList.toggle('dark-mode');
    toggleButton.classList.toggle('active');
});


// Initial check
checkConnection();