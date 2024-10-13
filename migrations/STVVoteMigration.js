const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { abi, evm } = require('./build/STVVote.json');

const provider = new HDWalletProvider(
    'YOUR_MNEMONIC_HERE',
    'https://rinkeby.infura.io/v3/YOUR_INFURA_PROJECT_ID'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account:', accounts[0]);

    const result = await new web3.eth.Contract(abi)
        .deploy({ data: evm.bytecode.object, arguments: [['Tainá de Paula (PT)', 'Thais Ferreira (PSOL)', 'Tatiana Roque (PSB)', 'Rosa Fernandes (PSD)', 'Joyce Trindade (PSD)', 'Vera Lins (PP)', 'Maíra do MST (PT)', 'Tânia Bastos (REPUBLICANOS)', 'Gigi Castilho (REPUBLICANOS)', 'Helena Vieira (PSD)', 'Monica Benicio (PSOL)', 'Talita Galhardo (PSDB)']] })
        .send({ gas: '1000000', from: accounts[0] });

    console.log('Contract deployed to:', result.options.address);
};

deploy();