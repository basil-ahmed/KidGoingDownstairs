# [KidGoingDownstairs](https://k-g-d.glitch.me/)
## New York University Abu Dhabi

### Final Project: Kid's Going Downstairs

#### Description:
- **K**id’s **G**oing **D**ownstairs is an interactive game for one player, where a character, controlled by the user, has to run from the descending layer of spikes above it.
- The layer of huge spikes follows the character, while they try to flee by jumping on a bunch of platforms.
- It’s not this simple though! Some platforms are harmful to the player. If the player jumps on those platforms, the character’s health decreases by either 1 or 2 out of 10 (depending on the harmful platform)! Hence, they have to avoid landing on those platforms at all costs.
- The character can be moved in any direction horizontally, while it is falling down.
- If the player is too slow and touches the layer of spikes above the character, the character dies.
- KGD is a score-based game where the player has to accomplish as much score as they can.

#### Features:
- KGD has a game frame where the player controls their character, the platforms continuously move upwards.
- A scoreboard on the top-left side of the game frame keeps the score and their health.
- The game speeds up gradually.
- The character that is controlled by the player moves in either right or left direction.
- The character cannot leave the game frame (in the left or right direction).
- If the player falls straight to the ground, It’s game over!
- There will be platforms for the player to land on. Some platforms will be Cement (for the player to land on safely), others will be traps such as Spikes, Fire, Ice, etc. Some platforms, made of gas, will be hollow and if the character goes through it, it will just pass through.
- The Player’s health increases by 1 when it lands on the cemented platform and it decreases by 2 if it lands on spikes, and 1 if it lands on fire.
- On the top of the frame is a trap, specifically, a layer of spikes, that will reduce the character’s health by 2 if it touches it, and the player will fall instead of getting stuck there.
- Sound effects for landing on the platform, dying, background music, etc.
- If the player dies, they will get an option to restart the game by clicking the mouse.

<img width="573" alt="Screen Shot 2022-02-28 at 11 21 13 PM" src="https://user-images.githubusercontent.com/90772853/156045504-5d794bc1-6c27-40b1-8554-c31f13046773.png">
<img width="485" alt="Screen Shot 2022-02-28 at 11 21 22 PM" src="https://user-images.githubusercontent.com/90772853/156045521-b753ea8f-6b0c-469b-9840-1750e41356fc.png">
<img width="592" alt="Screen Shot 2022-02-28 at 11 21 42 PM" src="https://user-images.githubusercontent.com/90772853/156045526-baf5725c-7465-43ac-a86f-05f6c736e1da.png">
<img width="572" alt="Screen Shot 2022-02-28 at 11 21 57 PM" src="https://user-images.githubusercontent.com/90772853/156045534-f23a936e-3b76-432f-9a40-46b09aea38c5.png">

#### Connected Aspect of the Game:
- I created a leaderboard where all the high scores will be stored and will be shown along with the name.

<img width="1440" alt="Screenshot 2022-12-15 at 9 21 43 PM" src="https://user-images.githubusercontent.com/90772853/207913757-84d1a57f-5681-4cd6-8ee7-dfcd41bbfbb4.png">


- This happens by asking the name as you start the website: 

<img width="453" alt="Screenshot 2022-12-15 at 9 16 28 PM" src="https://user-images.githubusercontent.com/90772853/207912441-defbb4dd-c8af-4a4e-9b9b-e3497883ac05.png">

- The score is stored everytime a game ends (the GAME OVER screen comes).
- It is stored by using a MongoDB cloud server where the JavaScript file is connected to a collection and the object containing name and score gets stored there.
- While retrieving the data, for the leaderboard, the data is sorted according to the score in descending order so the highest scores are on top:

  ```
    data.data.sort((a,b) => b.score - a.score)
  ```

#### Difficulties:
- Forming of the randomly placed Platforms and when they reach the top of the screen they disappear.
- Since I used Object Oriented Programming, a lot of the things were happening inside the classes and not outside which made making the game a 2-player game much harder than I thought.
- Different platforms having different functionalities was quite a difficult task to achieve.
- Connecting on MongoDB and transfer of information was very complicated, specially while hosting the website on glitch. However, I learned MongoDB from the start and also figured out what changes to make for glitch.
- Add the below line of code in your package.json:

  ``` 
  "engines": {
      "node": ">=16.0.0 <17.0.0"
    },
  ```

#### The Game Visuals:

<img width="1440" alt="Screenshot 2022-12-15 at 9 45 38 PM" src="https://user-images.githubusercontent.com/90772853/207919301-6347cbdf-41d7-4787-b3ab-6c4468d28945.png">
<img width="1440" alt="Screenshot 2022-12-15 at 9 46 13 PM" src="https://user-images.githubusercontent.com/90772853/207919555-bc6a5996-830d-4756-b463-0c1bf14d12df.png">
<img width="1440" alt="Screenshot 2022-12-15 at 9 45 51 PM" src="https://user-images.githubusercontent.com/90772853/207919595-eec236de-2911-4986-b15c-f711681094dd.png">

