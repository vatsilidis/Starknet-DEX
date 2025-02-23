"use client";

import { useState } from "react";
import { useContract, useAccount } from "@starknet-react/core";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpDownIcon as ArrowsUpDownIcon } from "lucide-react";

const TOKENS = [
  {
    symbol: "ETH",
    address:
      "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
  },
  {
    symbol: "USDC",
    address:
      "0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
  },
  {
    symbol: "DAI",
    address:
      "0x00da114221cb83fa859dbdb4c44beeaa0bb37c7537ad5ae66fe5e0efd20e6eb3",
  },
];

export function SwapForm() {
  const { address } = useAccount();
  const [fromToken, setFromToken] = useState(TOKENS[0].symbol);
  const [toToken, setToToken] = useState(TOKENS[1].symbol);
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const testAddress = (process.env.ETHER_ADDRESS ||
    "0x5EFF04C0F301D0Ed8949A983B7E41b9eE58dF60A") as `0x${string}`;

  const abi = [
    {
      members: [
        {
          name: "low",
          type: "felt",
        },
        {
          name: "high",
          type: "felt",
        },
      ],
      name: "Uint256",
      type: "struct",
    },
    {
      inputs: [
        {
          name: "name",
          type: "felt",
        },
        {
          name: "symbol",
          type: "felt",
        },
        {
          name: "recipient",
          type: "felt",
        },
      ],
      name: "constructor",
      type: "constructor",
    },
    {
      inputs: [],
      name: "name",
      outputs: [
        {
          type: "felt",
        },
      ],
      state_mutability: "view",
      type: "function",
    },
  ] as const;

  const { contract } = useContract({
    abi,
    address: testAddress,
  });

  // This would be your actual contract instance

  console.log("contract", contract);

  const handleSwapTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
    setFromAmount("");
    setToAmount("");
  };

  const handleSwap = async () => {
    if (!address || !fromAmount) return;

    try {
      setLoading(true);
      // Here you would call your actual swap function
      // await contract.invoke("swap", [params])
      console.log("Swap executed");
    } catch (error) {
      console.error("Swap failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Select value={fromToken} onValueChange={setFromToken}>
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TOKENS.map((token) => (
                <SelectItem key={token.address} value={token.symbol}>
                  {token.symbol}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            type="number"
            placeholder="0.0"
            value={fromAmount}
            onChange={(e) => setFromAmount(e.target.value)}
          />
        </div>
        <div className="flex justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={handleSwapTokens}
          >
            <ArrowsUpDownIcon className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Select value={toToken} onValueChange={setToToken}>
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TOKENS.map((token) => (
                <SelectItem key={token.address} value={token.symbol}>
                  {token.symbol}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input type="number" placeholder="0.0" value={toAmount} readOnly />
        </div>
      </div>

      {!address ? (
        <Button className="w-full" disabled>
          Connect Wallet to Swap
        </Button>
      ) : (
        <Button
          className="w-full"
          disabled={!fromAmount || loading}
          onClick={handleSwap}
        >
          {loading ? "Swapping..." : "Swap"}
        </Button>
      )}

      {fromAmount && (
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex justify-between">
            <span>Price Impact</span>
            <span>{"< 0.1%"}</span>
          </div>
          <div className="flex justify-between">
            <span>Route</span>
            <span>
              {fromToken} → {toToken}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
