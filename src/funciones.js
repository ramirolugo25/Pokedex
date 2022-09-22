function cargarPokemones(numeroPagina){
    mostrarContenedorCargando();

    fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${(numeroPagina-1)*20}&limit=20`)
    .then(respuestaPokemones => respuestaPokemones.json())
    .then(respuestaPokemonesJSON => {
        
        borrarPokemones();
        const pokemones = respuestaPokemonesJSON.results;
        agregarClasesNombresPokemones(pokemones);
        return pokemones;

        
    })
    .then(pokemones => {

        pokemones.forEach(pokemon => {

            fetch(`${pokemon.url}`)
            .then(respuestaPokemon => respuestaPokemon.json())
            .then(respuestaPokemonJSON => {
                agregarPokemon(respuestaPokemonJSON);
            })
                
        });
    })
    .then(() =>{
        ocultarContenedorCargando();
    })
}

function borrarPokemones(){
    document.querySelectorAll('.pokemon').forEach($pokemon => {
        $pokemon.remove();
    })
}


function agregarClasesNombresPokemones(pokemones){
    pokemones.forEach(pokemon => {
        const $contenedorPokemon = document.createElement('div');
        $contenedorPokemon.classList.add(`${pokemon.name}`);
        $contenedorPokemon.onclick = manejarInputPokemon;
        const $contenedorPokemones = document.querySelector('#contenedor-pokemones');
        $contenedorPokemones.appendChild($contenedorPokemon);
    });
}




function agregarPokemon(respuestaPokemonJSON) {
    
    const imagenPokemon = document.createElement('img');
    if(respuestaPokemonJSON.sprites.front_default === null){
        imagenPokemon.src = 'imagenes/bola-pokemon.png';
    }else{
        imagenPokemon.src = respuestaPokemonJSON.sprites.front_default;
    }
    
    
    const $labelID = document.createElement('label');
    const textoID = document.createTextNode(respuestaPokemonJSON.id);
    $labelID.appendChild(textoID);

    const $labelNombre = document.createElement('label');
    const nombrePokemon = document.createTextNode(respuestaPokemonJSON.name);
    $labelNombre.appendChild(nombrePokemon);

    
    const $contenedorPokemon = document.querySelector(`.${respuestaPokemonJSON.name}`);
    $contenedorPokemon.classList.add('pokemon');
    $contenedorPokemon.appendChild(imagenPokemon);
    $contenedorPokemon.appendChild($labelID);
    $contenedorPokemon.appendChild($labelNombre);
}

function cargarPaginacion(){
    fetch('https://pokeapi.co/api/v2/pokemon/')
    .then(respuesta =>  respuesta.json())
    .then(respuestaJSON => {
        const cantidadPokemones = respuestaJSON.count;
        const cantidadPokemonesPorPagina = 20;
        const cantidadPaginas = Math.ceil(cantidadPokemones / cantidadPokemonesPorPagina);
        numeroUltimaPagina = cantidadPaginas;
        
        const $paginacion = document.querySelector('#paginacion');

        for(let i=1; i<=cantidadPaginas; i++){
            const $boton = document.createElement('button');
            $boton.id = `boton-${i}`;
            $boton.classList.add('boton-paginacion');
            $boton.innerText = i;
            $paginacion.appendChild($boton);
        }
        cargarBotonPosterior();
        desabilitarPrimeraPagina();
        

        
    })
    .then( () =>{
        document.querySelectorAll('.boton-paginacion').forEach($botonPaginacion =>{
           $botonPaginacion.onclick = manejarInputBotonesPaginacion
        })

        document.querySelector('#anterior').onclick = manejarInputBotonesPaginacion
        document.querySelector('#posterior').onclick = manejarInputBotonesPaginacion
    })
};

function cargarBotonPosterior(){
    const $paginacion = document.querySelector('#paginacion');
    const $boton = document.createElement('button');
    $boton.id = 'posterior';
    $boton.innerText = `»`;
    $paginacion.appendChild($boton);
}

function desabilitarPrimeraPagina(){
    document.querySelector('#boton-1').disabled = true;
}

function manejarInputBotonesPaginacion(e){

    const $boton = e.target;
    const idBoton = $boton.id;

    if (idBoton === 'anterior'){
        document.querySelector(`#boton-${numeroPaginaActual}`).disabled = false;
        numeroPaginaActual--;
        document.querySelector(`#boton-${numeroPaginaActual}`).disabled = true;
    } else if (idBoton === 'posterior'){
        document.querySelector(`#boton-${numeroPaginaActual}`).disabled = false;
        numeroPaginaActual++;
        document.querySelector(`#boton-${numeroPaginaActual}`).disabled = true;
    }else{
        const numeroBoton = $boton.textContent;
        document.querySelector(`#boton-${numeroPaginaActual}`).disabled = false;
        numeroPaginaActual = numeroBoton;
        document.querySelector(`#boton-${numeroPaginaActual}`).disabled = true;
    }



    if(numeroPaginaActual == 1){
        document.querySelector('#anterior').disabled = true;
    }else{
        document.querySelector('#anterior').disabled = false;
    }
    if(numeroPaginaActual == numeroUltimaPagina){
        document.querySelector('#posterior').disabled = true;
    }else{
        document.querySelector('#posterior').disabled = false;
    }


    cargarPokemones(numeroPaginaActual);
}

