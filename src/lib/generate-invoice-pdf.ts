import { PDFDocument, PDFFont, StandardFonts, rgb } from "pdf-lib";
import { ExtendedOrder } from "@/types/order";
import { formatPrice } from "./utils";
import getFont from "./font";

const formatModelName = (model: string) => {
    return model.replace(/(\D+)(\d+)/, (_, p1, p2) => {
        return `${p1.charAt(0).toUpperCase() + p1.slice(1)} ${p2}`;
    });
};

const formatStatus = (status: string) => {
    switch (status) {
        case "shipped":
            return "Shipped";
        case "fulfilled":
            return "C";
        case "awaiting_shipment":
            return "Waiting for Shipment";
    }
}

const generateInvoicePDF = async (order: ExtendedOrder) => {
    if (!order) throw new Error("Order is required");
    const { id, amount, billingAddress, shippingAddress, configuration, isPaid, createdAt, status, user } = order;

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);

    const interRegular = await getFont(pdfDoc, "Inter-Regular");
    const interBold = await getFont(pdfDoc, "Inter-Bold");

    const orderIdText = `Order ID: ${id}`;
    const totalPriceText = `Total Price: ${formatPrice(amount)}`;
    const orderDateText = `Order Date: ${createdAt.toDateString()}`;
    const orderStatusText = `Order Status: ${formatStatus(status)}`;
    const isPaidText = `Payment Status: ${isPaid ? "Paid" : "Not Paid"}`;

    const userText = `Email: ${user.email}`;

    const formattedModel = formatModelName(configuration.model!);
    const modelText = `Model: ${formattedModel}`;
    // const modelText = `Model: ${configuration.model.replace(/(\w)(\w*)/g, (g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase())}`;
    const materialText = `Material: ${configuration.material!.charAt(0).toUpperCase() + configuration.material!.slice(1)}`;
    const finishText = `Finish: ${configuration.finish!.charAt(0).toUpperCase() + configuration.finish!.slice(1)}`;
    const colorText = `Color: ${configuration.color!.charAt(0).toUpperCase() + configuration.color!.slice(1)}`;

    const drawText = (text: string, x: number, y: number, size: number, font?:PDFFont) => {
        page.drawText(text, {
            x, y, size: size ? size : 12, font, color: rgb(0, 0, 0),
        });
    };

    // Header
    drawText("INVOICE", 50, 750, 24, interBold);

    // Order Info
    drawText(orderIdText, 50, 720, 14);
    drawText(orderDateText, 50, 700, 14);
    drawText(orderStatusText, 50, 680, 14);
    drawText(isPaidText, 50, 660, 14);

    // User Info
    drawText(userText, 50, 640, 14);

    // Addresses
    drawText("Billing Address:", 50, 600, 14,interBold);
    drawText(`${billingAddress.street}`, 50, 580, 12);
    drawText(`${billingAddress.city}, ${billingAddress.state}, ${billingAddress.zip}`, 50, 560, 12);

    drawText("Shipping Address:", 300, 600, 14,interBold);
    drawText(`${shippingAddress.street}`, 300, 580, 12);
    drawText(`${shippingAddress.city}, ${shippingAddress.state}, ${shippingAddress.zip}`, 300, 560, 12);

    // Configuration
    drawText(modelText, 50, 530, 14);
    drawText(materialText, 50, 510, 14);
    drawText(finishText, 50, 490, 14);
    drawText(colorText, 50, 470, 14);

    // Product Info
    drawText("Product Information", 50, 430, 16, interBold);
    drawText(`Preview: ${configuration.url.trim()}`, 50, 410, 14);

    // Total Price
    drawText(totalPriceText, 50, 380, 15);

    // Footer
    drawText("Thank you for your purchase!", 50, 350, 14, interBold);

    const pdfBytes = await pdfDoc.save();

    return new Blob([pdfBytes], { type: "application/pdf" });
};

export default generateInvoicePDF;
