new Vue({
    el: '#app',
    data: {
        saludJugador: 100,
        saludMonstruo: 100,
        hayUnaPartidaEnJuego: false,
        turnos: [], //es para registrar los eventos de la partida
        esJugador: false,
        rangoAtaque: [3, 10],
        rangoAtaqueEspecial: [10, 20],
        rangoAtaqueDelMonstruo: [5, 12],
    },

    methods: {
        getSalud(salud) {
            return `${salud}%`
        },
        empezarPartida: function () {
            this.hayUnaPartidaEnJuego = true
            this.saludJugador = 100
            this.saludMonstruo = 100
            this.turnos =[]
        },
        atacar: function () {
            let herida = this.calcularHeridas(this.rangoAtaque)
            this.saludMonstruo -= herida
            let evento = {
                esJugador: true,
                text: `El jugador golpea al monstruo por ${herida}%`
            }
            this.registrarEvento(evento)
            if (this.verificarGanador()) {
                return
            }
            this.ataqueDelMonstruo()
        },

        ataqueEspecial: function () {
            let herida = this.calcularHeridas(this.rangoAtaqueEspecial)
            this.saludMonstruo -= herida
            let evento = {
                esJugador: true,
                text: `El jugador golpea duramente al monstruo por ${herida}%`
            }
            this.registrarEvento(evento)
            if (this.verificarGanador()) {
                return
            }            
            this.ataqueDelMonstruo()
        },

        curar: function () {
            if (this.saludJugador <= 90){
                this.saludJugador += this.rangoAtaque[1]
            } else{
                this.saludJugador = 100
            }
            let evento = {
                esJugador: true,
                text: 'El jugador cura su salud en un 10%'
            }
            this.registrarEvento(evento)
            this.ataqueDelMonstruo()
        },

        registrarEvento(evento) {
            this.turnos.unshift(evento)
        },

        terminarPartida: function () {
            this.hayUnaPartidaEnJuego = false
        },

        ataqueDelMonstruo: function () {
            let herida = this.calcularHeridas(this.rangoAtaqueDelMonstruo)
            this.saludJugador -= herida
            let evento ={
                esJugador: false,
                text: `El monstruo lastima al jugador en ${herida}%`
            }
            this.registrarEvento(evento)
            this.verificarGanador()
        },

        calcularHeridas: function (rango) {
            return Math.max(Math.floor(Math.random() * rango[1]) + 1, rango[0])

        },
        verificarGanador: function () {
            if (this.saludMonstruo <= 0) {
                if (confirm('Ganaste! Jugar de nuevo?')) {
                    this.empezarPartida()
                }else {
                    this.hayUnaPartidaEnJuego = false
                }
                return true
            }else if (this.saludJugador <= 0) {
                if (confirm('Perdiste! Jugar de nuevo?')) {
                    this.empezarPartida()
                }else {
                    this.hayUnaPartidaEnJuego = false
                }
                return true
            }
            return false;
        },
        cssEvento(turno) {
            //Este return de un objeto es prque vue asi lo requiere, pero ponerlo acá queda mucho mas entendible en el codigo HTML.
            return {
                'player-turno': turno.esJugador,
                'monster-turno': !turno.esJugador
            }
        },
        
    }
});