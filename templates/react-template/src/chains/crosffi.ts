import { defineChain } from "viem";

const crossfi_mainnet =  defineChain({
  id: 4158,
  name: 'Crossfi Mainnet',
  nativeCurrency: {
    decimals: 18,
    name: 'XFI',
    symbol: 'XFI',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.mainnet.ms'],
      webSocket: [], 
    },
  },
  blockExplorers: {
    default: {
      name: 'CrossFi Explorer',
      url: 'https://xfiscan.com',
    },
  },
  testnet: false,
});

const crossfi_testnet =  defineChain({
  id: 4157,
  name: 'Crossfi Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'XFI',
    symbol: 'XFI',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.testnet.ms'],
      webSocket: [], 
    },
  },
  blockExplorers: {
    default: {
      name: 'CrossFi Explorer',
      url: 'https://test.xfiscan.com',
    },
  },
  testnet: true,
});

export { crossfi_mainnet,crossfi_testnet };
