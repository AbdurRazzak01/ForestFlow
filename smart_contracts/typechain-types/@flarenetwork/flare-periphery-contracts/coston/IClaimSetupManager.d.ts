/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface IClaimSetupManagerContract
  extends Truffle.Contract<IClaimSetupManagerInstance> {
  "new"(meta?: Truffle.TransactionDetails): Promise<IClaimSetupManagerInstance>;
}

export interface AllowedClaimRecipientsChanged {
  name: "AllowedClaimRecipientsChanged";
  args: {
    owner: string;
    recipients: string[];
    0: string;
    1: string[];
  };
}

export interface ClaimExecutorFeeValueChanged {
  name: "ClaimExecutorFeeValueChanged";
  args: {
    executor: string;
    validFromRewardEpoch: BN;
    feeValueWei: BN;
    0: string;
    1: BN;
    2: BN;
  };
}

export interface ClaimExecutorsChanged {
  name: "ClaimExecutorsChanged";
  args: {
    owner: string;
    executors: string[];
    0: string;
    1: string[];
  };
}

export interface DelegationAccountCreated {
  name: "DelegationAccountCreated";
  args: {
    owner: string;
    delegationAccount: string;
    0: string;
    1: string;
  };
}

export interface DelegationAccountUpdated {
  name: "DelegationAccountUpdated";
  args: {
    owner: string;
    delegationAccount: string;
    enabled: boolean;
    0: string;
    1: string;
    2: boolean;
  };
}

export interface ExecutorRegistered {
  name: "ExecutorRegistered";
  args: {
    executor: string;
    0: string;
  };
}

export interface ExecutorUnregistered {
  name: "ExecutorUnregistered";
  args: {
    executor: string;
    validFromRewardEpoch: BN;
    0: string;
    1: BN;
  };
}

export interface MaxFeeSet {
  name: "MaxFeeSet";
  args: {
    maxFeeValueWei: BN;
    0: BN;
  };
}

export interface MinFeeSet {
  name: "MinFeeSet";
  args: {
    minFeeValueWei: BN;
    0: BN;
  };
}

export interface RegisterExecutorFeeSet {
  name: "RegisterExecutorFeeSet";
  args: {
    registerExecutorFeeValueWei: BN;
    0: BN;
  };
}

export interface SetExecutorsExcessAmountRefunded {
  name: "SetExecutorsExcessAmountRefunded";
  args: {
    owner: string;
    excessAmount: BN;
    0: string;
    1: BN;
  };
}

type AllEvents =
  | AllowedClaimRecipientsChanged
  | ClaimExecutorFeeValueChanged
  | ClaimExecutorsChanged
  | DelegationAccountCreated
  | DelegationAccountUpdated
  | ExecutorRegistered
  | ExecutorUnregistered
  | MaxFeeSet
  | MinFeeSet
  | RegisterExecutorFeeSet
  | SetExecutorsExcessAmountRefunded;

