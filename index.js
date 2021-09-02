//création d'un tableau//
tableau = [];
// condition comprise entre 3 et 50 caractère pour l'input //
async function station() {

    let station = document.getElementById('station').value;
    if (station.length < 3) {
        document.getElementById("alert").innerHTML = "Merci de saisir au moins 3 caractères";

        return false;
    }

  /*  requête avec la méthode fetch effectué afin de réccuperer les données depuis
  l api via l url ci dessous avec la variable station
  */
    console.log(station);
    fetch(`https://opendata.lillemetropole.fr/api/records/1.0/search/?dataset=vlille-realtime&q=${station}&rows=10&facet=libelle&facet=nom&facet=commune&facet=etat&facet=nbvelosdispo&facet=nbplacesdispo`)
        .then(function (response) {
            if (response.ok) {

                response.json().then(
                    function (data) {
                        document.getElementById("tableau").innerHTML = "";
                        tab(data);
                    }
                )
            } else {
                document.getElementById("alert").innerHTML = "« Une erreur est survenue. Merci de réessayer ultérieurement.";
                return false;
            }
        })
}

function tab(data) {
    console.log(data);
    var rows = data['records'];
    console.log(rows);
    if (rows["length"] == 0) {
        console.log("error");
        document.getElementById("alert").innerHTML = " Désolé, nous n’avons trouvé aucun résultat correspondant à votre recherche ";

        return false;
    }
    // crétaion du tableau avec l insersion des données de l api //
    for (let i = 0; i < 9;) {
        TR = document.createElement("tr");
        TD1 = document.createElement("td");
        TXT1 = document.createTextNode(data['records'][i]['fields']['commune']);
        TD1.appendChild(TXT1);
        TD2 = document.createElement("td");
        TXT2 = document.createTextNode(data['records'][i]['fields']['nom']);
        TD2.appendChild(TXT2);

        if (data['records'][i]['fields']['etat'] === "EN SERVICE") {
            enservice = "Oui";
        } else {
            enservice = "Non";
        }

        TD3 = document.createElement("td");
        TXT3 = document.createTextNode(enservice);
        TD3.appendChild(TXT3);
        if (enservice === "Oui") {
            TD3.style.color = "green";
        } else {
            TD3.style.color = "red";
        }
        TD4 = document.createElement("td");
        var color1 = data['records'][i]['fields']['nbvelosdispo'];
        TXT4 = document.createTextNode(data['records'][i]['fields']['nbvelosdispo']);
        TD4.appendChild(TXT4);
        TD5 = document.createElement("td");
        var color2 = data['records'][i]['fields']['nbplacesdispo'];
        TXT5 = document.createTextNode(data['records'][i]['fields']['nbplacesdispo']);
        TD5.appendChild(TXT5);
        if (color2 === 0) {
            TD5.style.color = "red";
        } else {
            TD5.style.color = "black";
        }
        if (color1 === 0) {
            TD4.style.color = "red";
        } else {
            TD4.style.color = "black";
        }
        TR.appendChild(TD1);
        TR.appendChild(TD2);
        TR.appendChild(TD3);
        TR.appendChild(TD4);
        TR.appendChild(TD5);

        document.getElementById("alert").innerHTML = "Fin des résultats ";
        document.getElementById('tableau').appendChild(TR);
        i++

    }
}
