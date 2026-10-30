# Dorino — CloudStream in italiano

Repository personale che seleziona estensioni in lingua italiana e Arte dalla raccolta [doGior/doGiorsHadEnough](https://github.com/doGior/doGiorsHadEnough), più le estensioni italiane di [PriSynx](https://github.com/qwertyuiop8899/prisynx_cs3) che doGior non ha o che segna come non disponibili (es. RaiPlay, RealTime, Altadefinizione, CB01).

## Installazione su Fire TV
CloudStream → Impostazioni → Estensioni → Aggiungi repository.

- Nome: **Dorino**
- URL: `https://raw.githubusercontent.com/dori16/dorino/main/repo.json`

Apri la repository e installa singolarmente le estensioni desiderate. Se non compaiono, controlla il filtro lingua delle estensioni: Arte è etichettata inglese dall'autore ma comprende anche contenuti in italiano.

## Aggiornamenti e provenienza
Il workflow aggiorna plugins.json ogni 12 ore e può essere avviato manualmente da Actions → Update extensions → Run workflow. GitHub può ritardare le esecuzioni e disabilitare quelle pianificate dopo un periodo di inattività.
Le estensioni .cs3 sono scaricate direttamente dalle repository originali; a parità di nome vince doGior, salvo quando la sua versione è non disponibile; autori, URL, versioni e hash restano quelli pubblicati a monte. Dorino non ospita video e non ricompila o modifica le estensioni.

Gli stati sono dichiarati dall'autore originale (0 non disponibile, 1 disponibile, 2 lento, 3 beta); non sono una verifica della riproduzione. Le estensioni disabilitate sono mantenute nell'elenco per consentire il ripristino da parte dell'autore.
Usa le fonti per contenuti a cui hai diritto di accedere.

## Verifiche
Manifest e metadati verificati rispetto alla struttura Repository/SitePlugin di CloudStream. Riproduzione e compatibilità sulla Fire TV non testate.
