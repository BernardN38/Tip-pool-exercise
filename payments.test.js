describe('validate bill amout input', () => {
	it('should check bill amount is not less than zero', () => {
		billAmtInput.value = -10;
		expect(createCurPayment()).toBeUndefined();
	});
	it('should check bill amount is not zero', () => {
		billAmtInput.value = 0;
		expect(createCurPayment()).toBeUndefined();
	});
	it('should check bill amount is not a string', () => {
		billAmtInput.value = 'string';
		expect(createCurPayment()).toBeUndefined();
	});
	it('should check bill amount is not an array', () => {
		billAmtInput.value = [ 1, 2, 3 ];
		expect(createCurPayment()).toBeUndefined();
	});
	it('should check bill amount is not empty', () => {
		billAmtInput.value = '';
		expect(createCurPayment()).toBeUndefined();
	});
	it('should check bill amount is a number', () => {
		billAmtInput.value = 10;
		tipAmtInput.value = 1;
		expect(createCurPayment()).not.toBeUndefined();
	});
	afterAll(() => {
		billAmtInput.value = '';
		tipAmtInput.value = '';
	});
});

describe('validate tip amount input', () => {
	beforeEach(() => {
		billAmtInput.value = 10;
	});
	it('should check tip amount is not less than zero', () => {
		tipAmtInput.value = -10;
		expect(createCurPayment()).toBeUndefined();
	});
	it('should check tip amount is not a string', () => {
		tipAmtInput.value = 'none';
		expect(createCurPayment()).toBeUndefined();
	});
	it('should check tip amount is not a array', () => {
		tipAmtInput.value = [ 1, 2, 3 ];
		expect(createCurPayment()).toBeUndefined();
	});
	it('should check tip amount CAN be zero', () => {
		tipAmtInput.value = 0;
		expect(createCurPayment()).not.toBeUndefined();
	});
	afterEach(() => {
		billAmtInput.value = '';
		tipAmtInput.value = '';
	});
});

describe('input amounts are correctly displayed', () => {
	beforeEach(() => {
		billAmtInput.value = 50;
		tipAmtInput.value = 10;
		let curPayment = createCurPayment();
		appendPaymentTable(curPayment);
	});
	it('should append bill amount to table', () => {
		paymentInfo = document.querySelector('#paymentTable tbody tr');
		expect(paymentInfo.children[0].innerText).toEqual(`$50`);
	});
	it('should append tip amount to table', () => {
		paymentInfo = document.querySelector('#paymentTable tbody tr');
		expect(paymentInfo.children[1].innerText).toEqual(`$10`);
	});
	afterEach(() => {
		billAmtInput.value = '';
		tipAmtInput.value = '';
	});
	afterAll(() => {
		let table = document.querySelector('#paymentTable tbody');

		table.innerHTML = '';
	});
});
describe('test updating the summary table', () => {
	beforeAll(()=> {
		allPayments = {
			payment0: { billAmt: '100', tipAmt: '20', tipPercent: 20 },
			payment1: { billAmt: '200', tipAmt: '40', tipPercent: 20 },
			payment2: { billAmt: '300', tipAmt: '60', tipPercent: 20 },
			payment3: { billAmt: '400', tipAmt: '80', tipPercent: 20 }
		};
		updateSummary();
	})
	it('should update the bill total in summary table', () => {
		let tds = document.querySelector('#summaryTable tbody tr')
		expect(tds.children[0].innerText).toEqual('$1000')
	});
	it('should update the tip total in summary table', () => {
		let tds = document.querySelector('#summaryTable tbody tr')
		expect(tds.children[1].innerText).toEqual('$200')
	});it('should update the tip average in summary table', () => {
		let tds = document.querySelector('#summaryTable tbody tr')
		expect(tds.children[2].innerText).toEqual('20%')
	});
	afterAll(()=>{
		let tds = document.querySelector('#summaryTable tbody tr')
		for (let x of tds.children){
			x.innerHTML = ''
		}
	})
});
