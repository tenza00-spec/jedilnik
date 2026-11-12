# Moj jedilnik

Prehranski načrtovalnik in dnevnik v eni datoteki `index.html`. Deluje brez strežnika; osebni vnosi ostanejo v **localStorage** brskalnika (`jedilnik-state`). Koda na GitHubu **ni** zbirka uporabnikovih dnevnih vnosov.

## Uporaba

- **Teden:** glavni seštevek ob posameznem obroku in pri dnevih prikazuje **samo dejansko zaužite** kcal/beljakovine. Načrt je naveden ločeno in se **ne šteje** v zaužito. Posamezno živilo je 0 kcal pojedeno, dokler ga ne označiš. Na voljo so deleži 0/25/50/75/100 % in natančni grami/ml; v prihodnjih dneh ni dovoljeno predhodno označevati hrane kot pojedene.
- **Manjši apetit:** 32 alternativ s strukturiranimi sestavinami; izbrane zamenjave veljajo za posamezen dan in ohranijo izhodiščni obrok.
- **Smutiji:** sestavljalnik, urejanje shranjenih receptov in preračun hranilnih vrednosti iz živil. Za neokusni Battery Complete Whey je treba vnesti deklaracijo na 100 g.
- **Živila:** baza z vrednostmi kcal in beljakovin. Za `g` in `ml` je podatek na 100 enot, za druge enote na kos/žlico/pločevinko ipd. Gumb **Skeniraj črtno kodo** omogoča skeniranje s kamero, fotografijo ali ročnim vnosom EAN/UPC ter shranjevanje izdelka ali neposredno dodajanje v obrok.
- **Nakup:** samodejen seznam za ta ali naslednji teden in ločen, nespremenjen ročni seznam. Kljukice so vezane na teden in načrtovano količino.
- **Napredek:** izbirna dnevna evidenca počutja, dejansko zabeležene prehrane, telesne teže, ciljev in izvoza/uvoza JSON.

## Skeniranje črtne kode in Open Food Facts

