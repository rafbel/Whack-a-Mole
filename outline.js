/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function()
{
    //$('body').addClass("cursorDown");
    
    //Plays music on load:
    var music = new Audio('audio/Mii Channel Music.mp3');
    playMusic();
    
    var score = 0;
    $("#score").text("Score: " + score);
    var timer = 60;
    $("#timer").text("Timer: " + timer);
    var whackImages = [];
    var moleStateMap = [];
    
    var recentlyWhacked = -1;
    
    preloadMoles();
    displayMoles();

    window.setInterval(function()
    {
      if (timer > 0)
      {
        raiseMole();
        updateTimer();
      } 
      if (timer === 0)
          resetMoles();
      
    }, 1000);

    function preloadMoles() 
    {
        //Reads the 3 states of whack mole images: in hole, out of hole, whacked

        var imageObject = '<img src = "images/moleInHole.gif">';

        whackImages.push(imageObject);
        
        imageObject = '<img src = "images/moleOutHole.gif">';

        whackImages.push(imageObject); 
        
        imageObject = '<img src = "images/moleHurt.gif">';

        whackImages.push(imageObject); 
        
        for (var counter = 0; counter < 12; counter++)
            moleStateMap.push(false);
        
    }
    
    function displayMoles()
    {
        $("#whackTable tbody").empty();
        for (var counter = 0; counter < 12; counter++)
        {
            if (counter%4 === 0)
            {
                
                if (counter !== 0)
                    $("#whackTable tbody").append("</tr>");
                $("#whackTable tbody").append("<tr>");
            }
            if (moleStateMap[counter])
                $("#whackTable tbody").append("<td id='" +counter + "'>" + whackImages[1] + "</td>");
            else
                 $("#whackTable tbody").append("<td id='" +counter + "'>" + whackImages[0] + "</td>");
        }
        $("#whackTable tbody").append("</tr>");
    }
    
    function raiseMole()
    {
        var repetitionCounter = 0;
        var randomNumber = Math.floor((Math.random() * 12));
        while (moleStateMap[randomNumber] === true && randomNumber !== recentlyWhacked)
        {
           randomNumber = Math.floor((Math.random() * 12)); 
           repetitionCounter++;
           if (repetitionCounter === 5)
               break;
           
        }
        moleStateMap[randomNumber] = true;
        displayMoles();
    }
    
    function updateTimer()
    {
        timer--;
        $("#timer").text("Timer: " + timer);
        
    }
    
    $("#whackDiv").on("click","td",function()
    {
        var location = $(this).attr('id');
        if (moleStateMap[location])
        {
            recentlyWacked = location;
            moleStateMap[location] = false;
            displayMoles();
            updateScore();
        }
        
    });
    
    function updateScore()
    {
        score += 10;
        $("#score").text("Score: " + score);
    }
    
    function playMusic()
    {
        //Plays music:
        music.play();
    }
    
    function resetMoles()
    {
        for (var counter = 0; counter < 12; counter++)
            moleStateMap[counter] = false;
        displayMoles();
        recentlyWhacked = -1;
        music.pause();
    }
    
});

