document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('/api/tickers');
    const tickers = await response.json();
  
    const tableBody = document.querySelector('#ticker-table tbody');
    tableBody.innerHTML = tickers.map(ticker => `
      <tr>
        <td>${ticker.name}</td>
        <td>${ticker.last}</td>
        <td>${ticker.buy}</td>
        <td>${ticker.sell}</td>
        <td>${ticker.volume}</td>
        <td>${ticker.base_unit}</td>
      </tr>
    `).join('');
  });