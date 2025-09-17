import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface StatementData {
  type: 'purchase' | 'bas' | 'portfolio' | 'transaction';
  investor?: {
    name: string;
    email: string;
    id: string;
  };
  unitClass?: string;
  amount?: number;
  units?: number;
  unitPrice?: number;
  fees?: number;
  total?: number;
  date?: string;
  transactions?: any[];
  totals?: {
    income: number;
    expenses: number;
    gst: number;
  };
}

export class PDFGenerator {
  private doc: jsPDF;

  constructor() {
    this.doc = new jsPDF('portrait', 'pt', 'a4');
  }

  private addHeader(title: string) {
    // Company Logo/Header
    this.doc.setFontSize(24);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('TrustWise Capital', 50, 50);
    
    this.doc.setFontSize(12);
    this.doc.setFont('helvetica', 'normal');
    this.doc.text('Unit Trust Management', 50, 70);
    this.doc.text('ABN: 12 345 678 901', 50, 85);
    this.doc.text('AFSL: 123456', 50, 100);
    
    // Statement Title
    this.doc.setFontSize(18);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text(title, 50, 140);
    
    // Date
    this.doc.setFontSize(10);
    this.doc.setFont('helvetica', 'normal');
    this.doc.text(`Generated: ${new Date().toLocaleDateString('en-AU')}`, 450, 50);
    this.doc.text(`Time: ${new Date().toLocaleTimeString('en-AU')}`, 450, 65);
    
    return 160; // Return Y position for content start
  }

  private addFooter() {
    const pageHeight = this.doc.internal.pageSize.height;
    this.doc.setFontSize(8);
    this.doc.setFont('helvetica', 'normal');
    this.doc.text('This statement is confidential and intended for the named investor only.', 50, pageHeight - 50);
    this.doc.text('TrustWise Capital Pty Ltd | Phone: +61 2 9000 0000 | Email: info@trustwise.com.au', 50, pageHeight - 35);
    this.doc.text(`Page 1 of 1`, 500, pageHeight - 20);
  }

  generatePurchaseStatement(data: StatementData): Promise<Blob> {
    return new Promise((resolve) => {
      let yPos = this.addHeader('Unit Purchase Statement');
      
      // Investor Details
      yPos += 30;
      this.doc.setFontSize(12);
      this.doc.setFont('helvetica', 'bold');
      this.doc.text('Investor Details', 50, yPos);
      
      yPos += 20;
      this.doc.setFont('helvetica', 'normal');
      this.doc.text(`Name: ${data.investor?.name || 'N/A'}`, 50, yPos);
      yPos += 15;
      this.doc.text(`Email: ${data.investor?.email || 'N/A'}`, 50, yPos);
      yPos += 15;
      this.doc.text(`Investor ID: ${data.investor?.id || 'N/A'}`, 50, yPos);
      
      // Purchase Details
      yPos += 40;
      this.doc.setFont('helvetica', 'bold');
      this.doc.text('Purchase Details', 50, yPos);
      
      yPos += 20;
      this.doc.setFont('helvetica', 'normal');
      this.doc.text(`Unit Class: ${data.unitClass || 'N/A'}`, 50, yPos);
      yPos += 15;
      this.doc.text(`Purchase Date: ${data.date || new Date().toLocaleDateString('en-AU')}`, 50, yPos);
      yPos += 15;
      this.doc.text(`Unit Price: $${data.unitPrice?.toFixed(4) || '0.0000'}`, 50, yPos);
      yPos += 15;
      this.doc.text(`Units Purchased: ${data.units?.toLocaleString() || '0'}`, 50, yPos);
      yPos += 15;
      this.doc.text(`Investment Amount: $${data.amount?.toLocaleString() || '0'}`, 50, yPos);
      yPos += 15;
      this.doc.text(`Fees: $${data.fees?.toLocaleString() || '0'}`, 50, yPos);
      yPos += 15;
      this.doc.setFont('helvetica', 'bold');
      this.doc.text(`Total Amount: $${data.total?.toLocaleString() || '0'}`, 50, yPos);
      
      // Calculation Breakdown
      yPos += 40;
      this.doc.text('Calculation Breakdown', 50, yPos);
      yPos += 20;
      this.doc.setFont('helvetica', 'normal');
      
      // Table headers
      this.doc.text('Description', 50, yPos);
      this.doc.text('Amount', 400, yPos);
      yPos += 5;
      this.doc.line(50, yPos, 550, yPos); // Header line
      yPos += 15;
      
      // Table rows
      this.doc.text('Investment Amount', 50, yPos);
      this.doc.text(`$${data.amount?.toLocaleString() || '0'}`, 400, yPos);
      yPos += 15;
      
      this.doc.text('Application Fee', 50, yPos);
      this.doc.text(`$${data.fees?.toLocaleString() || '0'}`, 400, yPos);
      yPos += 15;
      
      this.doc.line(50, yPos, 550, yPos); // Separator line
      yPos += 15;
      
      this.doc.setFont('helvetica', 'bold');
      this.doc.text('Total Amount Due', 50, yPos);
      this.doc.text(`$${data.total?.toLocaleString() || '0'}`, 400, yPos);
      
      this.addFooter();
      
      const blob = new Blob([this.doc.output('blob')], { type: 'application/pdf' });
      resolve(blob);
    });
  }

