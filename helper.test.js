
describe('test tip percent operation', () => {
	it('should return correct tip percent', () => {
		expect(calculateTipPercent(1000, 600)).toEqual(60);
	});
});
describe('test append to table', () => {
	beforeAll(() => {
		let currentPayment = {
			billAmt: 1000,
			tipAmt: 100,
			tipPercent: calculateTipPercent(1000, 100)
		};
		appendPaymentTable(currentPayment);
	});
	it('bill amount should display in row cell one', () => {
		let row = document.querySelector('#paymentTable tbody tr');
		expect(row.children[0].innerText).toEqual('$1000');
	});
	it('bill amount should display in row cell two', () => {
		let row = document.querySelector('#paymentTable tbody tr');
		expect(row.children[1].innerText).toEqual('$100');
	});
	it('bill amount should display in row cell three', () => {
		let row = document.querySelector('#paymentTable tbody tr');
		expect(row.children[2].innerText).toEqual('10%');
	});
	afterAll(() => {
		let table = document.querySelector('#paymentTable tbody');
		allPayments = {};
		table.innerHTML = '';
	});
});
