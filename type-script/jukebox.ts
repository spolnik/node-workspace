interface Audio {
    play(): any;
}

class Song implements Audio {
    constructor(private artist: string, private title: string) {}

    play() {
        console.log(`Playing ${this.title} by ${this.artist}`)
    }

    static Comparer(a: Song, b: Song) {
        if (a.title === b.title) {
            return 0;
        }

        return a.title > b.title ? 1 : -1;
    }
}

class Jukebox implements Audio {
    constructor(private songs: Song[]) {}

    play() {
        const song = this.getRandomSong();
        song.play();
    }

    private getRandomSong(): Song {
        const songCount = this.songs.length;
        const songIndex = Math.floor(Math.random() * songCount);

        return this.songs[songIndex];
    }
}

class Playlist {
    static maxSongCount: number = 30;

    constructor(public name: String, protected songs?: Audio[]) {}

    addSong(song: Song) {
        if (this.songs.length >= Playlist.maxSongCount) {
            throw new Error("Playlist is full");
        }

        this.songs.push(song);
    }

    play() {
        const song = this.songs.pop();
        song.play();
    }

    sort() {
        this.songs.sort(Song.Comparer);
    }
}

class RepeatingPlaylist extends Playlist {
    private songIndex = 0;

    constructor(songs: Song[]) {
        super("Repeating playlist", songs);
    }

    play() {
        this.songs[this.songIndex++].play();

        if (this.songIndex >= this.songs.length) {
            this.songIndex = 0;
        }
    }
}

let songs = [
    new Song('Bushbaby', 'Megaphone'),
    new Song('Delays', 'One More Lie In'),
    new Song('Goober Gun', 'Stereo'),
    new Song('Sohnee', 'Shatter'),
    new Song('Get Amped', 'Celebrity')
];

const jukebox = new Jukebox(songs);
jukebox.play();

let playlist = new Playlist("My Playlist", songs);
console.log(playlist.name);
playlist.addSong(new Song("Therapy?", "Crooked Timber"));
playlist.play();