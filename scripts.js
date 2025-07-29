const score1 = document.getElementById("score1");
const score2 = document.getElementById("score2");
const reset = document.getElementById("reset");
const choices = document.querySelectorAll(".item");
const audio = document.getElementById('bgAudio');
const muteBtn = document.getElementById('muteBtn');
const volumeSlider = document.getElementById('volumeSlider');

// Toggle mute
muteBtn.addEventListener('click', () => {
    audio.muted = !audio.muted;
    muteBtn.textContent = audio.muted ? '🔇' : '🔊';
});

// Volume control
volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value;
    audio.muted = audio.volume === 0;
    muteBtn.textContent = audio.muted ? '🔇' : '🔊';
});

function main(){

    let player1Turn = true
    let playerSymbol;
    turns = 1
    player1Score = 0
    player2Score = 0
    function choice(){
        choices.forEach(item => {
            item.addEventListener("click", event =>{
                const text = item.textContent.trim()
                
                if (text === "X" || text === "O"){
                    return;
                };


                if (turns % 2 == 0){
                    player1Turn = false
                    playerSymbol = "O"
                }
                else{
                    player1Turn = true
                    playerSymbol = "X"
                };
                
                if (playerSymbol === "O"){
                    event.target.style.color = "hsl(0, 100%, 55%)"
                }
                else{
                    event.target.style.color = "aqua"
                }
                event.target.textContent = playerSymbol
                turns++;
                checkWinner()
            });

        });
    };

    function checkWinner() {
        const winCombos = [
            [0, 1, 2], // top row
            [3, 4, 5], // middle row
            [6, 7, 8], // bottom row
            [0, 3, 6], // left column
            [1, 4, 7], // middle column
            [2, 5, 8], // right column
            [0, 4, 8], // diagonal
            [2, 4, 6], // diagonal
        ];

        winCombos.forEach(combo => {
            const [a, b, c] = combo;
            const valA = choices[a].textContent.trim();
            const valB = choices[b].textContent.trim();
            const valC = choices[c].textContent.trim();

            if (valA && valA === valB && valB === valC) {
                // Checks if someone has won the game
                if (player1Turn){
                    player1Score++;
                    score1.textContent = `Player 1 (X): ${player1Score}`
                }
                else{
                    player2Score++;
                    score2.textContent = `Player 2 (O): ${player2Score}`
                }

                choices.forEach(item => item.style.pointerEvents = "none");
            }
        });
    }

    function restartGame(){
        player1Turn = true
        turns = 1
        choices.forEach(item => {
            item.textContent = ""
            item.style.pointerEvents = "auto"
        });
    };

    return{choice,restartGame}
};


const Main = main();

Main.choice()


reset.onclick = function(){
    Main.restartGame()
    Main.choice()
}
