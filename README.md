https://gmt-458-web-gis.github.io/geogame-ufukozulu/
# Catch the Agent Game Report

## Introduction
**Catch the Agent** is an engaging geo-based trivia and action game. The game tests players' general knowledge while incorporating interactive gameplay mechanics. The objective is to locate and capture an elusive agent through a multi-staged gameplay experience. Each stage progressively challenges players with trivia questions, geographic exploration, and action sequences.

# Event Handlers, Closures, AI Usage, and DOM Interaction

## Event Handlers

### 1. Question Selection
- **Event Trigger**: Clicking an answer button triggers validation.
- **Code Example**:
  ```javascript
  button.onclick = () => checkAnswer(index, questionData.answer);
  ```

### 2. Map Interactions
- **Event Trigger**: Clicking on the map during the final stage directs the player's movement.
- **Code Example**:
  ```javascript
  map.on('click', async (e) => {
      const targetLocation = await getNearestRoad(e.latlng);
      moveMarker(playerMarker, targetLocation, playerSpeed, checkProximity);
  });
  ```
### 3. Timer Countdown
- **Event Trigger**: A timer event updates every second during the final stage.
- **Code Example**:
  ```javascript
  countdownInterval = setInterval(() => {
      timeLeft--;
      document.getElementById("timer").innerText = `Time Left: ${timeLeft}s`;
      if (timeLeft <= 0) {
          clearInterval(countdownInterval);
          showResult("Time's up! You failed to catch the agent.");
      }
  }, 1000);
  ```

## Benefits of Using Closures
- Closures provided modular state management for various dynamic functionalities.
- **Example**: Encapsulating step calculations in the `moveMarker` function:
  ```javascript
  function moveMarker(marker, targetLatLng, speed, callback) {
      const distance = map.distance(marker.getLatLng(), targetLatLng);
      const steps = Math.ceil(distance / stepSize);
      const latStep = (targetLatLng.lat - marker.getLatLng().lat) / steps;
      const lngStep = (targetLatLng.lng - marker.getLatLng().lng) / steps;

      let currentStep = 0;
      const interval = setInterval(() => {
          if (currentStep >= steps) {
              clearInterval(interval);
              callback();
          } else {
              marker.setLatLng([
                  marker.getLatLng().lat + latStep,
                  marker.getLatLng().lng + lngStep
              ]);
              currentStep++;
          }
      }, speed / steps);
  }
  ```
- **Benefits**:
  - Simplified complex logic by maintaining relevant state variables.
  - Enabled reusable and testable code structures.

## AI Usage and Insights
- **AI Tools**: ChatGPT was extensively used for debugging, enhancing modularity, and optimizing Leaflet.js integrations.
- **Key Contributions**:
  - Suggested modular implementations for question loading and map interaction.
  - Provided efficient methods for event handling and routing optimizations.
- **URL of Interaction**: https://chatgpt.com/share/6755f1ce-32e0-800d-93ef-dfcd13625e6b

## DOM Interaction
- **Dynamic Updates**: Leveraged the DOM to provide real-time feedback and enhance interactivity.
- **Examples**:
  1. **Updating Question Text and Options**:
     ```javascript
     document.getElementById("question-text").innerText = questionData.text;
     const optionButtons = document.querySelectorAll(".option-button");
     optionButtons.forEach((button, index) => {
         button.innerText = options[index];
         button.onclick = () => checkAnswer(index, questionData.answer);
     });
     ```
  

  2. **Real-Time Distance Display**:
     ```javascript
     document.getElementById("distance-info").innerText = `Distance: ${Math.round(distance)} meters`;
     ```
  
  3. **Timer Display**:
     ```javascript
     document.getElementById("timer").innerText = `Time Left: ${timeLeft}s`;
     ```

## Game Overview

### Gameplay Stages

#### Trivia Stages
1. **Stage 1 - Country Identification**:
   Players answer general knowledge questions to deduce the agent's current country.
   - Three attempts are allowed per question.
   - Correct answers progress the game; incorrect answers reduce lives.

2. **Stage 2 - City Identification**:
   After identifying the country, players answer questions to determine the specific city within it.

3. **Stage 3 - Landmark Identification**:
   Players identify a famous landmark in the identified city to pinpoint the agent's location.

#### Final Action Stage
The final stage transitions from trivia to action:
   - Players navigate a map to locate and catch the fleeing agent within a buffer zone.
   - Movement mechanics and real-time distance tracking add dynamic gameplay.
   - A time limit of 60 seconds intensifies the challenge.

---

## Key Features

