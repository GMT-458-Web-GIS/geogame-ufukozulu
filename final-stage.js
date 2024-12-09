let map, playerMarker, targetMarker, bufferCircle, targetRouteLayer, timerInterval, captureInterval;
let isPlayerSelected = false; // Oyuncunun seçilip seçilmediğini takip eder
let remainingTime = 60; // Başlangıç süresi
const playerSpeed = 11; // us.png hızı (m/s)
const targetSpeed = 15; // terror.png hızı (m/s)

// OSRM API URL
const osrmEndpoint = "https://router.project-osrm.org/route/v1";

// Haritayı başlat
function initializeFinalStage(finalStageCoords) {
    map = L.map('map').setView(finalStageCoords, 13);

    // OpenStreetMap katmanı
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    // Buffer (şeffaf daire) alanını ekle
    bufferCircle = L.circle(finalStageCoords, {
        color: 'blue',
        fillColor: 'blue',
        fillOpacity: 0.2,
        radius: 1500 // 1.5 km çap
    }).addTo(map);

    // Üst yazı ve zamanlayıcıyı ekle
    addGameInstructionsAndTimer();

    // Karakterleri haritaya yerleştir
    spawnCharacters();

    // Haritaya tıklama dinleyicisi ekle
    map.on('click', onMapClick);

    // Zamanlayıcıyı başlat
    startTimer();

    // Yakalama kontrolünü başlat
    startCaptureCheck();
}

// Üst yazıyı ve zamanlayıcıyı ekle
function addGameInstructionsAndTimer() {
    const container = document.createElement('div');
    container.id = 'game-info-container';

    // Üst yazı
    const instructions = document.createElement('div');
    instructions.id = 'game-instructions';
    instructions.innerText = "Click on the helicopter to select it, then move across the map to catch the enemy. Hurry up, you have one minute!";
    container.appendChild(instructions);

    // Zamanlayıcı
    timerElement = document.createElement('div');
    timerElement.id = 'timer';
    timerElement.innerText = `Time Left: ${remainingTime}s`;
    container.appendChild(timerElement);

    document.body.appendChild(container);
}

// Zamanlayıcıyı başlat
function startTimer() {
    timerInterval = setInterval(() => {
        remainingTime--;
        timerElement.innerText = `Time Left: ${remainingTime}s`;

        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            clearInterval(captureInterval);
            alert("Time's up! You failed to catch the agent.");
            restartGame();
        }
    }, 1000);
}

// Karakterleri haritaya yerleştir
async function spawnCharacters() {
    const usIcon = L.icon({
        iconUrl: 'us.png',
        iconSize: [40, 40],
        iconAnchor: [20, 20]
    });

    const targetIcon = L.icon({
        iconUrl: 'terror.png',
        iconSize: [40, 40],
        iconAnchor: [20, 20]
    });

    // Oyuncuyu buffer alanında rastgele bir noktaya yerleştir
    const playerPosition = bufferCircle.getLatLng();
    playerMarker = L.marker(playerPosition, { icon: usIcon, draggable: false })
        .addTo(map)
        .on('click', () => {
            isPlayerSelected = true; // Oyuncu seçildi
            alert("Agent selected! Click on the map to move.");
        });

    // Teröristi buffer alanında rastgele bir yola yerleştir
    const targetPosition = await getRandomRoadPointInBuffer(bufferCircle.getLatLng());
    targetMarker = L.marker(targetPosition, { icon: targetIcon, draggable: false }).addTo(map);

    moveTarget(); // Terörist hareket etmeye başlasın
}

// Haritaya tıklama olayını işleme
async function onMapClick(e) {
    if (isPlayerSelected) {
        const destination = e.latlng;

        if (!bufferCircle.getBounds().contains(destination)) {
            alert("You must select a point inside the buffer zone!");
            return;
        }

        movePlayerDirectly(playerMarker, playerMarker.getLatLng(), destination, playerSpeed);
    }
}

// Oyuncuyu doğrudan kuş uçuşu hareket ettir
async function movePlayerDirectly(player, startCoords, endCoords, speed) {
    const distance = map.distance(startCoords, endCoords);
    const steps = Math.ceil(distance / speed); // Adım sayısı
    const latStep = (endCoords.lat - startCoords.lat) / steps;
    const lngStep = (endCoords.lng - startCoords.lng) / steps;

    for (let i = 1; i <= steps; i++) {
        const nextLat = startCoords.lat + latStep * i;
        const nextLng = startCoords.lng + lngStep * i;
        player.setLatLng({ lat: nextLat, lng: nextLng });
        await sleep(1000 / speed); // Her adım için süre
    }
}

