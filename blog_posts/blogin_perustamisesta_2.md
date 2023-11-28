# Hei, maailma! Osa 2

Haluaisin mainita tässä ensiksi, olen kirjoittanut ohjeet omaksi huvikseni, eivätkä ne ole täydelliset. Jos kuitenkin
teet perässä niin olisi kiva kuulla oliko ohjeista mitään apua, ja millaisia ongelmia tai haasteita tuli vastaan.

Tässä toisessa kirjoituksessani jatkan siitä, mihin ensimmäisessä jäin. Lataamme Node JavaScript-tulkin, jota
tailwindcss käyttää. Sitten katsomme miten `blog.py` -komentoa käytetään .md-tiedostojen muuttamiseksi HTML:ksi, sekä
miten RSS-syöte päivitetään käyttäen `blog.py` -scriptiä.

## Node

[Node.js](https://nodejs.org/en) JavaScript-tulkki on ladattavissa edellä olevasta linkistä. Asentaminen on todella
helppoa hiiren naksuttelua, enkä käy sitä tässä läpi enempää.

Node tarjoaa `npx` ja `npm` komennot joita voi käyttää Windowsin cmd.exe:stä ja Git BASH:stä. Ensin mainittua käytetään
erilaisien komentojen ajamiseen, joita [Npm](https://www.npmjs.com/) pakettivarastossa olevat paketit tarjoavat.
Myöhemmin mainittu `npm`-komennolla, taas asennetaan tästä pakettivarastosta kirjastoja sekä ohjelmiakin.

## Tailwind

Tailwind on CSS-kirjasto. Yksi monista. Mielestäni se helpottaa ja nopeuttaa sivujen muotoilua. Joku tykkää, toinen ei.

### Tailwindin käyttöönotto

!!! note "Huom."
    Blogi on olemassa oleva projekti. Alla oleva komento asentaa vain tailwindin, mutta ei tee asetustiedostoa.
    Katso täydet aloitusrimpsut uudelle projektille [tailwindcss](https://tailwindcss.com) sivulta.

Projektin juuressa, `blog`-hakemistossa kirjoita:

```bash
npm install tailwind
npx -w -i my_blog/templates/css/index.css -o html/css/styles.css
```

Tämä asentaa Tailwindin, sekä katsoo muutoksia tiedostoissa ja asetuksissa. Näiden perusteella se sitten tekee
yhden CSS-tiedoston, jossa on tarvittavat muotoilut.

Jee. Nyt Tailwind-muotoiluihin tehtyjen muutoksien pitäisi toimia. Olemme `Dockeria` vaille valmiina siitä, että sivujen
muotoilua ja sisältöä voisi ruveta rassaamaan omaan blogiin sopivaksi.

## Docker

`Docker` on kätevä vaihtoehto `XAMPP`:lle ja muille sen kaltaisille ohjelmille, jotka niputtavat web-palvelimen ynnä
tietokannan sekä muita tilpehöörejä. Dockerilla on helppo niputtaa kehitettävä web-sivu lataamalla web-palvelimen
sisältävä kontti omalle koneelle ja sijoittamalla web-sivut hakemistoon josta tämä palvelin sitten etsii 
`index.html`-tiedostoa. Tämän blogin tapauksessa vaadittu vaivan määrä oli kaksi riviä tekstiä `Dockerfile` tiedostoon,
ja yksi komento git-bashiin! Aika helppoa, jos minulta kysytään.

Periaatteessa `Node.js`-tulkkia tai Tailwindiä ei olisi edes tarvinnut asentaa. Ne olisi voinut yhtä hyvin sisällyttää
kehityskonttiin, johon tulisi lisäksi `Python`-tulkki ja tarvittavat kirjastot. Halusin kuitenkin asentaa ne omalle
koneelleni. Saatan lisätä myöhemmin GitHub repositoryyn `Dockerfile-dev`-tiedoston joka tekisi tämän. Nyt sitä ei
kuitenkaan ole.

### Dockerin asentaminen

`Dockerin` asentaminen voi olla hieman monimutkaisempaa kuin `Node.js`-ohjelman. Lataa 
[tästä linkistä](https://www.docker.com/) Docker Desktop, ja koeta asentaa se. Jos asennusohjelma ei sano mitään, ja
pystyt valitsemaan WSL2-perustaiset kontit, niin hyvä. Sinulla on virtualisointi päällä BIOSin asetuksista. Jos taas
et voi valita WSL2 pohjaisia kontteja niin sinun täytyy mennä BIOSin asetuksista kääntämään virtualisointi päälle. 
Asetuksen nimi vaihtelee ilmeisesti emolevyn ja prosessorivalmistajan mukaan. 
[Tässä](https://support.microsoft.com/fi-fi/windows/virtualisoinnin-ottaminen-k%C3%A4ytt%C3%B6%C3%B6n-windows-11-tietokoneissa-c5578302-6e43-4b4b-a449-8ced115f58e1)
on ohjeet muutaman valmistajan valmiskoneisiin. Jos ei onnistanut, niin koeta katsoa BIOS-asetuksisista virtualisointiin
liittyviä asetuksia, tai katso emolevyn ohjekirjaa.

Virtualisointituen päällekytkemisen jälkeen WSL2 pohjaisten konttien käytön pitäisi onnistua.

### Dockerin lyhyt oppimäärä, eli termejä sekä komentoja

Kontti (engl. container) on käynnissä oleva instanssi kontin kuvasta (engl. image). Kontissa on yleensä vähän
ylimääräisiä ohjelmia, paitsi ne mitä halutun toiminnan ajamiseen tarvitaan. Tämä on ikäänkuin kevytversio
virtuaalikoneesta, mutta ilman käyttöjärjestelmän ydintä. Esimerkiksi kontissa on oma hakemistopuunsa, tiedostoja sekä
ohjelmia.

Konttien `kuvat` ovat myös kerroksisia. Jokainen instruktio `Dockerfile`:ssä muodostaa oman kerroksensa, ja nämä
kerrokset ovat uudelleenkäytettäviä. Oletetaan esimerkiksi, että teet `konttikuvan`, joka palvelisi web-sivujasi.
Jos muutat sivujasi, ja rakennat kuvan uudestaan, tämä kontti ei luultavasti vie juuri mitään tilaa kiintolevyltäsi. 
Yksi päivitys web-sivuihin on tilan kannalta luultavasti merkityksetön. Tämä on siksi, että `Docker` uudelleenkäyttää
olemassa olevat kerrokset kuvan luomisessa, eikä niitä tarvitse toistaa.

`Dockerfile` on aika helppo luoda, mutta se ei ole tarpeen tässä, sillä repositoryssä on `Dockerfile` mukana. Sen sijaan
tässä on muutama hyödyllinen komento:

- `docker container --help`  _Tulostaa mahdolliset docker container komennot._
- `docker container ls`  _Listaa käynnissä olevat kontit._
- `docker container ls -a`  _Listaa kaikki olemassa olevat kontit._
- `docker container prune`  _Poistaa käyttämättömät kontit._
- `docker image ls`  _Listaa kaikki olemassa olevat kuvat omalta koneeltasi._
- `docker image build . -t joku_nimi`  _Rakentaa kuvan työhakemistossa olevasta `Dockerfile`:stä._
- `docker build . -t joku_nimi`  _Alias yllä olevalle._
- `docker run --help`  _Konttien ajamiseen ohjeet._

Voit käynnistää kontin joka palvelee näitä sivuja komennolla:
```bash
docker build . -t blogi
docker run --publish 80:80 -d blogi
```

Kehitettäessä niin sanottu bind mount mahdollistaa kansion liittämisen kontin sisälle. Se tapahtuu esimerkiksi näin:
```bash
docker build . -t blogi
docker run --publish 80:80 -d --mount \
  type=bind,source="$(pwd)/html",target=/usr/share/nginx/html blogi
```

Tuo `"$(pwd)"` ei toimi Windowsin cmd:ssä. En tiedä miten se pitäisi kirjoittaa siinä. Bashissä se käynnistää
alitulkin, ja ajaa komennon pwd. Lisätietoa bind mounteista [täältä](https://docs.docker.com/storage/bind-mounts/).

Jee. Nyt vain pitäisi vain rassata sivun muotoilut ja sisältö omannäköisiksi.

Ainiin: Nyt sivujen pitäisi toimia paremmin puhelimella kuin ennen. Myös puhelimen ollessa pystysuunnassa.
Koodiblokit tietty jää osin näkymättömiin, mutta sille tuskin voi tehdä mitään. En tiedä miten sen saisi toimimaan
mobiililla. Rivitys ei ole hyvä, ja suorat rivit on myös huono, sillä osa rivistä jää piiloon. Ehkä pitäisi näyttää
vain virheilmoitus mobiililaitteille, ja käskeä lukemaan jutut tietokoneella.

Ainiin2: Valmiita `Docker kuvia` löytää osoitteesta [hub.docker.com](https://hub.docker.com/).
