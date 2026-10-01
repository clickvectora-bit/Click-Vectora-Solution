<?php
// Securely fetch Razorpay key from Render Environment Variables
$razorpayKeyId = getenv('RAZORPAY_KEY_ID') ?: 'rzp_test_DEFAULT_KEY'; 
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Passport Photo Studio - Click Vectora Solution</title>
  
  <link rel="icon" type="image/png" href="img/logo/logo1.png">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
  <script src="https://checkout.razorpay.com/v1/checkout.js"></script>

  <style>
    :root {
      --bg-main: #e2e8f0; --bg-surface: #ffffff; --bg-input: #f1f5f9;
      --primary: #ff6b00; --orange: #ff6b00; --cyan: #00a8cc;
      --text-main: #0f172a; --text-muted: #64748b; --border: #e2e8f0;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', system-ui, sans-serif; }
    body { background-color: var(--bg-main); color: var(--text-main); line-height: 1.6; }
    nav { display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 5%; background: #fff; border-bottom: 1px solid var(--border); position: sticky; top: 0; z-index: 100; }
    .brand-logo img { height: 60px; }
    .theme-card { background-color: var(--bg-surface); border: 1px solid var(--border); }
    .theme-input { background-color: var(--bg-input); border: 1px solid var(--border); color: var(--text-main); }
    .btn-cyan { background-color: var(--cyan); color: #fff; }
    .btn-orange { background-color: var(--orange); color: #fff; }
    .btn-secondary { background-color: #e2e8f0; color: #334155; }
    .img-container { height: 450px; background-color: var(--bg-input); border: 1px solid var(--border); }
  </style>
</head>
<body class="min-h-screen">

  <nav>
    <a href="/" class="brand-logo"><img src="img/logo/logo.png" alt="Logo" onerror="this.src='https://via.placeholder.com/150x50?text=Click+Vectora'"></a>
    <h1 class="text-lg font-bold text-orange-600">Passport Photo Studio</h1>
  </nav>

  <div class="max-w-5xl mx-auto theme-card rounded-2xl p-6 my-8 shadow-md">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <div class="p-4 border-2 border-dashed rounded-xl text-center mb-4 bg-slate-50">
          <input type="file" id="uploadInput" accept="image/*" class="hidden">
          <label for="uploadInput" class="cursor-pointer btn-cyan px-4 py-2 rounded-lg font-semibold text-sm inline-block">Select Photo</label>
          <p id="fileLabel" class="mt-1 text-xs text-slate-500">No file selected</p>
        </div>
        <div class="img-container rounded-xl overflow-hidden flex items-center justify-center">
          <img id="image" src="" alt="Source" class="hidden max-h-full">
        </div>
      </div>

      <div class="flex flex-col justify-between">
        <div class="space-y-4">
          <h2 class="text-md font-bold">Sheet Configuration</h2>
          <div>
            <label class="block text-sm font-medium mb-1">Paper Size:</label>
            <select id="pageSizeSelect" class="w-full theme-input rounded-lg p-2 text-sm">
              <option value="A4" data-w="2480" data-h="3508" data-cols="5" data-rows="6">A4 Sheet (300 DPI)</option>
              <option value="4x6" data-w="1200" data-h="1800" data-cols="2" data-rows="3">4 x 6 Inches</option>
            </select>
          </div>
          <button id="generateBtn" class="w-full btn-orange py-3 rounded-xl font-bold text-sm shadow">Generate Printable Sheet</button>
        </div>

        <div>
          <div class="theme-input p-2 rounded-xl mb-3 flex justify-center bg-white border">
            <canvas id="a4Canvas" class="max-h-48 w-auto object-contain"></canvas>
          </div>
          <button id="payAndDownloadBtn" class="w-full btn-orange py-3 rounded-xl font-bold text-sm shadow opacity-50 cursor-not-allowed" disabled>
            Pay ₹20 & Download PDF securely
          </button>
        </div>
      </div>
    </div>
  </div>

  <script>
    // PHP injects the secure API key from Render Environment Variables here safely
    const CONFIG = {
      RAZORPAY_KEY_ID: "<?php echo htmlspecialchars($razorpayKeyId, ENT_QUOTES, 'UTF-8'); ?>",
      AMOUNT: 20 * 100
    };

    let cropper = null;
    const uploadInput = document.getElementById('uploadInput');
    const image = document.getElementById('image');
    const canvas = document.getElementById('a4Canvas');
    const ctx = canvas.getContext('2d');
    let pageWidth = 2480, pageHeight = 3508;

    uploadInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      document.getElementById('fileLabel').innerText = file.name;
      image.src = URL.createObjectURL(file);
      image.classList.remove('hidden');
      if (cropper) cropper.destroy();
      cropper = new Cropper(image, { aspectRatio: 3.5 / 4.5, viewMode: 1 });
    });

    document.getElementById('generateBtn').addEventListener('click', () => {
      if (!cropper) return alert('Please upload a photo first!');
      canvas.width = pageWidth; canvas.height = pageHeight;
      ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, pageWidth, pageHeight);

      const cropped = cropper.getCroppedCanvas({ width: 413, height: 531 });
      for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 5; c++) {
          ctx.drawImage(cropped, 60 + c * 460, 60 + r * 580, 413, 531);
        }
      }
      document.getElementById('payAndDownloadBtn').removeAttribute('disabled');
      document.getElementById('payAndDownloadBtn').classList.remove('opacity-50', 'cursor-not-allowed');
    });

    document.getElementById('payAndDownloadBtn').addEventListener('click', () => {
      const options = {
        key: CONFIG.RAZORPAY_KEY_ID,
        amount: CONFIG.AMOUNT,
        currency: "INR",
        name: "Click Vectora Solution",
        description: "Passport PDF Sheet Download",
        handler: function (response) {
          // Send payment ID to PHP backend for server-side validation
          fetch('verify_payment.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ payment_id: response.razorpay_payment_id })
          })
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              const { jsPDF } = window.jspdf;
              const pdf = new jsPDF({ orientation: 'p', unit: 'px', format: [pageWidth, pageHeight] });
              pdf.addImage(canvas.toDataURL('image/jpeg', 0.98), 'JPEG', 0, 0, pageWidth, pageHeight);
              pdf.save(`passport-sheet-${Date.now()}.pdf`);
            } else {
              alert("Payment verification failed on server.");
            }
          });
        },
        theme: { color: "#ff6b00" }
      };
      new Razorpay(options).open();
    });
  </script>
</body>
</html>