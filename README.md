# WebdriverIO Test Project - Practice Software Testing

Progetto di automazione dei test end-to-end per il sito [practicesoftwaretesting.com](https://practicesoftwaretesting.com) realizzato con WebdriverIO e Mocha.

---

## Tecnologie utilizzate

- [WebdriverIO v9](https://webdriver.io/)
- [Mocha](https://mochajs.org/) come test framework
- [Allure Reporter](https://webdriver.io/docs/allure-reporter/) per la generazione dei report
- Node.js con ES Modules

---

## Struttura del progetto

```
test/
├── fixtures/           # Dati di test in formato JSON
│   ├── credentials.json
│   ├── messages.json
│   ├── address.json
│   └── payment.json
├── helpers/            # Funzioni di supporto riutilizzabili
│   ├── loginAs.js
│   └── waitFor.js
├── header/             # Componenti della navbar
│   └── headerComponent.js
├── pageobjects/        # Page Object Model
│   ├── basePage.js
│   ├── login.page.js
│   ├── loginError.js
│   ├── searchPage.js
│   ├── categoryPage.js
│   ├── sortPage.js
│   ├── cartPage.js
│   ├── checkoutPage.js
│   ├── addressPage.js
│   ├── paymentPage.js
│   └── productPage.js
├── specs/              # File di test
│   ├── login.js
│   ├── logout.js
│   ├── search.js
│   ├── category.js
│   ├── sort.js
│   ├── cart.js
│   ├── checkout.js
│   └── product.js
└── screenshots/        # Screenshot automatici in caso di test falliti
```

---

## Descrizione dei file

### fixtures/

**`credentials.json`** — Contiene le credenziali degli utenti usati nei test: `firstUser` con email e password corrette, e `wrongPassword` con la stessa email ma password errata. Sono stati separati in due oggetti distinti perché rappresentano due scenari diversi: login riuscito e login fallito. Centralizzarli in un JSON evita di scrivere stringhe hardcoded nei test e permette di aggiornare le credenziali in un solo posto se cambiano.

**`messages.json`** — Contiene i messaggi di errore attesi dal sito, come "Invalid email or password", "Email is required" e "Password is required". La motivazione è la stessa dei credentials: se il sito cambia il testo di un messaggio, si aggiorna solo qui e non in tutti i test che lo usano. Questo rende il progetto più manutenibile.

**`address.json`** — Contiene i dati dell'indirizzo usati nel checkout: paese (codice ISO "IT"), CAP, numero civico, via, città e stato. Il valore del paese è il codice ISO (`IT`) e non il nome ("Italy") perché il dropdown del sito usa i codici ISO come `value` delle opzioni — usare il testo visibile avrebbe causato un errore di selezione.

**`payment.json`** — Contiene il metodo di pagamento selezionato nel checkout, in questo caso `cash-on-delivery`. Il valore corrisponde all'attributo `value` dell'opzione nel dropdown HTML, non al testo visibile "Cash on Delivery". È stato creato un file separato invece di aggiungerlo ad `address.json` per mantenere ogni file focalizzato su un singolo concetto.

---

### helpers/

**`loginAs.js`** — Funzione helper riutilizzabile che esegue il login navigando direttamente su `/auth/login` e compilando email e password. È stata estratta in un file separato perché il login è un'operazione comune a molti test (login, logout, cart, checkout) e ripetere le stesse righe in ogni spec avrebbe violato il principio DRY (Don't Repeat Yourself). Navigare direttamente a `/auth/login` invece di cliccare il pulsante "Sign In" dalla home è stato scelto per rendere il login più veloce e affidabile, evitando dipendenze dalla navigazione della home page.

**`waitFor.js`** — Contiene la funzione `waitForUrl(url)` che aspetta che l'URL del browser contenga una stringa specifica. È stata separata in un helper perché viene usata in più spec (login, logout) e rappresenta un'utilità generica non legata a nessuna pagina specifica.

---

### header/

**`headerComponent.js`** — Componente che rappresenta la navbar del sito. Contiene i getter per il menu utente (`nav-menu`) e il pulsante di sign out (`nav-sign-out`), e i metodi per cliccarli. È stato separato dai page object perché la navbar è un elemento trasversale presente su tutte le pagine — non appartiene né alla pagina di login né a quella del carrello, ma è condivisa. Tenerlo separato evita di duplicarlo in più page object.

---

### pageobjects/

**`basePage.js`** — Classe base da cui estendono tutti i page object. Contiene il metodo `open(path)` che naviga a un URL relativo usando il `baseUrl` configurato in `wdio.conf.js`. La motivazione è evitare di ripetere l'URL base in ogni file: se il `baseUrl` cambia, si aggiorna solo nella configurazione e tutti i page object lo ereditano automaticamente.

**`login.page.js`** — Page object per la pagina di login. Contiene i getter per i campi email, password e il pulsante di submit, e i metodi `openLogin()` per aprire il form e `login(email, password)` per compilare e inviare le credenziali. I getter usano attributi `data-test` invece di classi CSS perché gli attributi `data-test` sono stabili e non cambiano con il restyling della pagina.

**`loginError.js`** — Page object minimale che contiene solo il getter per il messaggio di errore del login. È stato separato da `login.page.js` per mantenere la responsabilità singola: `login.page.js` gestisce le azioni di login, `loginError.js` gestisce la verifica degli errori. Questo rende ogni classe più semplice e focalizzata.

**`searchPage.js`** — Page object per la funzionalità di ricerca. Contiene i getter per la barra di ricerca (`search-query`), il pulsante di submit (`search-submit`) e i nomi dei prodotti risultanti (`product-name`), e il metodo `search(query)`. Il metodo apre la home prima di cercare perché la barra di ricerca è disponibile dalla home senza necessità di login.

**`categoryPage.js`** — Page object per il filtro per categoria. La categoria "Hammer" è stata selezionata tramite `label=Hammer` invece del selettore `data-test` del checkbox perché l'ID della categoria nell'attributo `data-test` è dinamico e può cambiare. Selezionare per testo della label è più stabile. La verifica usa una regex `/hammer/i` case-insensitive perché tra i prodotti filtrati c'è anche "Sledgehammer" che contiene "hammer" ma non inizia con la maiuscola.

**`sortPage.js`** — Page object per l'ordinamento dei prodotti. Usa `selectByAttribute('value', ...)` per selezionare l'opzione nel dropdown perché il `value` dell'opzione è stabile, mentre il testo visibile potrebbe variare. I prezzi vengono estratti come testo e convertiti in numeri con `parseFloat` dopo aver rimosso il simbolo `$` per poterli confrontare matematicamente.

**`cartPage.js`** — Page object per il carrello. Il prodotto Pliers viene aperto tramite ricerca per nome usando `h5=Pliers` (testo esatto) invece di navigare direttamente all'URL perché l'ID del prodotto nell'URL è dinamico e cambia ad ogni deploy del sito — durante lo sviluppo è stato necessario aggiornarlo più volte. La ricerca per testo esatto è più robusta. Usa `waitForExist()` e `waitForDisplayed()` prima di cliccare il pulsante del carrello per gestire i casi in cui la pagina non è ancora completamente caricata.

**`checkoutPage.js`** — Page object per il primo step del checkout dopo il login. Gestisce il pulsante `proceed-2` che appare quando l'utente è già loggato con il messaggio "Hello Jane Doe, you are already logged in". Questo step esiste perché il checkout ha più fasi e il sito riconosce la sessione attiva mostrando un messaggio di benvenuto invece del form di login.

**`addressPage.js`** — Page object per il form dell'indirizzo. Il metodo `fillAddress(address)` riceve un oggetto JavaScript (letto dal JSON) invece di parametri singoli perché i campi dell'indirizzo sono molti — passarli come oggetto rende la firma del metodo più pulita e scalabile. Il paese viene selezionato con `selectByAttribute('value', 'IT')` perché il dropdown usa codici ISO come valori, non i nomi per esteso.

**`paymentPage.js`** — Page object per il pagamento. Il metodo `confirmPayment()` gestisce internamente i due click necessari: il primo click invia il pagamento e mostra "Payment was successful", il secondo conferma l'ordine e mostra il numero fattura. I due click sono stati separati con `waitForEnabled()` perché il secondo pulsante "Confirm" è inizialmente disabilitato (`disabled`) e diventa cliccabile solo dopo che il primo pagamento è andato a buon fine. Usare `waitForEnabled()` invece di `browser.pause()` rende il test più veloce e affidabile. `scrollIntoView()` è stato aggiunto per assicurarsi che il pulsante sia visibile nella viewport prima del click.

**`productPage.js`** — Page object per la pagina di dettaglio del prodotto. Contiene i getter per nome (`product-name`), prezzo (`unit-price`) e descrizione (`product-description`). Il link "Home" nella navbar è stato usato come breadcrumb perché il sito non ha un componente breadcrumb classico — la navbar con il link Home è l'unico modo per tornare al catalogo dalla pagina del prodotto.

---

### specs/

**`login.js`** — Contiene due test nello stesso `describe` perché testano entrambi il flusso di login ma con scenari diversi (successo e fallimento). Il `beforeEach` cancella i cookie invece di fare logout perché è più veloce e garantisce uno stato completamente pulito. I due `loginAs` sono rimasti dentro i singoli `it` e non nel `beforeEach` perché usano credenziali diverse — il `beforeEach` esegue lo stesso codice per tutti i test del describe, quindi non è possibile usarlo quando ogni test ha un setup diverso.

**`logout.js`** — Il login è stato spostato nel `beforeEach` perché c'è un solo `it` e tutti i test futuri del describe richiederebbero comunque il login. Dopo il logout si verifica che il pulsante `nav-sign-in` torni visibile invece di verificare un redirect, perché il sito non reindirizza a nessuna pagina specifica dopo il logout — semplicemente mostra di nuovo il pulsante di accesso.

**`search.js`** — Non richiede login perché la ricerca è una funzionalità pubblica del sito. La verifica usa una regex `/pliers/i` per essere case-insensitive e gestire varianti del nome. Si itera su tutti i prodotti trovati con un `for...of` invece di `Promise.all` per evitare problemi con la collezione lazy restituita da `$$`.

**`category.js`** — Analogo a `search.js` per la stessa motivazione sul login. La categoria viene selezionata cliccando sulla label invece del checkbox direttamente perché cliccando la label si seleziona automaticamente il checkbox associato, ed è più vicino al comportamento reale dell'utente.

**`sort.js`** — I prezzi vengono estratti in un array con un ciclo `for...of` invece di `Promise.all` perché `$$` restituisce un oggetto speciale di WebdriverIO che non è un array standard e non è direttamente iterabile con `Promise.all`. La verifica confronta ogni prezzo con il successivo nell'array per controllare l'ordinamento.

**`cart.js`** — Il `beforeEach` fa il login e naviga alla home perché entrambi i test (aggiunta e rimozione) partono dallo stesso stato. Il test di rimozione ripete il flusso di aggiunta al carrello invece di dipendere dallo stato lasciato dal test precedente, garantendo che ogni test sia indipendente.

**`checkout.js`** — È il test più complesso perché copre l'intero flusso end-to-end. Il `beforeEach` usa `browser.waitUntil()` per aspettare che l'URL contenga "account" dopo il login — questo è stato necessario perché senza questa attesa il checkout richiedeva di nuovo il login, sintomo che il redirect post-login non era ancora completato quando il test procedeva. Il checkout è stato suddiviso in più page object (`checkoutPage`, `addressPage`, `paymentPage`) per mantenere ogni classe focalizzata su un singolo step.

**`product.js`** — Non richiede login perché la pagina di dettaglio del prodotto è pubblica. Apre direttamente il prodotto tramite `CartPage.openProduct()` che usa la ricerca per nome, riutilizzando la logica già implementata. La verifica del breadcrumb si basa sul link Home della navbar poiché il sito non ha un componente breadcrumb dedicato.

---

## Scelte progettuali

### Page Object Model (POM)

Ogni pagina o componente del sito ha una classe dedicata nella cartella `pageobjects/`. Ogni classe raccoglie i **getter** (selettori degli elementi) e i **metodi** (azioni da eseguire sulla pagina), separando completamente la logica di test dalla struttura della pagina. Questo rende i test più leggibili e facili da manutenere: se un selettore cambia, si modifica solo nel page object e non in tutti i test.

### BasePage

Tutte le page object estendono `basePage.js`, che contiene il metodo `open(path)` per navigare a un URL relativo usando il `baseUrl` configurato in `wdio.conf.js`. Questo evita di ripetere l'URL base in ogni file.

### Fixtures in JSON

I dati di test sono centralizzati in file JSON separati per tipologia:
- `credentials.json` → credenziali degli utenti (email e password)
- `messages.json` → messaggi di errore attesi (es. "Invalid email or password")
- `address.json` → dati dell'indirizzo per il checkout
- `payment.json` → metodo di pagamento selezionato

Separare i dati dalla logica rende i test più puliti e permette di modificare i dati senza toccare il codice.

### Helper functions

La funzione `loginAs(user)` è stata estratta in un helper riutilizzabile perché il login è un'operazione comune a molti test. Invece di ripetere le stesse righe in ogni spec, si chiama `loginAs(users.firstUser)` e il test resta pulito e leggibile. Lo stesso vale per `waitForUrl(url)`, utilizzata per aspettare che il browser sia arrivato all'URL corretto dopo un'azione.

### HeaderComponent separato

La navbar (menu utente, pulsante sign out) è stata separata in un componente dedicato `headerComponent.js` perché è un elemento presente su tutte le pagine e non appartiene a nessuna pagina specifica. Viene usato nei test di logout dove è necessario interagire con il menu utente.

### Navigazione al prodotto tramite ricerca

Per il prodotto Pliers, invece di navigare direttamente all'URL (che contiene un ID dinamico che può cambiare ad ogni deploy), si è scelto di cercarlo tramite la barra di ricerca e cliccare sul risultato con testo esatto "Pliers". Questo rende il test più robusto e indipendente dall'ID del prodotto, evitando di dover aggiornare manualmente l'URL ogni volta che cambia.

### beforeEach con deleteCookies

Ogni `describe` usa un `beforeEach` per cancellare i cookie prima di ogni test, garantendo che ogni test parta da uno stato pulito senza sessioni residue dal test precedente. Nei test che richiedono il login, `loginAs` viene chiamato nel `beforeEach` così tutti gli `it` del describe partono già autenticati.

### waitForEnabled invece di pause

Per attendere che il pulsante "Confirm" nel checkout diventasse cliccabile (era inizialmente `disabled`), si è usato `waitForEnabled()` invece di `browser.pause()`. `waitForEnabled` aspetta attivamente che l'elemento sia abilitato, rendendo il test più veloce e affidabile rispetto a un'attesa fissa.

### scrollIntoView prima del click

Nel checkout, prima di cliccare il pulsante "Confirm" viene chiamato `scrollIntoView()` per assicurarsi che il pulsante sia visibile nella viewport prima di interagirci, evitando errori di click su elementi fuori schermo.

### waitForUrl nel checkout

Nel `beforeEach` del checkout viene usato `browser.waitUntil()` per aspettare che l'URL contenga "account" dopo il login, assicurandosi che il redirect post-login sia completato prima di procedere con il test.

---

## Scenari testati

| # | Scenario | File |
|---|----------|------|
| 1 | Login con credenziali corrette → redirect su `/account` | `login.js` |
| 2 | Login con password errata → verifica messaggio di errore | `login.js` |
| 3 | Logout → verifica pulsante Sign In visibile | `logout.js` |
| 4 | Ricerca "Pliers" → verifica che tutti i prodotti contengano "Pliers" | `search.js` |
| 5 | Filtro categoria "Hammer" → verifica prodotti filtrati | `category.js` |
| 6 | Ordinamento per prezzo crescente e decrescente → verifica ordine lista | `sort.js` |
| 7 | Aggiunta al carrello → verifica prodotto presente e count = 1 | `cart.js` |
| 8 | Rimozione dal carrello → verifica carrello vuoto e badge scomparso | `cart.js` |
| 9 | Checkout completo → login, prodotto, indirizzo, pagamento, conferma ordine | `checkout.js` |
| 10 | Dettaglio prodotto → verifica nome/prezzo/descrizione → breadcrumb → torna al catalogo | `product.js` |

---

## Installazione

```bash
npm install
```

---

## Esecuzione dei test

```bash
npm test
```

## Generazione del report

```bash
npm test
npm run report
```

`npm test` esegue tutti i test e genera i file di log nella cartella `reports`. `npm run report` combina i log in un unico file JSON e genera il report HTML finale.

Il report viene creato come file `reports/report.html` — un singolo file HTML autocontenuto che può essere:

- Aperto direttamente nel browser senza bisogno di un server
- Zippato e mandato via email
- Caricato su Teams, Drive, SharePoint o qualsiasi altro strumento

Non serve nessuna configurazione aggiuntiva per aprirlo — basta trascinarlo nel browser.

---

## Dipendenze per il report

Le dipendenze necessarie per generare il report sono già incluse nel `package.json` e vengono installate automaticamente con `npm install`:

- `wdio-mochawesome-reporter` — reporter che genera i file di log durante l'esecuzione dei test
- `mochawesome-merge` — combina i file di log in un unico JSON
- `mochawesome-report-generator` — genera il file HTML dal JSON

---



---

## Screenshot automatici

In caso di fallimento di un test, viene generato automaticamente uno screenshot salvato nella cartella `test/screenshots/` con il nome del test come nome del file. Questo è configurato nell'hook `afterTest` in `wdio.conf.js`.
