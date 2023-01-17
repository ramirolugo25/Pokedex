export class Pokemon {

    constructor(id, name, height, weight, types, sprites) {
        this.id = id;
        this.name = name;
        this.height = height;
        this.weight = weight;
        this.types = types;
        this.sprites = sprites;
    }

    primeraImagen(){
        return this.sprites.front_default;
    }

    segundaImagen(){
        return this.sprites.other['official-artwork'].front_default;
    }

    altura(){
        return `${this.height / 10} m`;
    }

    peso(){
        return `${this.weight / 10} kg`;
    }

    tipos(){
        let tipos = '';
        this.types.forEach((tipo) => {
            tipos += ` ${tipo.type.name}`;
        });
        return tipos
    }
}