export type ServiceFormValues = {
  id: string;
  name: string;
  description: string;
  price: string;
  features: string[];
  serviceId: number;
};

export interface TrasactionsTypes {
  name: string;
  price: string;
  created_at: string;
  transactionHash: string
}

export interface UpcomingCardProp {
  id: string;
  name: string;
  price: string;
  description: string;
  dueDate: string;
}

export type SubscribedService = {
  id: string | undefined;
  name: string;
  description: string;
  nextPaymentDate: string;
  price: string;
  features: string[];
  serviceId: number;
  services: ServiceFormValues;
  duration: string;
  active: boolean;
};

export type CreateServiceFormValues = {
  id: string;
  name: string;
  description: string;
  price: string;
  features: string;
  serviceId: number;
};

export type SubscriptionDetailCardProps = {
  sub: ServiceFormValues;
  index: number;
};

export type SubscriptionFormValues = {
  serviceId: string;
  subscriber: string;
  price: string;
  nextPaymentDate: string;
  active: boolean;
  duration: string;
};
