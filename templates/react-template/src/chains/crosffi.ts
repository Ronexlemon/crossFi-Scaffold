import { defineChain } from "viem";

const crossfi_mainnet =  defineChain({
  id: 4158,
  name: 'CrossFI',
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

export { crossfi_mainnet };
