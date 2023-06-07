import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';

import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ) {}




  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
      
    } catch (error) {
      this.handleExceptions(error);
    }
  }




  findAll() {
    return `This action returns all pokemon`;
  }





  async findOne(itemToSearch: string) {
    let pokemon: Pokemon;

    // Pokemon number
    if (!isNaN(+itemToSearch)) {
      pokemon = await this.pokemonModel.findOne({nro: itemToSearch});
    } else if (isValidObjectId(itemToSearch)) {
      pokemon = await this.pokemonModel.findById(itemToSearch);
    } else {
      pokemon = await this.pokemonModel.findOne({name: itemToSearch.toLocaleLowerCase().trim()});
    }

    if (!pokemon) {
      throw new NotFoundException(`Item ${itemToSearch} not found`);
    }

    return pokemon;
  }




  async update(itemToUpdate: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(itemToUpdate);
    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase('es-ES');
    }
    
    try {
      await pokemon.updateOne(updatePokemonDto);
      return { ...pokemon.toJSON(), ...updatePokemonDto};
      
    } catch (error) {
      this.handleExceptions(error);
    }

  }



  
  async remove(id: string) {
    //const pokemon = await this.findOne(id);
    //await pokemon.deleteOne();

    //const result = await this.pokemonModel.findByIdAndDelete(id);
    const {deletedCount} = await this.pokemonModel.deleteOne({_id: id});
    if (deletedCount === 0) {
      throw new BadRequestException(`Pokemon with id ${id} not found`);
    }
    return;
  }



  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Pokemon already exist on db ${ JSON.stringify(error.keyValue)}`);
    }
    console.log(error);
    throw new InternalServerErrorException(`Cant't create Pokemon - Check server logs`);
  }

}
