import { CreateNinjaDto } from './dto/create-ninja.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';
import { BeltGuard } from 'src/belt/belt.guard';
import {
  ApiCreatedResponse,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Ninja } from './entities/ninja.entity';

@ApiTags('Ninja')
@Controller('ninjas')
export class NinjasController {
  constructor(private readonly ninjaService: NinjasService) {}

  // GET /ninjas --> []
  @ApiResponse({ type: Ninja, isArray: true })
  @ApiQuery({ name: 'weapon', required: false })
  @Get()
  getNinijas(@Query('weapon') weapon: 'star' | 'nunchuck'): Ninja[] {
    return this.ninjaService.getNinjas(weapon);
  }

  // GET /ninjas/:id --> {...}
  @ApiResponse({ type: Ninja })
  @Get(':id')
  getOneNinja(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.ninjaService.getNinja(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  // POST /ninjas
  @ApiCreatedResponse({ type: Ninja })
  @Post()
  @UseGuards(BeltGuard)
  createNinja(@Body() body: CreateNinjaDto): Ninja {
    return this.ninjaService.createNinja(body);
  }

  // PUT /ninjas/:id --> {...}
  @ApiResponse({ type: Ninja })
  @Patch(':id')
  updateNinja(@Param('id') id: string, @Body() body: UpdateNinjaDto): Ninja {
    return this.ninjaService.updateNinja(+id, body);
  }

  // DELETE /ninjas/:id
  @ApiResponse({ type: Ninja })
  @Delete(':id')
  removeNinja(@Param('id') id: string) {
    return this.ninjaService.removeNinja(+id);
  }
}
