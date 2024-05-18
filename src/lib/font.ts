import { PDFDocument } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";

const getFont = async (pdfDoc: PDFDocument, fontName: string) => {
    pdfDoc.registerFontkit(fontkit);
    const fontUrl = `/fonts/${fontName}.ttf`;
    const fontBytes = await fetch(fontUrl).then(res => res.arrayBuffer());
    return await pdfDoc.embedFont(fontBytes);
};

export default getFont;
