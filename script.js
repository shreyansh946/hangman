const word = document.getElementById('word');
const wrongletter = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('pop-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'shreyansh', 'india', 'wipro', 'google', 'interface', 'java'];

let selectworld = words[Math.floor(Math.random() * words.length)];

console.log(selectworld);

const correctletters = [];
let wrongletters = [];


function displayword() {

    word.innerHTML = `${selectworld.split('').map(lets => `<span class="letter"> 
    ${correctletters.includes(lets) ? lets : ''} </span>`).join('')}`;


    const innerworld = word.innerText.replace(/\n/g,'');
    console.log(word.innerText,innerworld);

    if(innerworld === selectworld)
    {
        finalMessage.innerText = 'Congrtulations! you won! ';
        if (popup) {
            popup.style.display = 'flex';
        }
    }
}


function updateWrongLetterEl()
{
    wrongletter.innerHTML = ` ${wrongletters.length > 0 ? 'p>Wrong</p>':''}
    ${wrongletters.map(letter => `<span>${letter}</span>`)}`;


    figureParts.forEach((part,index) =>{
        const error = wrongletters.length;

        if(index < error)
        {
            part.style.display = 'block';
        }
        else
        {
            part.style.display ='none';
        }
    });

    if(wrongletters.length === figureParts.length)
    {
        finalMessage.innerText ='you lost';
        
            popup.style.display ='flex';
    }
}

function showNotification()
{
        notification.classList.add('show');

        setTimeout(() => {

            notification.classList.remove('show');
        }, 2000);
}


window.addEventListener('keydown', e =>{

        const letter = e.key;
        if(selectworld.includes(letter))
        {
            if(!correctletters.includes(letter))
            {

                    correctletters.push(letter);
                    displayword();
            }
            else{
                showNotification(); 
            }
    }
    else{
        if(!wrongletters.includes(letter))
        {
            wrongletters.push(letter);
            console.log("wrongletetrs",wrongletters);

            updateWrongLetterEl();
        }
        else
        {
            showNotification();
        }
    }
} 
); 


playAgainBtn.addEventListener('click', () =>{
    correctletters.splice(0);
    wrongletters.splice(0);

    selectworld = words[Math.floor(Math.random() * words.length )];
    displayword();

    updateWrongLetterEl();
    popup.style.display = 'none';
})

displayword();