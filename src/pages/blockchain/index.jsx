import React, { useState } from "react";
import SHA256 from "crypto-js/sha256";
import { ec as EC } from "elliptic";

const ec = new EC("secp256k1");

// ===== TRANSACTION =====
class Transaction {
  constructor(fromAddress, toAddress, amount) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
    this.signature = null;
  }

  calculateHash() {
    return SHA256(this.fromAddress + this.toAddress + this.amount).toString();
  }

  signTransaction(signingKey) {
    if (signingKey.getPublic("hex") !== this.fromAddress) {
      throw new Error("❌ Tidak bisa menandatangani transaksi orang lain!");
    }
    const hashTx = this.calculateHash();
    const sig = signingKey.sign(hashTx, "base64");
    this.signature = sig.toDER("hex");
  }

  isValid() {
    if (this.fromAddress === null) return true; // reward transaction

    if (!this.signature) {
      throw new Error("❌ Transaksi belum ditandatangani!");
    }

    const publicKey = ec.keyFromPublic(this.fromAddress, "hex");
    return publicKey.verify(this.calculateHash(), this.signature);
  }
}

// ===== BLOCK =====
class Block {
  constructor(timestamp, transactions, previousHash = "") {
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.nonce = 0;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(
      this.previousHash +
        this.timestamp +
        JSON.stringify(this.transactions) +
        this.nonce
    ).toString();
  }

  mineBlock(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log(`✅ Block mined: ${this.hash}`);
  }

  hasValidTransactions() {
    return this.transactions.every((tx) => tx.isValid());
  }
}

// ===== BLOCKCHAIN =====
class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2; // frontend friendly
    this.targetBlockTime = 3000; // target 3 detik per block
    this.pendingTransactions = [];
    this.miningReward = 50;
  }

  createGenesisBlock() {
    return new Block(Date.now(), [], "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  minePendingTransactions(miningRewardAddress, logCallback) {
    const block = new Block(
      Date.now(),
      this.pendingTransactions,
      this.getLatestBlock().hash
    );

    const startTime = Date.now();
    logCallback(`⛏️ Mining block dengan difficulty: ${this.difficulty}...`);
    block.mineBlock(this.difficulty);
    const endTime = Date.now();
    const timeTaken = endTime - startTime;

    if (!block.hasValidTransactions()) {
      throw new Error("❌ Block mengandung transaksi tidak valid!");
    }

    this.chain.push(block);
    logCallback(`✅ Block mined: ${block.hash} (${timeTaken} ms)`);

    // Dynamic difficulty
    if (timeTaken < this.targetBlockTime / 2) {
      this.difficulty++;
      logCallback(
        `⚡ Mining terlalu cepat → difficulty naik ke ${this.difficulty}`
      );
    } else if (timeTaken > this.targetBlockTime * 2 && this.difficulty > 1) {
      this.difficulty--;
      logCallback(
        `🐢 Mining terlalu lambat → difficulty turun ke ${this.difficulty}`
      );
    }

    // Reset pending transactions + add reward
    const rewardTx = new Transaction(
      null,
      miningRewardAddress,
      this.miningReward
    );
    this.pendingTransactions = [rewardTx];
    logCallback(
      `💰 Reward diberikan: ${
        this.miningReward
      } coin → ${miningRewardAddress.slice(0, 10)}...`
    );
  }

  addTransaction(transaction) {
    if (!transaction.fromAddress || !transaction.toAddress) {
      throw new Error("❌ Transaksi harus punya pengirim & penerima!");
    }
    if (!transaction.isValid()) {
      throw new Error("❌ Transaksi tidak valid!");
    }
    this.pendingTransactions.push(transaction);
  }

  getBalanceOfAddress(address) {
    let balance = 0;
    for (const block of this.chain) {
      for (const tx of block.transactions) {
        if (tx.fromAddress === address) balance -= tx.amount;
        if (tx.toAddress === address) balance += tx.amount;
      }
    }
    return balance;
  }
}

