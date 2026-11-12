# Moj jedilnik

Prehranski načrtovalnik in dnevnik v eni datoteki `index.html`. Deluje brez strežnika; osebni vnosi ostanejo v **localStorage** brskalnika (`jedilnik-state`). Koda na GitHubu **ni** zbirka uporabnikovih dnevnih vnosov.

## Uporaba

- **Teden:** načrtovani in dejansko zaužiti obroki; označevanje 0/25/50/75/100 % ali natančne količine v gramih/ml. V prihodnjih dneh ni dovoljeno predhodno označevati hrane kot pojedene.
- **Manjši apetit:** 32 alternativ s strukturiranimi sestavinami; izbrane zamenjave veljajo za posamezen dan in ohranijo izhodiščni obrok.
- **Smutiji:** sestavljalnik, urejanje shranjenih receptov in preračun hranilnih vrednosti iz živil. Za neokusni Battery Complete Whey je treba vnesti deklaracijo na 100 g.
- **Živila:** baza z vrednostmi kcal in beljakovin. Za `g` in `ml` je podatek na 100 enot, za druge enote na kos/žlico/pločevinko ipd.
- **Nakup:** samodejen seznam za ta ali naslednji teden in ločen, nespremenjen ročni seznam. Kljukice so vezane na teden in načrtovano količino.
- **Napredek:** izbirna dnevna evidenca počutja, dejansko zabeležene prehrane, telesne teže, ciljev in izvoza/uvoza JSON.

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
- [ ] Označi del obroka ali vnesi dejansko težo ter preveri oba dnevna kazalnika.
- [ ] Vnesi whey deklaracijo, sestavi smuti, ga shrani, ponovno uredi in preveri spremembe v jedilniku.
- [ ] Zamenjaj obrok za posamezen dan in preveri, da je prvotni obrok mogoče obnoviti.
- [ ] V Nakupu preveri samodejne količine, kosila, ta/naslednji teden in ločeno shranjevanje kljukic.
- [ ] Izvozi JSON, ga varno shrani in po možnosti preveri obnovitev na testni napravi.
- [ ] Po prehodu v nov teden preveri, da je zgodovina ohranjena in nakupne kljukice novega tedna niso že označene.
