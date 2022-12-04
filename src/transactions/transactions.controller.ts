import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { User } from 'src/entities/user.entity';
import { TransactionsService } from './transactions.service';
import { Document } from 'mongoose';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @UseGuards(JwtGuard)
  @Get()
  findAll(@Req() req: Request & { user: User & Document }) {
    return this.transactionsService.findAll(req.user);
  }
}