// Teröristi hareket ettir
async function moveTarget() {
    while (true) {
        const currentCoords = targetMarker.getLatLng();

        // Buffer içinde rastgele bir yol noktası bul
        const nextPoint = await getRandomRoadPointInBuffer(bufferCircle.getLatLng());

        // Eğer geçerli bir rota oluşturulamazsa tekrar dene
        if (!nextPoint) {
            console.error("Failed to find a valid road point for terror.png.");
            continue;
        }

        // Teröristi hareket ettir
        await moveCharacterOnRoad(targetMarker, currentCoords, nextPoint, 'red', targetSpeed);
        await sleep(3000); // Hedefe ulaştığında 3 saniye bekle
    }
}

// Teröristi yollar üzerinde hareket ettir
async function moveCharacterOnRoad(character, startCoords, endCoords, color, speed) {
    const response = await fetch(
        `${osrmEndpoint}/foot/${startCoords.lng},${startCoords.lat};${endCoords.lng},${endCoords.lat}?overview=full&geometries=geojson`
    );

    if (response.ok) {
        const data = await response.json();
        const route = data.routes[0];

        // Eğer rota mevcut değilse hata mesajı ver ve çık
        if (!route || !route.geometry || !route.geometry.coordinates.length) {
            console.error("No valid route found for terror.png movement.");
            return;
        }

        const coordinates = route.geometry.coordinates;

        // Önceki rotayı temizle
        if (character === targetMarker && targetRouteLayer) {
            map.removeLayer(targetRouteLayer);
        }

        // Yeni rotayı ekle
        targetRouteLayer = L.polyline(
            coordinates.map(coord => [coord[1], coord[0]]),
            { color, weight: 3 }
        ).addTo(map);

        // Hareket adımları
        const stepDuration = 1000 / speed; // Hareket adımı süresi
        for (let i = 0; i < coordinates.length; i++) {
            const latLng = {
                lat: coordinates[i][1],
                lng: coordinates[i][0]
            };

            // Konum güncelle ve kontrol et
            character.setLatLng(latLng);
            await sleep(stepDuration);
        }
    } else {
        console.error("Failed to fetch route for terror.png.");
    }
}

// Sürekli olarak yakalama kontrolü yap
function startCaptureCheck() {
    captureInterval = setInterval(() => {
        const distance = map.distance(playerMarker.getLatLng(), targetMarker.getLatLng());
        if (distance < 70) {
            clearInterval(timerInterval);
            clearInterval(captureInterval); // Yakalama kontrolünü durdur
            const score = remainingTime * 10; // Puan hesapla
            showCatchOverlay(score);
        }
    }, 100); // 100 ms'de bir kontrol
}

// Yakalama ekranını göster
function showCatchOverlay(score) {
    const overlay = document.createElement('div');
    overlay.id = 'catch-overlay';
    overlay.innerHTML = `
        <div id="catch-content">
            <h1>Congratulations!</h1>
            <p>You caught the agent!</p>
            <p>Your score: <strong>${score}</strong></p>
            <button id="restart-button" onclick="restartGame()">Play Again</button>
        </div>
    `;
    document.body.appendChild(overlay);
}

// Rastgele bir yol noktası seç
async function getRandomRoadPointInBuffer(centerCoords) {
    while (true) {
        const randomPoint = getRandomPointInBuffer(centerCoords);

        const response = await fetch(
            `${osrmEndpoint}/foot/${randomPoint.lng},${randomPoint.lat};${centerCoords.lng},${centerCoords.lat}?overview=false`
        );

        if (response.ok) {
            const data = await response.json();
            if (data.routes && data.routes.length > 0) {
                return randomPoint; // Yola bağlı bir nokta bulundu
            }
        }
    }
}

// Rastgele bir nokta seç
function getRandomPointInBuffer(centerCoords) {
    const radius = 1500; // Buffer alanı yarıçapı (1.5 km)
    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * radius;

    const offsetLat = (distance * Math.cos(angle)) / 111320;
    const offsetLng = (distance * Math.sin(angle)) / (40075000 * Math.cos(centerCoords.lat * Math.PI / 180) / 360);

    return {
        lat: centerCoords.lat + offsetLat,
        lng: centerCoords.lng + offsetLng
    };
}

// Belirli bir süre bekle
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Oyunu yeniden başlat
function restartGame() {
    location.reload();
}
