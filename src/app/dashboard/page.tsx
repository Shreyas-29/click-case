import React from 'react';
import { db } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { formatPrice } from "@/lib/utils";
import { Progress } from "@/components/ui/Progress";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table"
import { StatusDropdown } from "@/components";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard",
};

const DashboardPage = async () => {

    const { getUser } = getKindeServerSession();
    const user = await getUser();

    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

    if (!user || (user?.email !== ADMIN_EMAIL)) {
        return notFound();
    };

    const orders = await db.order.findMany({
        where: {
            isPaid: true,
            createdAt: {
                // Get orders from the last 7 days
                gte: new Date(new Date().setDate(new Date().getDate() - 7)),
            },
        },
        orderBy: {
            createdAt: "desc",
        },
        include: {
            user: true,
            shippingAddress: true,
        },
    });

    const lastWeekSum = await db.order.aggregate({
        where: {
            isPaid: true,
            createdAt: {
                // get orders from the last 7 days
                gte: new Date(new Date().setDate(new Date().getDate() - 7)),
            },
        },
        _sum: {
            amount: true,
        }
    });
    const lastMonthSum = await db.order.aggregate({
        where: {
            isPaid: true,
            createdAt: {
                // this is not a perfect way to get the last month's orders
                // get orders from the last month
                gte: new Date(new Date().setDate(new Date().getDate() - 30)),
            },
        },
        _sum: {
            amount: true,
        }
    });

    const WEEKLY_GOAL = 500;
    const MONTHLY_GOAL = 2000;

    if (!orders) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-2xl font-semibold text-muted-foreground">No orders found</p>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen w-full bg-muted/40">
            <div className="max-w-7xl w-full mx-auto flex flex-col sm:gap-4 sm:py-4">
                <div className="flex flex-col gap-16 p-4 lg:p-0 pb-12 lg:pb-12">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardDescription>
                                    Last week&apos;s revenue
                                </CardDescription>
                                <CardTitle className="text-4xl">
                                    {formatPrice(lastWeekSum._sum.amount ?? 0)}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-sm text-muted-foreground">
                                    of {formatPrice(WEEKLY_GOAL)} goal
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Progress
                                    value={((lastWeekSum._sum.amount ?? 0) * 100) / WEEKLY_GOAL}
                                    className="w-full h-2"
                                />
                            </CardFooter>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardDescription>
                                    Last month&apos;s revenue
                                </CardDescription>
                                <CardTitle className="text-4xl">
                                    {formatPrice(lastMonthSum._sum.amount ?? 0)}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-sm text-muted-foreground">
                                    of {formatPrice(MONTHLY_GOAL)} goal
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Progress
                                    value={((lastMonthSum._sum.amount ?? 0) * 100) / MONTHLY_GOAL}
                                    className="w-full h-2"
                                />
                            </CardFooter>
                        </Card>
                    </div>

                    <h1 className="text-4xl font-bold tracking-tight">
                        Incoming orders
                    </h1>

                    <Table>
                        <TableCaption>A list of your recent orders.</TableCaption>
                        <TableHeader className="bg-accent/80">
                            <TableRow>
                                <TableHead>Customer</TableHead>
                                <TableHead className="hidden sm:table-cell">Status</TableHead>
                                <TableHead className="hidden sm:table-cell">Purchase date</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders?.map((order) => (
                                <TableRow key={order.id} className="bg-background/60">
                                    <TableCell className="font-medium">
                                        <div className="font-medium capitalize">
                                            {order.shippingAddress?.name ?? order.user?.name}
                                        </div>
                                        <div className="hidden text-sm md:inline-block text-muted-foreground">
                                            {order.user?.email}
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        <StatusDropdown id={order.id} orderStatus={order.status} />
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {formatPrice(order.amount)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                </div>
            </div>
        </div>
    )
};

export default DashboardPage
