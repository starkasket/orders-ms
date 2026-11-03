import { Type } from 'class-transformer';
import { IsEnum, IsOptional, IsPositive } from 'class-validator';
import { OrderStatusList } from '../../orders/enum/order.enum.js';
import { OrderStatus } from '../../generated/prisma/enums.js';

export class PaginationDto {
    @IsPositive()
    @IsOptional()
    @Type(() => Number)
    page?: number = 1;

    @IsPositive()
    @IsOptional()
    @Type(() => Number)
    limit?: number = 10;

}

