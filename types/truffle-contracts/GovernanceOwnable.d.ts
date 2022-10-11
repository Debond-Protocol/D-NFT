/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface GovernanceOwnableContract
  extends Truffle.Contract<GovernanceOwnableInstance> {
  "new"(
    _governanceAddress: string,
    meta?: Truffle.TransactionDetails
  ): Promise<GovernanceOwnableInstance>;
}

type AllEvents = never;

export interface GovernanceOwnableInstance extends Truffle.ContractInstance {
  setIsActive: {
    (_isActive: boolean, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(
      _isActive: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _isActive: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _isActive: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  contractIsActive(txDetails?: Truffle.TransactionDetails): Promise<boolean>;

  methods: {
    setIsActive: {
      (_isActive: boolean, txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(
        _isActive: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _isActive: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _isActive: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    contractIsActive(txDetails?: Truffle.TransactionDetails): Promise<boolean>;
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
