# Moj jedilnik

Prehranski načrtovalnik in dnevnik z jedrom v `index.html` ter dodatnima datotekama za PWA (`manifest.webmanifest`, `sw.js`). Deluje brez podatkovnega strežnika; osebni vnosi so v **localStorage** brskalnika (`jedilnik-state`) z dodatno lokalno kopijo v **IndexedDB**, če je na voljo. Koda na GitHubu **ni** zbirka uporabnikovih dnevnih vnosov.

## Uporaba

- **Teden:** glavni seštevek pri obroku in dnevih prikazuje **samo dejansko zaužite** kalorije in beljakovine, načrt pa je prikazan ločeno. Porcije označuješ po 0/25/50/75/100 % ali z natančno maso v gramih pri tehtanih živilih. Pri jajcih, tortilijah, sadju in podobnih živilih uporabljaš enoto **kos**. Na voljo sta hitri vnos priljubljenih živil in ponavljanje včerajšnjih vnosov. Prihodnjih dni ni mogoče predhodno označiti kot pojedene.
- **Manjši apetit:** 32 alternativ s strukturiranimi sestavinami; izbrane zamenjave veljajo za posamezen dan in ohranijo izhodiščni obrok.
- **Smutiji:** sestavljalnik, urejanje shranjenih receptov in preračun kalorij, beljakovin ter znanih maščob, OH, vlaknin in sladkorjev iz živil. Za neokusni Battery Complete Whey je treba vnesti deklaracijo na 100 g. Nepoznane vrednosti so prikazane kot »–«, ne kot 0.
- **Živila:** uporabljaš samo **g** (tehtani izdelki) in **kos** (jajca, tortilije, sadje, žemlje, posamezne ploščice/porcije in konzerve). Hranilne vrednosti veljajo na 100 g ali na 1 kos. Sam izbereš novo živilo v g ali kos; pri spremembi enote obstoječega živila aplikacija vpraša za maso kosa in preračuna recepte. Skeniranje omogoča tudi shranjevanje prepoznanega izdelka kot kos, če vneseš maso enega kosa.
- **Nakup:** samodejen seznam za ta ali naslednji teden in ločen, nedotaknjen ročni seznam. Količine so prikazane kot **litri za mleko in druge pijače, mililitri za manjše tekoče sestavine, kilogrami/grami za tehtano hrano in kosi za štete izdelke**. Zalogo in pakiranja vpišeš v istih prikazanih enotah. Za mleko (1 l), skuto (250 g), jajca (10 kosov) in nekatera druga živila so kot predlog uporabljene običajne embalaže iz ročnega seznama. Zaloge se ne odštevajo samodejno ob obrokih.
- **Napredek:** izbirna dnevna evidenca počutja, dejansko zabeležene prehrane, telesne teže, ciljev, 7/14/30-dnevne analitike ter izvoza/uvoza JSON. Povprečja vključujejo le zabeležene dneve; ne vnašajo izmišljenih ničel.

## Hranila in natančnost

- Pri skeniranih izdelkih se hranilne vrednosti z embalaže (na 100 g oziroma 100 ml) prevedejo v **na 100 g** ali **na 1 kos** za shranjevanje. Pri kosu je nujna masa enega kosa v gramih; pri tekočini na 100 ml aplikacija omogoča urediti maso 100 ml (privzeta ocena 100 g lahko odstopa).
- Pri drugih živilih lahko te vrednosti dopolniš z urejanjem **Živila** po deklaraciji. Prazno polje = **neznano**, vpisana 0 = **dejansko nič**.
- Seštevki dodatnih hranil so navedeni kot **delni**, če katera od dejansko pojedenih jedi nima deklaracije. Dnevni pregled hranil na zavihku **Teden** ne vključuje pijač.
- Pri *Ponovi včerajšnje zaužito* se prekopirajo dejansko shranjeni vnosi iz predhodnega dne kot ročno zapisane jedi; če stari vnos nima podrobne deklaracije, se ne ustvarijo izmišljeni makri.

### Spletni viri in zanesljivost makrohranil

Za 139 generičnih živil so bile dodane orientacijske vrednosti maščob, ogljikovih hidratov in vlaknin iz javnih prehranskih referenc. Lokalna datoteka [nutrition-reference.json](./nutrition-reference.json) navaja izhodiščno živilo in izvor. Pri skeniranih izdelkih in tvojih ročno vnesenih podatkih imajo prednost konkretni vnosi; podatki za neznano živilo ne smejo biti predstavljeni kot preverjena deklaracija.

