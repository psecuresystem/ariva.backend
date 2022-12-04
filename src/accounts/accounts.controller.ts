import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { User } from 'src/entities/user.entity';
import { AccountsService } from './accounts.service';
import { TransferDTO } from './dto/transfer.dto';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @UseGuards(JwtGuard)
  @Post('transfer')
  transfer(
    @Body() transferDto: TransferDTO,
    @Req() req: Request & { user: User },
  ) {
    return this.accountsService.transfer(transferDto, req.user);
  }

  @UseGuards(JwtGuard)
  @Post('deposit')
  deposit(
    @Body(
      'amount',
      new ValidationPipe({
        transform: true,
      }),
    )
    amount: number,
    @Req() req: Request & { user: User },
  ) {
    return this.accountsService.deposit(amount, req.user);
  }

  @UseGuards(JwtGuard)
  @Post('withdraw')
  withdraw(
    @Body(
      'amount',
      new ValidationPipe({
        transform: true,
      }),
    )
    amount: number,
    @Req() req: Request & { user: User },
  ) {
    return this.accountsService.withdraw(amount, req.user);
  }
}
