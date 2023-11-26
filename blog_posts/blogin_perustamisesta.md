# Hei, maailma

Tämä on ensimmäinen kirjoitukseni. En ole edes varma haluanko kirjoittaa blogia. Aion kuitenkin kokeilla.
Ehkä kirjoittaminen vahvistaa oppimista, tai on jopa hauskaa. Toivottavasti ainakin.

Tarkoitus olisi kirjoitella silloin tällöin jotain tekniikkaan tai peleihin liittyvää tähän blogiin.
Saatan toki kirjoittaa jotain muutakin diipadaapaa, jos se minua kiinnostaa. Tuskin kiinnostaa. Pistä siis 
ihmeessä tämä kirjanmerkkeihin, ja koeta katsoa myöhemmin uudelleen mikäli muistat sekä jaksat.

## Blogin toteutus

Seuraavaksi käyn lyhyesti läpi mitä eri tekniikoita tämän blogin toteutuksessa on käytetty, sekä _hieman_ miten tätä
voi käyttää pohjana omalle blogilleen. Koodia ei ole nimeksikään, mutta se vähä mitä on, on
[BSD-lisenssin](https://opensource.org/license/bsd-2-clause/) alla. ;)

### Tekniikat

Blogin toteutuksessa on käytetty seuraavia tekniikoita ja kirjastoja:

- HTML
- CSS
- [Tailwind CSS](https://tailwindcss.com/)
- [Python](https://python.org)
  - [Jinja3](https://jinja.palletsprojects.com/en/3.1.x/)
  - [Python-Markdown](https://python-markdown.github.io/)
  - [Pygments](https://pygments.org/) 
- [Docker](https://www.docker.com/)
- [Linux](https://fedoraproject.org/)
- [Git](https://git-scm.com/)

### Rakenne

Yhdessä blogipostauksessa on mahdotonta käydä kovin hyvin läpi mitään näistä. Onneksi tämä härveli on aika
yksinkertainen, joten esittelen hieman hakemistorakennetta ja mitä eri projektin tiedostot tekevät. Projekti on
saatavilla Githubista [täältä](https://github.com/mkuja/blogi).

Blogissa on tässä vaiheessa sen verran vähän tiedostoja, että suurimman osan voi listata tässä:
```
blogi                               
├── blog_posts                  
│   └── blogin_perustamisesta.md  -- Ensimmäinen blogikirjoitukseni.
├── blog.py                       -- Pääohjelma.
├── Dockerfile                    -- Ohjeet Dockerille.
├── html                          -- Käsin kirjoitetut .html -tiedostot.
│   ├── about_me.html
│   ├── blog_posts                -- Generoidut tiedostot.
│   │   └── blogin_perustamisesta.html
│   ├── css                       -- Muotoilut HTML-koodille.
│   │   ├── codehilite.css        -- Generoitu Pygmentsillä.
│   │   ├── styles.css            -- Generoitu tailwindcss:llä.
│   │   └── styles_for_posts.css  -- Käsin kirjoitettu.
│   ├── images              
│   │   └── hooded_mouse.jpg      -- Tehty Midjourney tekoälyllä.
│   └── index.html
├── my_blog                       -- Pari riviä koodia.
│   ├── cli.py              
│   ├── __init__.py
│   ├── render_blog.py
│   └── templates                 -- Jinja3-kaavat
│       ├── blog_post.html.j2
│       └── css
│           └── index.css         -- Lähtötiedosto tailwindcss-komennolle.
├── requirements.txt              -- Lista tarvittavista Python-paketeista.
└── tailwind.config.js            -- TailwindCSS konfiguraatiotiedosto.
```

Blogi toimii niin, että kirjoitan Markdown-tiedostoja joista generoin HTML-koodia `blogi`-hakemistossa olevalla
`blog.py`-skriptillä. Sitten lisään käsin linkin `index.html`-sivulle.

## Blogin käyttöönotto

### Koodin saaminen omalle koneelle

Koodin voi ladata Githubista omalle koneelleen .zip-tiedostona, mutta käytän tässä versionhallintaan tarkoitettua 
git-ohjelmaa. Se pitää kirjaa tiedostojen muutoshistoriasta. Gittiä käyttäen on mahdollista palata tiedostojen
edellisiin versioihin, tai palauttaa jo poistettuja tiedostoja. Gitin saa ladattua [tästä linkistä](https://git-scm.com/).
Vaihetoehto ehdotetulle komentorivi-gitille on Githubin graafinen client.

Joka tapauksessa lataus tapahtuu git-bash komentoriviltä komennolla:
```bash
git clone https://github.com/mkuja/blogi.git
```
Tämä komento tekee työkansioon uuden `blogi`-nimisen alikansion, johon koodi tulee. Git bash antaa muistaakseni
asennettaessa vaihtoehdon lisätä git-bash Windowsin kansioselaimen kontekstivalikkoon, eli hiiren oikealle napille.
Tätä kautta git-bashin voi avata haluamassaan hakemistossa. Ehkä helpompi tapa on kuitenkin käyttää seuraavia komentoja:
```bash
ls -lha   # Näyttää tiedostot ja hakemistot
pwd       # Näyttää nykyisen työhakemiston
cd hakemisto # Siirtyy hakemistoon
cd ..     # Siirtyy ylähakemistoon.
```

Repositoryn kloonaamisen jälkeen voikin rassata .html-tiedostot sekä j2-templaatin haluamikseen.

Äh. En jaksa kirjoittaa enempää. Repository on nyt kloonattu, ja seuraavaksi pitäisi saada Tailwind ja
Docker toimimaan. Kirjoitan myöhemmin lisää tästä.
