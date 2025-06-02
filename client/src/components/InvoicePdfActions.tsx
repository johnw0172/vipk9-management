import { Button } from "@/components/ui/button";

interface InvoicePdfActionsProps {
  invoiceId: number;
}

export function InvoicePdfActions({ invoiceId }: InvoicePdfActionsProps) {
  const pdfUrl = `/api/invoices/${invoiceId}/pdf`;

  const handleViewPdf = () => {
    window.open(pdfUrl, '_blank');
  };

  const handleDownloadPdf = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `VIP_Elite_K9s_Invoice_${invoiceId}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSendPdf = () => {
    // Future implementation for email sending
    alert('Email functionality coming soon!');
  };

  return (
    <div className="flex gap-2 mt-2">
      <Button
        onClick={handleViewPdf}
        size="sm"
        style={{
          backgroundColor: '#FFD700',
          color: '#000000',
          fontWeight: 'bold',
          border: '1px solid #DAA520',
          fontSize: '12px',
          padding: '6px 12px'
        }}
        className="hover:bg-yellow-500"
      >
        📄 View PDF
      </Button>
      
      <Button
        onClick={handleDownloadPdf}
        size="sm"
        style={{
          backgroundColor: '#FFD700',
          color: '#000000',
          fontWeight: 'bold',
          border: '1px solid #DAA520',
          fontSize: '12px',
          padding: '6px 12px'
        }}
        className="hover:bg-yellow-500"
      >
        💾 Download
      </Button>
      
      <Button
        onClick={handleSendPdf}
        size="sm"
        disabled
        style={{
          backgroundColor: '#333333',
          color: '#FFD700',
          fontWeight: 'bold',
          border: '1px solid #FFD700',
          fontSize: '12px',
          padding: '6px 12px'
        }}
        className="hover:bg-gray-700"
        title="Email functionality coming soon"
      >
        📧 Send
      </Button>
    </div>
  );
}