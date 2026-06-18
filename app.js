const express = require('express');
const app = express();
const port = process.env.PORT || 3000;;

function generateCalendarHTML() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const currentDay = today.getDate();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Julio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  let html = `
  <!DOCTYPE html>
  <html lang="es">
  <head>
      <meta charset="UTF-8">
      <title>Calendario</title>
      <style>
          body { font-family: Arial, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f4f4f9; margin: 0; }
          .calendar { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
          h2 { text-align: center; color: #333; }
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #ddd; padding: 15px; text-align: center; width: 40px; }
          th { background-color: #007bff; color: white; }
          .today { background-color: #ffc107; font-weight: bold; border-radius: 5px; }
          td.day-cell { cursor: pointer; transition: background-color 0.2s; }
          td.day-cell:hover { background-color: #e2e6ea; }
          .selected { background-color: #28a745 !important; color: white; font-weight: bold; border-radius: 5px; }
      </style>
  </head>
  <body>
      <div class="calendar">
          <h2>${monthNames[month]} ${year}</h2>
          <table>
              <tr><th>Dom</th><th>Lun</th><th>Mar</th><th>Mié</th><th>Jue</th><th>Vie</th><th>Sáb</th></tr>
              <tr>`;

  for (let i = 0; i < firstDay; i++) {
      html += '<td></td>';
  }

  for (let day = 1; day <= daysInMonth; day++) {
      const classes = ['day-cell'];
      if (day === currentDay) classes.push('today');

      html += `<td class="${classes.join(' ')}">${day}</td>`;
      if ((firstDay + day) % 7 === 0 && day !== daysInMonth) {
          html += '</tr><tr>';
      }
  }

  html += `     </tr>
          </table>
      </div>
      <script>
          const cells = document.querySelectorAll('.day-cell');
          cells.forEach(cell => {
              cell.addEventListener('click', function() {
                  cells.forEach(c => c.classList.remove('selected'));
                  this.classList.add('selected');
              });
          });
      </script>
  </body>
  </html>`;

  return html;
}

app.get('/', (req, res) => {
  res.send(generateCalendarHTML());
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});