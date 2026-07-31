export async function downloadPdf() {
  try {
    // 1. Dynamically load libraries from CDN to bypass local NPM cache corruption
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');

    const html2canvas = window.html2canvas;
    const { jsPDF } = window.jspdf;

    if (!html2canvas || !jsPDF) throw new Error('Failed to load PDF libraries');

    // 2. Target the element we want to capture (the main layout)
    const element = document.getElementById('results-dashboard');
    if (!element) return;

    // 3. Temporarily adjust styles for better PDF rendering
    const originalStyle = element.style.cssText;
    
    // Capture the canvas
    const canvas = await html2canvas(element, {
      scale: 2, // High resolution
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });

    element.style.cssText = originalStyle;

    // 4. Convert canvas to PDF
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: 'a4'
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('HomeValue_AI_Report.pdf');

  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Failed to generate PDF. Please try again.');
  }
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}
