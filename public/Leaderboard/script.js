window.addEventListener('load',()=> {

    fetch('/getScore')
    .then(resp=> resp.json())
    .then(data => {
        document.getElementById('scoreboard').innerHTML = '';
        let list = document.getElementById('scores-list');
        console.log(data.data.sort((a,b) => b.score - a.score));
        let scores = data.data.sort((a,b) => b.score - a.score);
        for(let i=0;i<scores.length;i++) {
            // let string = data.data[i].name + " : " + data.data[i].score;
            let elt = document.createElement('li');
            let name = document.createElement('mark');
            let score = document.createElement('small');
            name.innerHTML = data.data[i].name;
            score.innerHTML = data.data[i].score;
            if (i>4) {
                elt.style.background = "#c24448";
                elt.style.borderRadius = "0 0 10px 10px";
                elt.style.boxShadow = "0 -2.5px 0 rgba(0, 0, 0, 0.12)";
            }
            elt.appendChild(name);
            elt.appendChild(score);
            document.getElementById('scores-list').appendChild(elt);
        }
    })

})