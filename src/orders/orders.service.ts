import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { PaginationDto } from '../common/dto/pagination.dto.js';
import { OrderPaginationDto } from './dto/order-paginations.dto.js';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) { }

  async create(createOrderDto: CreateOrderDto) {
    return await this.prisma.order.create({ data: createOrderDto });
  }

  async findAll(paginationDto: OrderPaginationDto) {
    const { page = 1, limit = 10, status } = paginationDto;

    const totalOrders = await this.prisma.order.count({
      where: {
        status,
      },
    });

    const lastPage = Math.ceil(totalOrders / limit);

    return {
      data: await this.prisma.order.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: {
          status,
        }
      }),
      meta: {
        total: totalOrders,
        page: page,
        lastPage: lastPage,
      },
    };
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findFirst({
      where: {
        id: id,
      },
    });

      if (!order) {
      throw new RpcException({status: HttpStatus.BAD_REQUEST,
        message:`Order with ${id} not found.`});
    }

    return order;
  }

  changeOrderStatus() {

  }



}
