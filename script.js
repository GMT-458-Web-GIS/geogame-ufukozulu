// Question database with all 15 countries
const questions = [
    {
        country: "Turkey",
        stage1: [
            { text: "This country is famous for Turkish coffee.", options: ["Turkey", "Italy", "Spain", "France"], answer: 0 },
            { text: "This country is known for the Ottoman Empire heritage.", options: ["Turkey", "Greece", "Egypt", "Italy"], answer: 0 },
            { text: "This country connects two continents via the Bosphorus.", options: ["Turkey", "France", "Germany", "Netherlands"], answer: 0 }
        ],
        stage2: { text: "What is the capital of this country?", options: ["Ankara", "Rome", "Madrid", "Paris"], answer: 0 },
        stage3: { text: "Identify the famous landmark in the capital.", image: "ayasofya.jpg", options: ["Hagia Sophia", "Colosseum", "Eiffel Tower", "Big Ben"], answer: 0 },
        finalStageCoords: [41.0082, 28.9802] // Ayasofya, Istanbul
    },
    {
        country: "Spain",
        stage1: [
            { text: "This country is famous for bullfighting and matadors.", options: ["Portugal", "Spain", "Italy", "France"], answer: 1 },
            { text: "This country is known for flamenco dancing.", options: ["France", "Italy", "Portugal", "Spain"], answer: 3 },
            { text: "This country hosts La Tomatina, a tomato-throwing festival.", options: ["Italy", "Portugal", "France", "Spain"], answer: 3 }
        ],
        stage2: { text: "What is the capital of this country?", options: ["Madrid", "Lisbon", "Rome", "Paris"], answer: 0 },
        stage3: { text: "Identify the famous landmark in the capital.", image: "madrid.jpg", options: ["Sagrada Familia", "Eiffel Tower", "Colosseum", "Hagia Sophia"], answer: 0 },
        finalStageCoords: [41.4036, 2.1744] // Sagrada Familia, Barcelona
    },
    {
        country: "France",
        stage1: [
            { text: "This country is famous for the Eiffel Tower.", options: ["Italy", "Spain", "France", "Netherlands"], answer: 2 },
            { text: "This country is known for its wines and cheeses.", options: ["France", "Italy", "Spain", "Germany"], answer: 0 },
            { text: "This country is home to the Mona Lisa in the Louvre Museum.", options: ["France", "Spain", "Germany", "Italy"], answer: 0 }
        ],
        stage2: { text: "What is the capital of this country?", options: ["Paris", "Berlin", "Madrid", "Lisbon"], answer: 0 },
        stage3: { text: "Identify the famous landmark in the capital.", image: "eyfel.jpg", options: ["Eiffel Tower", "Colosseum", "Big Ben", "Hagia Sophia"], answer: 0 },
        finalStageCoords: [48.8584, 2.2945] // Eiffel Tower, Paris
    },
    {
        country: "Italy",
        stage1: [
            { text: "This country is famous for pizza and pasta.", options: ["Italy", "France", "Spain", "Greece"], answer: 0 },
            { text: "This country is home to the Colosseum in Rome.", options: ["Italy", "France", "Germany", "Turkey"], answer: 0 },
            { text: "This country is the birthplace of the Renaissance.", options: ["Italy", "France", "Spain", "Germany"], answer: 0 }
        ],
        stage2: { text: "What is the capital of this country?", options: ["Rome", "Paris", "Berlin", "Athens"], answer: 0 },
        stage3: { text: "Identify the famous landmark in the capital.", image: "colosseum.jpg", options: ["Colosseum", "Eiffel Tower", "Big Ben", "Hagia Sophia"], answer: 0 },
        finalStageCoords: [41.8902, 12.4922] // Colosseum, Rome
    },
    {
        country: "Germany",
        stage1: [
            { text: "This country is famous for Oktoberfest, a beer festival.", options: ["France", "Germany", "Italy", "Netherlands"], answer: 1 },
            { text: "This country is known for its famous car brands like BMW, Mercedes, and Audi.", options: ["Germany", "France", "Italy", "Spain"], answer: 0 },
            { text: "This country has the Brandenburg Gate and the Berlin Wall.", options: ["Germany", "France", "Spain", "Italy"], answer: 0 }
        ],
        stage2: { text: "What is the capital of this country?", options: ["Berlin", "Madrid", "Rome", "Paris"], answer: 0 },
        stage3: { text: "Identify the famous landmark in the capital.", image: "brandenburg_gate.jpg", options: ["Brandenburg Gate", "Eiffel Tower", "Colosseum", "Big Ben"], answer: 0 },
        finalStageCoords: [52.5163, 13.3777] // Brandenburg Gate, Berlin
    },
    {
        country: "Netherlands",
        stage1: [
            { text: "This country is famous for its colorful tulip fields.", options: ["France", "Germany", "Netherlands", "Belgium"], answer: 2 },
            { text: "This country is known for its windmills and canals.", options: ["Netherlands", "Germany", "France", "Sweden"], answer: 0 },
            { text: "This country is known for its cheeses like Gouda and Edam.", options: ["Netherlands", "Germany", "France", "Belgium"], answer: 0 }
        ],
        stage2: { text: "What is the capital of this country?", options: ["Amsterdam", "Berlin", "Brussels", "Paris"], answer: 0 },
        stage3: { text: "Identify the famous landmark in the capital.", image: "rijksmuseum.jpg", options: ["Rijksmuseum", "Louvre", "Colosseum", "Big Ben"], answer: 0 },
        finalStageCoords: [52.3600, 4.8852] // Rijksmuseum, Amsterdam
    },
    {
        country: "Norway",
        stage1: [
            { text: "This country is famous for the Northern Lights.", options: ["Norway", "Sweden", "Denmark", "Finland"], answer: 0 },
            { text: "This country is known for its fjords and natural beauty.", options: ["Norway", "Sweden", "Denmark", "Finland"], answer: 0 },
            { text: "This country has a rich Viking history and culture.", options: ["Norway", "Sweden", "Denmark", "Iceland"], answer: 0 }
        ],
        stage2: { text: "What is the capital of this country?", options: ["Oslo", "Stockholm", "Copenhagen", "Helsinki"], answer: 0 },
        stage3: { text: "Identify the famous landmark in the capital.", image: "viking_ship_museum.jpg", options: ["Viking Ship Museum", "Louvre", "Colosseum", "Big Ben"], answer: 0 },
        finalStageCoords: [59.9047, 10.6840] // Viking Ship Museum, Oslo, Norway
    },
    {
        country: "Denmark",
        stage1: [
            { text: "This country is the birthplace of Lego.", options: ["Sweden", "Denmark", "Norway", "Finland"], answer: 1 },
            { text: "This country is known for the concept of 'hygge' or cozy living.", options: ["Norway", "Denmark", "Sweden", "Finland"], answer: 1 },
            { text: "This country is the birthplace of author Hans Christian Andersen.", options: ["Denmark", "Norway", "Sweden", "Iceland"], answer: 0 }
        ],
        stage2: { text: "What is the capital of this country?", options: ["Copenhagen", "Oslo", "Stockholm", "Helsinki"], answer: 0 },
        stage3: { text: "Identify the famous landmark in the capital.", image: "nyhavn.jpg", options: ["Nyhavn", "Louvre", "Colosseum", "Big Ben"], answer: 0 },
        finalStageCoords: [55.6805, 12.5860] // Nyhavn, Copenhagen, Denmark
    },    
    {
        country: "United Kingdom",
        stage1: [
            { text: "This country is famous for Big Ben and Buckingham Palace.", options: ["France", "Germany", "United Kingdom", "Italy"], answer: 2 },
            { text: "This country is known for its red telephone booths.", options: ["United Kingdom", "France", "Germany", "Italy"], answer: 0 },
            { text: "This country has one of the oldest metro systems in the world.", options: ["United Kingdom", "France", "Germany", "Spain"], answer: 0 }
        ],
        stage2: { text: "What is the capital of this country?", options: ["London", "Paris", "Berlin", "Rome"], answer: 0 },
        stage3: { text: "Identify the famous landmark in the capital.", image: "big_ben.jpg", options: ["Big Ben", "Colosseum", "Eiffel Tower", "Hagia Sophia"], answer: 0 },
        finalStageCoords: [51.5007, -0.1245] // Big Ben, London, United Kingdom 
    },
    {
        country: "Czech Republic",
        stage1: [
            { text: "This country is home to the Astronomical Clock in Prague.", options: ["Czech Republic", "Germany", "Austria", "Hungary"], answer: 0 },
            { text: "This country is known for Prague Castle, the largest ancient castle complex.", options: ["Czech Republic", "France", "Austria", "Hungary"], answer: 0 },
            { text: "This country is famous for its traditional beer culture.", options: ["Czech Republic", "Germany", "Belgium", "Austria"], answer: 0 }
        ],
        stage2: { text: "What is the capital of this country?", options: ["Prague", "Berlin", "Vienna", "Budapest"], answer: 0 },
        stage3: { text: "Identify the famous landmark in the capital.", image: "astronomical_clock.jpg", options: ["Astronomical Clock", "Big Ben", "Colosseum", "Eiffel Tower"], answer: 0 },
        finalStageCoords: [50.0875, 14.4211] // Astronomical Clock, Prague, Czech Republic
    },
    {
        country: "Austria",
        stage1: [
            { text: "This country is the birthplace of Mozart.", options: ["Austria", "Germany", "Italy", "Switzerland"], answer: 0 },
            { text: "This country is famous for the Alps and skiing resorts.", options: ["Austria", "Germany", "Switzerland", "France"], answer: 0 },
            { text: "This country is home to Schönbrunn Palace.", options: ["Austria", "Germany", "France", "Switzerland"], answer: 0 }
        ],
        stage2: { text: "What is the capital of this country?", options: ["Vienna", "Berlin", "Rome", "Bern"], answer: 0 },
        stage3: { text: "Identify the famous landmark in the capital.", image: "schonbrunn_palace.jpg", options: ["Schönbrunn Palace", "Big Ben", "Colosseum", "Eiffel Tower"], answer: 0 },
        finalStageCoords: [48.1845, 16.3122] // Schönbrunn Palace, Vienna, Austria
    },
    {
        country: "Greece",
        stage1: [
            { text: "This country is the birthplace of ancient Greek civilization.", options: ["Greece", "Italy", "Egypt", "Turkey"], answer: 0 },
            { text: "This country is famous for the Parthenon and the Acropolis.", options: ["Greece", "Italy", "Egypt", "Turkey"], answer: 0 },
            { text: "This country is home to philosophers like Socrates, Plato, and Aristotle.", options: ["Greece", "Italy", "Germany", "France"], answer: 0 }
        ],
        stage2: { text: "What is the capital of this country?", options: ["Athens", "Rome", "Cairo", "Istanbul"], answer: 0 },
        stage3: { text: "Identify the famous landmark in the capital.", image: "parthenon.jpg", options: ["Parthenon", "Big Ben", "Colosseum", "Eiffel Tower"], answer: 0 },
        finalStageCoords: [37.9715, 23.7267] // Parthenon, Athens, Greece
    },
    {
        country: "Portugal",
        stage1: [
            { text: "This country is known for traditional Fado music.", options: ["Portugal", "Spain", "Italy", "France"], answer: 0 },
            { text: "This country is famous for Port wine.", options: ["Portugal", "Spain", "Italy", "France"], answer: 0 },
            { text: "This country is home to the historic Belem Tower.", options: ["Portugal", "Spain", "France", "Italy"], answer: 0 }
        ],
        stage2: { text: "What is the capital of this country?", options: ["Lisbon", "Madrid", "Rome", "Paris"], answer: 0 },
        stage3: { text: "Identify the famous landmark in the capital.", image: "belem_tower.jpg", options: ["Belem Tower", "Eiffel Tower", "Colosseum", "Big Ben"], answer: 0 },
        finalStageCoords: [38.6916, -9.2150] // Belém Tower, Lisbon, Portugal
    },
    {
        country: "Poland",
        stage1: [
            { text: "This country is where World War II began.", options: ["Germany", "Poland", "France", "Russia"], answer: 1 },
            { text: "This country is known for the Wieliczka Salt Mine and Wawel Castle.", options: ["Poland", "Germany", "Czech Republic", "Austria"], answer: 0 },
            { text: "This country is the birthplace of famous composer Chopin.", options: ["Poland", "Germany", "Austria", "France"], answer: 0 }
        ],
        stage2: { text: "What is the capital of this country?", options: ["Warsaw", "Berlin", "Paris", "Moscow"], answer: 0 },
        stage3: { text: "Identify the famous landmark in the capital.", image: "wawel_castle.jpg", options: ["Wawel Castle", "Eiffel Tower", "Colosseum", "Big Ben"], answer: 0 },
        finalStageCoords: [50.0540, 19.9352] // Wawel Castle, Kraków, Poland
    },
    {
        country: "Hungary",
        stage1: [
            { text: "This country is famous for the Chain Bridge in Budapest.", options: ["Hungary", "Austria", "Czech Republic", "Poland"], answer: 0 },
            { text: "This country is known for its thermal baths and spa culture.", options: ["Hungary", "Austria", "Czech Republic", "Poland"], answer: 0 },
            { text: "This country is home to the Hungarian Parliament Building.", options: ["Hungary", "Austria", "France", "Germany"], answer: 0 }
        ],
        stage2: { text: "What is the capital of this country?", options: ["Budapest", "Vienna", "Prague", "Warsaw"], answer: 0 },
        stage3: { text: "Identify the famous landmark in the capital.", image: "parliament_building.jpg", options: ["Parliament Building", "Eiffel Tower", "Colosseum", "Big Ben"], answer: 0 },
        finalStageCoords: [47.5076, 19.0452] // Parliament Building, Budapest, Hungary
    }

];

