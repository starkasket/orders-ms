import { OrderStatus } from "../../generated/prisma/enums.js";

export const OrderStatusList = [
    OrderStatus.PENDING,
    OrderStatus.PROCESSING,
    OrderStatus.DELIVERED,
    OrderStatus.CANCELLED
]