

function login(){

    const user=document.getElementById("username").value.trim();
    const pass=document.getElementById("password").value.trim();
    const age=document.getElementById("age").value.trim();
    const level=document.getElementById("level").value;
    const agree=document.getElementById("agree").checked;

    if(!user||!pass||!age){
        alert("Fill all fields");
        return;
    }

    if(!agree){
        alert("Accept rules first");
        return;
    }

    localStorage.setItem("name",user);
    localStorage.setItem("age",age);
    localStorage.setItem("level",level);

    location.href="game.html";
}




if(document.getElementById("board")){

    const level=localStorage.getItem("level");
    const board=document.getElementById("board");
    const movesEl=document.getElementById("moves");
    const timeEl=document.getElementById("time");

    let icons;

    if(level==="Easy"){
        icons=["🍎","🍌","🍇","🍉",
               "🍎","🍌","🍇","🍉"];
    }
    else if(level==="Medium"){
        icons=["🍎","🍌","🍇","🍉","🍒","🍍",
               "🍎","🍌","🍇","🍉","🍒","🍍"];
    }
    else{
        icons=["🍎","🍌","🍇","🍉","🍒","🍍","🥝","🍑",
               "🍎","🍌","🍇","🍉","🍒","🍍","🥝","🍑"];
    }

    icons.sort(()=>0.5-Math.random());

    let first=null,second=null,moves=0,matched=0,timer=0;

    setInterval(()=>{
        timer++;
        timeEl.textContent=timer;
    },1000);

    icons.forEach(icon=>{

        const card=document.createElement("div");
        card.className="card";

        card.onclick=()=>{

            if(card.textContent!==""||second) return;

            card.textContent=icon;

            if(!first){
                first=card;
                return;
            }

            second=card;
            moves++;
            movesEl.textContent=moves;

            if(first.textContent===second.textContent){
                matched++;
                first=null;
                second=null;

                if(matched===icons.length/2){
                    localStorage.setItem("moves",moves);
                    localStorage.setItem("time",timer);
                    setTimeout(()=>{
                        location.href="score.html";
                    },600);
                }
            }
            else{
                setTimeout(()=>{
                    first.textContent="";
                    second.textContent="";
                    first=null;
                    second=null;
                },700);
            }
        };

        board.appendChild(card);
    });
}


if(document.getElementById("playerName")){

    document.getElementById("playerName").textContent=
        localStorage.getItem("name");

    document.getElementById("playerAge").textContent=
        localStorage.getItem("age");

    document.getElementById("scoreMoves").textContent=
        localStorage.getItem("moves");

    document.getElementById("scoreTime").textContent=
        localStorage.getItem("time");

    const t=parseInt(localStorage.getItem("time"));

    document.getElementById("performanceMsg").textContent=
        t<20?"🔥Excellent!"
        :t<40?"👏Great!"
        :"😊Keep Practicing!";

    const quotes=[
        "Fantastic memory!",
        "You're improving!",
        "Great concentration!",
        "Well played!",
        "Keep rocking!"
    ];

    document.getElementById("quote").textContent=
        quotes[Math.floor(Math.random()*quotes.length)];
}