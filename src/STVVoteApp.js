import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import STVVoteInterface from './STVVoteInterface';

const STVVoteApp = () => {
    const [candidates, setCandidates] = useState([]);
    const [account, setAccount] = useState('');
    const [stvVote, setStvVote] = useState(null);

    useEffect(() => {
        const loadBlockchainData = async () => {
            const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
            const accounts = await web3.eth.getAccounts();
            setAccount(accounts[0]);

            const stvVoteInterface = new STVVoteInterface('CONTRACT_ADDRESS_HERE', STVVote.abi);
            setStvVote(stvVoteInterface);

            const candidatesList = await stvVoteInterface.getCandidates();
            setCandidates(candidatesList);
        };

        loadBlockchainData();
    }, []);

    const handleVote = async (preferences) => {
        await stvVote.vote(preferences, account);
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

export default STVVoteApp;