Attribution: **Food nutrition data from TempoLife (tempolife.app), CC-BY-4.0.** Podatki iz zbirke [TempoLife Food Nutrition Dataset](https://github.com/tempolife-app/tempo-food-db) so pod licenco CC-BY-4.0, podlaga USDA SR Legacy pa je javna domena. Referenčno živilo **ni nujno enako** izdelku, ki ga kupiš; kalorije in beljakovine starega jedilnika se pri dodajanju referenčnih makrohranil ne prepisujejo. Manjkajoča polja ostanejo »–«, ne samodejna 0.

### Pretvorba obstoječih enot

- Obstoječi podatki se ob prvem odpiranju varno pretvorijo v **g** ali **kos**. Posebej šteta živila (npr. jajce, tortilija, banana, žemlja, rižev vafelj, beljakovinska ploščica) ostanejo v kosih, meso, sir, salama, krompir, riž, mleko in druge tehtane sestavine pa v gramih.
- Stare enote **žlica, žlička, rezina, pločevinka in ml** so preslikane na g ali kos s fiksnimi orientacijskimi masami; te niso natančne za vse znamke. Preslikava je enkratna in ima zapisano identifikacijo, zato se ob osvežitvi ne sme ponoviti.
- Obstoječi kalorijski in beljakovinski seštevki porcij ostanejo enaki. Zabeležene zgodovine v preteklosti ne prepisujemo; podatke iz predhodnih dni je treba interpretirati po njihovem tedanjem zapisu.
- Urejanje enote med g in kos zahteva **gramov na 1 kos**; aplikacija nato preračuna povezane porcije, smutije, nakupno zalogo in recepte. Nikoli samo ne prepiše oznake enote.
- Pred prvo uporabo po tej spremembi **izvozi JSON v Datoteke/iCloud Drive**. Rezervna GitHub veja `backup-pred-pretvorbo-v-grame-2026-11-12` ohranja staro različico *kode*, ne tvojih osebnih podatkov.

## Safari bližnjica, manifest in delovanje brez povezave

Obstoječe ikone iz Safarija **ni treba odstranjevati ali ponovno nameščati**. Aplikacija zdaj vsebuje manifest in service worker. Po prvem spletnem obisku prek HTTPS in osvežitvi lahko odpre **osnovno lupino aplikacije** tudi brez interneta, če Safari predpomnilnika medtem ne odstrani. Ob offline načinu ostanejo osebni vnosi lokalni; **iskanje novih artiklov po črtni kodi (Open Food Facts) potrebuje internet**. Prav tako lahko nalaganje knjižnice za kamero brez interneta odpove, če je ni v predpomnilniku brskalnika. Zunanji API-ji in osebni dnevnik se ne shranjujejo v service-worker predpomnilnik.

## Skeniranje črtne kode in Open Food Facts

1. Odpri **Živila → Skeniraj črtno kodo**. Za kamero mora stran teči prek **HTTPS** (npr. GitHub Pages) in brskalnik mora dovoliti uporabo kamere. Za prepoznavanje EAN-8, EAN-13 in UPC-A aplikacija po izrecnem kliku naloži [html5-qrcode 2.3.8](https://github.com/mebjas/html5-qrcode) prek jsDelivr. Če kamera ni na voljo, uporabi fotografijo ali ročni vnos.
2. Aplikacija zahteva podatke za črtno kodo iz **[Open Food Facts](https://world.openfoodfacts.org/)** (API v3). Podatki iz skupnostne zbirke so lahko napačni ali nepopolni. Preveri **ime in podatke na 100 g/100 ml** z embalažo; praznih kcal ali beljakovin ni dovoljeno samodejno pretvoriti v ničle.
3. Po želji popravi vrednosti, izberi vnos v g ali kos, pri kosu vnesi maso kosa v gramih in označi **Preveril sem hranilne vrednosti na embalaži**, če si jih preveril. Shrani v **Živila** ali izberi **Dan / Obrok / Količina** in **Shrani in dodaj k obroku**. Če potrdiš **To sem dejansko pojedel**, se kalorije štejejo v *Pojedeno*; sicer so le načrtovane.
4. Če je EAN že v tvoji bazi, aplikacija uporablja obstoječi zapis in ga ne prepiše z novimi spletnimi podatki. Ob neuspešnem iskanju lahko izdelku podatke ročno vneseš z embalaže.

**Zasebnost:** kamera/fotografija se obdeluje v tvojem brskalniku. Na javni API se za iskanje pošlje samo EAN/UPC številka, **ne** dnevnik zaužite hrane ali drugi lokalni zapisi. Samo v času skeniranja se prenese zunanja knjižnica. Hranilni podatki iz Open Food Facts so pod pogoji [ODbL](https://world.openfoodfacts.org/terms-of-use). Uporaba kamere in API-ja potrebuje povezavo in podporo brskalnika. Koda skenerja je preverjena s simulacijo; preizkus dovoljenja za kamero na dejanskem telefonu je še potreben.

## Popravek napihnjenih količin smutijev v nakupih

V prejšnji različici so se sestavine strukturiranih smutijev pri izračunu nakupovalnega seznama pomnožile s **skupno maso smutija (g)** namesto z **deležem recepta**. Zato se je lahko prikazalo več deset kilogramov mleka, sadja ali skute. Popravljeno: količine sestavin se pomnožijo z `masa smutija v načrtu / masa celotnega recepta`. Kalorije v dnevniku in obstoječe porcije niso spreminjane.

Nakupovalni prikaz uporablja kanonično shranjeno maso za izračun, za človeka pa prikaže primerne trgovinske enote: mleko na primer `1,35 l`, skuto `2,55 kg`, banane `14 kosov`. Za pretvorbo mase v prostornino so uporabljene **približne gostote** (mleko ~1,03 kg/l; olje ~0,91 kg/l); to ni natančna deklaracija konkretnega izdelka. Nove vrednosti zalog in velikosti pakiranja vnašaš **v enoti, navedeni ob polju** (npr. `0,5` pomeni 0,5 l mleka, ne 0,5 g). Notranji podatki ostanejo v gramih/kosih in zgodovine zaužitih obrokov ne spreminjamo.

## Natančnost nakupovalnega seznama

Samodejni seznam bere sestavine tedenskega načrta (in datumske zamenjave v trenutnem tednu) ter jih združi po živilski enoti. Privzeto izloči kosila, ki jih pripravlja druga oseba, in dodatne enkratne vnose. Oboje je mogoče vključiti.

Kadar je jedilnik zapisan s **kuhano ali pečeno težo**, so nakupne količine **ocenjene** iz surovih z naslednjimi predpostavkami:
- pečen polak in piščanec → surova količina × 4/3;
- kuhan riž → suhi riž × 1/3;
- kuhane testenine → suhe testenine × 1/2,25;
- pripravljen krompir → približno enaka teža surovega, olupljenega krompirja.

To **niso univerzalni pretvorbeni faktorji**. Na izplen vplivata voda in način priprave. Kjer sestavin ni mogoče zanesljivo razčleniti, aplikacija pokaže opozorilo. Ročno urejene stare cene niso preverjene maloprodajne cene; številsko odštevanje zalog in izračun velikosti pakiranj delujeta samo za količine, ki jih vneseš sam.

Pri starejših smutijih se nakupovalni recept uporabi le, če besedilo sestavin še ustreza izhodiščnemu receptu. Novejši shranjeni smutiji uporabljajo seznam strukturiranih sestavin.

## Shranjevanje in varnostne kopije

- Podatki se zapisujejo **lokalno v brskalnik**, niso sinhronizirani med napravami.
- Ob spremembah se poskusi shraniti tudi predhodna lokalna različica. Poleg tega se ob podprtem IndexedDB z zamikom ustvari dodatna obnovitvena kopija iste naprave. Nobena od teh kopij ni zunanja varnostna kopija.
- V **Napredek → Varnostne kopije → Izvozi kopijo JSON** vsaj tedensko prenesi zasebno kopijo v Datoteke/iCloud Drive. Aplikacija hrani datum zadnjega **sproženega** izvoza in opozori po 7 dneh; ne more preveriti, ali si datoteko res shranil. JSON vsebuje tudi dnevnik in morebitne zdravstvene podatke: **ne nalagaj ga v javni GitHub repozitorij**.
- Pred uvozom je treba potrditi zamenjavo podatkov; osnovna validacija uvoza prepreči nekaj vrst poškodovanih kopij.
- Repozitorij vsebuje tudi varnostno vejo `backup-pred-dinamicnim-nakupom-2026-11-12`, ki ohranja kodo pred posodobitvijo nakupovalnega seznama, **ne** podatkov s posameznikove naprave.

## Kaj še ni popolnoma natančno

1. Katalog vsebuje tudi *okvirne* hranilne vrednosti. Za kupljene izdelke je najboljši vir konkretna deklaracija; pri receptih preveri surovo/kuhano maso.
2. Ogljikovi hidrati, maščobe, vlaknine in sladkorji se beležijo, **če so znani**; številni starejši zapisi imajo te vrednosti prazne. Mikrohranila niso vključena.
3. Pakiranja in zaloge se odštejejo le, če uporabnik vnese **dejanske velikosti in količine**. Ne obstaja samodejno sinhroniziranje zaloge z računi trgovin ali preverjanje aktualnih cen.
4. Ni prijave v račun ali šifrirane samodejne sinhronizacije med napravami. Izvoz v Datoteke/iCloud Drive in uvoz JSON ostajata potreben način prenosa.
5. Preverjena je logika v simuliranem okolju; nadaljnje testiranje na fizičnem telefonu, v Safari/Chrome ter pri prehodih med tedni je še potrebno.
6. Izračuni so pomoč pri evidenci, ne medicinska navodila ali nadomestilo za individualen prehranski načrt.

## Osnovni kontrolni seznam za test

- [ ] Na telefonu osveži stran in preveri vseh šest zavihkov.
- [ ] V samodejnem nakupu preveri približno 1,35 l mleka, 2,55 kg skute in 14 banan na nespremenjenem začetnem načrtu (tvoja prilagojena različica se lahko razlikuje).
- [ ] V nakupu vpiši 0,5 l zaloge mleka in preveri, da se preostanek zmanjša za 0,5 l; pri mleku s pakiranjem 1 l preveri ustrezno zaokroženo število pakiranj.
- [ ] Preveri jajce, banano in tortilijo v kosih ter sir, piščanca, skuto in mleko v gramih.
- [ ] Pri priljubljenem živilu varno pretvori enoto g ↔ kos s težo enega kosa; preveri, da kalorije ostanejo enake in vrednost obstane po osvežitvi.
- [ ] Skeniraj tortilijo; za vnos kot kos vnesi deklarirano ali izmerjeno maso enega kosa.
- [ ] Označi nekaj priljubljenih živil v Živilih; v Tednu jih dodaj kot pojedeno ali samo načrtovano.
- [ ] Dopolni maščobe, OH in vlaknine na konkretnem izdelku; preveri, ali se delni seštevki pravilno prikažejo.
- [ ] Na Nakupu vnesi zalogo (npr. 500 ml mleka) in velikost pakiranja; preveri odštevanje in možnost skrivanja že založenega.
- [ ] V Napredek primerjaj 7/14/30 dni in preveri, da dnevi brez vnosa niso prikazani kot 0.
- [ ] Shrani JSON kopijo v Datoteke/iCloud Drive in preveri možnost obnove na testni napravi. Ne briši lokalnih podatkov brez varnostne kopije.
- [ ] Za offline preverjanje najprej odpri aplikacijo s povezavo, potem izklopi internet in znova odpri Safari ikono. Iskanje novih izdelkov offline ne deluje.
- [ ] V Živila vklopi kamero in skeniraj znan EAN-13; preveri tudi fotografijo in ročni vnos.
- [ ] Izdelek preveri z embalažo, ga shrani in dodaj v Večerjo; neoznačene jedi naj kažejo 0 kcal pojedeno in se ne prištevajo k Večerji.
- [ ] Poskusi isto črtno kodo še enkrat; ne sme nastati dvojni izdelek. Brez omrežja naj bo na voljo ročni vnos.
- [ ] Označi del obroka ali vnesi dejansko težo ter preveri oba dnevna kazalnika.
- [ ] Vnesi whey deklaracijo, sestavi smuti, ga shrani, ponovno uredi in preveri spremembe v jedilniku.
- [ ] Zamenjaj obrok za posamezen dan in preveri, da je prvotni obrok mogoče obnoviti.
- [ ] V Nakupu preveri samodejne količine, kosila, ta/naslednji teden in ločeno shranjevanje kljukic.
- [ ] Izvozi JSON, ga varno shrani in po možnosti preveri obnovitev na testni napravi.
- [ ] Po prehodu v nov teden preveri, da je zgodovina ohranjena in nakupne kljukice novega tedna niso že označene.
