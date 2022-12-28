let position = 0
let position2 = 0
let positionOiseauxH = -1
let positionOiseauxV = -1
let periode
let positionfinal = 50
let img = Array()
let conteur = 0
let conteur2 = 1000
let impactI = 0
let impactF = 0
let impact = false
let testPosition = [false, false, false]


function roulage_page(){
    position -=12
    document.getElementById('box-jeu-center').style.backgroundPositionX = position + 'px'
    position2 -=3
    document.getElementById('cieux').style.backgroundPositionX = position2 + 'px'   
    if (position <= -9250) {
        clearInterval(periode)
        document.getElementById('mouvement').removeEventListener('keypress', mouvement, true)
        finale_animation()
    }
}

function finale_animation(){
    let periode2 = setInterval(function (){
        document.getElementById('oiseaux').style.paddingLeft = `${positionfinal}px`
        positionfinal += 10
        if (positionfinal >= 400){
            clearInterval(periode2)
            document.getElementById('oiseaux').style.display = 'none'
            let larger = document.body.clientWidth
            larger = (larger/2 - 250) 
            document.getElementById('victoire').style.left = `${larger}px`
            document.getElementById('victoire').style.display = 'block'
        }
    }, 100)
}

function declancher_background (){
    document.getElementById('numero').innerHTML = ''
    document.getElementById('oiseaux').src = '../imagem/passaro1_pronto.png'
    document.getElementById('mouvement').addEventListener('keypress', mouvement, true)
    periode = setInterval(roulage_page, 100)
}

function info_in (){
    document.getElementById('info').innerHTML = ''
    let paragraphe = "<p class='titulo'> Règles </p>"
    paragraphe += "<ul class='premier'><li>Mouvement</li><ul class='deuxieme'><li> z - monter</li><li> s - descendre</li> <li> q - gauche</li> <li> d - droite</li> </ul></ul>"
    setTimeout(() => document.getElementById('info').innerHTML = paragraphe, 2000)
}

function info_out(){
    document.getElementById('info').innerHTML = '&nbsp&nbspI&nbsp&nbsp'
}

function demarrer () {
    document.getElementById('jouer').style.display = 'none'
    document.getElementById('info').style.display = 'none'
    document.getElementById('numero').innerHTML = '3'
    document.getElementById('cieux').style.backgroundImage = 'url("../fases/nuvens.png")'
    document.getElementById('box-jeu-center').style.backgroundImage = 'url("../fases/fase1.png")'
    document.getElementById('box-jeu-center').style.backgroundSize = '10000px 360px'
    setTimeout(function () {
        document.getElementById('numero').innerHTML = '2'
        setTimeout(function(){
            document.getElementById('numero').innerHTML = '1'
            setTimeout(declancher_background, 1000)
            setTimeout (setInterval ( obstacle, 2000) , 1000)
        }, 1000)
    }, 1000)
}


function mouvement (event) {
    switch(event.key){
        case 'z':
            if (positionOiseauxV === 0){
                document.getElementById('oiseaux').style.top = '-240px'
                positionOiseauxV = -1
            } else if (positionOiseauxV === 1){
                document.getElementById('oiseaux').style.top = '-160px'
                positionOiseauxV = 0
            }
            break;
        case 's':
            if (positionOiseauxV === -1){
                document.getElementById('oiseaux').style.top = '-160px'
                positionOiseauxV = 0
            } else if (positionOiseauxV === 0){
                document.getElementById('oiseaux').style.top = '-80px'
                positionOiseauxV = 1
            }
            break;
        case 'q':
            if (positionOiseauxH === 0){
                positionfinal = 50
                document.getElementById('oiseaux').style.left = '50px'
                positionOiseauxH = -1
            } else if (positionOiseauxH === 1){
                positionfinal = 100
                document.getElementById('oiseaux').style.left = '100px'
                positionOiseauxH = 0
            } else if (positionOiseauxH === 2){
                positionfinal = 150
                document.getElementById('oiseaux').style.left = '150px'
                positionOiseauxH = 1
            } else if (positionOiseauxH === 3){
                positionfinal = 200
                document.getElementById('oiseaux').style.left = '200px'
                positionOiseauxH = 2
            }
            break;
        case 'd':
            if (positionOiseauxH === -1){
                positionfinal = 100
                document.getElementById('oiseaux').style.left = '100px'
                positionOiseauxH = 0
            } else if (positionOiseauxH === 0){
                positionfinal = 150
                document.getElementById('oiseaux').style.left = '150px'
                positionOiseauxH = 1
            } else if (positionOiseauxH === 1){
                positionfinal = 200
                document.getElementById('oiseaux').style.left = '200px'
                positionOiseauxH = 2
            } else if (positionOiseauxH === 2){
                positionfinal = 250
                document.getElementById ('oiseaux').style.left = '250px'
                positionOiseauxH = 3
            }
            break;
    }
}

