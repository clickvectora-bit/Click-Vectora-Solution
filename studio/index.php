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
  
  <!-- Browser Tab Favicon Logo -->
  <link rel="icon" type="image/png" href="img/logo/logo1.png">
  
  <!-- FontAwesome Icons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

  <script src="https://cdn.tailwindcss.com"></script>
  
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.js"></script>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>

  <script src="https://checkout.razorpay.com/v1/checkout.js"></script>

  <script type="module">
    import { removeBackground } from "https://cdn.jsdelivr.net/npm/@imgly/background-removal@1.4.5/+esm";
    window.imglyRemoveBackground = removeBackground;
  </script>

  <style>
    :root {
      --bg-main: #e2e8f0;
      --bg-surface: #ffffff;
      --bg-input: #f1f5f9;
      --primary: #ff6b00;
      --orange: #ff6b00;
      --cyan: #00a8cc;
      --text-main: #0f172a;
      --text-muted: #64748b;
      --border: #e2e8f0;
      --shadow: rgba(15, 23, 42, 0.06);
      --shadow-hover: rgba(15, 23, 42, 0.12);
    }

    * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', system-ui, sans-serif; }
    html { scroll-behavior: smooth; }

    body {
      background-color: var(--bg-main);
      color: var(--text-main);
      line-height: 1.6;
    }

    nav {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
      padding: 0.5rem 5%;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid var(--border);
      position: sticky;
      top: 0;
      z-index: 100;
      box-shadow: 0 1px 3px var(--shadow);
    }

    .brand-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
    .brand-logo img { height: 70px; width: auto; display: block; object-fit: contain; }

    .brand-title-center {
      text-align: center;
      font-size: 1.35rem;
      font-weight: 800;
      letter-spacing: -0.3px;
      background: linear-gradient(135deg, var(--primary), var(--cyan));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .nav-links { display: flex; gap: 2rem; align-items: center; list-style: none; justify-self: flex-end; }
    .nav-links a { color: var(--text-muted); text-decoration: none; font-size: 0.95rem; font-weight: 600; transition: color 0.3s; }
    .nav-links a:hover { color: var(--cyan); }

    .menu-toggle {
      display: none;
      background: transparent;
      border: none;
      font-size: 1.6rem;
      color: var(--text-main);
      cursor: pointer;
      padding: 0.2rem 0.5rem;
      justify-self: flex-end;
    }

    .theme-card {
      background-color: var(--bg-surface);
      border: 1px solid var(--border);
      box-shadow: 0 4px 20px var(--shadow);
    }

    .theme-input {
      background-color: var(--bg-input);
      border: 1px solid var(--border);
      color: var(--text-main);
    }

    .theme-input:focus {
      border-color: var(--cyan);
      box-shadow: 0 0 0 3px rgba(0, 168, 204, 0.15);
      outline: none;
    }

    .btn-cyan { background-color: var(--cyan); color: #ffffff; }
    .btn-cyan:hover { filter: brightness(0.92); }
    .btn-orange { background-color: var(--orange); color: #ffffff; }
    .btn-orange:hover { filter: brightness(0.92); }
    .btn-secondary { background-color: #e2e8f0; color: #334155; }
    .btn-secondary:hover { background-color: #cbd5e1; }
    .text-muted { color: var(--text-muted); }
    .img-container { height: 520px; background-color: var(--bg-input); border: 1px solid var(--border); }

    @media (max-width: 900px) {
      nav { display: flex; justify-content: space-between; padding: 0.4rem 5%; }
      .brand-title-center { display: none; }
      .menu-toggle { display: block; }
      .nav-links {
        position: absolute; top: 100%; left: 0; width: 100%; background: var(--bg-surface);
        flex-direction: column; align-items: flex-start; gap: 0; max-height: 0; overflow: hidden;
        transition: max-height 0.3s ease-in-out; border-bottom: 1px solid var(--border);
      }
      .nav-links.active { max-height: 350px; }
      .nav-links li { width: 100%; border-bottom: 1px solid var(--border); }
      .nav-links a { display: block; padding: 1rem 1.5rem; width: 100%; }
    }
  </style>
</head>
<body class="min-h-screen relative">

  <!-- Centered Preview Pop-Up Modal -->
  <div id="previewModal" class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm hidden justify-center items-center z-[99999] p-4">
    <div class="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col max-w-4xl w-full max-h-[90vh] overflow-hidden p-6">
      <div class="flex justify-between items-center pb-4 border-b border-slate-800">
        <h3 id="modalPreviewHeading" class="text-lg font-bold text-white">Sheet Preview</h3>
        <button id="closePreviewModalBtn" class="btn-secondary px-3 py-1.5 rounded-xl text-sm font-bold shadow">✕ Close</button>
      </div>
      <div class="flex-1 overflow-auto flex justify-center items-center py-4">
        <img id="previewModalImg" alt="Sheet Preview" class="max-h-[70vh] max-w-full object-contain shadow-lg rounded-lg border border-slate-700 bg-white">
      </div>
      <div class="pt-3 border-t border-slate-800 text-center text-xs text-slate-400">Click outside or use close button to return.</div>
    </div>
  </div>

  <!-- Navigation Bar -->
  <nav>
    <a href="/" class="brand-logo">
      <img src="img/logo/logo.png" alt="Logo" onerror="this.src='https://via.placeholder.com/200x80?text=Click+Vectora'">
    </a>
    <div class="brand-title-center">Passport Photo Studio</div>
    <button class="menu-toggle" id="menuToggle" aria-label="Toggle navigation"><i class="fa-solid fa-bars"></i></button>
    <ul class="nav-links" id="navLinks">
      <li><a href="/">Home</a></li>
      <li><a href="/store">Online Store</a></li>
      <li><a href="/contact">Contact Us</a></li>
    </ul>
  </nav>

  <div class="max-w-6xl mx-auto theme-card rounded-2xl p-6 md:p-8 transition-all relative my-8">
    <main class="space-y-8">
      <section class="space-y-4">
        <div class="p-4 border-2 border-dashed rounded-xl text-center" style="border-color: var(--border); background-color: var(--bg-input);">
          <input type="file" id="uploadInput" accept="image/*" class="hidden">
          <label for="uploadInput" class="cursor-pointer btn-cyan px-6 py-2 rounded-lg font-semibold inline-block text-sm">Select Photo</label>
          <p id="fileLabel" class="mt-1 text-xs text-muted">No file selected</p>
        </div>

        <div class="space-y-3">
          <div class="flex justify-between items-center">
            <label class="block text-xs font-bold uppercase tracking-wider text-muted">Crop Workspace</label>
            <span id="bgStatus" class="text-xs font-medium text-teal-600 hidden">✓ Background Processed</span>
          </div>

          <div class="grid grid-cols-8 gap-1.5 md:gap-2">
            <button id="undoBtn" class="btn-secondary text-xs py-2 rounded-lg font-semibold disabled:opacity-40" disabled>↩️ Undo</button>
            <button id="redoBtn" class="btn-secondary text-xs py-2 rounded-lg font-semibold disabled:opacity-40" disabled>↪️ Redo</button>
            <button id="zoomInBtn" class="btn-secondary text-xs py-2 rounded-lg font-semibold">🔍 +</button>
            <button id="zoomOutBtn" class="btn-secondary text-xs py-2 rounded-lg font-semibold">🔍 -</button>
            <button id="rotateLeftBtn" class="btn-secondary text-xs py-2 rounded-lg font-semibold">🔄 -90°</button>
            <button id="rotateRightBtn" class="btn-secondary text-xs py-2 rounded-lg font-semibold">🔄 +90°</button>
            <button id="resetCropBtn" class="btn-secondary text-xs py-2 rounded-lg font-semibold">💥 Reset</button>
            <button id="clearPhotoBtn" class="bg-red-100 text-red-700 hover:bg-red-200 text-xs py-2 rounded-lg font-semibold">🗑️ Clear</button>
          </div>

          <div class="img-container rounded-xl overflow-hidden flex items-center justify-center w-full">
            <img id="image" src="" alt="Upload Source" class="hidden">
          </div>
        </div>
      </section>

      <section class="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6 border-t" style="border-color: var(--border);">
        <div class="space-y-6">
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-muted mb-3">AI Editing Suite</label>
            <div class="grid grid-cols-2 gap-3">
              <button id="removeBgBtn" class="btn-cyan text-sm py-2.5 px-3 rounded-lg font-medium">✨ Remove BG (AI)</button>
              <button id="enhanceAiBtn" class="btn-cyan text-sm py-2.5 px-3 rounded-lg font-medium">🪄 AI Upscale</button>
              <button id="autoCenterBtn" class="btn-cyan text-sm py-2.5 px-3 rounded-lg font-medium">🎯 Center Face</button>
              <button id="smoothSkinBtn" class="btn-cyan text-sm py-2.5 px-3 rounded-lg font-medium">🧴 Skin Softener</button>
            </div>
          </div>

          <div class="space-y-4 pt-2 border-t">
            <div>
              <label class="block text-sm font-medium mb-1">Paper Size (300 DPI):</label>
              <select id="pageSizeSelect" class="w-full theme-input rounded-lg p-2.5 text-sm font-semibold">
                <option value="A4" data-w="2480" data-h="3508" data-cols="5" data-rows="6">A4 Sheet (210 x 297 mm)</option>
                <option value="4x6" data-w="1200" data-h="1800" data-cols="2" data-rows="3">4 x 6 Inches</option>
              </select>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium mb-1">Columns:</label>
                <input type="number" id="colsInput" value="5" min="1" max="10" class="w-full theme-input rounded-lg p-2.5 text-sm">
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Rows:</label>
                <input type="number" id="rowsInput" value="6" min="1" max="10" class="w-full theme-input rounded-lg p-2.5 text-sm">
              </div>
            </div>
          </div>
          <button id="generateBtn" class="w-full btn-orange py-3 rounded-xl font-bold text-base transition">Generate Printable Sheet</button>
        </div>

        <div class="flex flex-col items-center justify-start space-y-4">
          <div class="w-full flex justify-between items-center">
            <h2 id="previewHeading" class="text-lg font-bold">A4 Sheet Preview (300 DPI)</h2>
            <button id="viewModalBtn" class="btn-cyan text-xs px-3 py-1.5 rounded-lg font-semibold" disabled>🔍 Preview</button>
          </div>
          <div class="theme-input p-3 rounded-2xl w-full flex justify-center max-h-[460px] overflow-auto">
            <canvas id="a4Canvas" class="max-w-full h-auto bg-white rounded shadow-sm"></canvas>
          </div>
          <button id="payAndDownloadBtn" class="w-full btn-orange py-3.5 rounded-xl font-bold text-base transition disabled:opacity-50" disabled>Pay ₹20 & Download PDF</button>
        </div>
      </section>
    </main>
  </div>

  <script>
    // Injecting the secure backend key safely into frontend configuration
    const CONFIG = {
      RAZORPAY_KEY_ID: "<?php echo htmlspecialchars($razorpayKeyId, ENT_QUOTES, 'UTF-8'); ?>",
      AMOUNT_IN_INR: 20,
      PAYEE_NAME: "ClickVectora Solution",
      PASSPORT_WIDTH: 413,
      PASSPORT_HEIGHT: 531
    };

    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    const state = {
      cropper: null,
      selectedBgColor: '#ffffff',
      historyStack: [],
      historyIndex: -1,
      isRestoringHistory: false,
      pageWidth: 2480,
      pageHeight: 3508
    };

    const DOM = {
      uploadInput: document.getElementById('uploadInput'),
      fileLabel: document.getElementById('fileLabel'),
      image: document.getElementById('image'),
      undoBtn: document.getElementById('undoBtn'),
      redoBtn: document.getElementById('redoBtn'),
      clearPhotoBtn: document.getElementById('clearPhotoBtn'),
      removeBgBtn: document.getElementById('removeBgBtn'),
      enhanceAiBtn: document.getElementById('enhanceAiBtn'),
      autoCenterBtn: document.getElementById('autoCenterBtn'),
      smoothSkinBtn: document.getElementById('smoothSkinBtn'),
      bgStatus: document.getElementById('bgStatus'),
      pageSizeSelect: document.getElementById('pageSizeSelect'),
      colsInput: document.getElementById('colsInput'),
      rowsInput: document.getElementById('rowsInput'),
      generateBtn: document.getElementById('generateBtn'),
      payAndDownloadBtn: document.getElementById('payAndDownloadBtn'),
      previewHeading: document.getElementById('previewHeading'),
      canvas: document.getElementById('a4Canvas'),
      ctx: document.getElementById('a4Canvas').getContext('2d'),
      viewModalBtn: document.getElementById('viewModalBtn'),
      previewModal: document.getElementById('previewModal'),
      previewModalImg: document.getElementById('previewModalImg'),
      closePreviewModalBtn: document.getElementById('closePreviewModalBtn')
    };

    DOM.uploadInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      DOM.fileLabel.innerText = file.name;
      DOM.image.src = URL.createObjectURL(file);
      DOM.image.classList.remove('hidden');
      if (state.cropper) state.cropper.destroy();
      
      state.cropper = new Cropper(DOM.image, {
        aspectRatio: 3.5 / 4.5,
        viewMode: 1,
        responsive: true,
        ready() {
          const initialCanvas = state.cropper.getCroppedCanvas();
          if (initialCanvas) pushHistory(initialCanvas.toDataURL('image/png'));
        }
      });
      DOM.bgStatus.classList.add('hidden');
    });

    function pushHistory(dataUrl) {
      if (state.isRestoringHistory) return;
      state.historyStack.push(dataUrl);
      state.historyIndex = state.historyStack.length - 1;
    }

    DOM.generateBtn.addEventListener('click', () => {
      if (!state.cropper) return alert('Please upload a photo first!');
      DOM.canvas.width = state.pageWidth;
      DOM.canvas.height = state.pageHeight;
      DOM.ctx.fillStyle = '#ffffff';
      DOM.ctx.fillRect(0, 0, state.pageWidth, state.pageHeight);

      const croppedCanvas = state.cropper.getCroppedCanvas({ width: CONFIG.PASSPORT_WIDTH, height: CONFIG.PASSPORT_HEIGHT });
      const cols = parseInt(DOM.colsInput.value) || 1;
      const rows = parseInt(DOM.rowsInput.value) || 1;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const posX = 50 + c * (CONFIG.PASSPORT_WIDTH + 40);
          const posY = 50 + r * (CONFIG.PASSPORT_HEIGHT + 40);
          DOM.ctx.drawImage(croppedCanvas, posX, posY, CONFIG.PASSPORT_WIDTH, CONFIG.PASSPORT_HEIGHT);
        }
      }
      DOM.payAndDownloadBtn.disabled = false;
      DOM.viewModalBtn.disabled = false;
    });

    DOM.viewModalBtn.addEventListener('click', () => {
      DOM.previewModalImg.src = DOM.canvas.toDataURL('image/jpeg', 0.95);
      DOM.previewModal.classList.remove('hidden');
      DOM.previewModal.classList.add('flex');
    });

    DOM.closePreviewModalBtn.addEventListener('click', () => {
      DOM.previewModal.classList.remove('flex');
      DOM.previewModal.classList.add('hidden');
    });

    DOM.payAndDownloadBtn.addEventListener('click', () => {
      const options = {
        key: CONFIG.RAZORPAY_KEY_ID,
        amount: CONFIG.AMOUNT_IN_INR * 100,
        currency: "INR",
        name: CONFIG.PAYEE_NAME,
        description: "Passport PDF Sheet",
        handler: function (response) {
          if (response.razorpay_payment_id) {
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF({ orientation: 'p', unit: 'px', format: [state.pageWidth, state.pageHeight] });
            pdf.addImage(DOM.canvas.toDataURL('image/jpeg', 0.98), 'JPEG', 0, 0, state.pageWidth, state.pageHeight);
            pdf.save(`passport-sheet-${Date.now()}.pdf`);
          }
        },
        theme: { color: "#ff6b00" }
      };
      const rzp1 = new Razorpay(options);
      rzp1.open();
    });
  </script>
</body>
</html>