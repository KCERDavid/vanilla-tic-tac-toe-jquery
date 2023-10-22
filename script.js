$(document).ready(function() {

    const resetBtn = $(".btn-reset");
    const newGameBtn = $(".btn-new-game");
    const modalBtn = $(".modal-content button");
    const cells = $(".grid-square");
    const turnText = $(".grid-square-turn");
    const modal = $(".modal");
    const modalText = $(".modal").find("p");
    const cellItem = cells.find("span");
    const playerOneStats = $(".player-1-stats");
    const playerTwoStats = $(".player-2-stats");

    let isGameStart = true;
    let currentPlayer = "X";
    let playerOneWins = 0;
    let playerTwoWins = 0;
    let draw = 0;


    // dropdown
    $('.btn-action').click(function(){
        $(this).next(".menu-options").toggleClass('hidden');
        $('.btn-action').toggleClass('border');
    }
    );

    // click outside of dropdown
    $(document).click(function(event) {
        if (!$(event.target).closest(".grid-square-menu").length) {
            $(".menu-options").addClass('hidden');
            $('.btn-action').removeClass('border');
        }
    });




    // functions

    function checkIfWin(){
        const winPatterns = [
            [0,1,2],[3,4,5],[6,7,8], //horizontal
            [0,3,6],[1,4,7],[2,5,8], //vertical
            [0,4,8],[2,4,6]          //diagonal
        ];

        for (const pattern of winPatterns){
            const [a, b, c] = pattern;

            if (cells.eq(a).find("span").text() && cells.eq(a).find("span").text() === cells.eq(b).find("span").text() && cells.eq(a).find("span").text() === cells.eq(c).find("span").text()){
                isGameStart = false;
                cells.eq(a).addClass("winner");
                cells.eq(b).addClass("winner");
                cells.eq(c).addClass("winner");
                modal.toggleClass("hidden");
                if (currentPlayer === "X"){
                    modalText.text("Player X wins!")
                    playerOneWins++;
                    updateStats();
                    return;
                }
                else{
                    modalText.text("Player O wins!")
                    playerTwoWins++;
                    playerTwoStats.text(playerTwoWins + " wins");
                    updateStats();
                }
            }
        }
    }


    function handleCellClick(){

        let cellItem = $(this).find("span");

        if (!isGameStart || cellItem.text() !== ""){
            return;
        }

        if (currentPlayer === "X"){
            cellItem.text("close")
            cellItem.removeClass('yellow blue').addClass('blue');

            turnText.find("span").removeClass('blue yellow').addClass('yellow').text("circle");
            turnText.find("div").removeClass('blue yellow').addClass('yellow').text("Player 2 Turn.");
        }
        else{
            cellItem.text("circle");
            cellItem.removeClass('yellow blue').addClass('yellow');
            
            turnText.find("span").removeClass('yellow blue').addClass('blue').text("close");
            turnText.find("div").removeClass('yellow blue').addClass('blue').text("Player 1 Turn.");
        }
        checkIfWin();
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        
        if (isFilled() && isGameStart) {
            console.log("draw");
            draw++;
            updateStats();
            modal.toggleClass("hidden");
            modalText.text("It's a Draw!");
        }
    }

    function updateStats(){
        playerOneStats.text(playerOneWins + " wins");
        playerTwoStats.text(playerTwoWins + " wins");
        $('.player-ties').text(draw);
    }


    function newGame(){
        cellItem.empty();
        cells.removeClass("winner");
        currentPlayer = "X";
        isGameStart = true;
        modal.addClass("hidden");
        turnText.find("span").removeClass('yellow blue').addClass('blue').text("close");
        turnText.find("div").removeClass('yellow blue').addClass('blue').text("Player 1 Turn.");
        return;
    }

    function resetGame(){
        newGame();
        playerOneWins = 0;
        playerTwoWins = 0;
        draw = 0;
        updateStats();
    }

    function isFilled() {
        const allSpans = $(".grid-square[data-id='data-cell'] span");
        return allSpans.toArray().every(function(span) {
            return $(span).text().trim() !== "";
        });
    }



    cells.on("click", handleCellClick);
    modalBtn.on("click", newGame);
    newGameBtn.on("click", newGame);
    resetBtn.on("click", resetGame);
});