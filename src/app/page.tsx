"use client";

import { useState } from "react";
import { generateText } from "ai";
import { createDeepSeek } from "@ai-sdk/deepseek";

const API_KEY = "sk-48987c1a1dc246ecb1b52a01647e8b16";
const API_URL = "https://api.deepseek.com/v1";
const model = createDeepSeek({ apiKey: API_KEY, baseURL: API_URL })("deepseek-chat");

export default function SmartContractPage() {
  const [formData, setFormData] = useState({
    contractType: "",
    functionName: "",
    functionPurpose: "",
    inputParams: "",
    accessControl: "",
    chain: "",
    solidityVersion: "",
  });
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setOutput("");

    try {
      const { text } = await generateText({
        model,
        prompt: `You are an expert Solidity smart contract developer. Generate a production-ready smart contract function for:

- Contract Type: ${formData.contractType || "ERC-20 Token"}
- Function Name: ${formData.functionName || "transferWithTax"}
- Purpose: ${formData.functionPurpose || "Transfer tokens with automatic tax deduction"}
- Input Parameters: ${formData.inputParams || "address to, uint256 amount"}
- Access Control: ${formData.accessControl || "onlyOwner"}
- Blockchain: ${formData.chain || "Ethereum"}
- Solidity Version: ${formData.solidityVersion || "0.8.x"}

Generate a complete, production-ready response in Markdown with:

1. **Function Overview** - Purpose and use case
2. **Code Implementation** - Full Solidity code with NatSpec comments
3. **Function Signature** - Clear parameter documentation
4. **Access Control** - Which modifiers are applied and why
5. **Events Emitted** - What events should be emitted
6. **Error Handling** - Custom errors or require statements
7. **Security Considerations** - Re-entrancy protection, overflow checks, etc.
8. **Gas Optimization Tips** - Any relevant gas-saving patterns
9. **Usage Example** - How to call this function from a frontend

Use Solidity 0.8.x style with custom errors, NatSpec comments, and OpenZeppelin patterns.`,
      });
      setOutput(text);
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => navigator.clipboard.writeText(output);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-teal-950 text-white">
      <div className="container mx-auto px-4 py-10 max-w-5xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2">
            ⛓️ Smart Contract Function Generator
          </h1>
          <p className="text-slate-400">Generate production-ready Solidity smart contract functions</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-semibold text-emerald-300">Function Details</h2>

            <div>
              <label className="block text-sm text-slate-300 mb-1">Contract Type</label>
              <select
                name="contractType"
                value={formData.contractType}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="">Select type</option>
                <option value="ERC-20 Token">ERC-20 Token</option>
                <option value="ERC-721 NFT">ERC-721 NFT</option>
                <option value="ERC-1155 Multi-Token">ERC-1155 Multi-Token</option>
                <option value="DeFi Staking">DeFi Staking</option>
                <option value="Governance">Governance</option>
                <option value="Vault">Vault</option>
                <option value="Vesting">Vesting</option>
                <option value="Cross-chain Bridge">Cross-chain Bridge</option>
                <option value="Custom">Custom</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-1">Function Name</label>
              <input
                name="functionName"
                value={formData.functionName}
                onChange={handleChange}
                placeholder="e.g. stakeTokens"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-1">Function Purpose</label>
              <textarea
                name="functionPurpose"
                value={formData.functionPurpose}
                onChange={handleChange}
                rows={2}
                placeholder="Describe what this function does..."
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-1">Input Parameters</label>
              <input
                name="inputParams"
                value={formData.inputParams}
                onChange={handleChange}
                placeholder="e.g. uint256 amount, address recipient"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-slate-300 mb-1">Access Control</label>
                <select
                  name="accessControl"
                  value={formData.accessControl}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="">Select</option>
                  <option value="public">Public</option>
                  <option value="onlyOwner">onlyOwner</option>
                  <option value="onlyRole">onlyRole</option>
                  <option value="external">External</option>
                  <option value="internal">Internal</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-300 mb-1">Blockchain</label>
                <select
                  name="chain"
                  value={formData.chain}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="">Select</option>
                  <option value="Ethereum">Ethereum</option>
                  <option value="Polygon">Polygon</option>
                  <option value="Arbitrum">Arbitrum</option>
                  <option value="Optimism">Optimism</option>
                  <option value="Avalanche">Avalanche</option>
                  <option value="BNB Chain">BNB Chain</option>
                  <option value="Base">Base</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-1">Solidity Version</label>
              <select
                name="solidityVersion"
                value={formData.solidityVersion}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="">Select</option>
                <option value="0.8.x">0.8.x (recommended)</option>
                <option value="0.7.x">0.7.x</option>
                <option value="0.6.x">0.6.x</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-all"
            >
              {loading ? "Generating Function... ⛓️" : "Generate Contract Function 🚀"}
            </button>

            {error && (
              <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>
            )}
          </form>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-emerald-300">Generated Code</h2>
              {output && (
                <button onClick={handleCopy} className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors">
                  📋 Copy
                </button>
              )}
            </div>

            {output ? (
              <div className="flex-1 overflow-auto">
                <div className="prose prose-invert prose-sm max-w-none text-slate-200 whitespace-pre-wrap">
                  {output}
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-slate-500">
                <p className="text-center">Your smart contract code will appear here...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
