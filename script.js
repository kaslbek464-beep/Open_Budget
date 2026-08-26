const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const convertPanel = document.getElementById('convertPanel');
const resultPanel = document.getElementById('resultPanel');
const fileName = document.getElementById('fileName');
const fileSize = document.getElementById('fileSize');
const formatSelect = document.getElementById('formatSelect');
const convertBtn = document.getElementById('convertBtn');
const downloadBtn = document.getElementById('downloadBtn');

let currentFile = null;

// Event Listeners (Fayl tanlash va Drag & Drop)
dropZone.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', (e) => handleFile(e.target.files[0]));

dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.classList.remove('dragover');
  if (e.dataTransfer.files.length) {
    handleFile(e.dataTransfer.files[0]);
  }
});

function handleFile(file) {
  if (!file || !file.type.startsWith('image/')) {
    alert('Iltimos, faqat rasm faylini tanlang!');
    return;
  }
  currentFile = file;
  fileName.textContent = file.name;
  fileSize.textContent = (file.size / 1024).toFixed(1) + ' KB';
  
  convertPanel.style.display = 'block';
  resultPanel.style.display = 'none';
}

// Konvertatsiya jarayoni (Canvas yordamida brauzerda konvertatsiya qilish)
convertBtn.addEventListener('click', () => {
  if (!currentFile) return;

  const reader = new FileReader();
  reader.onload = function(event) {
    const img = new Image();
    img.onload = function() {
      // Canvas yaratamiz
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      
      // Rasmni canvasga chizamiz
      ctx.drawImage(img, 0, 0);

      const targetFormat = formatSelect.value;
      const convertedUrl = canvas.toDataURL(targetFormat, 0.9); // 90% sifat bilan

      // Yuklab olish tugmasini sozlaymiz
      const ext = targetFormat.split('/')[1];
      const originalName = currentFile.name.substring(0, currentFile.name.lastIndexOf('.'));
      
      downloadBtn.href = convertedUrl;
      downloadBtn.download = `${originalName}_converted.${ext}`;

      resultPanel.style.display = 'block';
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(currentFile);
});

