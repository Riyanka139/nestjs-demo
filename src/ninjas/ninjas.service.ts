import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NinjasService {
  private ninjas = [
    { id: 1, name: 'A', weapon: 'star' },
    { id: 2, name: 'B', weapon: 'nunchuck' },
  ];

  getNinjas(weapon?: 'star' | 'nunchuck') {
    if (weapon) {
      return this.ninjas.filter((ninjas) => ninjas.weapon === weapon);
    }
    return this.ninjas;
  }

  getNinja(id: number) {
    const ninja = this.ninjas.find((ninja) => ninja.id === id);
    if (!ninja) {
      throw new Error('Ninja not found');
    }
    return ninja;
  }

  createNinja(detail: CreateNinjaDto) {
    this.ninjas.push({ id: Math.ceil(Math.random() * 100), ...detail });
    return this.ninjas[this.ninjas.length - 1];
  }

  updateNinja(id: number, detail: UpdateNinjaDto) {
    this.ninjas = this.ninjas.map((ninja) => {
      if (ninja.id === id) {
        return { ...ninja, ...detail };
      }
      return ninja;
    });
    return this.getNinja(id);
  }

  removeNinja(id: number) {
    const toBeRemove = this.getNinja(id);
    this.ninjas = this.ninjas.filter((ninja) => ninja.id !== id);
    return toBeRemove;
  }
}