// Oyun durumları
let currentCountry;
let currentStage = 1;
let lives = 3;
let currentQuestionIndex = 0; // Şu anki Stage 1 sorusunun indeksini takip eder

// Oyun başlangıç ayarları
window.onload = function () {
    document.getElementById("start-screen").style.display = "block";
};

// Oyunu başlat
function startGame() {
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("game-over-screen").style.display = "none"; // Game Over ekranını gizle
    currentCountry = questions[Math.floor(Math.random() * questions.length)];
    currentStage = 1;
    currentQuestionIndex = 0; // Stage 1 sorularını sıfırla
    lives = 3;
    showStageIndicator();
    loadQuestion();
    document.getElementById("question-screen").style.display = "block";
    updateLives();
}

// Aşama göstergesini güncelle
function showStageIndicator() {
    const stageIndicator = document.getElementById("stage-indicator");
    stageIndicator.innerText = `Stage ${currentStage}`;
    stageIndicator.style.display = "block";
}

// Soruyu yükle
function loadQuestion() {
    let questionData;

    if (currentStage === 1) {
        questionData = currentCountry.stage1[currentQuestionIndex];
    } else if (currentStage === 2) {
        questionData = currentCountry.stage2;
    } else if (currentStage === 3) {
        questionData = currentCountry.stage3;
    }

    document.getElementById("question-text").innerText = questionData.text;

    const questionImage = document.getElementById("question-image");
    if (questionData.image) {
        questionImage.src = questionData.image;
        questionImage.style.display = "block";
    } else {
        questionImage.style.display = "none";
    }

    // Şıkları karıştır
    const options = [...questionData.options];
    const correctAnswer = options[questionData.answer]; // Doğru şık
    options.sort(() => Math.random() - 0.5); // Şıkları karıştır
    questionData.answer = options.indexOf(correctAnswer); // Doğru şık yeni pozisyonunu alır

    // Şıkları yükle
    const optionButtons = document.querySelectorAll(".option-button");
    optionButtons.forEach((button, index) => {
        button.innerText = options[index];
        button.onclick = () => checkAnswer(index, questionData.answer);
        button.classList.remove("correct", "incorrect");
        button.disabled = false;
    });
}

