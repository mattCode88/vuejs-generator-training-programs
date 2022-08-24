const app = new Vue({

    el: '#app',

    data: {

        schedaSelezionata: 0,
        schedeComplete: false,
        erroreDiCompilazione: false,
        erroreDiElaborazione: false,
        print: false,
        
        arraySchede: [
            {
                scheda: 'Scheda1',
                esercizi: 1,
                confermata: false,
                specifiche: [{
                    esercizio: '',
                    ripetizioni: '',
                    serie: '',
                    recupero: '',
                    descrizione: ''
                }]
            }
        ],

        Scheda: class {
            scheda;
            confermata;
            specifiche;
            constructor(
                scheda,
                confermata,
                specifiche
            ) {
                this.scheda = scheda;
                this.confermata = confermata;
                this.specifiche = specifiche;
            }
        },

        Specifica: class {
            esercizio;
            ripetizioni;
            serie;
            recupero;
            descrizione;
            constructor(
                esercizio,
                ripetizioni,
                serie,
                recupero,
                descrizione
            ) {
                this.esercizio = esercizio;
                this.ripetizioni = ripetizioni;
                this.serie = serie;
                this.recupero = recupero;
                this.descrizione = descrizione
            }
        },

    },

    methods: {

        aggiungiScheda() {
            if (this.arraySchede.length < 7) {
                let nuovoEsercizio = new this.Specifica('', '', '', '', '');
                let nuovaScheda = new this.Scheda('Scheda' + (this.arraySchede.length + 1), false, [nuovoEsercizio]);
                this.arraySchede.push(nuovaScheda); 
            }
        },

        aggiungiEsercizio() {
            this.erroreDiCompilazione = false;
            let nuovoEsercizio = new this.Specifica('', '', '', '', '');
            this.arraySchede[this.schedaSelezionata].specifiche.push(nuovoEsercizio);
            if (this.arraySchede[this.schedaSelezionata].confermata) this.arraySchede[this.schedaSelezionata].confermata = false;
        },

        rimuoviScheda(index) {
            this.erroreDiCompilazione = false;
            this.schedaSelezionata = 0;
            this.arraySchede.splice(index, 1);
            this.arraySchede.map((scheda, index) => scheda.scheda = 'Scheda' + (index + 1));
            if (this.arraySchede.length === 0) this.erroreDiElaborazione = false;
        },

        rimuoviEsercizio(index) {
            if (this.arraySchede[this.schedaSelezionata].specifiche.length > 1) {
                this.erroreDiCompilazione = false;
                this.arraySchede[this.schedaSelezionata].specifiche.splice(index, 1);
            }
        },

        selezionaScheda(index) {
            this.erroreDiCompilazione = false;
            this.schedaSelezionata = index;
        },

        confermaScheda(event) {
            this.erroreDiCompilazione = false;
            let arrayDiLavoro = this.verificaCompilazioneForm(event);
            if (this.arraySchede[this.schedaSelezionata].specifiche.length * 5 !== arrayDiLavoro.length) {
                this.erroreDiCompilazione = true;
            } else {
                let count = 0;
                for (
                    let i = 0;
                    i < this.arraySchede[this.schedaSelezionata].specifiche.length;
                    i++
                ){
                    this.arraySchede[this.schedaSelezionata].specifiche[i].esercizio = arrayDiLavoro[count];
                    this.arraySchede[this.schedaSelezionata].specifiche[i].ripetizioni = arrayDiLavoro[count + 1];
                    this.arraySchede[this.schedaSelezionata].specifiche[i].serie = arrayDiLavoro[count + 2];
                    this.arraySchede[this.schedaSelezionata].specifiche[i].recupero = arrayDiLavoro[count + 3];
                    this.arraySchede[this.schedaSelezionata].specifiche[i].descrizione = arrayDiLavoro[count + 4];
                    count += 5;
                }
                this.arraySchede[this.schedaSelezionata].confermata = true;
            } 
        },

        verificaCompilazioneForm(event) {
            let array = [];
            for (item of event.target.elements) {
                if (item.tagName === 'INPUT' && item.type === 'text' && item.value !== '') {
                    array.push(item.value);
                };
                if (item.tagName === 'INPUT' && item.type === 'number' && item.valueAsNumber > 0) {
                    array.push(item.value);
                };
                if (item.tagName === 'TEXTAREA' && item.value !== '') {
                    array.push(item.value);
                };
            }
            return array;
        },

        elaboraProgramma() {
            let count = 0;
            this.arraySchede.forEach(scheda => {
                if (scheda.confermata) count++;
            });
            if (count < this.arraySchede.length) {
                this.erroreDiElaborazione = true;
            } else {
                this.erroreDiElaborazione = false;
                this.schedeComplete = true;
            }
        },

        stampaProgramma() {
            this.print = true;
            setTimeout(function () {
                window.print();
            }, 100)
            window.onafterprint = () => this.print = false;
        },

        resetApp() {
            this.schedaSelezionata = 0;
            this.schedeComplete = false;
            this.arraySchede = [
                {
                    scheda: 'Scheda1',
                    esercizi: 1,
                    confermata: false,
                    specifiche: [{
                        esercizio: '',
                        ripetizioni: '',
                        serie: '',
                        recupero: '',
                        descrizione: ''
                    }]
                }
            ];
        },

    }
})