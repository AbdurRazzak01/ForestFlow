/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface FtsoV2InterfaceContract
  extends Truffle.Contract<FtsoV2InterfaceInstance> {
  "new"(meta?: Truffle.TransactionDetails): Promise<FtsoV2InterfaceInstance>;
}

type AllEvents = never;

export interface FtsoV2InterfaceInstance extends Truffle.ContractInstance {
  getFeedById: {
    (_feedId: string, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(
      _feedId: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<{ 0: BN; 1: BN; 2: BN }>;
    sendTransaction(
      _feedId: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _feedId: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  getFeedByIdInWei: {
    (_feedId: string, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(
      _feedId: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<{ 0: BN; 1: BN }>;
    sendTransaction(
      _feedId: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _feedId: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  getFeedByIndex: {
    (
      _index: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _index: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<{ 0: BN; 1: BN; 2: BN }>;
    sendTransaction(
      _index: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _index: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  getFeedByIndexInWei: {
    (
      _index: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _index: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<{ 0: BN; 1: BN }>;
    sendTransaction(
      _index: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _index: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  getFeedId(
    _index: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<string>;

  getFeedIndex(
    _feedId: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  getFeedsById: {
    (_feedIds: string[], txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(
      _feedIds: string[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<{ 0: BN[]; 1: BN[]; 2: BN }>;
    sendTransaction(
      _feedIds: string[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _feedIds: string[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  getFeedsByIdInWei: {
    (_feedIds: string[], txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(
      _feedIds: string[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<{ 0: BN[]; 1: BN }>;
    sendTransaction(
      _feedIds: string[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _feedIds: string[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  getFeedsByIndex: {
    (
      _indices: (number | BN | string)[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _indices: (number | BN | string)[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<{ 0: BN[]; 1: BN[]; 2: BN }>;
    sendTransaction(
      _indices: (number | BN | string)[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _indices: (number | BN | string)[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  getFeedsByIndexInWei: {
    (
      _indices: (number | BN | string)[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _indices: (number | BN | string)[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<{ 0: BN[]; 1: BN }>;
    sendTransaction(
      _indices: (number | BN | string)[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _indices: (number | BN | string)[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  verifyFeedData(
    _feedData: {
      proof: string[];
      body: {
        votingRoundId: number | BN | string;
        id: string;
        value: number | BN | string;
        turnoutBIPS: number | BN | string;
        decimals: number | BN | string;
      };
    },
    txDetails?: Truffle.TransactionDetails
  ): Promise<boolean>;

  methods: {
    getFeedById: {
      (_feedId: string, txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(
        _feedId: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<{ 0: BN; 1: BN; 2: BN }>;
      sendTransaction(
        _feedId: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _feedId: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    getFeedByIdInWei: {
      (_feedId: string, txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(
        _feedId: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<{ 0: BN; 1: BN }>;
      sendTransaction(
        _feedId: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _feedId: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    getFeedByIndex: {
      (
        _index: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _index: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<{ 0: BN; 1: BN; 2: BN }>;
      sendTransaction(
        _index: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _index: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    getFeedByIndexInWei: {
      (
        _index: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _index: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<{ 0: BN; 1: BN }>;
      sendTransaction(
        _index: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _index: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    getFeedId(
      _index: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;

    getFeedIndex(
      _feedId: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    getFeedsById: {
      (_feedIds: string[], txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(
        _feedIds: string[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<{ 0: BN[]; 1: BN[]; 2: BN }>;
      sendTransaction(
        _feedIds: string[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _feedIds: string[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    getFeedsByIdInWei: {
      (_feedIds: string[], txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(
        _feedIds: string[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<{ 0: BN[]; 1: BN }>;
      sendTransaction(
        _feedIds: string[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _feedIds: string[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    getFeedsByIndex: {
      (
        _indices: (number | BN | string)[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _indices: (number | BN | string)[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<{ 0: BN[]; 1: BN[]; 2: BN }>;
      sendTransaction(
        _indices: (number | BN | string)[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _indices: (number | BN | string)[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    getFeedsByIndexInWei: {
      (
        _indices: (number | BN | string)[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _indices: (number | BN | string)[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<{ 0: BN[]; 1: BN }>;
      sendTransaction(
        _indices: (number | BN | string)[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _indices: (number | BN | string)[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    verifyFeedData(
      _feedData: {
        proof: string[];
        body: {
          votingRoundId: number | BN | string;
          id: string;
          value: number | BN | string;
          turnoutBIPS: number | BN | string;
          decimals: number | BN | string;
        };
      },
      txDetails?: Truffle.TransactionDetails
    ): Promise<boolean>;
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
