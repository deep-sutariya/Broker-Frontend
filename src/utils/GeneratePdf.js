import jsPDF from 'jspdf';
import 'jspdf-autotable';

import { months } from "@/utils/MonthVar"

export const generatePDF = ({ cards, selectedMonth, viewOption }) => {
    const pdf = new jsPDF();
    const headerColor = [44, 62, 80];
    const textColor = [52, 73, 94];
    const fontSize = 10;
    const tablesPerPage = 3;
    const gapBetweenTables = -10;

    pdf.setFontSize(fontSize);
    pdf.setTextColor(...textColor);

    const numPages = Math.ceil(cards.length / tablesPerPage);

    const year = new Date().getFullYear().toString();
    const month = months[selectedMonth];
    
    let heading = "", curDate = `Download Time : ${new Date().toLocaleString()}`;
    viewOption==="all" ? heading+=year : heading+=month+"-"+year;

    var textWidth = pdf.getStringUnitWidth(heading) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
    var textOffset = (pdf.internal.pageSize.width - textWidth) / 3;
    pdf.text(textOffset, 10, "DataOf : " + heading + "  " + curDate);

    for (let page = 0; page < numPages; page++) {
        if (page > 0) {
            pdf.addPage();
        }

        const startY = 20;
        const pageStartIndex = page * tablesPerPage;
        const pageEndIndex = Math.min(pageStartIndex + tablesPerPage, cards.length);


        for (let index = pageStartIndex; index < pageEndIndex; index++) {

            const card = cards[index];



            let backgroundColor = '#FFFFFF';
            if (card.fullpaymentDone && card.brokerpaymentDone) {
                backgroundColor = '#b4f79c';
            } else if (!card.fullpaymentDone && !card.brokerpaymentDone) {
                backgroundColor = '#fa8c8c';
            } else {
                backgroundColor = '#d29bfa';
            }

            const tableData = [
                [`(${card.counter})`],
                [`Seller: ${card.seller}`, `Buyer: ${card.buyer}`],
                [`Pending Amount: ${formatCurrency(card.pendingAmount)}/-`],
                [`Selling Date: ${formatDate(card.sellingDate)}`, `Due Date: ${formatDate(card.dueDate)}`, `Due Day: ${card.dueDay}`],
                [`Weight: ${card.weight}kg`, `Out(%): ${card.outPercentage}%`, `Out Weight: ${card.outWeight}kg`],
                [`Net Weight: ${card.netWeight}kg`, `Price: ${formatCurrency(card.price)}/-`, `Less(%): ${card.lessPercentage}%`],
                [`Total Amount: ${card.totalAmount}/-`, `Brokerage: ${card.brokerage}%`, `BrokerageAmt: ${formatCurrency(card.brokerageAmt)}/-`],
                ["Payment Details:", card.paymentRemarks.map(remark => `Date: ${formatDate(remark.Date)}, Paid Amount: ${formatCurrency(remark.PaidAmount)}/-`).join("\n")],
            ];

            const tableX = 10;
            const tableY = startY + (index - pageStartIndex) * (100 + gapBetweenTables);

            const columns = [
                { header: "", dataKey: "label" },
                { header: "", dataKey: "value" },
                { header: "", dataKey: "label" },
            ];

            const styles = {
                headerFill: headerColor,
                fillColor: backgroundColor,
                textColor: textColor,
                fontSize: fontSize,
                valign: 'middle',
                cellPadding: 2,
                lineWidth: 0.1,

            };

            pdf.autoTable(columns, tableData, {
                startX: tableX,
                startY: tableY,
                styles: styles,
                columnStyles: {
                    label: { cellWidth: 60 },
                    value: { cellWidth: 75 },
                },
                tableHeight: "auto",
                margin: { top: 10, left: 8, right: 10, bottom: 10 },
                pageBreak: 'avoid'
            });
        }
    }

    pdf.save(`${heading}.pdf`);
}

function formatDate(dateStr) {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
        return parts[2] + '-' + parts[1] + '-' + parts[0];
    }
    return dateStr;
}

function formatCurrency(amount) {
    return amount.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}