# GeoQuest: Mysterious Map Game

GeoQuest is an interactive web-based geographical game where users complete hidden tasks on a map by solving geographical clues. Developed using HTML, CSS, and JavaScript, the game leverages the Leaflet.js library for map interactions. Players are directed to a specific coordinate to complete the task and compete for the highest score.

## Purpose
The purpose of this game is to reinforce knowledge of HTML, CSS, and JavaScript while gaining experience in developing a web application integrated with GIS (Geographical Information Systems).

## Technologies Used
HTML, CSS, JavaScript: Basic frontend development.
Leaflet.js: Used as the mapping library to provide interactive map elements for user interaction.
OpenStreetMap: Utilized as the base layer for map data.
Features
Task Completion on Map: Players are directed to a specific location and try to complete hidden tasks on the map.
Hidden Object: A special icon (treasure chest) is hidden on the map. When the player approaches the correct coordinates, the icon becomes visible.
Distance Check: The player’s clicked location is checked for proximity to the hidden object; if close enough, the task is marked as complete.
Dynamic Hint System: Throughout the game, players receive feedback on their proximity to the target location ("Task Complete!" or "Move Closer!").
Installation
To run the project locally, follow these steps:

## Project Structure
plaintext
GeoQuest/
├── index.html       # Main HTML file <br>
├── style.css        # Stylesheet <br>
├── app.js           # JavaScript file <br>
└── icons        # Treasure icon

## Usage
Start the Task: When the game loads, the player is directed to complete a task at a starting point.
Map Interaction: When the player clicks anywhere on the map, they receive feedback on their proximity to the hidden object.
Complete the Task: If the player clicks close enough to the hidden object, the task is completed, and a success message is displayed.