// Cevabı kontrol et
function checkAnswer(selectedOptionIndex, correctAnswerIndex) {
    const optionButtons = document.querySelectorAll(".option-button");
    const selectedButton = optionButtons[selectedOptionIndex];

    if (selectedOptionIndex === correctAnswerIndex) {
        // Doğru cevap
        selectedButton.classList.add("correct");
        setTimeout(() => {
            if (currentStage === 1) {
                // Stage 1'de doğru cevap verildiğinde doğrudan Stage 2'ye geç
                currentStage++;
                currentQuestionIndex = 0;
            } else if (currentStage < 3) {
                currentStage++;
            } else {
                proceedToFinalStage();
                return;
            }
            showStageIndicator();
            loadQuestion();
        }, 1000);
    } else {
        // Yanlış cevap
        selectedButton.classList.add("incorrect");
        lives--;
        updateLives();
        if (lives <= 0) {
            showGameOver();
        } else if (currentStage === 1) {
            // Stage 1'de yanlış cevap verildiğinde diğer ipucuna geç
            setTimeout(() => {
                currentQuestionIndex++;
                if (currentQuestionIndex >= currentCountry.stage1.length) {
                    currentStage++;
                    currentQuestionIndex = 0;
                }
                showStageIndicator();
                loadQuestion();
            }, 1000); // 1 saniye beklet
        }
    }
}

// Canları güncelle
function updateLives() {
    const livesElement = document.getElementById("lives");
    livesElement.innerText = `Lives Remaining: ${lives}`;
    livesElement.style.display = "block"; // Her zaman görünür
}

// Oyun bitti ekranını göster
function showGameOver() {
    document.getElementById("question-screen").style.display = "none";
    document.getElementById("game-over-screen").style.display = "flex";
    const gameOverText = document.getElementById("game-over-text");
    gameOverText.innerHTML = "GAME OVER<br>You failed to catch the agent.";
}

// Oyunu yeniden başlat
function restartGame() {
    startGame();
}

// Final aşamasına geçiş
function proceedToFinalStage() {
    document.getElementById("question-screen").style.display = "none";
    document.getElementById("loading-screen").style.display = "block";

    const loadingVideo = document.getElementById("loading-video");
    loadingVideo.onended = () => {
        document.getElementById("loading-screen").style.display = "none";
        document.getElementById("final-stage").style.display = "block";
    };
}
