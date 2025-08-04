function calculateAttendance() {
  const total = parseInt(document.getElementById('total').value);
  const attended = parseInt(document.getElementById('attended').value);
  const result = document.getElementById('result');

  // Reset previous classes
  result.classList.remove('result-green', 'result-red');

  if (isNaN(total) || isNaN(attended) || total <= 0 || attended < 0 || attended > total) {
    result.innerHTML = `
      <div>
        ⚠️ Please enter valid class numbers.
      </div>`;
    result.classList.add('result-red');
    return;
  }

  const percentage = (attended / total) * 100;
  let html = `
    <div style="margin-bottom: 6px;">
      Your attendance is ${percentage.toFixed(2)}%.
    </div>
  `;

  if (percentage < 75) {
    const requiredClasses = Math.ceil((0.75 * total - attended) / (1 - 0.75));
    html += `
      <div>
        ❌ You must attend <strong>${requiredClasses}</strong> more class${requiredClasses > 1 ? 'es' : ''} to reach 75%.
      </div>
    `;
    result.classList.add('result-red');
  } else {
    const maxBunk = Math.floor((attended - (0.75 * total)) / 0.25);
    if (maxBunk === 0) {
      html += `
        <div>
          ⚠️ You're at the edge. Bunking now may drop your attendance.
        </div>
      `;
    } else {
      html += `
        <div>
          ✅ You can bunk up to <strong>${maxBunk}</strong> more class${maxBunk > 1 ? 'es' : ''}.
        </div>
      `;
    }
    result.classList.add('result-green');
  }

  result.innerHTML = html;
}
