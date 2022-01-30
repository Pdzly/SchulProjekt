const registeredgames = {}

export class game {
    constructor(id, Bezeichnung, BildID, Erscheinungsjahr, FSKZiffer, Genres, Kurztext, Platform, Spielzeit, Studio, StudioID, StudioURL, URL) {
        if (typeof id === "object") {
            this.Bezeichnung = id.Bezeichnung
            this.BildID = id.BildID
            this.Erscheinungsjahr = id.Erscheinungsjahr
            this.FSKZiffer = id.FSKZiffer
            this.Genres = id.Genres
            this.Kurztext = id.Kurztext
            this.Platform = id.Platform
            this.Spielzeit = id.Spielzeit
            this.Studio = id.Studio
            this.StudioID = id.StudioID
            this.StudioURL = id.StudioURL
            this.URL = id.URL
            this.SpielID = id.SpielID
        } else {
            this.Bezeichnung = Bezeichnung
            this.BildID = BildID
            this.Erscheinungsjahr = Erscheinungsjahr
            this.FSKZiffer = FSKZiffer
            this.Genres = Genres
            this.Kurztext = Kurztext
            this.Platform = Platform
            this.Spielzeit = Spielzeit
            this.Studio = Studio
            this.StudioID = StudioID
            this.StudioURL = StudioURL
            this.URL = URL
            this.SpielID = SpielID
        }
        registeredgames[this.SpielID] = this
    }

    print() {
        console.groupCollapsed("Game Instanz")
        console.log("Bezeichnung: " + this.Bezeichnung)
        console.log("Erscheinungsjahr: " + this.Erscheinungsjahr)
        console.log("FSKZiffer: " + this.FSKZiffer)
        console.groupEnd()
    }

    remove(){
        registeredgames[this.SpielID] = undefined
        delete this
    }

    static findgamebyid(id) {
        return registeredgames[id] ?? false
    }

}