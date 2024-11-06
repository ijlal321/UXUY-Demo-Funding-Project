import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react"

import { WalletTgSdk } from '@uxuycom/web3-tg-sdk'

// Mock data for demonstration
const people = [
  { id: 1, name: "Alice Johnson", description: "Aspiring artist supporting local art programs", avatar: "/placeholder.svg?height=100&width=100", wallet: "0x1234...5678" },
  { id: 2, name: "Bob Smith", description: "Local community organizer funding neighborhood projects", avatar: "/placeholder.svg?height=100&width=100", wallet: "0x5678...9ABC" },
  { id: 3, name: "Carol Williams", description: "Environmental activist raising funds for green initiatives", avatar: "/placeholder.svg?height=100&width=100", wallet: "0x9ABC...DEF0" },
];


// Mock function to simulate donation
const donate = (amount, recipient) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), 1500);
  });
};

export function DonationAppJsx() {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState("");
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [donationAmount, setDonationAmount] = useState("");
  const [donationStatus, setDonationStatus] = useState(null);

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.MainButton.setText('DONATE').show().onClick(handleDonate);
    }


  }, []);

  async function handleConnect() {
    try {

      const { ethereum } = new WalletTgSdk({
        injected: true,  // default: false,   If `window.ethereum` does not exist, inject window.ethereum
        metaData: {
          name: 'UXUY Wallet', // if you want to use a custom name
          icon: 'https://uxuy.com/logo.png', // if you want to use a custom icon
        }
      })


      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      console.log('Connected account:', accounts[0]);
      setAddress(accounts[0]);
      setConnected(true);
      return accounts[0];
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      alert('Failed to connect wallet:', error);
    }
  }

  const handleSelectPerson = (person) => {
    setSelectedPerson(person);
    setDonationStatus(null);
    setDonationAmount("");
  };

  const handleDonate = async () => {
    if (!connected) {
      alert("Please connect your wallet first!");
      return;
    }

    if (!selectedPerson || !donationAmount) {
      alert("Please select a person and enter a donation amount!");
      return;
    }

    try {

      const accounts = await ethereum.request({ method: 'eth_accounts' });
      const transactionParameters = {
        to: accounts[0],
        from: accounts[0],
        value: value, // Value in wei
        // gasPrice: '0x09184e72a000', // Customize as needed
        // gas: '0x5208', // 21000 gas limit
      };

      const txHash = await ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });


      // await donate(parseFloat(donationAmount), selectedPerson.name);
      setDonationStatus('success');
    } catch (error) {
      setDonationStatus('error');
    }
  };

  return (
    (<div className="max-w-md mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold text-center mb-6">Crypto Donation App</h1>
      {!connected ? (
        <Button onClick={handleConnect} className="w-full">
          Connect Wallet
        </Button>
      ) : (
        <p className="text-center text-sm text-muted-foreground mb-4">Connected: {address}</p>
      )}
      (Only Send on BNB Testnet)
      {!selectedPerson ? (
        <div className="space-y-4">
          {people.map((person) => (
            <Card
              key={person.id}
              onClick={() => handleSelectPerson(person)}
              className="cursor-pointer hover:bg-accent">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={person.avatar} alt={person.name} />
                    <AvatarFallback>{person.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{person.name}</CardTitle>
                    <CardDescription>{person.description.substring(0, 50)}...</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={() => setSelectedPerson(null)}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Avatar>
                <AvatarImage src={selectedPerson.avatar} alt={selectedPerson.name} />
                <AvatarFallback>{selectedPerson.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{selectedPerson.name}</CardTitle>
                <CardDescription>{selectedPerson.wallet}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{selectedPerson.description}</p>
            <div className="flex space-x-2">
              <Input
                type="number"
                placeholder="Amount"
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)} />
              <Button onClick={handleDonate}>
                Donate
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            {donationStatus === 'success' && (
              <div className="flex items-center text-green-500">
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Donation successful!
              </div>
            )}
            {donationStatus === 'error' && (
              <div className="flex items-center text-red-500">
                <AlertCircle className="mr-2 h-4 w-4" />
                Donation failed. Please try again.
              </div>
            )}
          </CardFooter>
        </Card>
      )}
    </div>)
  );
}