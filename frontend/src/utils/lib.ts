export const addDays = (date: Date, days: number) =>
  new Date(date.getTime() + days * 24 * 60 * 60 * 1000);

export const formatDate = (inputDate: string): string => {
  const dateObject = new Date(inputDate);

  const options: Intl.DateTimeFormatOptions = { 
    year: "numeric", 
    month: "short", 
    day: "2-digit" 
  };

  const formattedDate = dateObject.toLocaleDateString("en-US", options);

  return formattedDate;
};

import { ethers } from 'ethers';

export const getAccountBalance = async (account: string) => {
  if (!window.ethereum) {
    alert('MetaMask is not installed.');
    return;
  }

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const balance = await provider.getBalance(account);
    const balanceInEth = ethers.utils.formatEther(balance);
    console.log('Balance:', balanceInEth);
    return balanceInEth;
  } catch (error) {
    console.error('Error fetching balance:', error);
    return null;
  }
};


