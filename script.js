const wrapper = document.querySelector('.wrapper'),
  qrInput = wrapper.querySelector('.form input'),
  generateBtn = wrapper.querySelector('.form button'),
  qrImg = wrapper.querySelector('.qr-code img'),
  downloadBtn = document.getElementById('download-qr-code-btn');
let preValue;

generateBtn.addEventListener('click', () => {
  let qrValue = qrInput.value.trim();
  if (!qrValue || preValue === qrValue) return;
  preValue = qrValue;
  generateBtn.innerText = 'Generating QR Code...';
  qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${qrValue}`;
  qrImg.addEventListener('load', () => {
    wrapper.classList.add('active');
    generateBtn.innerText = 'Generate QR Code';
  });
});

// downloadBtn.addEventListener('click', () => {
//   const newTab = window.open(qrImg.src, '_blank');
//   newTab.focus();
// });
downloadBtn.addEventListener('click', () => {
  fetch(qrImg.src)
    .then(response => response.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'qr-code.png';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    });
});


qrInput.addEventListener('keyup', () => {
  if (!qrInput.value.trim()) {
    wrapper.classList.remove('active');
    preValue = '';
  }
});