  generateBASStatement(data: StatementData): Promise<Blob> {
    return new Promise((resolve) => {
      let yPos = this.addHeader('Business Activity Statement (BAS)');
      
      // Period Details
      yPos += 30;
      this.doc.setFontSize(12);
      this.doc.setFont('helvetica', 'bold');
      this.doc.text('Reporting Period', 50, yPos);
      
      yPos += 20;
      this.doc.setFont('helvetica', 'normal');
      const currentDate = new Date();
      const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      
      this.doc.text(`Period: ${startDate.toLocaleDateString('en-AU')} to ${endDate.toLocaleDateString('en-AU')}`, 50, yPos);
      yPos += 15;
      this.doc.text(`Quarter: Q${Math.floor(currentDate.getMonth() / 3) + 1} ${currentDate.getFullYear()}`, 50, yPos);
      
      // BAS Summary
      yPos += 40;
      this.doc.setFont('helvetica', 'bold');
      this.doc.text('BAS Summary', 50, yPos);
      
      yPos += 30;
      // Table headers
      this.doc.text('Item', 50, yPos);
      this.doc.text('Description', 200, yPos);
      this.doc.text('Amount ($)', 450, yPos);
      yPos += 5;
      this.doc.line(50, yPos, 550, yPos);
      yPos += 20;
      
      this.doc.setFont('helvetica', 'normal');
      
      // GST on Sales
      this.doc.text('1A', 50, yPos);
      this.doc.text('GST on sales and other supplies', 200, yPos);
      this.doc.text(`${(data.totals?.gst || 0).toLocaleString()}`, 450, yPos);
      yPos += 15;
      
      // GST on Purchases  
      this.doc.text('1B', 50, yPos);
      this.doc.text('GST on purchases and other acquisitions', 200, yPos);
      this.doc.text('0.00', 450, yPos);
      yPos += 15;
      
      // Net GST
      yPos += 10;
      this.doc.line(50, yPos, 550, yPos);
      yPos += 15;
      this.doc.setFont('helvetica', 'bold');
      this.doc.text('7A', 50, yPos);
      this.doc.text('Net amount of GST', 200, yPos);
      this.doc.text(`${(data.totals?.gst || 0).toLocaleString()}`, 450, yPos);
      
      // Income Summary
      yPos += 50;
      this.doc.text('Income Summary', 50, yPos);
      yPos += 20;
      this.doc.setFont('helvetica', 'normal');
      
      this.doc.text('Total Income (excluding GST)', 50, yPos);
      this.doc.text(`$${(data.totals?.income || 0).toLocaleString()}`, 450, yPos);
      yPos += 15;
      
      this.doc.text('Total Expenses (excluding GST)', 50, yPos);
      this.doc.text(`$${(data.totals?.expenses || 0).toLocaleString()}`, 450, yPos);
      yPos += 15;
      
      this.doc.text('Net Income', 50, yPos);
      this.doc.text(`$${((data.totals?.income || 0) - (data.totals?.expenses || 0)).toLocaleString()}`, 450, yPos);
      
      this.addFooter();
      
      const blob = new Blob([this.doc.output('blob')], { type: 'application/pdf' });
      resolve(blob);
    });
  }

  async generateFromElement(elementId: string, filename: string): Promise<void> {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element with ID '${elementId}' not found`);
    }

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(filename);
  }
}

export const downloadPDF = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const previewPDF = (blob: Blob): string => {
  return URL.createObjectURL(blob);
};