function manejarInputPokemon(){
    mostrarContenedorCargando();
    const nombrePokemon = this.classList[0];
    
    fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`)
    .then(pokemon => pokemon.json())
    .then(pokemonJSON =>{
        cargarPokemonTarjeta(pokemonJSON);

    })
    .then(() => {
        ocultarContenedorCargando();
    })
}

function bloquearInput(){
    document.querySelectorAll('.pokemon').forEach(pokemon => {
        pokemon.onclick = function(){};
    })
    document.querySelectorAll('.boton-paginacion').forEach(boton => {
        boton.onclick = function(){};
    })
    document.querySelector('#anterior').onclick = function(){};
    document.querySelector('#posterior').onclick = function(){};
    document.querySelector('#busqueda input').disabled = true;
    document.querySelector('#boton-buscar').onclick = function(){};
}

function manejarInputQuit(){
    document.querySelector('#tarjeta-pokemon').className = 'oculto';
    document.querySelectorAll('.pokemon').forEach(pokemon => {
        pokemon.onclick = manejarInputPokemon;
    })
    document.querySelectorAll('.boton-paginacion').forEach(boton => {
        boton.onclick = manejarInputBotonesPaginacion;
    })
    document.querySelector('#anterior').onclick = manejarInputBotonesPaginacion;
    document.querySelector('#posterior').onclick = manejarInputBotonesPaginacion;
    document.querySelector('#busqueda input').disabled = false;
    document.querySelector('#boton-buscar').onclick = manejarInputBuscar;
}

function manejarInputBuscar(){
    mostrarContenedorCargando()
    document.querySelector('#error').className = 'oculto';
    const valorInput = document.querySelector('#busqueda input').value.toLowerCase();
    
    fetch(`https://pokeapi.co/api/v2/pokemon/${valorInput}`)
    .then(respuesta => {
        if(respuesta.ok){
            return respuesta.json();
        }else{
            return 'Pokemon no encontrado';
        }
    })
    .then(respuestaPokemon => {
        if(respuestaPokemon === 'Pokemon no encontrado'){
            document.querySelector('#error').className = '';
        }else{
            document.querySelector('#error').className = 'oculto';
            cargarPokemonTarjeta(respuestaPokemon);
        }
    })
    .then(() => {
        ocultarContenedorCargando();
    })
}

function cargarPokemonTarjeta(pokemon){
    const urlImagenPokemon = pokemon.sprites.other['official-artwork'].front_default
        if(urlImagenPokemon){
            document.querySelector('#tarjeta-pokemon #imagen-pokemon').src = urlImagenPokemon;
        }else{
            document.querySelector('#tarjeta-pokemon #imgen-pokemon').src = 'imagenes/bola-pokemon.png'
        }

        document.querySelector('#tarjeta-pokemon #id').textContent = `Id: ${pokemon.id}`;
        document.querySelector('#tarjeta-pokemon #name').textContent = `Name: ${pokemon.name}`;
        document.querySelector('#tarjeta-pokemon #height').textContent = `Height: ${pokemon.height / 10} m`;
        document.querySelector('#tarjeta-pokemon #weight').textContent = `Weight: ${pokemon.weight / 10} kg`;

        let type = '';
        pokemon.types.forEach(tipo =>{
            type += ` ${tipo.type.name} `;
        })

        document.querySelector('#tarjeta-pokemon #tipos').textContent = `Tipo: ${type}`;
        document.querySelector('#tarjeta-pokemon').className = 'tarjeta-pokemon';
        bloquearInput();
}

function mostrarContenedorCargando(){
    document.querySelector('#carga').className = 'carga';
}

function ocultarContenedorCargando(){
    document.querySelector('#carga').className = 'oculto';
}