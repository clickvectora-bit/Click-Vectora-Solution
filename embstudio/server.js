const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Dynamic Factory SOP Database per Garment Type
const GARMENT_SOP = {
  polo_left_chest: {
    productName: 'Pique Polo (Left Chest)',
    stabilizer: '2.5 oz No-Show Nylon Mesh Cut-Away + 1 layer Tear-Away',
    needle: 'Organ DBxK5 #75/11 Ballpoint (SES)',
    topping: 'Solvy Water-Soluble Film (Prevents stitches sinking into pique waffle)',
    thread: 'Madeira Polyneon 40wt Polyester',
    bobbin: '60wt High-Tenacity Polyester Fil-Tec',
    maxSpeed: '750 SPM',
    placement: 'Left Chest: 7.5" down from high shoulder point, centered between placket edge and armhole.'
  },
  tshirt_left_chest: {
    productName: 'Cotton T-Shirt (Left Chest)',
    stabilizer: 'Lightweight Cut-Away (2.0 oz) Fusible',
    needle: 'Organ DBxK5 #70/10 or #75/11 Ballpoint',
    topping: 'Optional (Recommended for ribbed 100% cotton)',
    thread: 'Madeira Polyneon 40wt Polyester',
    bobbin: '60wt Polyester / 70wt Magnetic Core',
    maxSpeed: '800 SPM',
    placement: 'Left Chest: 7.0" below high shoulder point, 3.5" from center placket vertical.'
  },
  cap_front: {
    productName: 'Structured 6-Panel Baseball Cap',
    stabilizer: 'Heavyweight Cap Tear-Away (3.0 oz) backing clamped in cap frame',
    needle: 'Organ DBxK5 #80/12 Sharp / Titanium (prevents needle deflection on buckram)',
    topping: 'None required',
    thread: 'Madeira Polyneon 40wt Polyester',
    bobbin: '60wt Filament Polyester',
    maxSpeed: '600 SPM (Cap driver reduced speed)',
    placement: 'Center Crown: Sequence from Center-Out and Bottom-Up to prevent fabric bunching over center seam.'
  },
  hoodie_center: {
    productName: 'Heavy Fleece Hoodie (Center Front)',
    stabilizer: 'Heavy Cut-Away (3.0 oz)',
    needle: 'Organ DBxK5 #80/12 Ballpoint',
    topping: 'Solvy Water-Soluble Topping (Essential for high-pile fleece)',
    thread: 'Madeira Polyneon 40wt Polyester',
    bobbin: '60wt Spun Polyester',
    maxSpeed: '700 SPM',
    placement: 'Center Chest: 3.5" below neckline seam, hooped without stretching waistband.'
  },
  tote_bag: {
    productName: 'Heavy Canvas Tote Bag',
    stabilizer: 'Medium Tear-Away (2.5 oz)',
    needle: 'Organ DBxK5 #90/14 Sharp / Jeans',
    topping: 'None',
    thread: 'Madeira Polyneon 40wt Polyester',
    bobbin: '60wt Polyester',
    maxSpeed: '850 SPM',
    placement: 'Centered 3.0" below top opening seam.'
  }
};

app.post('/api/sop', (req, res) => {
  const { productId, stitchCount = 3200, colorCount = 2 } = req.body;
  const sop = GARMENT_SOP[productId] || GARMENT_SOP.polo_left_chest;
  const estimatedSeconds = Math.round((stitchCount / 700) * 60 + (colorCount * 25));
  const runMinutes = Math.ceil(estimatedSeconds / 60);

  res.json({
    success: true,
    sop: {
      ...sop,
      stitchCount,
      colorCount,
      runTimeMinutes: runMinutes
    }
  });
});

// Binary Tajima .DST File Compiler
app.post('/api/export-dst', (req, res) => {
  try {
    const { stitchPoints = [], designName = 'VECTORA' } = req.body;
    const header = Buffer.alloc(512, 0x20);
    let headStr = `LA:${designName.substring(0, 16).padEnd(16, ' ')}\r`;
    headStr += `ST:${String(stitchPoints.length).padStart(7, ' ')}\r`;
    headStr += `CO:${String(1).padStart(3, ' ')}\r`;
    headStr += `+X:${String(500).padStart(5, ' ')}\r-X:${String(500).padStart(5, ' ')}\r`;
    headStr += `+Y:${String(500).padStart(5, ' ')}\r-Y:${String(500).padStart(5, ' ')}\r`;
    headStr += `AX:+    0\rAY:+    0\rMX:+    0\rMY:+    0\rPD:******\r\x1a`;
    header.write(headStr, 0, 'ascii');

    const body = Buffer.alloc(stitchPoints.length * 3 + 3);
    let offset = 0;
    let prevX = 0, prevY = 0;

    for (let i = 0; i < stitchPoints.length; i++) {
      const p = stitchPoints[i];
      let dx = Math.round((p.x - prevX) * 2);
      let dy = Math.round((p.y - prevY) * 2);
      prevX = p.x;
      prevY = p.y;

      dx = Math.max(-121, Math.min(121, dx));
      dy = Math.max(-121, Math.min(121, dy));

      let b1 = 0, b2 = 0, b3 = p.isJump ? 0x83 : 0x03;
      if (dx > 40) { b3 |= 0x04; dx -= 81; }
      if (dx < -40) { b3 |= 0x08; dx += 81; }
      if (dx > 13) { b2 |= 0x04; dx -= 27; }
      if (dx < -13) { b2 |= 0x08; dx += 27; }
      if (dx > 4) { b1 |= 0x04; dx -= 9; }
      if (dx < -4) { b1 |= 0x08; dx += 9; }

      if (dy > 40) { b3 |= 0x20; dy -= 81; }
      if (dy < -40) { b3 |= 0x40; dy += 81; }
      if (dy > 13) { b2 |= 0x20; dy -= 27; }
      if (dy < -13) { b2 |= 0x40; dy += 27; }
      if (dy > 4) { b1 |= 0x20; dy -= 9; }
      if (dy < -4) { b1 |= 0x40; dy += 9; }

      body[offset++] = b1;
      body[offset++] = b2;
      body[offset++] = b3;
    }

    body[offset++] = 0x00;
    body[offset++] = 0x00;
    body[offset++] = 0xF3;

    const fileBuffer = Buffer.concat([header, body.subarray(0, offset)]);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="${designName}.dst"`);
    res.send(fileBuffer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Click Vectora Studio live at http://localhost:${PORT}`);
});