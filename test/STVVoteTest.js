const Web3 = require('web3');
const { assert } = require('chai');
const STVVote = require('./build/STVVote.json');

let accounts;
let stvVote;

beforeEach(async () => {
    const web3 = new Web3('http://localhost:8545');
    accounts = await web3.eth.getAccounts();

    stvVote = await new web3.eth.Contract(STVVote.abi)
        .deploy({ data: STVVote.evm.bytecode.object, arguments: [['Tainá de Paula (PT)', 'Thais Ferreira (PSOL)', 'Tatiana Roque (PSB)', 'Rosa Fernandes (PSD)', 'Joyce Trindade (PSD)', 'Vera Lins (PP)', 'Maíra do MST (PT)', 'Tânia Bastos (REPUBLICANOS)', 'Gigi Castilho (REPUBLICANOS)', 'Helena Vieira (PSD)', 'Monica Benicio (PSOL)', 'Talita Galhardo (PSDB)']] })
        .send({ from: accounts[0], gas: '1000000' });
});

describe('STVVote Contract', () => {
    it('deploys a contract', () => {
        assert.ok(stvVote.options.address);
    });

    it('allows voters to cast their votes', async () => {
        await stvVote.methods.vote([0, 1, 2]).send({ from: accounts[1] });
        const candidates = await stvVote.methods.getCandidates().call();
        assert.equal(candidates[0].voteCount, 1);
    });

    it('prevents double voting', async () => {
        await stvVote.methods.vote([0, 1, 2]).send({ from: accounts[2] });
        try {
            await stvVote.methods.vote([1, 2, 0]).send({ from: accounts[2] });
            assert(false); // Should not reach this line
        } catch (err) {
            assert(err); // Expect an error
        }
    });
});