import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ) {}

  async fillDatabase() {

    await this.pokemonModel.deleteMany({}); // Elimina todos los elementos

    const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');
    
    //const promisesArray = []; // v2
    const pokemonsArray: { name:string, nro:number }[] = [];

    //data.results.forEach(async ({name, url}) => {
    data.results.forEach(({name, url}) => {
        const segments = url.split('/');
      const nro:number = +segments[segments.length-2];

      //const pokemon = await this.pokemonModel.create({ name, nro }) // v2
      pokemonsArray.push({ name, nro });

      //console.log({ name, nro});
    });

    await this.pokemonModel.insertMany(pokemonsArray);
    //await Promise.all(promisesArray); // v2
    
    return data;
  }

}
