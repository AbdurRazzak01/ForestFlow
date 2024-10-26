/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface IAddressBinderContract
  extends Truffle.Contract<IAddressBinderInstance> {
  "new"(meta?: Truffle.TransactionDetails): Promise<IAddressBinderInstance>;
}

export interface AddressesRegistered {
  name: "AddressesRegistered";
  args: {
    publicKey: string;
    pAddress: string;
    cAddress: string;
    0: string;
    1: string;
    2: string;
  };
}

type AllEvents = AddressesRegistered;

export interface IAddressBinderInstance extends Truffle.ContractInstance {
  cAddressToPAddress(
    _cAddress: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<string>;

  pAddressToCAddress(
    _pAddress: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<string>;

  registerAddresses: {
    (
      _publicKey: string,
      _pAddress: string,
      _cAddress: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _publicKey: string,
      _pAddress: string,
      _cAddress: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _publicKey: string,
      _pAddress: string,
      _cAddress: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _publicKey: string,
      _pAddress: string,
      _cAddress: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  registerPublicKey: {
    (_publicKey: string, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(
      _publicKey: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<{ 0: string; 1: string }>;
    sendTransaction(
      _publicKey: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _publicKey: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  methods: {
    cAddressToPAddress(
      _cAddress: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;

    pAddressToCAddress(
      _pAddress: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;

    registerAddresses: {
      (
        _publicKey: string,
        _pAddress: string,
        _cAddress: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _publicKey: string,
        _pAddress: string,
        _cAddress: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _publicKey: string,
        _pAddress: string,
        _cAddress: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _publicKey: string,
        _pAddress: string,
        _cAddress: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    registerPublicKey: {
      (_publicKey: string, txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(
        _publicKey: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<{ 0: string; 1: string }>;
      sendTransaction(
        _publicKey: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _publicKey: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };
  };

  getPastEvents(event: string): Promise<EventData[]>;
  getPastEvents(
    event: string,
    options: PastEventOptions,
    callback: (error: Error, event: EventData) => void
  ): Promise<EventData[]>;
  getPastEvents(event: string, options: PastEventOptions): Promise<EventData[]>;
  getPastEvents(
    event: string,
    callback: (error: Error, event: EventData) => void
  ): Promise<EventData[]>;
}
