export interface WebLNNode {
  alias: string;
  pubkey?: string;
  color?: string;
}

interface Route {
  total_amt: number;
  total_fees: number;
}

export interface ConnectorInvoice {
  custom_records?: {
    "696969": string;
    "7629169": string;
    "5482373484": string;
  };
  id: string;
  memo: string;
  preimage: string;
  settled: boolean;
  settleDate: number;
  totalAmount: string;
  type: "received";
}

export interface MakeInvoiceArgs {
  amount: string | number;
  memo: string;
}

export type MakeInvoiceResponse = {
  data: {
    paymentRequest: string;
    rHash: string;
  };
};

export type GetInfoResponse = {
  data: WebLNNode;
};

export type GetBalanceResponse = {
  data: {
    balance: number;
  };
};

export type GetInvoicesResponse = {
  data: {
    invoices: ConnectorInvoice[];
  };
};

export type SendPaymentResponse = {
  data: {
    preimage: string;
    paymentHash: string;
    route: Route;
    payment_error?: string;
  };
};

export interface SendPaymentArgs {
  paymentRequest: string;
}

export interface KeysendArgs {
  pubkey: string;
  amount: number;
  customRecords: Record<string, string>;
}

export interface CheckPaymentArgs {
  paymentHash: string;
}

export type CheckPaymentResponse = {
  data: {
    paid: boolean;
    preimage?: string;
  };
};

export interface SignMessageArgs {
  message: string;
  key_loc: {
    key_family: number;
    key_index: number;
  };
}

export interface SignMessageResponse {
  data: {
    message: string;
    signature: string;
  };
}

export interface ConnectPeerResponse {
  data: boolean;
}

export interface ConnectPeerArgs {
  pubkey: string;
  host: string;
}

export default interface Connector {
  init(): Promise<void>;
  unload(): Promise<void>;
  getInfo(): Promise<GetInfoResponse>;
  getBalance(): Promise<GetBalanceResponse>;
  getInvoices(): Promise<GetInvoicesResponse> | Error;
  makeInvoice(args: MakeInvoiceArgs): Promise<MakeInvoiceResponse>;
  sendPayment(args: SendPaymentArgs): Promise<SendPaymentResponse>;
  keysend(args: KeysendArgs): Promise<SendPaymentResponse>;
  checkPayment(args: CheckPaymentArgs): Promise<CheckPaymentResponse>;
  signMessage(args: SignMessageArgs): Promise<SignMessageResponse>;
  connectPeer(
    args: ConnectPeerArgs
  ): Promise<ConnectPeerResponse | Error> | Error;
}
