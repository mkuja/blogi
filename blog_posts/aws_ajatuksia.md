# Uusi jakso koulussa, ja uudet kujeet

Tässä jaksossa meillä on _Pilvipalvelut_-kurssi opiskeltavana, ja siihen
sisältyy kaikkea mahdollista Dockerista ja AWS:n serverless-palveluista
asioihin, joihin en ole vielä perehtynyt edes nimeltä.

## Amplify

Tässä postauksessa tuumailen hieman mitä mieltä saattaisin olla parista AWS:n palvelusta
yhden AWS serverless [tutoriaalin](https://aws.amazon.com/getting-started/hands-on/build-serverless-web-app-lambda-apigateway-s3-dynamodb-cognito/)
jälkeen. Pohja ei ole vahva. Se ei estä kirjoittamasta tästäkin aiheesta :D

Alku on aina vaikeaa. Tai siltä se tuntuu. Jos esimerkiksi otetaan vaikka
webbiserverin pystytys, niin NGINX:n, DNS:n ja certtien conffaus tuntuu helpommalta
kuin Amplify-palvelun käyttöönotto. Tai itseasiassa ei ole. Tässä oli minulla
vinouma. Ensimmäisen olen tehnyt ennemminkin, ja toiseen tutustuin ensimmäistä kertaa.
Totta kai vanha ja tuttu on helppoa.

Amplify on siis Amazon AWS -palvelu, jossa voi rakentaa ja hostata webbisivuja tai
mobiilisovelluksia. En ole tarkkaan selvillä mitä kaikkea Amplify osaa rakentaa, mutta
ilmeisesti Reactit ja Vuet menee kyllä. Muusta en tiedä ;).

Amplify oli lopulta aika helppo kokemus. Käyttöönotto tapahtui seuraavin askelin:

1. Tein Git repositoryn CodeCommittiin, joka on AWS:n repopalvelu. Myös GitHub, yms. toimivat.
2. Otin Amplifyn käyttöön, ja yhdistin sen repositoryyni.
3. Tein Service Rolen AWS:n, eli toisin sanoen roolin jota käyttäen AWS palvelut voivat käyttää
    toisia AWS-palveluita. Tämä tarvittiin CodeCommit repositoryn kloonausta varten.
4. Pushasin sisällön CodeCommit-repon master-haaraan, josta muutokset otetaan automaattisesti
    käyttöön.

Aika vaivaton tapa hostata esimerkiksi oma blogi. Jos osaa tehdä webbisivuja ja osaa
Gitin alkeet, saa melko helposti oman blogin pystyyn AWS Amplify -palvelulla. En tiedä
mitä domainin hankkiminen AWS:stä vaatii. Mutta jos sellaisen haluaa, niin vaikka 
Bittivirrasta saa domainin, ja Cloudflaren nimipalvelimia voi käyttää ilmaiseksi.

## Cognito

Cognito oli toinen positiivinen asia, joka kyseisestä oppaasta jäi mieleen. Melko pienellä
vaivalla omalle verkkosivulleen voi lisätä toimintoja jotka vaativat rekistöitymistä ja
salasanoja. Ainakin paljon helpommin, kuin itse koodaamalla JWT-tokeneita, ja säilyttämällä
salasanatiivisteitä.

## Lambda ja Dynamo

AWS Lambda on palvelu, jossa voi ajaa pätkän koodia, kun jokin tapahtuma tapahtuu. Vaikka
esimerkiksi HTTP-pyyntö API Gatewaylle, joka taas herättelee Lambdaa.

Dynamo taas on AWS:n nosql-tietokanta. Kokemusta tästä minulla on noin 5 minuuttia.
Oli helppo ottaa käyttöön.

Lambda ja Dynamo tuntuivat hieman samantekeviltä. Dynamo oli helppo ottaa käyttöön ja liittää
palveluun, mutta myös tietokanta kontissa on helppo ratkaisu. Tosin se ei enää ole serverless?
Mitä väliä. En tiedä. Lambda taas tuntui hieman... Joltakin mitä en haluaisi käyttää. Ajatus,
että ohjelma koostuu vain useista lambdoista, jotka sisältävät pikkiriikkisen koodia kukin tuntuu
sekavalta. Tosin ilman kokemusta on helppo puhua ;)