function obstacle(){
    img[conteur] = document.createElement('img')
    let posV_obj = ((Math.floor(Math.random()*100))%3)-1
    console.log(posV_obj)
    let parent = document.getElementsByClassName('reference_obstacle')[posV_obj + 1]
    testPosition[posV_obj] = true
    console.log(parent)
    img[conteur].style.position = 'relative'
    img[conteur].style.float = 'right'
    img[conteur].style.right = '-20px'
    img[conteur].style.zIndex = conteur2 -1
    img[conteur].setAttribute('id', conteur)
    img[conteur].src = random_img(posV_obj)
    if (!testPosition){
        parent.appendChild(img[conteur])
    } else {
        parent.insertBefore(img[conteur], parent.children[0])
    }
    mouve_obstacle( -20 , conteur, posV_obj)
    conteur++
    conteur2--
}

function pos_random(pos){
    switch (pos){
        case -1:
            return '0px'
        case 0:
            return '80px'
        case 1:
            return '160px'
    }
}

function random_img(pos){
    if (pos == 1){
        let rdimg = Math.floor(Math.random()*100)%2
        switch (rdimg){
            case 0:
                return '../imagem/camion_pret.png'
            case 1:
                return '../imagem/voiture_pret.png'
        }
    } else {
        let rdimg = Math.floor(Math.random()*100)%3
        switch (rdimg){
            case 0:
                return '../imagem/aereo-civile-pret.png'
            case 1:
                return '../imagem/helicopter_pret.png'
            case 2:
                return '../imagem/rocket-297573_pret.png'
         }
    }    
}

function mouve_obstacle(conteur_periode, c, pos){
    periode_obstacle = setInterval(function (){ 
        document.getElementById(c).style.right = conteur_periode + 'px'
        conteur_periode +=15
        comparaison(positionOiseauxH, positionOiseauxV, pos)
        if ((impactF > conteur_periode && conteur_periode > impactI) && impact == true){
            clearInterval(periode)
            clearInterval(periode_obstacle)
        }else if (conteur_periode >= 700){
            clearInterval(periode_obstacle)
        }
    }, 100)
}

function comparaison (H, V, pos){
    switch (pos){
        case -1:
            if (V == -1){
                verifier_H(H)
            }else{
                impact = false
            }
            break;
        case 0:
            if (V == 0){
                verifier_H(H)
            }else{
                impact = false
            }
            break;
        case 1:
            if (V == 1){
                verifier_H(H)
            }else{
                impact = false
            }
            break;
        default:
            impact = false
            break;
    }   

}

function verifier_H(H){
    switch (H){
        case -1:
            impactI = 500
            impactF = 670
            impact = true
            break;
        case 0:
            impactI = 450
            impactF = 620
            impact = true
            break;
        case 1:
            impactI = 400
            impactF = 570
            impact = true
            break;
        case 2:
            impactI = 350
            impactF = 570
            impact = true
            break;
        case 3:
            impactI = 300
            impactF = 470
            impact = true
            break;
        default:
            impact = false
            break;
    }
}