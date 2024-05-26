document.addEventListener("DOMContentLoaded", function() {
    const root = document.getElementById('root');
  
    root.innerHTML = `
      <div class="">
        <header class="flex justify-between items-center px-10 py-5">
          <h1 class="text-[45px] text-teal-600 weight-300 Oswald sans-serif">HODLINFO</h1>
          <div class="flex gap-5">
            <div class="rounded-xl bg-gray-100 border dark:bg-slate-700 dark:text-white">
              <select name="currency" class="mx-5 my-1.5 bg-gray-100 dark:bg-slate-700">
                <option value="inr">INR</option>
              </select>
            </div>
            <div class="rounded-xl bg-gray-100 border dark:bg-slate-700 dark:text-white">
              <select name="coin" class="mx-5 my-1.5 bg-gray-100 dark:bg-slate-700">
                <!-- Options will be populated by JavaScript -->
              </select>
            </div>
            <div class="rounded-xl bg-gray-100 border dark:bg-slate-700 dark:text-white">
              <p class="px-5 py-1.5 rounded bg-gray-100 dark:bg-slate-700">BUY BTC</p>
            </div>
          </div>
          <div class="flex gap-5">
            <div>50</div>
            <button class="bg-teal-600 text-white rounded-xl py-1.5 px-5">Connect Telegram</button>
            <label class="inline-flex items-center me-5 cursor-pointer">
              <input type="checkbox" class="sr-only peer" />
              <div class="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
            </label>
          </div>
        </header>
        <section class="flex flex-col px-7 my-7">
          <p class="w-full text-center text-2xl text-gray-600">Best Price to Trade</p>
          <div class="flex items-center justify-around">
            <div class="flex flex-col gap-2 items-center">
              <p class="text-[40px] text-teal-600">0.58 %</p>
              <p class="text-xl text-gray-600">5 Mins</p>
            </div>
            <div class="flex flex-col gap-2 items-center">
              <p class="text-[40px] text-teal-600">1.32 %</p>
              <p class="text-xl text-gray-600">1 Hour</p>
            </div>
            <div class="flex flex-col gap-2 items-center">
              <p class="text-[80px]">₹ 58,27,181</p>
              <p class="text-base text-gray-600">Average BTC/INR net price including commission</p>
            </div>
            <div class="flex flex-col gap-2 items-center">
              <p class="text-[40px] text-teal-600">5.33 %</p>
              <p class="text-xl text-gray-600">1 Day</p>
            </div>
            <div class="flex flex-col gap-2 items-center">
              <p class="text-[40px] text-teal-600">14.44 %</p>
              <p class="text-xl text-gray-600">7 Days</p>
            </div>
          </div>
        </section>
        <section class="text-2xl font-semibold mt-12 px-7">
          <div class="grid grid-cols-[5%_18%_18%_auto_18%_12%] gap-2 rounded-xl text-gray-600 dark:bg-slate-700 dark:text-white">
            <p class="text-center">#</p>
            <p class="text-center">Platform</p>
            <p class="text-center">Last Traded Price</p>
            <p class="text-center">Buy / Sell Price</p>
            <p class="text-center">Volume</p>
            <p class="text-center">Base Unit</p>
          </div>
          <div id="data-rows">
            <!-- Data rows will be populated by JavaScript -->
          </div>
        </section>
      </div>

      <div class="footer">
      <div class="d-flex align-items-center text-center">
      <div class="footer-text">Copyright © 2019</div>
      <div class="footer-text">HodlInfo.com</div>
      <div class="footer-text pointer" style="margin-left: auto;">
      <a href="mailto:support@hodlinfo.com" class="footer-text-link">Support</a>
      </div>
      </div>
      </div>

      <div class="d-flex justify-content-center" style="border:solid 1px #191d28;background-color:#191d28;position:fixed;left:0;align-items:center;width:100vw;height:47px;bottom:0;z-index:8">
      <button class="add-button btn btn-outline-info" style="display: block;">Add hodlinfo to home screen</button>
      </div>

    `;
  

    fetch('http://localhost:3000/api/tickers')
      .then(response => response.json())
      .then(data => {
        updatePage(data);
        console.log(data, 'data fetched');
      })
      .catch(error => console.error('Error fetching data:', error));
  
    function updatePage(data) {
      const selectCoin = document.querySelector('select[name="coin"]');
      const coinOptions = data.slice(0,10).map((item, index) => `<option key=${index} value=${item.base_unit}>${item.name.split("/")[0]}</option>`).join('');
      selectCoin.innerHTML = coinOptions;
  
      const dataRows = document.getElementById('data-rows');
      const rows = data.slice(0,10).map((item, index) => `
        <div key=${index} class="grid grid-cols-[5%_18%_18%_auto_18%_12%] gap-2 rounded-xl py-3 bg-gray-100 my-3 dark:bg-slate-700 dark:text-white">
          <p class="text-center">${index + 1}</p>
          <p class="text-center">${item.name}</p>
          <p class="text-center">${item.last}</p>
          <p class="text-center">${item.buy}/${item.sell}</p>
          <p class="text-center">${item.volume}</p>
          <p class="text-center">${item.base_unit}</p>
        </div>
      `).join('');
      dataRows.innerHTML = rows;
    }
  });
  