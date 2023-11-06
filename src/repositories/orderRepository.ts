import prisma from "../config/dbConfig";
import { OrderAttributes } from "../domain/models/Order";
import { Optional } from "../utils/option";

import { ProductRepository } from "./productRepository";

export interface IOrderRepository {
  createOrder(
    body: Optional<OrderAttributes, "id">,
    email: string
  ): Promise<OrderAttributes | null>;
}

export const OrderRepository: IOrderRepository = {
  createOrder: async (body: Optional<OrderAttributes, "id">, email: string) => {
    try {
      const price = await ProductRepository.getProductPrice(body.productName);

      if (!price) return null;

      const newOrder = await prisma.order.create({
        data: {
          type: body.type,
          status: body.status,
          userEmail: email,
          productName: body.productName,
          productPrice: price,
          amount: body.amount,
          fee: body.fee,
        },
      });
      if (newOrder) return newOrder as OrderAttributes;
      else return null;
    } catch (error: unknown) {
      console.log(error);
      return null;
    }
  },
};
