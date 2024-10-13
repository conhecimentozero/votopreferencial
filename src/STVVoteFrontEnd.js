import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import STVVote from './STVVote.json';

const STVVoteFrontEnd = () => {
    const [candidates, setCandidates] = useState([]);
    const [account, setAccount] = useState('');
    const [stvVote, setStvVote] = useState(null);

    useEffect(() => {
        const loadBlockchainData = async () => {
            const web3 = new Web3(window.ethereum);
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await web3.eth.getAccounts();
            setAccount(accounts[0]);

            const stvVoteContract = new web3.eth.Contract(STVVote.abi, 'CONTRACT_ADDRESS_HERE');
            setStvVote(stvVoteContract);

            const candidatesList = await stvVoteContract.methods.getCandidates().call();
            setCandidates(candidatesList);
        };

        loadBlockchainData();
    }, []);

    const handleVote = async (preferences) => {
        await stvVote.methods.vote(preferences).send({ from: account });
        alert('Vote cast successfully!');
    };

    return (
        <div>
            <h1>STV Voting System</h1>
            <h2>Candidates</h2>
            <ul>
                {candidates.map((candidate, index) => (
                    <li key={index}>{candidate}</li>
                ))}
            </ul>
            <button onClick={() => handleVote([0, 1, 2])}>Vote for Top 3</button>
        </div>
    );
};