### Interactive Map
- **Map System**: Powered by Leaflet.js, it provides a visually rich and interactive interface for the final stage.
- **Real-time Updates**: Player and agent markers update dynamically as they move.

### Question Database
- Contains curated questions across three stages.
- Each country includes unique trivia to guide players through identification stages.

### Lives and Limitations
- Players have three lives to answer questions incorrectly across trivia stages.
- Incorrect answers trigger progressive hints in Stage 1.

### Dynamic Timer
- A countdown timer during the final stage pressures players to act swiftly.

---

## Libraries Used and Their Purpose

### Leaflet.js
- **Purpose**: Used for rendering interactive maps during the final action stage.
- **Features**:
  - Real-time location updates for player and agent markers.
  - Buffer zone visualization around the target coordinates.
  - Interactive click events for player movement.
- **Why Leaflet.js?**: Its lightweight nature and extensive plugin support make it ideal for dynamic map rendering and interaction.

### Leaflet Routing Machine
- **Purpose**: Facilitates routing calculations and navigation for the agent and player.
- **Features**:
  - Calculates nearest roads and movement paths for both characters.
  - Ensures realism by aligning movement to actual road networks.
- **Why Leaflet Routing Machine?**: Seamlessly integrates with Leaflet.js to enhance map interactivity and supports advanced routing needs.

### OpenStreetMap (OSM) Tiles
- **Purpose**: Provides high-quality geographic tiles as the base layer for the map.
- **Features**:
  - Global coverage and rich geographic details.
  - Free and open-source licensing.
- **Why OpenStreetMap?**: Offers an extensive and customizable map data source ideal for interactive applications.

### Vanilla JavaScript
- **Purpose**: Powers the core game logic, including event handling, question management, and user interactions.
- **Features**:
  - Dynamic DOM updates for question screens and game stages.
  - Timer implementation and real-time distance calculations.
- **Why Vanilla JavaScript?**: Ensures lightweight, efficient, and custom implementation of the game logic without additional dependencies.

---

## Implementation Details

### Event Handlers
1. **Question Selection (script.js)**:
   - Event: Clicking an answer button triggers validation.
   - Code Snippet:
     ```javascript
     button.onclick = () => checkAnswer(index, questionData.answer);
     ```
   - Purpose: Validates answers and transitions gameplay upon correctness.

2. **Map Interactions (final-stage.js)**:
   - Event: Players click on the map to direct their movement.
   - Code Snippet:
     ```javascript
     map.on('click', async (e) => {
         const targetLocation = await getNearestRoad(e.latlng);
         moveMarker(playerMarker, targetLocation, playerSpeed, checkProximity);
     });
     ```
   - Purpose: Enables strategic navigation in the final stage.

3. **Final Stage Timer (final-stage.js)**:
   - Event: Timer updates every second and ends the game upon expiry.
   - Code Snippet:
     ```javascript
     countdownInterval = setInterval(() => {
         timeLeft--;
         document.getElementById("timer").innerText = `Time Left: ${timeLeft}s`;
         if (timeLeft <= 0) {
             clearInterval(countdownInterval);
             showResult("Time's up! You failed to catch the agent.");
         }
     }, 1000);
     ```
   - Purpose: Maintains urgency and enhances immersion.

---

## Lessons Learned

### Benefits of Using Closures
- Encapsulated state management enabled seamless dice roll effects and dynamic interaction logic.
- Example:
   ```javascript
   function moveMarker(marker, targetLatLng, speed, callback) {
       const distance = map.distance(marker.getLatLng(), targetLatLng);
       const steps = Math.ceil(distance / stepSize);
       // Logic encapsulated to maintain step calculations.
   }
   ```

### AI Collaboration
- AI tools accelerated debugging and improved modular design.
- Example Contributions:
   - Suggested efficient Leaflet.js routing techniques.
   - Improved trivia stage modularity.

---

## Visual and Functional Highlights

### User Interface
- **Background Video**: A dynamic looping video enhances visual appeal on the start screen.
- **Responsive Design**: CSS ensures cross-platform compatibility and immersive gameplay.

### Gameplay Elements
- **Dynamic Feedback**: Distance to the agent is updated in real-time during the final stage.
- **Animations**: Visual feedback for correct/incorrect answers engages players.

---

## Conclusion
Catch the Agent delivers a blend of education, strategy, and real-time action. By combining trivia mechanics with an engaging final stage, the game creates a unique experience that challenges players' knowledge and reflexes. Future iterations may introduce more stages or expand trivia categories to further enhance replayability.
