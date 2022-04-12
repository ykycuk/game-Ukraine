import characterData from './data.js'
import Character from './Character.js'

let monstersArray = ["orks", "gondon", "mordor", "putin"]
let isWaiting = false

function getNewMonster() {
    const nextMonsterData = characterData[monstersArray.shift()]
    return nextMonsterData ? new Character(nextMonsterData) : {}
}

function attack() {
    if(!isWaiting){
        zelensky.setDiceHtml()
        monster.setDiceHtml()
        zelensky.takeDamage(monster.currentDiceScore)
        monster.takeDamage(zelensky.currentDiceScore)
        render()
        
        if(zelensky.dead){
            endGame()
        }
        else if(monster.dead){
            isWaiting = true
            if(monstersArray.length > 0){
                setTimeout(()=>{
                    monster = getNewMonster()
                    render()
                    isWaiting = false
                },1500)
            }
            else{
                endGame()
            }
        }    
    }
}

function endGame() {
    isWaiting = true
    const endMessage = zelensky.health === 0 && zelensky.health === 0 ?
        "No victors - all creatures are dead" :
        zelensky.health > 0 ? "Ukraine won" :
            "The monsters are Victorious"

    const endEmoji = zelensky.health > 0 ? "images/zelensky&putin.jpg" : "☠️"
        setTimeout(()=>{
            document.body.innerHTML = `
                <div class="end-game">
                    <h2>Perfect🇺🇦</h2>
                    <h3>${endMessage}</h3>
                    <img class="zelensky"  src="${endEmoji}">
                </div>
                `
        }, 1500)
}

document.getElementById("attack-button").addEventListener('click', attack)

function render() {
    document.getElementById('hero').innerHTML = zelensky.getCharacterHtml()
    document.getElementById('monster').innerHTML = monster.getCharacterHtml()
}

const zelensky = new Character(characterData.zelensky)
let monster = getNewMonster()
render()