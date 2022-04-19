
var days = [];
var activeDay = 0;

function LoadXML(){
    d3.xml("images/test.svg")
        .then(data => {
            console.log("read svg");
            d3.select("#svg-container").node().append(data.documentElement);
            SetUpFormis();
        });
}

function SetUpFormis(){

    d3.select("#Layer_8").selectAll("g").nodes().forEach(n => {
        if (n.hasAttribute("id")){
            if (n.getAttribute("id").startsWith("Formi")){
                days.push(n);
                d3.select(n).style("display", "none");
            }
        }
    });
    
    NextFormi();
    d3.select("#Layer_8")
        .on("click", function(){
            DayChange(true);
            NextFormi();
            });
    console.log(days);
}
function NextFormi(){
    for (var i = 0; i < days.length; i ++){
        if (i == activeDay){
                    d3.select(days[i]).style("display", "block");
                    console.log("active");
                }
        else{
                    d3.select(days[i]).style("display", "none");
                    console.log("inactive");
                }
    }
    d3.select("#engagementText").text(
        ((activeDay > 1 && activeDay < days.length - 1) ? ((activeDay + 1) + " day streak! ") : ("")) + affirmations[activeDay]);
}

function InputCheck(event){
    var x = event.key;
    if (event.key == "ArrowRight"){

        DayChange(true);
        NextFormi();
    }
    else if (event.key == "ArrowLeft")
    {
        DayChange(false);
        NextFormi();
        
    }
}

function DayChange(add){
    if (add){
        activeDay ++;
        if (activeDay > (days.length - 1))
            activeDay = 0;
    } else {
        activeDay --;
        if (activeDay < 0)
            activeDay = days.length - 1;
    }
}

var affirmations = [
"Hi, I'm Formi!",
"It's good to see you again!",
"You're doing great!",
"Keep up the good work!",

"That's the ticket!",
"You're making great strides!",
"Wow! You rock!",
"I believe in you!",

"What an awesome job!",
"Look at you!",
"Be proud of yourself!",
"You can do this!",

"Amazing!",
"Time to party!",
"Ok, rock star! I see you!",
"Are you a super hero?",

"I knew you could do it!",
"You are so cool!",
"You lost your streak, but I know you can get it back!"
]

document.addEventListener('keyup', InputCheck);
LoadXML();