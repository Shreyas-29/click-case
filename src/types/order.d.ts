import { Configuration, Order, User } from "@prisma/client";

export type ExtendedOrder = Order & {
    user: User;
    configuration: Configuration;
    shippingAddress: ShippingAddress | null;
    billingAddress: BillingAddress | null;
};