// ===== REACT COMPONENT =====
export default function BlockchainApp() {
  const [log, setLog] = useState([]);
  const [balance, setBalance] = useState(0);

  // wallet & blockchain state
  const [myKey] = useState(() => ec.genKeyPair());
  const [myWalletAddress] = useState(() => myKey.getPublic("hex"));
  const [myCoin] = useState(() => new Blockchain());

  // wallet lain
  const [otherKey] = useState(() => ec.genKeyPair());
  const [otherAddress] = useState(() => otherKey.getPublic("hex"));

  const sendTransaction = () => {
    const tx = new Transaction(myWalletAddress, otherAddress, 10);
    tx.signTransaction(myKey);
    myCoin.addTransaction(tx);
    setLog((prev) => [
      ...prev,
      `💸 Transaksi dibuat: 10 coin → ${otherAddress.slice(0, 10)}...`,
    ]);
  };

  const mine = () => {
    const start = Date.now();

    const currentDifficulty = myCoin.difficulty; // difficulty saat ini sebelum mining

    const block = new Block(
      Date.now(),
      myCoin.pendingTransactions,
      myCoin.getLatestBlock().hash
    );

    // Mining
    block.mineBlock(currentDifficulty);
    const timeTaken = Date.now() - start;

    // Tambahkan ke chain
    myCoin.chain.push(block);

    // Atur difficulty
    let difficultyChange = null;
    if (timeTaken < myCoin.targetBlockTime / 2) {
      myCoin.difficulty++;
      difficultyChange = `naik ke ${myCoin.difficulty}`;
    } else if (
      timeTaken > myCoin.targetBlockTime * 2 &&
      myCoin.difficulty > 1
    ) {
      myCoin.difficulty--;
      difficultyChange = `turun ke ${myCoin.difficulty}`;
    }

    // Berikan reward
    const rewardTx = new Transaction(
      null,
      myWalletAddress,
      myCoin.miningReward
    );
    myCoin.pendingTransactions = [rewardTx];

    // Hitung balance terbaru
    const newBalance = myCoin.getBalanceOfAddress(myWalletAddress);
    setBalance(newBalance);

    // Simpan log JSON
    const logEntry = {
      blockIndex: myCoin.chain.length - 1,
      difficulty: currentDifficulty, // pakai difficulty saat mining
      hash: block.hash,
      timeTaken: `${timeTaken} ms`,
      difficultyChange: difficultyChange,
      reward: {
        amount: myCoin.miningReward,
        to: myWalletAddress.slice(0, 10) + "...",
      },
      balance: newBalance,
    };

    setLog((prev) => [...prev, logEntry]);
  };

  console.log("log", log);

  return (
    <div style={{ padding: 20 }}>
      <h1>MyCoin Blockchain</h1>
      <p>
        <b>Wallet:</b> {myWalletAddress.slice(0, 30)}...
      </p>
      <p>
        <b>Balance:</b> {balance}
      </p>

      <button onClick={sendTransaction}>💸 Kirim 10 coin</button>
      <button onClick={mine} style={{ marginLeft: 10 }}>
        ⛏️ Mine Block
      </button>

      <div style={{ marginTop: 20 }}>
        <h3>Log Mining:</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                Block
              </th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                Difficulty
              </th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Hash</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                Time Taken
              </th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                Difficulty Change
              </th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                Reward
              </th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                Balance
              </th>
            </tr>
          </thead>
          <tbody>
            {log.map((entry, index) => (
              <tr key={index}>
                <td
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {entry.blockIndex}
                </td>
                <td
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {entry.difficulty}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {entry.hash.slice(0, 20)}...
                </td>
                <td
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {entry.timeTaken}
                </td>
                <td
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {entry.difficultyChange || "-"}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {entry.reward.amount} → {entry.reward.to}
                </td>
                <td
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {entry.balance}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