1. Odpri **Živila → Skeniraj črtno kodo**. Za kamero mora stran teči prek **HTTPS** (npr. GitHub Pages) in brskalnik mora dovoliti uporabo kamere. Za prepoznavanje EAN-8, EAN-13 in UPC-A aplikacija po izrecnem kliku naloži [html5-qrcode 2.3.8](https://github.com/mebjas/html5-qrcode) prek jsDelivr. Če kamera ni na voljo, uporabi fotografijo ali ročni vnos.
2. Aplikacija zahteva podatke za črtno kodo iz **[Open Food Facts](https://world.openfoodfacts.org/)** (API v3). Podatki iz skupnostne zbirke so lahko napačni ali nepopolni. Preveri **ime in podatke na 100 g/100 ml** z embalažo; praznih kcal ali beljakovin ni dovoljeno samodejno pretvoriti v ničle.
3. Po želji popravi vrednosti in označi **Preveril sem hranilne vrednosti na embalaži**. Shrani v **Živila** ali izberi **Dan / Obrok / Količina** in **Shrani in dodaj k obroku**. Če potrdiš **To sem dejansko pojedel**, se kalorije štejejo v *Pojedeno*; sicer so le načrtovane.
4. Če je EAN že v tvoji bazi, aplikacija uporablja obstoječi zapis in ga ne prepiše z novimi spletnimi podatki. Ob neuspešnem iskanju lahko izdelku podatke ročno vneseš z embalaže.

**Zasebnost:** kamera/fotografija se obdeluje v tvojem brskalniku. Na javni API se za iskanje pošlje samo EAN/UPC številka, **ne** dnevnik zaužite hrane ali drugi lokalni zapisi. Samo v času skeniranja se prenese zunanja knjižnica. Hranilni podatki iz Open Food Facts so pod pogoji [ODbL](https://world.openfoodfacts.org/terms-of-use). Uporaba kamere in API-ja potrebuje povezavo in podporo brskalnika. Koda skenerja je preverjena s simulacijo; preizkus dovoljenja za kamero na dejanskem telefonu je še potreben.

## Natančnost nakupovalnega seznama

Samodejni seznam bere sestavine tedenskega načrta (in datumske zamenjave v trenutnem tednu) ter jih združi po živilski enoti. Privzeto izloči kosila, ki jih pripravlja druga oseba, in dodatne enkratne vnose. Oboje je mogoče vključiti.

Kadar je jedilnik zapisan s **kuhano ali pečeno težo**, so nakupne količine **ocenjene** iz surovih z naslednjimi predpostavkami:
- pečen polak in piščanec → surova količina × 4/3;
- kuhan riž → suhi riž × 1/3;
- kuhane testenine → suhe testenine × 1/2,25;
- pripravljen krompir → približno enaka teža surovega, olupljenega krompirja.

To **niso univerzalni pretvorbeni faktorji**. Na izplen vplivata voda in način priprave. Kjer sestavin ni mogoče zanesljivo razčleniti, aplikacija pokaže opozorilo, namesto da bi jih ugibala. Ročno urejene stare cene niso preverjene maloprodajne cene; paketne količine in dejanske zaloge se še ne odštevajo.

Pri starejših smutijih se nakupovalni recept uporabi le, če besedilo sestavin še ustreza izhodiščnemu receptu. Novejši shranjeni smutiji uporabljajo seznam strukturiranih sestavin.

## Shranjevanje in varnostne kopije

- Podatki se zapisujejo **lokalno v brskalnik**, niso sinhronizirani med napravami.
- Ob spremembah se poskusi shraniti tudi predhodna lokalna različica. To ni zunanja varnostna kopija.
- V **Napredek → Varnostne kopije → Izvozi kopijo JSON** redno prenesi osebno kopijo in jo shrani na varno. JSON vključuje tudi dnevnik in morebitne zdravstvene zapise: obravnavaj ga kot zasebno datoteko.
- Pred uvozom je treba potrditi zamenjavo podatkov; osnovna validacija uvoza prepreči nekaj vrst poškodovanih kopij.
- Repozitorij vsebuje tudi varnostno vejo `backup-pred-dinamicnim-nakupom-2026-11-12`, ki ohranja kodo pred posodobitvijo nakupovalnega seznama, **ne** podatkov s posameznikove naprave.

## Kaj še ni popolnoma natančno

1. Katalog vsebuje tudi *okvirne* hranilne vrednosti. Za kupljene izdelke je najboljši vir konkretna deklaracija; pri receptih preveri surovo/kuhano maso.
2. Ogljikovi hidrati, maščobe, vlaknine in mikrohranila niso popolno strukturirano spremljani.
3. Nakupni seznam še nima dejanskih trgovinskih pakiranj, aktualnih cen ali natančnega odštevanja zalog.
4. Ni prijave v račun, šifrirane sinhronizacije ali zanesljivega varnostnega kopiranja v oblak.
5. Preverjena je logika v simuliranem okolju; nadaljnje testiranje na fizičnem telefonu, v Safari/Chrome ter pri prehodih med tedni je še potrebno.
6. Izračuni so pomoč pri evidenci, ne medicinska navodila ali nadomestilo za individualen prehranski načrt.

## Osnovni kontrolni seznam za test

- [ ] Na telefonu osveži stran in preveri vseh šest zavihkov.
- [ ] V Živila vklopi kamero in skeniraj znan EAN-13; preveri tudi fotografijo in ročni vnos.
- [ ] Izdelek preveri z embalažo, ga shrani in dodaj v Večerjo; neoznačene jedi naj kažejo 0 kcal pojedeno in se ne prištevajo k Večerji.
- [ ] Poskusi isto črtno kodo še enkrat; ne sme nastati dvojni izdelek. Brez omrežja naj bo na voljo ročni vnos.
- [ ] Označi del obroka ali vnesi dejansko težo ter preveri oba dnevna kazalnika.
- [ ] Vnesi whey deklaracijo, sestavi smuti, ga shrani, ponovno uredi in preveri spremembe v jedilniku.
- [ ] Zamenjaj obrok za posamezen dan in preveri, da je prvotni obrok mogoče obnoviti.
- [ ] V Nakupu preveri samodejne količine, kosila, ta/naslednji teden in ločeno shranjevanje kljukic.
- [ ] Izvozi JSON, ga varno shrani in po možnosti preveri obnovitev na testni napravi.
- [ ] Po prehodu v nov teden preveri, da je zgodovina ohranjena in nakupne kljukice novega tedna niso že označene.
