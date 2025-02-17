/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface TestFtsoV2InterfaceContract
  extends Truffle.Contract<TestFtsoV2InterfaceInstance> {
  "new"(
    meta?: Truffle.TransactionDetails
  ): Promise<TestFtsoV2InterfaceInstance>;
}

type AllEvents = never;

export interface TestFtsoV2InterfaceInstance extends Truffle.ContractInstance {
  getFeedById(
    _feedId: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<{ 0: BN; 1: BN; 2: BN }>;

  getFeedByIdInWei(
    _feedId: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<{ 0: BN; 1: BN }>;

  getFeedByIndex(
    _index: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<{ 0: BN; 1: BN; 2: BN }>;

  getFeedByIndexInWei(
    _index: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<{ 0: BN; 1: BN }>;

  getFeedId(
    _index: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<string>;

  getFeedIndex(
    _feedId: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  getFeedsById(
    _feedIds: string[],
    txDetails?: Truffle.TransactionDetails
  ): Promise<{ 0: BN[]; 1: BN[]; 2: BN }>;

  getFeedsByIdInWei(
    _feedIds: string[],
    txDetails?: Truffle.TransactionDetails
  ): Promise<{ 0: BN[]; 1: BN }>;

  getFeedsByIndex(
    _indices: (number | BN | string)[],
    txDetails?: Truffle.TransactionDetails
  ): Promise<{ 0: BN[]; 1: BN[]; 2: BN }>;

  getFeedsByIndexInWei(
    _indices: (number | BN | string)[],
    txDetails?: Truffle.TransactionDetails
  ): Promise<{ 0: BN[]; 1: BN }>;

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
    getFeedById(
      _feedId: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<{ 0: BN; 1: BN; 2: BN }>;

    getFeedByIdInWei(
      _feedId: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<{ 0: BN; 1: BN }>;

    getFeedByIndex(
      _index: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<{ 0: BN; 1: BN; 2: BN }>;

    getFeedByIndexInWei(
      _index: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<{ 0: BN; 1: BN }>;

    getFeedId(
      _index: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;

    getFeedIndex(
      _feedId: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    getFeedsById(
      _feedIds: string[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<{ 0: BN[]; 1: BN[]; 2: BN }>;

    getFeedsByIdInWei(
      _feedIds: string[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<{ 0: BN[]; 1: BN }>;

    getFeedsByIndex(
      _indices: (number | BN | string)[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<{ 0: BN[]; 1: BN[]; 2: BN }>;

    getFeedsByIndexInWei(
      _indices: (number | BN | string)[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<{ 0: BN[]; 1: BN }>;

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
