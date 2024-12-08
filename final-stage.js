let map, playerMarker, agentMarker, countdownInterval;
const bufferRadius = 0.005; // Buffer yarıçapı (yaklaşık 500 metre)
let playerSelected = false;
const baseMovementSpeed = 300; // Temel hareket hızı (ms)
const stepSizeMultiplier = 20; // Adım boyutu (20 metre)

// Final stage'in başlangıcı
async function startFinalStage(agentLocation) {
    console.log("Starting final stage..."); // Debugging için
    console.log("Agent location:", agentLocation);

    // Haritayı başlat
    map = L.map('map').setView(agentLocation, 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    // Şeffaf daire ekle
    L.circle(agentLocation, {
        radius: bufferRadius * 111000,
        color: 'blue',
        fillColor: 'blue',
        fillOpacity: 0.1
    }).addTo(map);

    // Oyuncuyu buffer içine yerleştir
    const playerIcon = L.icon({ iconUrl: 'us.png', iconSize: [40, 40] });
    const playerStartPosition = await getNearestRoad(getRandomLocationInsideCircle(agentLocation, bufferRadius));
    playerMarker = L.marker(playerStartPosition, { icon: playerIcon }).addTo(map);

    // Oyuncu ikonunu tıklanabilir yap
    playerMarker.on('click', () => {
        playerSelected = true;
        alert("Player selected! Click on a location to move.");
    });

    // Ajanı buffer içine yerleştir
    const agentIcon = L.icon({ iconUrl: 'terror.png', iconSize: [40, 40] });
    const agentStartPosition = await getNearestRoad(getRandomLocationInsideCircle(agentLocation, bufferRadius));
    agentMarker = L.marker(agentStartPosition, { icon: agentIcon }).addTo(map);

    // Ajan otomatik hareketini başlat
    moveAgent(agentStartPosition);

    // Zamanlayıcıyı başlat
    startTimer();

    // Oyuncu hareketi
    map.on('click', async function (e) {
        if (!playerSelected) return;

        if (!isInsideBuffer(e.latlng, agentLocation, bufferRadius)) {
            alert("You cannot move outside the buffer area!");
            return;
        }

        const targetLocation = await getNearestRoad(e.latlng);
        movePlayer(targetLocation);
    });
}

// Oyuncuyu adım adım hareket ettir
function movePlayer(targetLocation) {
    if (!playerMarker) return;

    const start = playerMarker.getLatLng();
    const distance = map.distance(start, targetLocation);
    const steps = Math.ceil(distance / stepSizeMultiplier);
    const latStep = (targetLocation.lat - start.lat) / steps;
    const lngStep = (targetLocation.lng - start.lng) / steps;

    let currentStep = 0;

    function step() {
        if (currentStep < steps) {
            const newLat = start.lat + latStep * currentStep;
            const newLng = start.lng + lngStep * currentStep;
            playerMarker.setLatLng([newLat, newLng]);
            checkProximity();
            currentStep++;
            setTimeout(step, baseMovementSpeed);
        } else {
            playerMarker.setLatLng(targetLocation);
        }
    }

    step();
}

// Ajanı rastgele bir hedefe hareket ettir
function moveAgent(startPosition) {
    let isMoving = false;

    function moveToRandomPoint() {
        if (isMoving) return;

        isMoving = true;

        const randomTarget = getRandomLocationInsideCircle(startPosition, bufferRadius);

        getNearestRoad(randomTarget).then(targetInsideBuffer => {
            const agentRoute = L.Routing.control({
                waypoints: [agentMarker.getLatLng(), targetInsideBuffer],
                router: new L.Routing.OSRMv1({ serviceUrl: 'https://router.project-osrm.org/route/v1' }),
                createMarker: () => null,
                fitSelectedRoutes: false,
                lineOptions: {
                    styles: [{ color: 'red', opacity: 0.8, weight: 3 }]
                }
            });

            agentRoute.on('routesfound', function (e) {
                const route = e.routes[0].coordinates;

                animateAgent(route, () => {
                    setTimeout(() => {
                        isMoving = false;
                        moveToRandomPoint();
                    }, 5000);
                });
            });

            agentRoute.on('routingerror', function () {
                console.error('Routing error. Retrying...');
                isMoving = false;
                moveToRandomPoint();
            });

            agentRoute.addTo(map);
        });
    }

    moveToRandomPoint();
}

// Ajanı adım adım hareket ettir
function animateAgent(route, onComplete) {
    let stepIndex = 0;

    function step() {
        if (stepIndex < route.length) {
            agentMarker.setLatLng(route[stepIndex]);
            checkProximity();
            stepIndex++;
            setTimeout(step, baseMovementSpeed);
        } else if (onComplete) {
            onComplete();
        }
    }

    step();
}

// Oyuncu ile ajan arasındaki mesafeyi kontrol et
function checkProximity() {
    const distance = map.distance(playerMarker.getLatLng(), agentMarker.getLatLng());
    document.getElementById("distance").innerText = `${Math.round(distance)} meters`;

    if (distance < 10) {
        clearInterval(countdownInterval);
        showResult("Congratulations! You caught the agent!");
    }
}

// Rastgele bir konumu buffer içinde döndür
function getRandomLocationInsideCircle(center, radius) {
    const randomAngle = Math.random() * 2 * Math.PI;
    const randomDistance = Math.random() * radius;
    const dx = randomDistance * Math.cos(randomAngle);
    const dy = randomDistance * Math.sin(randomAngle);
    return [center[0] + dy, center[1] + dx];
}

// Buffer alanı içinde mi kontrol et
function isInsideBuffer(latlng, center, radius) {
    const distance = map.distance(latlng, center);
    return distance <= radius * 111000;
}

// En yakın yolu bul
function getNearestRoad(location) {
    return new Promise((resolve) => {
        const url = `https://router.project-osrm.org/nearest/v1/driving/${location.lng},${location.lat}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.code === "Ok" && data.waypoints.length > 0) {
                    const { location } = data.waypoints[0];
                    resolve([location[1], location[0]]);
                } else {
                    resolve(location);
                }
            })
            .catch(() => resolve(location));
    });
}

// Zamanlayıcı
function startTimer() {
    let timeLeft = 60;
    const timerDisplay = document.getElementById("time-left");
    countdownInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = `0:${timeLeft < 10 ? '0' : ''}${timeLeft}`;
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            showResult("Time's up! The agent escaped.");
        }
    }, 1000);
}

// Sonuç ekranını göster
function showResult(message) {
    document.getElementById("final-stage").style.display = "none";
    document.getElementById("result-screen").style.display = "block";
    document.getElementById("result-text").innerText = message;
}
