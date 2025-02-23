"use client";

import { useAccount, useConnect } from "@starknet-react/core";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SwapForm } from "@/components/swap-form";

export default function Home() {
  const { address } = useAccount();
  const { connect, connectors } = useConnect();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">Starknet DEX</h1>
          {!address ? (
            <Button
              variant="outline"
              onClick={() => connect({ connector: connectors[0] })}
            >
              Connect Wallet
            </Button>
          ) : (
            <div className="text-sm font-mono bg-muted px-3 py-1 rounded-lg">
              {address.slice(0, 6)}...{address.slice(-4)}
            </div>
          )}
        </div>
        <SwapForm />
      </Card>
    </div>
  );
}