export interface IClaimSetupManagerInstance extends Truffle.ContractInstance {
  accountToDelegationAccount(
    _owner: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<string>;

  allowedClaimRecipients(
    _rewardOwner: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<string[]>;

  batchDelegate: {
    (
      _delegatees: string[],
      _bips: (number | BN | string)[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _delegatees: string[],
      _bips: (number | BN | string)[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _delegatees: string[],
      _bips: (number | BN | string)[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _delegatees: string[],
      _bips: (number | BN | string)[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  claimExecutors(
    _owner: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<string[]>;

  delegate: {
    (
      _to: string,
      _bips: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _to: string,
      _bips: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _to: string,
      _bips: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _to: string,
      _bips: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  delegateGovernance: {
    (_to: string, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(_to: string, txDetails?: Truffle.TransactionDetails): Promise<void>;
    sendTransaction(
      _to: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _to: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  disableDelegationAccount: {
    (txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(txDetails?: Truffle.TransactionDetails): Promise<void>;
    sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
    estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
  };

  enableDelegationAccount: {
    (txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(txDetails?: Truffle.TransactionDetails): Promise<string>;
    sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
    estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
  };

  getDelegationAccountData(
    _owner: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<{ 0: string; 1: boolean }>;

  getExecutorCurrentFeeValue(
    _executor: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  getExecutorFeeValue(
    _executor: string,
    _rewardEpoch: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  getExecutorInfo(
    _executor: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<{ 0: boolean; 1: BN }>;

  getExecutorScheduledFeeValueChanges(
    _executor: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<{ 0: BN[]; 1: BN[]; 2: boolean[] }>;

  getRegisteredExecutors(
    _start: number | BN | string,
    _end: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<{ 0: string[]; 1: BN }>;

  isClaimExecutor(
    _owner: string,
    _executor: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<boolean>;

  registerExecutor: {
    (
      _feeValue: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _feeValue: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;
    sendTransaction(
      _feeValue: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _feeValue: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  revokeDelegationAt: {
    (
      _who: string,
      _blockNumber: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _who: string,
      _blockNumber: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _who: string,
      _blockNumber: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _who: string,
      _blockNumber: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  setAllowedClaimRecipients: {
    (_recipients: string[], txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(
      _recipients: string[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _recipients: string[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _recipients: string[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  setAutoClaiming: {
    (
      _executors: string[],
      _enableDelegationAccount: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _executors: string[],
      _enableDelegationAccount: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _executors: string[],
      _enableDelegationAccount: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _executors: string[],
      _enableDelegationAccount: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  setClaimExecutors: {
    (_executors: string[], txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(
      _executors: string[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _executors: string[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _executors: string[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  transferExternalToken: {
    (
      _token: string,
      _amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _token: string,
      _amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _token: string,
      _amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _token: string,
      _amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  undelegateAll: {
    (txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(txDetails?: Truffle.TransactionDetails): Promise<void>;
    sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
    estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
  };

  undelegateGovernance: {
    (txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(txDetails?: Truffle.TransactionDetails): Promise<void>;
    sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
    estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
  };

  unregisterExecutor: {
    (txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(txDetails?: Truffle.TransactionDetails): Promise<BN>;
    sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
    estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
  };

  updateExecutorFeeValue: {
    (
      _feeValue: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _feeValue: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;
    sendTransaction(
      _feeValue: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _feeValue: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  withdraw: {
    (
      _amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  methods: {
    accountToDelegationAccount(
      _owner: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;

    allowedClaimRecipients(
      _rewardOwner: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string[]>;

    batchDelegate: {
      (
        _delegatees: string[],
        _bips: (number | BN | string)[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _delegatees: string[],
        _bips: (number | BN | string)[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _delegatees: string[],
        _bips: (number | BN | string)[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _delegatees: string[],
        _bips: (number | BN | string)[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    claimExecutors(
      _owner: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string[]>;

    delegate: {
      (
        _to: string,
        _bips: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _to: string,
        _bips: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _to: string,
        _bips: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _to: string,
        _bips: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    delegateGovernance: {
      (_to: string, txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(_to: string, txDetails?: Truffle.TransactionDetails): Promise<void>;
      sendTransaction(
        _to: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _to: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    disableDelegationAccount: {
      (txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(txDetails?: Truffle.TransactionDetails): Promise<void>;
      sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
      estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
    };

    enableDelegationAccount: {
      (txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(txDetails?: Truffle.TransactionDetails): Promise<string>;
      sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
      estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
    };

    getDelegationAccountData(
      _owner: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<{ 0: string; 1: boolean }>;

    getExecutorCurrentFeeValue(
      _executor: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    getExecutorFeeValue(
      _executor: string,
      _rewardEpoch: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    getExecutorInfo(
      _executor: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<{ 0: boolean; 1: BN }>;

    getExecutorScheduledFeeValueChanges(
      _executor: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<{ 0: BN[]; 1: BN[]; 2: boolean[] }>;

    getRegisteredExecutors(
      _start: number | BN | string,
      _end: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<{ 0: string[]; 1: BN }>;

    isClaimExecutor(
      _owner: string,
      _executor: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<boolean>;

    registerExecutor: {
      (
        _feeValue: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _feeValue: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<BN>;
      sendTransaction(
        _feeValue: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _feeValue: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    revokeDelegationAt: {
      (
        _who: string,
        _blockNumber: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _who: string,
        _blockNumber: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _who: string,
        _blockNumber: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _who: string,
        _blockNumber: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    setAllowedClaimRecipients: {
      (_recipients: string[], txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(
        _recipients: string[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _recipients: string[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _recipients: string[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    setAutoClaiming: {
      (
        _executors: string[],
        _enableDelegationAccount: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _executors: string[],
        _enableDelegationAccount: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _executors: string[],
        _enableDelegationAccount: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _executors: string[],
        _enableDelegationAccount: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    setClaimExecutors: {
      (_executors: string[], txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(
        _executors: string[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _executors: string[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _executors: string[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    transferExternalToken: {
      (
        _token: string,
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _token: string,
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _token: string,
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _token: string,
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    undelegateAll: {
      (txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(txDetails?: Truffle.TransactionDetails): Promise<void>;
      sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
      estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
    };

    undelegateGovernance: {
      (txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(txDetails?: Truffle.TransactionDetails): Promise<void>;
      sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
      estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
    };

    unregisterExecutor: {
      (txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(txDetails?: Truffle.TransactionDetails): Promise<BN>;
      sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
      estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
    };

    updateExecutorFeeValue: {
      (
        _feeValue: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _feeValue: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<BN>;
      sendTransaction(
        _feeValue: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _feeValue: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    withdraw: {
      (
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _amount: number | BN | string,
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
