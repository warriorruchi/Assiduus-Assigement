import { useState } from 'react';
import Dropdown from '../Home/Dropdown'
import Chart from '../Home/Chart';
import AddInvoice from '../Home/Invoice';

const monthList = [
  { key: 'Jan', value: 'January' },
  { key: 'Feb', value: 'February' },
  { key: 'Mar', value: 'March' },
  { key: 'Apr', value: 'April' },
  { key: 'May', value: 'May' },
  { key: 'Jun', value: 'June' },
  { key: 'Jul', value: 'July' },
  { key: 'Aug', value: 'August' },
  { key: 'Sep', value: 'September' },
  { key: 'Oct', value: 'October' },
  { key: 'Nov', value: 'November' },
  { key: 'Dec', value: 'December' },
];

const tableCriteria = ['Sales', 'Advertising', 'Inventory', 'Entertaintment', 'Product'];

const manageList = [{ key: 'manage', value: 'Manage' }];

function Dashboard() {
  const [month, setMonth] = useState(monthList[0]);
  const [manage, setManage] = useState(manageList[0]);
  let [isOpen, setIsOpen] = useState(false);

  function onFormSubmit(e) {
    e.preventDefault();
    const fileInput = e.target.querySelector('#file_input');
    const uploadedFile = fileInput.files[0];
    console.log('File:', uploadedFile);
  }

  return (
    <>
      <div className="w-full h-full overflow-y-auto flex flex-wrap justify-center p-4 xl:gap-x-8 gap-y-4 place-items-center">
        <div className="w-[calc(100%-1.5rem)] overflow-x-hidden xl:w-[calc(50%-2rem)] h-[calc(50%-1rem)] bg-white rounded-xl font-semibold">
          <div className="flex px-4 justify-between place-items-center h-16 border-slate-200 border-b-[1px]">
            <h3 className="text-xl">Checking account</h3>
            <div className="flex gap-4">
              <Dropdown options={manageList} active={manage} onChange={setManage} label="Manage" />
              <Dropdown options={monthList} active={month} onChange={setMonth} label="Select Month" />
            </div>
          </div>
          <div className="h-[calc(100%-5rem)] pt-4 pl-10 w-full">
            <Chart
              type="line"
              strokeColor="stroke-green-600"
              data={[
                { x: 1, y: Number(Math.random() * Math.random() * 2) },
                { x: 2, y: Number(Math.random() * Math.random() * 2) },
                { x: 3, y: Number(Math.random() * Math.random() * 2) },
                { x: 4, y: Number(Math.random() * Math.random() * 2) },
                { x: 5, y: Number(Math.random() * Math.random() * 2) },
              ]}
              className="checking-account-graph"
            />
          </div>
        </div>
        <div className="w-[calc(100%-1.5rem)] overflow-x-hidden xl:w-[calc(50%-2rem)]  h-[calc(50%-1rem)] bg-white rounded-xl font-semibold">
          <div className="flex px-4 justify-between place-items-center h-16 border-slate-200 border-b-[1px]">
            <h3 className="text-xl">Invoices owed to you</h3>
            <button className="bg-slate-300 font-semibold py-2 px-3 rounded-md text-green-600" onClick={() => setIsOpen(true)}>
              New Sales Invoice
            </button>
          </div>
          <div className="h-[calc(100%-5rem)] pt-4 pl-10 w-full max-w-full overflow-hidden">
            <Chart
              className="invoice-graph"
              type="bar"
              barColor="fill-green-600"
              data={[
                { category: 'Older', value: Number(Math.random() * Math.random() * 2) },
                { category: 'Jan 01-08', value: Number(Math.random() * Math.random() * 2) },
                { category: 'Jan 09-16', value: Number(Math.random() * Math.random() * 2) },
                { category: 'Jan 17-24', value: Number(Math.random() * Math.random() * 2) },
                { category: 'Jan 25-31', value: Number(Math.random() * Math.random() * 3) },
                { category: 'Future', value: Number(Math.random() * Math.random() * 3) },
              ]}
            />
          </div>
        </div>
        <div className="w-[calc(100%-1.5rem)] overflow-x-hidden xl:w-[calc(50%-2rem)]  h-[calc(50%-1rem)] bg-white rounded-xl font-semibold">
          <div className="flex px-4 justify-between place-items-center h-16 border-slate-200 border-b-[1px]">
            <h3 className="text-xl">Total Cash Flow</h3>
            <div className="flex gap-4">
              <div className="h-6 w-6 rounded-lg bg-green-500"></div> in
              <div className="h-6 w-6 rounded-lg bg-green-700"></div> out
            </div>
          </div>
          <div className="h-[calc(100%-5rem)] pt-4 w-full">
            <Chart
              colors={['#15803D', '#22C55E']}
              type="stack-bar"
              data={[
                { category: 'August', series1: Number(Math.random() * Math.random() * 2), series2: Number(Math.random() * Math.random() * 2) },
                { category: 'September', series1: Number(Math.random() * Math.random() * 2), series2: Number(Math.random() * Math.random() * 2) },
                { category: 'October', series1: Number(Math.random() * Math.random() * 2), series2: Number(Math.random() * Math.random() * 2) },
                { category: 'November', series1: Number(Math.random() * Math.random() * 2), series2: Number(Math.random() * Math.random() * 2) },
                { category: 'December', series1: Number(Math.random() * Math.random() * 2), series2: Number(Math.random() * Math.random() * 2) },
                { category: 'January', series1: Number(Math.random() * Math.random() * 2), series2: Number(Math.random() * Math.random() * 2) },
              ]}
              className="invoice-graph"
            />
          </div>
        </div>
        <div className="w-[calc(100%-1.5rem)] overflow-x-hidden xl:w-[calc(50%-2rem)]  h-[calc(50%-1rem)] bg-white rounded-xl font-semibold">
          <div className="flex px-4 justify-between place-items-center h-16 border-slate-200 border-b-[1px]">
            <h3 className="text-xl">Account Watchlist</h3>
          </div>
          <table className="table-auto w-full m-5">
            <thead>
              <tr className="text-slate-300">
                <td className="w-3/5">Account</td>
                <td className="w-1/5">This Month</td>
                <td className="w-1/5">YTD</td>
              </tr>
            </thead>
            <tbody>
              {tableCriteria?.map(i => (
                <tr key={i}>
                  <td className="py-1">{i}</td>
                  <td className="py-1">{parseFloat((Math.random() * 4).toFixed(2))}</td>
                  <td className="py-1">{parseFloat((Math.random() * 4).toFixed(2))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AddInvoice isOpen={isOpen} setIsOpen={setIsOpen} onFormSubmit={onFormSubmit} />
    </>
  );
}

export default Dashboard;
