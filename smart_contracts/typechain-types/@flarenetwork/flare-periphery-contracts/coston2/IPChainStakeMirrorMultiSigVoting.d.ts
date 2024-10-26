/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface IPChainStakeMirrorMultiSigVotingContract
  extends Truffle.Contract<IPChainStakeMirrorMultiSigVotingInstance> {
  "new"(
    meta?: Truffle.TransactionDetails
  ): Promise<IPChainStakeMirrorMultiSigVotingInstance>;
}

export interface PChainStakeMirrorValidatorUptimeVoteSubmitted {
  name: "PChainStakeMirrorValidatorUptimeVoteSubmitted";
  args: {
    rewardEpochId: BN;
    timestamp: BN;
    voter: string;
    nodeIds: string[];
    0: BN;
    1: BN;
    2: string;
    3: string[];
  };
}

export interface PChainStakeMirrorVoteSubmitted {
  name: "PChainStakeMirrorVoteSubmitted";
  args: {
    epochId: BN;
    voter: string;
    merkleRoot: string;
    0: BN;
    1: string;
    2: string;
  };
}

export interface PChainStakeMirrorVotersSet {
  name: "PChainStakeMirrorVotersSet";
  args: {
    voters: string[];
    0: string[];
  };
}

export interface PChainStakeMirrorVotingFinalized {
  name: "PChainStakeMirrorVotingFinalized";
  args: {
    epochId: BN;
    merkleRoot: string;
    0: BN;
    1: string;
  };
}

export interface PChainStakeMirrorVotingReset {
  name: "PChainStakeMirrorVotingReset";
  args: {
    epochId: BN;
    0: BN;
  };
}

export interface PChainStakeMirrorVotingThresholdSet {
  name: "PChainStakeMirrorVotingThresholdSet";
  args: {
    votingThreshold: BN;
    0: BN;
  };
}

type AllEvents =
  | PChainStakeMirrorValidatorUptimeVoteSubmitted
  | PChainStakeMirrorVoteSubmitted
  | PChainStakeMirrorVotersSet
  | PChainStakeMirrorVotingFinalized
  | PChainStakeMirrorVotingReset
  | PChainStakeMirrorVotingThresholdSet;

export interface IPChainStakeMirrorMultiSigVotingInstance
  extends Truffle.ContractInstance {
  getCurrentEpochId(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  getEpochConfiguration(
    txDetails?: Truffle.TransactionDetails
  ): Promise<{ 0: BN; 1: BN }>;

  getEpochId(
    _timestamp: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  getMerkleRoot(
    _epochId: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<string>;

  getVoters(txDetails?: Truffle.TransactionDetails): Promise<string[]>;

  getVotes(
    _epochId: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<{ merkleRoot: string; votes: string[] }[]>;

  getVotingThreshold(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  shouldVote(
    _epochId: number | BN | string,
    _voter: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<boolean>;

  submitValidatorUptimeVote: {
    (
      _rewardEpochId: number | BN | string,
      _nodeIds: string[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _rewardEpochId: number | BN | string,
      _nodeIds: string[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _rewardEpochId: number | BN | string,
      _nodeIds: string[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _rewardEpochId: number | BN | string,
      _nodeIds: string[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  submitVote: {
    (
      _epochId: number | BN | string,
      _merkleRoot: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _epochId: number | BN | string,
      _merkleRoot: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _epochId: number | BN | string,
      _merkleRoot: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _epochId: number | BN | string,
      _merkleRoot: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  methods: {
    getCurrentEpochId(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    getEpochConfiguration(
      txDetails?: Truffle.TransactionDetails
    ): Promise<{ 0: BN; 1: BN }>;

    getEpochId(
      _timestamp: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    getMerkleRoot(
      _epochId: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;

    getVoters(txDetails?: Truffle.TransactionDetails): Promise<string[]>;

    getVotes(
      _epochId: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<{ merkleRoot: string; votes: string[] }[]>;

    getVotingThreshold(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    shouldVote(
      _epochId: number | BN | string,
      _voter: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<boolean>;

    submitValidatorUptimeVote: {
      (
        _rewardEpochId: number | BN | string,
        _nodeIds: string[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _rewardEpochId: number | BN | string,
        _nodeIds: string[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _rewardEpochId: number | BN | string,
        _nodeIds: string[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _rewardEpochId: number | BN | string,
        _nodeIds: string[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    submitVote: {
      (
        _epochId: number | BN | string,
        _merkleRoot: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _epochId: number | BN | string,
        _merkleRoot: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _epochId: number | BN | string,
        _merkleRoot: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _epochId: number | BN | string,
        _merkleRoot: string,
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
