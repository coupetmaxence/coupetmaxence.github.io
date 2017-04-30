var flag = 0;
var tableau_donnees = [];
var begin = new Date().getTime();
var debut = new Date().getTime();
var fin = new Date().getTime();
var dataDump = [];

function initialisation_temps() {
    if (flag == 0) {
        begin = new Date().getTime();
        flag = 1;
    } else {
        fin = new Date().getTime();
        begin = begin + fin - debut;
    }
}

function debut_mesure() {
    window.addEventListener("devicemotion", processmotiondisp, true);
    window.addEventListener("deviceorientation", process, true);
    document.getElementById("lancer_mesure").disabled = true;
    document.getElementById("bouton_activation").disabled = false;
}


function ActivationMesure() {
    if (document.getElementById('alpha').innerHTML == "") {
        alert("Votre appareil ne possède pas d'accéléromètre ni de gyroscope, impossible d'afficher des données");
    } else {
        initialisation_temps();
        window.addEventListener("devicemotion", processmotion, true);
        document.getElementById("bouton_activation").disabled = true;
        document.getElementById("bouton_arret").disabled = false;
    }

}

function Remise_a_zero() {
    window.removeEventListener("devicemotion", processmotion, true);
    window.removeEventListener("deviceorientation", process, true);
    window.removeEventListener("devicemotion", processmotiondisp, true);
    document.getElementById("bouton_arret").disabled = true;
    document.getElementById("bouton_activation").disabled = true;
    document.getElementById("lancer_mesure").disabled = false;
    document.getElementById("bouton_send").disabled = true;
    flag = 0;
    fin = new Date().getTime();
    document.getElementById('temps').innerHTML = "<h4>Temps : " + 0 + "</h4>";
    document.getElementById("bouton_raz").disabled = true;



}

function ArretMesure() {
    flag++;
    debut = new Date().getTime();
    window.removeEventListener("devicemotion", processmotion, true);
    window.removeEventListener("devicemotion", process, true);
    window.removeEventListener("devicemotion", processmotiondisp, true);
    document.getElementById("lancer_mesure").disabled = true;
    document.getElementById("bouton_activation").disabled = false;
    document.getElementById("bouton_send").style.display = "";
    document.getElementById("bouton_send").disabled = false;
    document.getElementById("bouton_arret").disabled = true;
    document.getElementById("bouton_raz").disabled = false;
}

function SendData() {
    var ar = new Object();
    ar.action = document.getElementById("type_mesure").value;
    ar.phone = $("form input[type='radio']:checked").val();
    ar.date = new Date();
    ar.measures = dataDump;

    $.post("http://ibo.labs.esilv.fr/~webservice/api/add ", {
        username: "groupe56",
        password: "RmjL431",
        database: "groupe56",
        collection: "dataset",
        data: JSON.stringify(ar)
    });
    alert("Données envoyées");
}


function process(event) {
    var alpha = event.alpha;
    var beta = event.beta;
    var gamma = event.gamma;

    // Modification de la section orientation dans la page HTML
    document.getElementById('alpha').innerHTML = alpha;
    document.getElementById('beta').innerHTML = beta;
    document.getElementById('gamma').innerHTML = gamma;
}

function processmotiondisp(event) {
    var x = event.accelerationIncludingGravity.x;
    var y = event.accelerationIncludingGravity.y;
    var z = event.accelerationIncludingGravity.z;

    tableau_donnees.push([x, y, z]);

    // Modification de la section acceleration dans la page HTML
    document.getElementById('x').innerHTML = x;
    document.getElementById('y').innerHTML = y;
    document.getElementById('z').innerHTML = z;
}


function processmotion(event) {
    var x = event.accelerationIncludingGravity.x;
    var y = event.accelerationIncludingGravity.y;
    var z = event.accelerationIncludingGravity.z;
    var end = new Date();
    var offset = end - begin; // donne le nombre de milliseconds entre les deux dates.
    tableau_donnees.push([offset, x, y, z]);
    dataDump.push([offset, x, y, z]);

    // Modification de la section acceleration dans la page HTML
    document.getElementById('x').innerHTML = x;
    document.getElementById('y').innerHTML = y;
    document.getElementById('z').innerHTML = z;
    var secondes = offset / 1000;
    document.getElementById('temps').innerHTML = "<h4>Temps : " + secondes.toString().slice(0, 4) + " secondes</h4>";
}